---
title: Biblioscope
---

# Biblioscope <StatusBadge status="operational" />

Biblioscope is a monitoring tool for identifying emerging methodologies that may need to be better represented in Dimensions. Rather than producing a weekly list of new papers, it tracks how new work appears against a fixed map of a field, so methodological change can be seen in relation to existing clusters, edges, and bridges.

The workflow has two linked stages: first, a corpus builder defines and freezes the field; then a weekly monitoring pipeline assigns new publications against that frozen structure. The baseline starts from a Dimensions SQL query, writes a versioned corpus to BigQuery, materialises it locally in Parquet, embeds papers with SPECTER2, and clusters them semantically while keeping topical similarity separate from bibliographic coupling.

Once the field structure is fixed, the weekly pipeline extracts new papers, embeds them with the same configuration, assigns them to existing clusters, and computes novelty and bridge signals. The aim is to detect papers that introduce methods, combine areas, or sit at cluster edges in ways that suggest the field’s analytical vocabulary may be changing.

The weekly brief is deterministic and rule-based. It reports which clusters are receiving significant new work, where edges appear to be moving, and which publications may matter for methodology tracking, without using LLM calls in the monitoring path. This keeps the brief traceable to the map, assignments, and signals rather than to a model’s judgement of what sounds important.

Biblioscope is in active use: weekly monitoring has been running since early 2026, and five weekly briefs have been calibrated and accepted for operational use. Current development is shifting the monitoring lens from generic novelty toward capability intelligence: what capacity appears to be forming, where, around which clusters, and with what methodological implications for Dimensions.
