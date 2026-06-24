---
title: Biblioscope
---

# Biblioscope


I built Biblioscope to understand how we could improve the data in Dimensions. The question was not simply what had been published recently, but which new methodologies were emerging that might need to be represented better in the database. A weekly list of papers can tell me what is new. It does not tell me whether a method is becoming important enough to affect how the data itself should be structured, enriched, or interpreted.

Biblioscope has two parts that have to work in order. The first defines the field and freezes it. The second monitors new work against that frozen structure. That distinction matters because “new methodology” only becomes visible when I can see where it appears: inside an established cluster, at the edge of one, or between areas that do not usually touch.

The Corpus Builder starts with a Dimensions SQL query, writes a versioned corpus to BigQuery, and materialises it locally in Parquet so I can iterate without making the database do every small piece of work. From there, I embed the papers using SPECTER2 and cluster them semantically. I keep topical similarity and bibliographic coupling separate: the first tells me what the papers are about, the second tells me how their reference structures relate. I want both, but I do not want one quietly contaminating the other.

The result is a frozen field structure: a set of named clusters with stable identities. Once that exists, the weekly pipeline can do something more useful than collect recent publications. It extracts new papers, embeds them with the same configuration as the baseline, assigns them to the existing clusters, and computes novelty and bridge signals. I am looking for papers that introduce methods, combine areas, or sit at the edges of clusters in ways that suggest the field’s analytical vocabulary may be changing.

The weekly brief is deterministic. It reports which clusters are receiving significant new work, where the edges are moving, and which publications may matter for methodology tracking. I do not use LLM calls in the monitoring path; the editorial layer is rule-based throughout. I want the brief to be traceable to the map, the assignments, and the signals, not to a model’s sense of what sounds like an important development this week.

The tool is in active use. Weekly monitoring has been running since early 2026, and five weekly briefs have been calibrated and accepted for operational use. The current development work is moving the monitoring lens away from generic novelty signals and toward capability-intelligence lenses: less “what is new?” and more “what capacity appears to be forming, where, around which clusters, and with which methodological implications for Dimensions?”
