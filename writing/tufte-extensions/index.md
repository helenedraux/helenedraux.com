---
title: Tufte’s extensions
---

# Tufte’s extensions


Tufte’s principles shaped how I learned to look at charts: every encoding should do analytical work, axes should not be cut to manufacture drama, double axes should be treated with suspicion, and decoration should not pretend to be information. I do not apply those rules because they are elegant, although they are; I apply them because once a chart becomes the thing someone reads instead of the data, the chart has started making analytical decisions on the reader’s behalf.

That training has stayed with me from geomatics into research analytics. Cartography teaches the same lesson in a different form: label placement, colour, classification, and scale all change what the reader thinks they have seen. A bad map can lie very politely. So can a chart.

The small multiples extension came from a fairly simple reading problem. Tufte’s small multiples give each series its own panel, which makes comparison easier because the structure stays constant and only the data changes. I usually want one more thing: context inside each panel. If I show one institution, country, field, or funder at a time, I also want the reader to see whether its trajectory is typical or unusual. That can mean showing the average, or showing all other values in the background, so the highlighted series remains readable without being cut loose from the distribution it belongs to.

The bumped stacked bar came from a different problem: composition over time when both part-to-whole structure and rank movement matter. A stacked bar chart shows absolute totals and composition, but it hides the trajectory of every series except the one on the baseline. The other segments float, so their movement is difficult to read. A bump chart shows rank movement clearly, but it discards absolute values. I wanted both: how much there was, how the parts composed the total, and which series were moving up or down relative to the others.

The bumped stacked bar keeps the stacked bar structure but changes the order of the segments at each time point. Instead of fixing the stack order across the full series, it ranks the segments by value within each period and stacks them accordingly. A category rising through the stack is therefore visibly rising in rank, while the bar still preserves the total and the part-to-whole relationship. The stacking order carries meaning rather than acting as a fixed layout convention.

<ClientOnly>
  <BumpedStackedBar />
</ClientOnly>

This is not a general replacement for stacked bars. If the question is mainly composition, a standard stacked bar may be enough. If the question is mainly rank, a bump chart may be cleaner. I use the bumped version when the analytical problem sits between the two, and when separating the views would make the reader do the integration manually.

The bumped stacked bar appeared in public reports, but I have not seen it implemented in Datawrapper or other common chart tools. This page is its first standalone documentation.
