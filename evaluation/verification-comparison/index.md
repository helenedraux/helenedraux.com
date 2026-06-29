---
title: Verification comparison
---

# A verification comparison

I wrote this methodology when we were being asked to justify the cost of a particular model when we already had access to two others. Output verification by another model is the right thing to do [_Language Models (Mostly) Know What They Know_, Kadavath et al. 2022](https://arxiv.org/abs/2207.05221), but comparisong specific models outside of benchmarks and applied to real world's report is harder to come by. So I built a small verification exercise which doubled as a way to show that an AI output isn't to be trusted on the first turn, however fluent it looks.

I took an AI output (a large document produced over several turns) and asked two other models to review it across several dimensions. Then I asked the original model to compare the two reviews. I ran all these reviews without access to previous context, so no model was reviewing work it remembered producing.

Both reviewers found failures, but one was much better at surfacing real errors mostly because it went to the internet to verify claims, while the other assumed the document was authoritative and could only point to inconsistencies inside the document itself. So I updated the reviewer's prompt to include checking outside the document's own premises, the weaker reviewer improved a great deal, but so did the stronger one. 

Two findings here therefore: some models are better than others at reviewing AI outputs, and the content in the prompt itself can help improving reviews.