<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const open = ref(false)
const src = ref('')
const alt = ref('')

function show(img: HTMLImageElement) {
  src.value = img.currentSrc || img.src
  alt.value = img.alt
  open.value = true
  document.body.style.overflow = 'hidden'
}

function close() {
  open.value = false
  document.body.style.overflow = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) close()
}

function onDocClick(e: MouseEvent) {
  const target = e.target
  if (!(target instanceof HTMLImageElement)) return
  if (!target.closest('.VPDoc.has-diagram-aside .diagram')) return
  e.preventDefault()
  show(target)
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="diagram-lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="alt || 'Diagram enlarged'"
      @click="close"
    >
      <button type="button" class="diagram-lightbox-close" aria-label="Close" @click="close">
        ×
      </button>
      <img class="diagram-lightbox-img" :src="src" :alt="alt" @click.stop />
    </div>
  </Teleport>
</template>
