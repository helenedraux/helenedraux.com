<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DiagramAside from './components/DiagramAside.vue'
import DiagramLightbox from './components/DiagramLightbox.vue'
import NavBrandIcons from './components/NavBrandIcons.vue'
import SidebarFigure from './components/SidebarFigure.vue'
import { sectionAccentForPath, sectionSlugFromPath } from './data/sectionAccents'

const { Layout } = DefaultTheme
const route = useRoute()

watchEffect(() => {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  const slug = sectionSlugFromPath(route.path)
  const accent = sectionAccentForPath(route.path)

  root.classList.forEach((className) => {
    if (className.startsWith('rs-section-')) root.classList.remove(className)
  })

  if (slug && accent) {
    root.classList.add(`rs-section-${slug}`)
    root.style.setProperty('--rs-section-accent', accent)
  } else {
    root.style.removeProperty('--rs-section-accent')
  }
})
</script>

<template>
  <Layout>
    <template #nav-bar-title-before>
      <NavBrandIcons />
    </template>
    <template #sidebar-nav-after>
      <SidebarFigure />
    </template>
  </Layout>
  <DiagramAside />
  <DiagramLightbox />
</template>
