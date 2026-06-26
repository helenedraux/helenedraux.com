<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { nextTick, onMounted, onUnmounted, watch } from 'vue'

const ASIDE_DIAGRAM_SELECTOR = '.diagram-aside-target'
const FALLBACK_DIAGRAM_SELECTOR = '.diagram, .bumped-stacked-bar'
const BREAKPOINT = '(min-width: 1100px)'

const { frontmatter } = useData()
const route = useRoute()

let placeholder: Comment | null = null
let panel: HTMLDivElement | null = null
let diagram: Element | null = null
let mediaQuery: MediaQueryList | null = null

function cleanup() {
  if (typeof document === 'undefined') return

  if (diagram && placeholder?.parentNode) {
    placeholder.parentNode.insertBefore(diagram, placeholder.nextSibling)
  }

  placeholder?.remove()
  panel?.remove()

  placeholder = null
  panel = null
  diagram = null

  document.querySelector('.VPDoc')?.classList.remove('has-diagram-aside')
}

function ensurePanel(vpDoc: Element): HTMLDivElement {
  if (panel?.isConnected) return panel

  panel = document.createElement('div')
  panel.className = 'diagram-aside-panel'
  panel.innerHTML = '<div class="diagram-aside-panel-inner"></div>'
  vpDoc.querySelector('.container')?.appendChild(panel)
  return panel
}

function placeDiagram() {
  if (typeof document === 'undefined') return

  const vpDoc = document.querySelector('.VPDoc')
  if (!vpDoc || !frontmatter.value.diagramAside) {
    cleanup()
    return
  }

  const doc = vpDoc.querySelector('.vp-doc')
  const candidate =
    doc?.querySelector(ASIDE_DIAGRAM_SELECTOR)
    ?? doc?.querySelector(FALLBACK_DIAGRAM_SELECTOR)
  if (!candidate) {
    cleanup()
    return
  }

  if (diagram !== candidate) {
    cleanup()
    diagram = candidate
    placeholder = document.createComment('diagram-aside-placeholder')
    diagram.parentNode?.insertBefore(placeholder, diagram)
  }

  vpDoc.classList.add('has-diagram-aside')

  const isWide = window.matchMedia(BREAKPOINT).matches
  const panelEl = ensurePanel(vpDoc)
  const panelInner = panelEl.querySelector('.diagram-aside-panel-inner')

  if (isWide && panelInner) {
    panelInner.appendChild(diagram)
    panelEl.hidden = false
  } else if (placeholder.parentNode) {
    placeholder.parentNode.insertBefore(diagram, placeholder.nextSibling)
    panelEl.hidden = true
  }
}

function onBreakpointChange() {
  if (frontmatter.value.diagramAside) placeDiagram()
}

async function setup() {
  if (typeof document === 'undefined') return
  cleanup()
  await nextTick()
  placeDiagram()
}

watch(
  () => [route.path, frontmatter.value.diagramAside] as const,
  () => {
    if (typeof document !== 'undefined') setup()
  },
)

onMounted(() => {
  if (typeof window === 'undefined') return
  mediaQuery = window.matchMedia(BREAKPOINT)
  mediaQuery.addEventListener('change', onBreakpointChange)
  setup()
})

onUnmounted(() => {
  mediaQuery?.removeEventListener('change', onBreakpointChange)
  cleanup()
})
</script>
