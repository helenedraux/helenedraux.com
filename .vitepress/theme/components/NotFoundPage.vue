<script setup lang="ts">
import SiteIllustration from './SiteIllustration.vue'
</script>

<template>
  <div class="not-found">
    <SiteIllustration name="404" alt="Hélène and a small robot, both looking lost" size="hero" />
    <h1>Nothing here.</h1>
    <p><a href="/">Back to the homepage</a></p>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  gap: 1.5rem;
}

.not-found h1 {
  font-size: 2rem;
}
</style>
