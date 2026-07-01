---
title: Tufte’s extensions
sidebarFigure: false
---

# Tufte’s extensions

<div class="rs-page-hero-layout">
  <div class="rs-page-hero-text">
    <p>I discovered Tufte's principles during my PhD, and it has shaped how I build my charts: every encoding should do analytical work, axes should not be cut to manufacture drama, double axes should be avoided, and decoration should not pretend to be information. The chart itself should tell the story, rather than the reader guessing it. Cartography taught me the same lesson in a different form: label placement, colour choice, classification, and scale all change what the reader thinks the data shows.</p>
  </div>
  <div class="rs-page-hero-illustration">
    <SiteIllustration name="tufte" alt="Hélène sketching a small-multiples chart" size="section" />
  </div>
</div>

## Small multiples

One of my favourite tools from Tufte's toolkit is the small multiples: instead of a spaghetti graph with multiple lines that overlap so much that it is impossible to easily read who is who, I use one chart per variable, organised on a grid. Because I prefer keeping the same values for the y axes and that it is hard to compare two charts next to each other, my personal extension is to add context. Either by using the other values greyed out (like in datawrapper.de), or when using the plotly library, add an average for instance.

## Bumped stack bar

The bumped / ranked stacked bar came from a different problem: I liked a lot the bumped chart that can be created in rawgraphs.io, but it was not easy to read. Therefore I took the concept: ranking the values each year, and ordering by largest to smallest, from top to bottom. I don't think they exist out of the box in any visualisation library I've used: not in Plotly nor in Matplotlib, but here is an illustration of charts I used to produce: the top value for Open Access in 2021 would be hard to read in the chart below if it weren't for the ordering change. I could have used a line chart, but there is always the risk of writing a spaghetti chart and this tells the story much faster.

<ClientOnly>
  <BumpedStackedBar />
</ClientOnly>

