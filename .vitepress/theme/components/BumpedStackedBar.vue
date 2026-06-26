<script setup lang="ts">
import * as d3 from 'd3'
import { onMounted, onUnmounted, ref } from 'vue'

const chartRef = ref<SVGSVGElement | null>(null)
let themeObserver: MutationObserver | null = null

const years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
const raw: Record<string, number[]> = {
  Closed: [72, 69, 66, 63, 59, 55, 51, 47, 42, 38, 34],
  Bronze: [6, 6, 7, 7, 7, 7, 7, 7, 7, 6, 6],
  Green: [9, 10, 10, 11, 12, 12, 13, 13, 14, 14, 15],
  Diamond: [1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 5],
  Gold: [12, 14, 16, 18, 20, 24, 27, 30, 34, 38, 40],
}
const colors: Record<string, string> = {
  Gold: '#F5A800',
  Green: '#6DB33F',
  Bronze: '#CD7F32',
  Diamond: '#4EC9E1',
  Closed: '#888780',
}
const keys = Object.keys(raw)

const margin = { top: 10, right: 10, bottom: 30, left: 36 }
const W = 660
const H = 280
const w = W - margin.left - margin.right
const h = H - margin.top - margin.bottom

function themeColors() {
  const style = getComputedStyle(document.documentElement)
  const tickColor = style.getPropertyValue('--vp-c-text-2').trim() || '#888780'
  const gridColor = style.getPropertyValue('--vp-c-border').trim() || '#D3D1C7'
  return { tickColor, gridColor }
}

function renderChart() {
  const svgEl = chartRef.value
  if (!svgEl) return

  d3.select(svgEl).selectAll('*').remove()

  const { tickColor, gridColor } = themeColors()

  const svg = d3
    .select(svgEl)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  const x = d3.scaleBand().domain(years.map(String)).range([0, w]).padding(0.15)
  const y = d3.scaleLinear().domain([0, 100]).range([h, 0])

  svg
    .append('g')
    .attr('transform', `translate(0,${h})`)
    .call(d3.axisBottom(x).tickSize(0).tickFormat((d) => String(d)))
    .call((g) => g.select('.domain').remove())
    .call((g) =>
      g
        .selectAll('text')
        .style('fill', tickColor)
        .style('font-size', '11px')
        .attr('dy', '1.2em'),
    )

  svg
    .append('g')
    .call(d3.axisLeft(y).ticks(5).tickSize(-w).tickFormat((d) => `${d}%`))
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick line').style('stroke', gridColor))
    .call((g) =>
      g.selectAll('text').style('fill', tickColor).style('font-size', '11px'),
    )

  years.forEach((yr, yi) => {
    const sorted = keys.slice().sort((a, b) => raw[a][yi] - raw[b][yi])
    let cum = 0
    sorted.forEach((k) => {
      const val = raw[k][yi]
      svg
        .append('rect')
        .attr('x', x(String(yr)))
        .attr('y', y(cum + val))
        .attr('width', x.bandwidth())
        .attr('height', y(cum) - y(cum + val))
        .attr('fill', colors[k])
      cum += val
    })
  })
}

onMounted(() => {
  renderChart()
  themeObserver = new MutationObserver(() => renderChart())
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

onUnmounted(() => {
  themeObserver?.disconnect()
})
</script>

<template>
  <div class="bumped-stacked-bar">
    <h2 class="sr-only">
      Bumped stacked bar chart of open access types 2012–2022. Series sorted by size per
      year — closed falls, gold rises.
    </h2>
    <div class="bumped-stacked-bar-legend">
      <span v-for="(color, label) in colors" :key="label" class="legend-item">
        <span class="legend-swatch" :style="{ background: color }" />
        {{ label }}
      </span>
    </div>
    <svg ref="chartRef" width="100%" :viewBox="`0 0 ${W} ${H}`" role="img" aria-hidden="true" />
  </div>
</template>

<style scoped>
.bumped-stacked-bar {
  padding-top: 1rem;
  margin: 1.5rem 0;
}

.bumped-stacked-bar-legend {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.legend-swatch {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
