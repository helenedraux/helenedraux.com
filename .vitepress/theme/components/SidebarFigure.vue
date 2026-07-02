<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, useRoute } from 'vitepress'
import SiteIllustration from './SiteIllustration.vue'

const figures = ['standing_face', 'standing_left', 'standing_hand_pocket'] as const
type FigureName = (typeof figures)[number]

const customAlts: Record<string, string> = {
  tufte: 'Hélène sketching a small-multiples chart',
  interview: 'Hélène being interviewed at her desk',
}

const route = useRoute()
const { frontmatter } = useData()
const sessionKey = ref('')

const customIllustration = computed(() => frontmatter.value.sidebarIllustration as string | undefined)

const isArticlePage = computed(() => route.path.split('/').filter(Boolean).length >= 2)
const showSidebarFigure = computed(
  () => isArticlePage.value && frontmatter.value.sidebarFigure !== false,
)

onMounted(() => {
  sessionKey.value =
    sessionStorage.getItem('illustrationSeed') || Math.random().toString(36).slice(2)
  sessionStorage.setItem('illustrationSeed', sessionKey.value)
})

const figure = computed((): FigureName => {
  if (!sessionKey.value) return 'standing_face'

  const path = route.path
  const hash = [...(path + sessionKey.value)].reduce(
    (acc, c) => (acc * 31 + c.charCodeAt(0)) & 0xffffffff,
    0,
  )
  return figures[Math.abs(hash) % figures.length]
})

const customAlt = computed(
  () => customAlts[customIllustration.value ?? ''] ?? customIllustration.value ?? '',
)
</script>

<template>
  <template v-if="showSidebarFigure">
    <SiteIllustration
      v-if="customIllustration"
      :name="customIllustration"
      :alt="customAlt"
      size="sidebar"
      class="site-illustration--sidebar-scene"
    />
    <SiteIllustration
      v-else
      :name="figure"
      alt="Hélène"
      size="sidebar"
      :mirrored="figure === 'standing_left'"
    />
  </template>
</template>
