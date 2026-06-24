---
title: Biblioscope
---

# Biblioscope

Most field surveillance starts with the wrong question. The interesting question is not "what is new this week" but "where in this field is something actually shifting" — and that requires a stable map of the field before you can say anything meaningful about movement.

Biblioscope is built around that distinction. It has two parts that have to work in sequence: a Corpus Builder that defines and freezes the field, and a weekly monitoring pipeline that tracks change against that baseline.

The Corpus Builder pulls from Dimensions via a SQL query, writes a versioned corpus to BigQuery, and materialises it locally in Parquet for efficient iteration. From there, papers are embedded using SPECTER2 and clustered semantically — topical similarity first, bibliographic coupling second, kept deliberately separate so that reference structure doesn't contaminate the semantic map. The result is a frozen field structure: a set of named clusters with stable identities that subsequent weeks can be measured against.

The weekly pipeline then extracts new publications, embeds them with the same configuration as the baseline, assigns them to the frozen clusters, and computes novelty and bridge signals — papers that sit at the edges of clusters, or that connect clusters that don't usually connect. The output is a deterministic weekly brief: which clusters are receiving significant new work, where the edges are moving. No LLM calls in the monitoring path; the editorial layer is rule-based throughout.

The tool is in active use. Weekly monitoring has been running since early 2026; five weekly briefs have been calibrated and accepted for operational use. The monitoring lens design — moving from generic novelty signals toward capability-intelligence lenses — is the current direction of development.

*Full implementation not public. Corpus Builder methodology available on request.*
