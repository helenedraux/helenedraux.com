---
title: Tufte’s extensions
---

# Tufte’s extensions

I discovered Tufte's principles during my PhD, and it has shaped how I build my charts: every encoding should do analytical work, axes should not be cut to manufacture drama, double axes should be avoided, and decoration should not pretend to be information. The chart itself should tell the story, rather than the reader guessing it. Cartography had taught me the same lesson in a different form: label placement, colour, classification, and scale all change what the reader thinks they have seen. Maps and charts can lie, and I'm here to make sure the data is represented fairly and clearly.

## Small multiples

One of my favourite tool from the Tufte's toolbox is the small multiples: instead of a spaghetti graph with multiple lines that overlap so much that it is impossible to easily read who is who, I use one chart per variable, organised on a grid. Because I prefer keeping the same values for the y axes and that it is hard to compare two charts next to each other, my personal extension is to add context. Either by using the other values greyed out (like in datawrapper.de), or when using the plotly library, add an average for instance.

## Bumped stack bar

The bumped / ranked stacked bar came from a different problem: I liked a lot the bumped chart that can be created in rawgraphs.io, but it was not easy to read. Therefore I took the concept: ranking the values each year, and ordering by largest to smallest, from top to bottom. I don't think they existe out of the box in any visualisation library or tool that I've used, but here is an illustration of charts I used to produce: the top value for Open Access in 2021 would be hard to read in the chart below if it weren't for the ordering change. I could have used a line chart, but there is always the risk of writing a spaghetti chart and this tells the story much faster.

<ClientOnly>
  <BumpedStackedBar />
</ClientOnly>

