<script setup lang="ts">
import { sections } from '../data/sections'

const props = defineProps<{
  section: string
}>()

const data = sections[props.section]
</script>

<template>
  <div v-if="data" class="section-landing">
    <div v-if="data.intro" class="section-intro" v-html="data.intro" />
    <div class="card-grid" :class="`card-grid--${section}`">
      <a
        v-for="card in data.cards"
        :key="card.link"
        :href="card.link"
        class="card"
      >
        <p v-if="card.group" class="card-group">{{ card.group }}</p>
        <h2 class="card-title">
          {{ card.title }}
          <span v-if="card.status" class="status-badge">{{ card.status }}</span>
        </h2>
        <p class="card-description">{{ card.description }}</p>
      </a>
    </div>
  </div>
</template>

<style>
.section-landing a.card {
  display: block;
  padding: 1.25rem;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-top-width: 3px;
  border-top-color: var(--section-card-accent, #f5a800);
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.section-landing a.card:hover {
  background-color: var(--vp-c-bg-mute);
  border-color: color-mix(in srgb, var(--section-card-accent, #f5a800) 50%, transparent);
  border-top-color: var(--section-card-accent, #f5a800);
  text-decoration: none;
  color: inherit;
}

.card-grid--ai-analytics {
  --section-card-accent: var(--rs-accent-ai-analytics);
}

.card-grid--evaluation {
  --section-card-accent: var(--rs-accent-evaluation);
}

.card-grid--about,
.card-grid--writing,
.card-grid--builds {
  --section-card-accent: var(--rs-accent-default);
}

.dark .section-landing a.card {
  background-color: rgba(255, 255, 255, 0.025);
}

.dark .section-landing a.card:hover {
  background-color: rgba(255, 255, 255, 0.07);
  border-color: color-mix(in srgb, var(--section-card-accent, #f5a800) 50%, transparent);
  border-top-color: var(--section-card-accent, #f5a800);
}

.section-landing a.card .card-group {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin: 0 0 0.35rem;
  line-height: 1.3;
}

.section-landing a.card .card-title {
  font-family: 'Young Serif', Georgia, serif;
  font-weight: 400;
  text-decoration: none;
}

.section-landing a.card .card-description {
  text-decoration: none;
}
</style>
