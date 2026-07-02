<script setup lang="ts">
defineProps<{
  name: string
  alt: string
  size?: 'hero' | 'section' | 'article' | 'sidebar'
  mirrored?: boolean
}>()
</script>

<template>
  <img
    :src="`/illustrations/${name}.svg`"
    :alt="alt"
    class="site-illustration"
    :class="[
      size ? `site-illustration--${size}` : 'site-illustration--section',
      { 'site-illustration--mirrored': mirrored },
    ]"
  />
</template>

<style scoped>
.site-illustration--hero {
  max-width: 420px;
  width: 100%;
  height: auto;
}

.site-illustration--section {
  max-width: 350px;
  width: 100%;
  height: 350px;
}

.site-illustration--article {
  max-width: 260px;
  width: 100%;
  height: auto;
}

.site-illustration--mirrored {
  transform: scaleX(-1);
}

@media (max-width: 640px) {
  .site-illustration--hero {
    display: none;
  }

  .site-illustration--section {
    max-width: 180px;
    height: auto;
  }

  .site-illustration--article {
    max-width: 180px;
  }
}
</style>
