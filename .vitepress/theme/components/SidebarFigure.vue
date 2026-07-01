<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, useRoute } from 'vitepress'
import SiteIllustration from './SiteIllustration.vue'

const figures = ['standing_face', 'standing_left', 'standing_hand_pocket'] as const
type FigureName = (typeof figures)[number]

const route = useRoute()
const { frontmatter } = useData()
const sessionKey = ref('')

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
</script>

<template>
  <SiteIllustration
    v-if="showSidebarFigure"
    :name="figure"
    alt="Hélène"
    size="sidebar"
    :mirrored="figure === 'standing_left'"
  />
</template>
