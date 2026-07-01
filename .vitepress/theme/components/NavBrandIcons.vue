<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import SiteIllustration from './SiteIllustration.vue'

const route = useRoute()
const showIcon = computed(() => !route.path.startsWith('/cv'))
</script>

<template>
  <span v-if="showIcon" class="nav-brand-icons">
    <SiteIllustration
      name="icon"
      alt="Hélène and a small robot"
      size="nav"
    />
  </span>
</template>
