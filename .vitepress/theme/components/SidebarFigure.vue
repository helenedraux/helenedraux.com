<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, useRoute } from 'vitepress'
import SiteIllustration from './SiteIllustration.vue'

const route = useRoute()
const { frontmatter } = useData()
const figure = ref<'standing_face' | 'standing_left'>('standing_face')

const isArticlePage = computed(() => route.path.split('/').filter(Boolean).length >= 2)
const showSidebarFigure = computed(
  () => isArticlePage.value && frontmatter.value.sidebarFigure !== false,
)

onMounted(() => {
  figure.value = Math.random() < 0.5 ? 'standing_face' : 'standing_left'
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
