<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vitepress'

interface RawLink {
  id: string
  type: 'explicit' | 'thematic' | 'weak'
}

interface RawNode {
  id: string
  path: string
  title: string
  section: 'ai-analytics' | 'evaluation' | 'builds' | 'writing'
  status: string
  tags: string[]
  links_to: RawLink[]
}

interface Tag {
  id: string
  label: string
}

interface GraphData {
  nodes: RawNode[]
  tags: Tag[]
  link_types: { id: string; label: string; description: string }[]
}

const COLORS = {
  bg: '#1a1a1a',
  text: '#e8e0d0',
  nodeStroke: '#b97818',
  nodeFill: '#b97818',
  activeFill: '#e7b35a',
  edgeExplicit: 'rgba(185, 120, 24, 0.7)',
  edgeThematic: 'rgba(185, 120, 24, 0.35)',
  edgeWeak: 'rgba(185, 120, 24, 0.15)',
  tooltipBorder: 'rgba(185, 120, 24, 0.5)',
  dim: 0.15,
}

const RADIUS = 9

// Section cluster anchors, expressed as fractions of the stage width/height.
const ANCHORS: Record<RawNode['section'], { x: number; y: number }> = {
  'ai-analytics': { x: 0.55, y: 0.27 },
  evaluation: { x: 0.82, y: 0.4 },
  builds: { x: 0.2, y: 0.72 },
  writing: { x: 0.67, y: 0.78 },
}

const TYPE_RANK: Record<string, number> = { weak: 1, thematic: 2, explicit: 3 }

const tags = ref<Tag[]>([])
const activeTags = ref<string[]>([])
const helpOpen = ref(true)

let cleanup: (() => void) | null = null
let applyFilterRef: (() => void) | null = null

function toggleTag(id: string) {
  const idx = activeTags.value.indexOf(id)
  if (idx === -1) activeTags.value = [...activeTags.value, id]
  else activeTags.value = activeTags.value.filter((t) => t !== id)
  applyFilterRef?.()
}

function statusLabel(status: string) {
  return status.replace(/-/g, ' ')
}

onMounted(async () => {
  if (typeof window === 'undefined') return

  const router = useRouter()
  // Load D3 v7 as an ES module from CDN. @vite-ignore keeps Vite from
  // trying to resolve the remote URL at build time.
  const d3: any = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/d3@7/+esm')

  const res = await fetch(`${import.meta.env.BASE_URL}site-graph.json`)
  const data: GraphData = await res.json()

  tags.value = data.tags
  const tagLabel = new Map(data.tags.map((t) => [t.id, t.label]))

  const container = document.getElementById('site-map-container')
  if (!container) return

  let width = container.clientWidth || 800
  let height = container.clientHeight || 600

  // ---- nodes ----
  const nodes = data.nodes.map((n) => {
    const a = ANCHORS[n.section]
    return {
      ...n,
      tagSet: new Set(n.tags),
      x: a.x * width + (Math.random() - 0.5) * 120,
      y: a.y * height + (Math.random() - 0.5) * 120,
    }
  })
  const nodeById = new Map(nodes.map((n) => [n.id, n]))

  // ---- edges: dedupe undirected pairs, keep strongest type ----
  const edgeMap = new Map<string, any>()
  for (const n of data.nodes) {
    for (const l of n.links_to) {
      if (!nodeById.has(l.id)) continue
      const key = [n.id, l.id].sort().join('\u0000')
      const existing = edgeMap.get(key)
      if (!existing || TYPE_RANK[l.type] > TYPE_RANK[existing.type]) {
        edgeMap.set(key, { source: n.id, target: l.id, type: l.type })
      }
    }
  }
  const links = Array.from(edgeMap.values()).map((e) => {
    const s = nodeById.get(e.source)!
    const t = nodeById.get(e.target)!
    const shared = [...s.tagSet].filter((tg: string) => t.tagSet.has(tg))
    return { ...e, shared }
  })

  // ---- svg scaffold ----
  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('display', 'block')

  const linkSel = svg
    .append('g')
    .attr('fill', 'none')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke', (d: any) =>
      d.type === 'explicit'
        ? COLORS.edgeExplicit
        : d.type === 'thematic'
          ? COLORS.edgeThematic
          : COLORS.edgeWeak,
    )
    .attr('stroke-width', (d: any) => (d.type === 'explicit' ? 1.6 : 1.2))
    .attr('stroke-dasharray', (d: any) =>
      d.type === 'thematic' ? '6 5' : d.type === 'weak' ? '2 5' : null,
    )
    .style('cursor', 'default')

  const nodeSel = svg
    .append('g')
    .selectAll('g')
    .data(nodes)
    .join('g')
    .attr('class', 'rs-map-node')
    .style('cursor', 'pointer')

  nodeSel
    .append('circle')
    .attr('r', RADIUS)
    .attr('fill', COLORS.nodeFill)
    .attr('stroke', COLORS.nodeStroke)
    .attr('stroke-width', 1.5)

  nodeSel
    .append('text')
    .text((d: any) => d.title)
    .attr('text-anchor', 'middle')
    .attr('y', RADIUS + 14)
    .attr('fill', COLORS.text)
    .style('font-family', 'var(--vp-font-family-base)')
    .style('font-size', '13px')
    .style('user-select', 'text')
    .style('pointer-events', 'none')

  // ---- tooltip ----
  const tooltip = d3
    .select(container)
    .append('div')
    .attr('class', 'rs-map-tooltip')
    .style('position', 'absolute')
    .style('pointer-events', 'none')
    .style('opacity', 0)
    .style('background', COLORS.bg)
    .style('border', `1px solid ${COLORS.tooltipBorder}`)
    .style('color', COLORS.text)
    .style('font-family', 'var(--vp-font-family-base)')
    .style('font-size', '13px')
    .style('padding', '10px 14px')
    .style('box-shadow', 'none')
    .style('max-width', '260px')
    .style('z-index', '5')

  function moveTooltip(event: MouseEvent) {
    const rect = container!.getBoundingClientRect()
    tooltip
      .style('left', `${event.clientX - rect.left + 14}px`)
      .style('top', `${event.clientY - rect.top + 14}px`)
  }

  // ---- highlight helpers ----
  const neighbours = new Map<string, Set<string>>()
  nodes.forEach((n) => neighbours.set(n.id, new Set([n.id])))
  links.forEach((l: any) => {
    neighbours.get(l.source.id ?? l.source)!.add(l.target.id ?? l.target)
    neighbours.get(l.target.id ?? l.target)!.add(l.source.id ?? l.source)
  })

  function linkSource(l: any) {
    return l.source.id ?? l.source
  }
  function linkTarget(l: any) {
    return l.target.id ?? l.target
  }

  function passesTagFilter(n: any) {
    if (activeTags.value.length === 0) return true
    return activeTags.value.every((t) => n.tagSet.has(t))
  }

  function applyFilter() {
    const filtering = activeTags.value.length > 0
    nodeSel.style('opacity', (d: any) =>
      !filtering || passesTagFilter(d) ? 1 : COLORS.dim,
    )
    linkSel.style('opacity', (l: any) => {
      if (!filtering) return 1
      const s = nodeById.get(linkSource(l))!
      const t = nodeById.get(linkTarget(l))!
      return passesTagFilter(s) && passesTagFilter(t) ? 1 : COLORS.dim
    })
  }
  applyFilterRef = applyFilter

  function highlightNode(d: any) {
    const related = neighbours.get(d.id)!
    nodeSel.style('opacity', (o: any) => (related.has(o.id) ? 1 : COLORS.dim))
    nodeSel
      .select('circle')
      .attr('fill', (o: any) => (o.id === d.id ? COLORS.activeFill : COLORS.nodeFill))
    linkSel
      .style('opacity', (l: any) =>
        linkSource(l) === d.id || linkTarget(l) === d.id ? 1 : COLORS.dim,
      )
      .attr('stroke', (l: any) =>
        linkSource(l) === d.id || linkTarget(l) === d.id
          ? COLORS.edgeExplicit
          : l.type === 'explicit'
            ? COLORS.edgeExplicit
            : l.type === 'thematic'
              ? COLORS.edgeThematic
              : COLORS.edgeWeak,
      )
  }

  function clearHighlight() {
    nodeSel.select('circle').attr('fill', COLORS.nodeFill)
    linkSel.attr('stroke', (d: any) =>
      d.type === 'explicit'
        ? COLORS.edgeExplicit
        : d.type === 'thematic'
          ? COLORS.edgeThematic
          : COLORS.edgeWeak,
    )
    applyFilter()
  }

  // ---- node interactions ----
  nodeSel
    .on('mouseenter', function (event: MouseEvent, d: any) {
      highlightNode(d)
      const tagsStr = d.tags.map((t: string) => tagLabel.get(t) || t).join(' \u00b7 ')
      tooltip
        .html(
          `<div style="font-weight:600;margin-bottom:2px">${d.title}</div>` +
            `<div style="color:${COLORS.nodeStroke};text-transform:capitalize">${statusLabel(
              d.status,
            )}</div>` +
            (tagsStr ? `<div style="margin-top:4px">Tags: ${tagsStr}</div>` : ''),
        )
        .style('opacity', 1)
      moveTooltip(event)
    })
    .on('mousemove', (event: MouseEvent) => moveTooltip(event))
    .on('mouseleave', function () {
      clearHighlight()
      tooltip.style('opacity', 0)
    })
    .on('click', function (event: MouseEvent, d: any) {
      event.preventDefault()
      router.go(d.path)
    })

  // ---- edge interactions ----
  linkSel
    .on('mouseenter', function (event: MouseEvent, d: any) {
      const labels = d.shared.map((t: string) => tagLabel.get(t) || t)
      const body = labels.length
        ? `Shared: ${labels.join(' \u00b7 ')}`
        : 'No shared tags'
      tooltip
        .html(`<div>${body}</div>`)
        .style('opacity', 1)
      moveTooltip(event)
    })
    .on('mousemove', (event: MouseEvent) => moveTooltip(event))
    .on('mouseleave', () => tooltip.style('opacity', 0))

  // ---- simulation ----
  const linkForce = d3
    .forceLink(links)
    .id((d: any) => d.id)
    .distance(130)
    .strength(0.25)

  const simulation = d3
    .forceSimulation(nodes)
    .force('link', linkForce)
    .force('charge', d3.forceManyBody().strength(-420))
    .force('collide', d3.forceCollide(RADIUS + 34))
    .force('x', d3.forceX((d: any) => ANCHORS[d.section].x * width).strength(0.08))
    .force('y', d3.forceY((d: any) => ANCHORS[d.section].y * height).strength(0.08))
    .stop()

  // Settle before first paint.
  for (let i = 0; i < 300; i++) simulation.tick()

  function ticked() {
    linkSel
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)
    nodeSel.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
  }

  simulation.on('tick', ticked)
  ticked()

  // Gentle continued settle from the seeded layout.
  simulation.alpha(0.25).restart()

  // ---- drag ----
  let dragging = false
  const drag = d3
    .drag()
    .on('start', (event: any, d: any) => {
      dragging = true
      if (!event.active) simulation.alphaTarget(0.3).restart()
      // Temporarily stiffen links so neighbours pull elastically.
      linkForce.strength(0.7)
      d.fx = d.x
      d.fy = d.y
    })
    .on('drag', (event: any, d: any) => {
      d.fx = event.x
      d.fy = event.y
    })
    .on('end', (event: any, d: any) => {
      dragging = false
      if (!event.active) simulation.alphaTarget(0)
      // Restore link strength and release the node so it eases back toward
      // its cluster anchor with the default alpha decay bounce.
      linkForce.strength(0.25)
      d.fx = null
      d.fy = null
    })
  nodeSel.call(drag)

  // ---- resize ----
  function onResize() {
    width = container!.clientWidth || width
    height = container!.clientHeight || height
    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
    // Re-target cluster forces to the new dimensions without discarding
    // current node positions.
    simulation.force(
      'x',
      d3.forceX((d: any) => ANCHORS[d.section].x * width).strength(0.08),
    )
    simulation.force(
      'y',
      d3.forceY((d: any) => ANCHORS[d.section].y * height).strength(0.08),
    )
    if (!dragging) simulation.alpha(0.1).restart()
  }
  window.addEventListener('resize', onResize)

  cleanup = () => {
    window.removeEventListener('resize', onResize)
    simulation.stop()
    svg.remove()
    tooltip.remove()
  }
})

onBeforeUnmount(() => {
  cleanup?.()
})
</script>

<template>
  <div class="rs-map">
    <div class="rs-map__stage">
      <aside class="rs-map__intro">
        <div class="rs-map__intro-title">A network of ideas and projects</div>
        <hr class="rs-map__rule" />
        <p>
          Nodes are this website's pages, edges are the links, be they explicit
          references or thematic connections.<br />
          Click a tag to pick up a thread.
        </p>
        <div class="rs-map__legend">
          <span><span class="rs-map__glyph rs-map__glyph--solid"></span>Explicit</span>
          <span><span class="rs-map__glyph rs-map__glyph--dashed"></span>Thematic</span>
          <span><span class="rs-map__glyph rs-map__glyph--dotted"></span>Loose</span>
        </div>
      </aside>

      <div class="rs-map__tags">
        <button
          v-for="tag in tags"
          :key="tag.id"
          type="button"
          class="rs-map__tag"
          :class="{ 'rs-map__tag--active': activeTags.includes(tag.id) }"
          @click="toggleTag(tag.id)"
        >
          {{ tag.label }}
        </button>
      </div>

      <div class="rs-map__help" :class="{ 'rs-map__help--collapsed': !helpOpen }">
        <button class="rs-map__help-toggle" type="button" @click="helpOpen = !helpOpen">
          How to explore
          <span aria-hidden="true">{{ helpOpen ? '−' : '+' }}</span>
        </button>
        <ul v-show="helpOpen">
          <li><span class="rs-map__help-glyph">○</span> Hover a node to see related pages and link tags.</li>
          <li><span class="rs-map__help-glyph">◇</span> Click a tag to highlight related pages.</li>
        </ul>
      </div>

      <div id="site-map-container"></div>
    </div>
  </div>
</template>

<style scoped>
.rs-map {
  --map-bg: #1a1a1a;
  --map-text: #e8e0d0;
  --map-amber: #b97818;
  position: relative;
  width: 100%;
  background: var(--map-bg);
  color: var(--map-text);
}

.rs-map__stage {
  position: relative;
  width: 100%;
  height: calc(100vh - var(--vp-nav-height, 64px));
}

#site-map-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.rs-map__intro {
  position: absolute;
  top: 24px;
  left: 24px;
  width: 220px;
  z-index: 3;
  font-family: var(--vp-font-family-base);
  font-size: 13px;
  line-height: 1.55;
  color: var(--map-text);
  pointer-events: none;
}

.rs-map__intro-title {
  font-family: 'Young Serif', Georgia, serif;
  font-size: 20px;
}

.rs-map__rule {
  border: none;
  border-top: 1px solid rgba(185, 120, 24, 0.5);
  margin: 12px 0;
}

.rs-map__intro p {
  margin: 0 0 14px;
  color: rgba(232, 224, 208, 0.85);
}

.rs-map__legend {
  margin: 0 0 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
  color: rgba(232, 224, 208, 0.85);
}

.rs-map__legend > span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  white-space: nowrap;
}

.rs-map__glyph {
  width: 22px;
  flex: 0 0 22px;
  height: 0;
  border-top-width: 2px;
  border-top-color: var(--map-amber);
}

.rs-map__glyph--solid {
  border-top-style: solid;
}

.rs-map__glyph--dashed {
  border-top-style: dashed;
}

.rs-map__glyph--dotted {
  border-top-style: dotted;
}

.rs-map__help {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 200px;
  z-index: 3;
  font-family: var(--vp-font-family-base);
  font-size: 13px;
  line-height: 1.5;
  background: rgba(26, 26, 26, 0.85);
  border: 1px solid rgba(185, 120, 24, 0.35);
  padding: 12px 14px;
}

.rs-map__help-toggle {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  color: var(--map-text);
  font-family: 'Young Serif', Georgia, serif;
  font-size: 15px;
  cursor: pointer;
  padding: 0;
}

.rs-map__help ul {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  display: grid;
  gap: 10px;
}

.rs-map__help-glyph {
  color: var(--map-amber);
  margin-right: 6px;
}

.rs-map__tags {
  position: absolute;
  bottom: 24px;
  left: 24px;
  width: 220px;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  pointer-events: auto;
}

.rs-map__tag {
  background: transparent;
  border: 1px solid rgba(185, 120, 24, 0.35);
  border-radius: 999px;
  color: rgba(232, 224, 208, 0.6);
  font-family: var(--vp-font-family-base);
  font-size: 12px;
  line-height: 1.3;
  padding: 4px 11px;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.rs-map__tag:hover {
  background: rgba(185, 120, 24, 0.1);
}

.rs-map__tag--active {
  background: rgba(185, 120, 24, 0.2);
  color: var(--map-amber);
  border-color: rgba(185, 120, 24, 0.6);
}

@media (max-width: 720px) {
  .rs-map__intro {
    position: static;
    width: auto;
    padding: 16px 24px 0;
  }
  .rs-map__tags {
    position: static;
    width: auto;
    padding: 0 24px 16px;
  }
  .rs-map__help {
    display: none;
  }
  .rs-map__stage {
    height: 70vh;
  }
}
</style>
