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
  edgeExplicit: 'rgba(185, 120, 24, 0.7)',
  edgeThematic: 'rgba(185, 120, 24, 0.35)',
  edgeWeak: 'rgba(185, 120, 24, 0.15)',
  edgeBright: 'rgba(185, 120, 24, 1)',
  tooltipBorder: 'rgba(185, 120, 24, 0.5)',
  dim: 0.15,
}

const RADIUS = 8

// Section cluster anchors — compact layout centred in the graph area
// (the container already sits right of the left panel).
const ANCHORS: Record<RawNode['section'], { x: number; y: number }> = {
  'ai-analytics': { x: 0.32, y: 0.3 },
  evaluation: { x: 0.5, y: 0.42 },
  builds: { x: 0.2, y: 0.62 },
  writing: { x: 0.4, y: 0.72 },
}

const TYPE_RANK: Record<string, number> = { weak: 1, thematic: 2, explicit: 3 }

const tags = ref<Tag[]>([])
const activeTag = ref<string | null>(null)
const helpOpen = ref(true)

const router = useRouter()

let cleanup: (() => void) | null = null
let applyFilterRef: (() => void) | null = null
let remeasureHelpRef: (() => void) | null = null

function toggleTag(id: string) {
  activeTag.value = activeTag.value === id ? null : id
  applyFilterRef?.()
}

function toggleHelp() {
  helpOpen.value = !helpOpen.value
  // Panel height changed; re-measure its box after Vue paints.
  requestAnimationFrame(() => remeasureHelpRef?.())
}

function statusLabel(status: string) {
  return status.replace(/-/g, ' ')
}

// Read a CSS custom property from :root, falling back to a default.
function cssVar(name: string, fallback: string) {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

onMounted(async () => {
  if (typeof window === 'undefined') return

  // Section colours are the active-nav-link accent per section, read from the
  // site's existing CSS variables rather than hardcoded.
  const SECTION_COLOR: Record<RawNode['section'], string> = {
    'ai-analytics': cssVar('--rs-accent-ai-analytics', '#534AB7'),
    evaluation: cssVar('--rs-accent-evaluation', '#0F6E56'),
    builds: cssVar('--rs-accent-default', '#F5A800'),
    writing: cssVar('--rs-accent-default', '#F5A800'),
  }

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

  // ---- nodes: seed positions clustered by section ----
  const nodes = data.nodes.map((n) => {
    const a = ANCHORS[n.section]
    return {
      ...n,
      tagSet: new Set(n.tags),
      x: a.x * width + (Math.random() - 0.5) * 90,
      y: a.y * height + (Math.random() - 0.5) * 90,
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

  function baseStroke(d: any) {
    return d.type === 'explicit'
      ? COLORS.edgeExplicit
      : d.type === 'thematic'
        ? COLORS.edgeThematic
        : COLORS.edgeWeak
  }

  const linkLayer = svg.append('g').attr('fill', 'none')

  // Wide, transparent hit lines make thin edges easy to hover.
  const linkHit = linkLayer
    .selectAll('line.rs-map-hit')
    .data(links)
    .join('line')
    .attr('class', 'rs-map-hit')
    .attr('stroke', 'transparent')
    .attr('stroke-width', 14)
    .style('cursor', 'default')

  const linkSel = linkLayer
    .selectAll('line.rs-map-edge')
    .data(links)
    .join('line')
    .attr('class', 'rs-map-edge')
    .attr('stroke', baseStroke)
    .attr('stroke-width', (d: any) => (d.type === 'explicit' ? 1.6 : 1.2))
    .attr('stroke-dasharray', (d: any) =>
      d.type === 'thematic' ? '6 5' : d.type === 'weak' ? '2 5' : null,
    )
    .style('pointer-events', 'none')

  const nodeSel = svg
    .append('g')
    .selectAll('g')
    .data(nodes)
    .join('g')
    .attr('class', 'rs-map-node')

  const circleSel = nodeSel
    .append('circle')
    .attr('r', RADIUS)
    .attr('fill', (d: any) => SECTION_COLOR[d.section])
    .attr('fill-opacity', 1)
    .attr('stroke', (d: any) => SECTION_COLOR[d.section])
    .attr('stroke-width', 1.5)
    .style('cursor', 'pointer')

  nodeSel
    .append('text')
    .text((d: any) => d.title)
    .attr('text-anchor', 'middle')
    .attr('y', RADIUS + 15)
    .attr('fill', COLORS.text)
    .style('font-family', 'var(--vp-font-family-base)')
    .style('font-size', '13px')
    .style('user-select', 'text')
    .style('cursor', 'text')

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
      .style('transform', 'none')
      .style('left', `${event.clientX - rect.left + 14}px`)
      .style('top', `${event.clientY - rect.top + 14}px`)
  }

  function placeTooltip(x: number, y: number) {
    tooltip
      .style('left', `${x}px`)
      .style('top', `${y}px`)
      .style('transform', 'translate(-50%, -130%)')
  }

  // ---- neighbours for hover highlight ----
  function linkSource(l: any) {
    return l.source.id ?? l.source
  }
  function linkTarget(l: any) {
    return l.target.id ?? l.target
  }

  const neighbours = new Map<string, Set<string>>()
  nodes.forEach((n) => neighbours.set(n.id, new Set([n.id])))
  links.forEach((l: any) => {
    neighbours.get(linkSource(l))!.add(linkTarget(l))
    neighbours.get(linkTarget(l))!.add(linkSource(l))
  })

  // ---- tag filter ----
  function applyFilter() {
    const tag = activeTag.value
    if (!tag) {
      nodeSel.style('opacity', 1)
      linkSel.style('opacity', 1)
      return
    }
    nodeSel.style('opacity', (d: any) => (d.tagSet.has(tag) ? 1 : COLORS.dim))
    linkSel.style('opacity', (l: any) => {
      const s = nodeById.get(linkSource(l))!
      const t = nodeById.get(linkTarget(l))!
      return s.tagSet.has(tag) && t.tagSet.has(tag) ? 1 : COLORS.dim
    })
  }
  applyFilterRef = applyFilter

  // ---- hover highlight ----
  function highlightNode(d: any) {
    const related = neighbours.get(d.id)!
    nodeSel.style('opacity', (o: any) => (related.has(o.id) ? 1 : COLORS.dim))
    circleSel
      .attr('fill-opacity', (o: any) => (o.id === d.id ? 0.2 : 1))
      .attr('stroke-width', (o: any) => (o.id === d.id ? 2.5 : 1.5))
    linkSel
      .style('opacity', (l: any) =>
        linkSource(l) === d.id || linkTarget(l) === d.id ? 1 : COLORS.dim,
      )
      .attr('stroke', (l: any) =>
        linkSource(l) === d.id || linkTarget(l) === d.id
          ? COLORS.edgeBright
          : baseStroke(l),
      )
  }

  function clearHighlight() {
    circleSel.attr('fill-opacity', 1).attr('stroke-width', 1.5)
    linkSel.attr('stroke', baseStroke)
    applyFilter()
  }

  // ---- node interactions ----
  circleSel
    .on('mouseenter', function (event: MouseEvent, d: any) {
      highlightNode(d)
      const tagsStr = d.tags.map((t: string) => tagLabel.get(t) || t).join(' \u00b7 ')
      tooltip
        .html(
          `<div style="font-weight:600;margin-bottom:2px">${d.title}</div>` +
            `<div style="color:rgba(185,120,24,1);text-transform:capitalize">${statusLabel(
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
  linkHit
    .on('mouseenter', function (event: MouseEvent, d: any) {
      const labels = d.shared.map((t: string) => tagLabel.get(t) || t)
      const body = labels.length
        ? `Shared tags: ${labels.join(' \u00b7 ')}`
        : 'No shared tags'
      tooltip.html(`<div>${body}</div>`).style('opacity', 1)
      const mx = (d.source.x + d.target.x) / 2
      const my = (d.source.y + d.target.y) / 2
      placeTooltip(mx, my)
    })
    .on('mouseleave', () => tooltip.style('opacity', 0))

  // ---- simulation ----
  const linkForce = d3
    .forceLink(links)
    .id((d: any) => d.id)
    .distance(120)
    .strength(0.22)

  const simulation = d3
    .forceSimulation(nodes)
    .force('link', linkForce)
    .force('charge', d3.forceManyBody().strength(-360))
    .force('collide', d3.forceCollide(RADIUS + 28))
    .force('x', d3.forceX((d: any) => ANCHORS[d.section].x * width).strength(0.08))
    .force('y', d3.forceY((d: any) => ANCHORS[d.section].y * height).strength(0.08))
    .stop()

  // Keep nodes inside the graph and clear of the floating "How to explore"
  // panel, whose rectangle we measure relative to the container.
  const PAD = RADIUS + 6
  let helpBox: { x0: number; y0: number } | null = null
  function measureHelpBox() {
    const help = container!.parentElement?.querySelector<HTMLElement>('.rs-map__help')
    if (!help || help.offsetParent === null) {
      helpBox = null
      return
    }
    const cRect = container!.getBoundingClientRect()
    const hRect = help.getBoundingClientRect()
    helpBox = {
      x0: hRect.left - cRect.left - PAD,
      y0: hRect.bottom - cRect.top + PAD,
    }
  }
  measureHelpBox()
  remeasureHelpRef = () => {
    measureHelpBox()
    if (!dragging) simulation.alpha(0.15).restart()
  }

  function clampNodes() {
    for (const d of nodes as any[]) {
      d.x = Math.max(PAD, Math.min(width - PAD, d.x))
      d.y = Math.max(PAD, Math.min(height - PAD, d.y))
      // Push out of the top-right help panel box.
      if (helpBox && d.x > helpBox.x0 && d.y < helpBox.y0) {
        if (helpBox.x0 - d.x > d.y - helpBox.y0) d.y = helpBox.y0
        else d.x = helpBox.x0
      }
    }
  }

  // Settle before first paint so nodes never overlap on initial render.
  for (let i = 0; i < 300; i++) {
    simulation.tick()
    clampNodes()
  }

  function ticked() {
    clampNodes()
    linkSel
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)
    linkHit
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)
    nodeSel.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
  }

  simulation.on('tick', ticked)
  ticked()

  // Gentle continued settle animated from the seeded layout.
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
      // its cluster anchor with the default alpha-decay bounce.
      linkForce.strength(0.22)
      d.fx = null
      d.fy = null
    })
  circleSel.call(drag)

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
    measureHelpBox()
    if (!dragging) simulation.alpha(0.1).restart()
  }
  window.addEventListener('resize', onResize)

  cleanup = () => {
    window.removeEventListener('resize', onResize)
    remeasureHelpRef = null
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
      <aside class="rs-map__panel">
        <div class="rs-map__title">A network of ideas and projects</div>
        <hr class="rs-map__rule" />
        <p class="rs-map__intro">
          Nodes are this website's pages, edges are the links; explicit
          references or thematic connections. Click a tag to pick up a thread.
        </p>

        <div class="rs-map__sections">
          <span class="rs-map__sec">
            <span
              class="rs-map__dot"
              :style="{ background: 'var(--rs-accent-ai-analytics)' }"
            ></span>
            AI analytics
          </span>
          <span class="rs-map__sec">
            <span
              class="rs-map__dot"
              :style="{ background: 'var(--rs-accent-evaluation)' }"
            ></span>
            Evaluation
          </span>
        </div>

        <div class="rs-map__edges">
          <span><span class="rs-map__glyph rs-map__glyph--solid"></span>Explicit</span>
          <span><span class="rs-map__glyph rs-map__glyph--dashed"></span>Thematic</span>
          <span><span class="rs-map__glyph rs-map__glyph--dotted"></span>Loose</span>
        </div>

        <div class="rs-map__tags">
          <button
            v-for="tag in tags"
            :key="tag.id"
            type="button"
            class="rs-map__tag"
            :class="{ 'rs-map__tag--hollow': activeTag !== null && activeTag !== tag.id }"
            @click="toggleTag(tag.id)"
          >
            {{ tag.label }}
          </button>
        </div>
      </aside>

      <div class="rs-map__help" :class="{ 'rs-map__help--collapsed': !helpOpen }">
        <button class="rs-map__help-toggle" type="button" @click="toggleHelp">
          How to explore
          <span aria-hidden="true">{{ helpOpen ? '−' : '+' }}</span>
        </button>
        <ul v-show="helpOpen">
          <li><span class="rs-map__help-glyph">○</span> Hover a node to see related pages and link tags.</li>
          <li><span class="rs-map__help-glyph">↗</span> Click a node to open its page.</li>
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

/* Graph fills the space to the right of the left panel. */
#site-map-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 244px;
  overflow: hidden;
}

.rs-map__panel {
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

.rs-map__title {
  font-family: 'Young Serif', Georgia, serif;
  font-size: 20px;
  line-height: 1.3;
}

.rs-map__rule {
  border: none;
  border-top: 1px solid rgba(185, 120, 24, 0.5);
  margin: 12px 0;
}

.rs-map__intro {
  margin: 0 0 16px;
  color: rgba(232, 224, 208, 0.85);
}

.rs-map__sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 12px;
  margin: 0 0 16px;
  color: rgba(232, 224, 208, 0.9);
}

.rs-map__sec {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.rs-map__dot {
  width: 12px;
  height: 12px;
  flex: 0 0 12px;
  border-radius: 50%;
}

.rs-map__edges {
  margin: 0 0 18px;
  display: flex;
  flex-wrap: nowrap;
  gap: 0 10px;
  color: rgba(232, 224, 208, 0.85);
  white-space: nowrap;
}

.rs-map__edges > span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
}

.rs-map__glyph {
  width: 16px;
  flex: 0 0 16px;
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

.rs-map__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  pointer-events: auto;
}

.rs-map__tag {
  background: rgba(185, 120, 24, 0.15);
  border: 1px solid rgba(185, 120, 24, 0.55);
  border-radius: 999px;
  color: var(--map-text);
  font-family: var(--vp-font-family-base);
  font-size: 12px;
  line-height: 1.3;
  padding: 4px 11px;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.rs-map__tag--hollow {
  background: transparent;
  border-color: rgba(232, 224, 208, 0.25);
  color: rgba(232, 224, 208, 0.45);
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

@media (max-width: 720px) {
  .rs-map__stage {
    height: auto;
  }
  .rs-map__panel {
    position: static;
    width: auto;
    padding: 16px 24px 0;
  }
  .rs-map__help {
    display: none;
  }
  #site-map-container {
    position: relative;
    left: 0;
    height: 65vh;
  }
}
</style>
