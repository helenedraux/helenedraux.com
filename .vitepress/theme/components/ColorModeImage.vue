<script setup lang="ts">
import { useData } from 'vitepress'

const { isDark } = useData()

defineProps<{
  light: string
  dark: string
  alt: string
}>()
</script>

<template>
  <img :src="isDark ? dark : light" :alt="alt" />
</template>
