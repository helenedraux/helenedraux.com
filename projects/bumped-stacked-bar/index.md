---
title: Extending Tufte — the bumped stacked bar chart
---

# Extending Tufte: the bumped stacked bar chart

Edward Tufte's visual library treats the stacked bar chart as a legitimate form for showing part-to-whole relationships over a small number of categories. It works when the reader's question is compositional: what share does each segment occupy, and how does that share change across a few time points? The form fails when the reader's question is trajectorial: how did each individual series move over time?

This is a structural limitation, not a rendering flaw. In a conventional stacked bar chart, only the bottom series has a stable baseline. Every series above it inherits the cumulative height of those beneath it. A segment that grows in absolute terms can appear to shrink if the series below it grows faster. A segment that declines can appear flat if compensating growth below masks the change. The visual encodes composition faithfully and trajectory poorly.

The bumped stacked bar chart addresses this by applying a bump-chart offset to each series after stacking. Segments retain their proportional contribution to the whole — the stack still sums to the total at each time point — but each series is displaced vertically so that its own baseline is visible across the full sequence. The reader can read composition and trajectory in the same view without switching chart types.

The construction is straightforward in principle. At each time point, compute the stacked positions as usual. Then, for each series, calculate the vertical offset required to align its bottom edge with a common reference — typically zero or the previous period's position for that series alone. Apply the offset. The result is a chart that looks like a stacked bar sequence from a distance but behaves like a set of aligned time series when read series by series.

This is not a novel statistical transformation. It is a visual one. The data are unchanged; only the encoding changes. That distinction matters for interpretation. A bumped stacked bar chart does not resolve the tension between part-to-whole and individual-trajectory reading — it makes both readings available in a single form, at the cost of some visual complexity.

Tufte's own guidance on small multiples and layered information applies here: the chart earns its complexity only when both compositional and trajectorial questions are genuinely in play. Where the question is purely compositional, a standard stacked bar remains clearer. Where the question is purely trajectorial, a line chart or small multiples set is more direct. The bumped stacked bar chart occupies the middle ground — the case where the reader needs to hold both questions simultaneously.

The form extends Tufte's vocabulary rather than replacing any element of it. It preserves the stacked bar's strength in showing how parts compose a whole while borrowing from bump charts the ability to trace individual series across time. Whether it belongs in a given analytical context depends on whether that dual reading is worth the added visual density.

---

*Polished analytical essay.*
