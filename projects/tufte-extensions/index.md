---
title: Tufte extensions
---

# Tufte's extensions

Tufte's principles are the foundation. Every encoding must carry meaning: colour changed year by year for decoration is noise, not information. Axes must not be cut. Double axes create false relationships between unrelated scales. Small multiples — the same chart repeated across conditions — let the reader compare without cognitive load, because the structure stays constant and only the data changes.

These are constraints, not suggestions. Working within them consistently changes how you see charts that violate them.

## Small multiples with context

Tufte's small multiples show each series in its own panel. The extension I apply is to always include context within each panel: the average, or all other values greyed out, so the reader can locate any single series within the whole without losing sight of it. Without context, a small multiple tells you the shape of one series; with it, it tells you whether that shape is typical or anomalous. Datawrapper implements this well, and it is now my default for any small multiple.

## Bumped stacked bar chart

The standard vocabulary for composition over time offers two options, both involving a trade-off. The stacked bar chart shows part-to-whole relationships and absolute totals, but hides the trajectory of every series except the one sitting on the baseline: the others float, and their movement is invisible. The bump chart shows rank trajectories clearly, but discards absolute values entirely. If both matter — if you need to know what is bigger and how things are moving relative to each other — neither chart type solves the problem.

Andrew Abela's chart chooser makes this gap explicit: the composition-over-time branch leads to stacked bars or stacked area charts, and rank change over time simply does not appear as a destination. The two analytical needs are treated as separate questions requiring separate charts.

The bumped stacked bar addresses this. At each time period, bars are ranked by value and re-ordered accordingly, so the position of each series reflects its rank at that point rather than a fixed stacking order. The result preserves the part-to-whole and absolute-value encoding of the stacked bar while making rank changes readable across time: a series rising through the stack is visibly rising, not hidden behind a floating segment with no stable baseline to read against. The stacking order carries meaning, which is the point.

The bumped stacked bar appeared in public reports but has not been implemented in Datawrapper or other common chart tools. This page is its first standalone documentation.

*First documentation of the bumped stacked bar chart type. No canonical implementation currently exists in standard chart libraries.*
