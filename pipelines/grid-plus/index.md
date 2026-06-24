---
title: GRID+
type: framework
---

# GRID+


I built GRID+ because the organisation type field I had available was not giving me the distinctions I needed for research analysis. GRID and ROR identify research organisations and assign a type, but a single flat category does not tell me enough about how an organisation works. A government research institute, a public hospital, a ministry, a university, a private company, and an international organisation can all appear in research data, but the questions I wanted to ask were not only “what kind of organisation is this?” They were about legal form, funding, governance, territory served, and role in the research system.

When the analysis moves from counting organisations to interpreting research systems, a single type field starts doing too much work. To understand where AI research happens, who controls the organisations involved, how funding ecosystems differ across countries, or whether a national system relies mainly on ministries, agencies, universities, philanthropic bodies, or institutional funding, I need more than one label. I need a classification that can keep legal form, funding, governance, territory, and role separate long enough for the relationships between them to become visible.

GRID+ classifies organisations across five dimensions: legal structure, funding source, governance, territory served, and primary role. I kept the dimensions separate because I did not want one answer to determine the others. An organisation’s legal structure does not automatically tell me its funding source; its funding source does not automatically tell me who governs it; its primary role in the research system may not align neatly with either. The useful information sits in the combination.

The first implementation was a funder classifier built over 7,500 organisations extracted from publication acknowledgements. I used the five facets to map national research funding ecosystems into six patterns: direct state, agency-mediated, institutional, hybrid, philanthropy-visible, and low differentiation. That was the point at which the framework became analytically useful to me: not as a cleaner label for each organisation, but as a way to describe how funding systems are structured.

The classification process uses evidence retrieval rather than model memory. Wikipedia, Wikidata, and official public sources provide the main inputs, with provenance recorded for each facet value. I do not want a model to classify an organisation because it has a vague internal association with a name; I want it to classify from evidence I can inspect. The automation is layered: deterministic rules handle high-confidence cases such as ministries, universities, and international bodies; small local models handle semantic verification and targeted repair; frontier models are reserved for the cases that remain unresolved.

I also used GRID hierarchy as part of the structure. Parent-child relationships help with control jurisdiction, inheritance rules, and cases where a local organisation belongs to a larger body. In practice, that makes the classification less dependent on what the organisation happens to call itself on one page of its website, which is useful because websites have a talent for making governance sound cleaner than governance is.

The funder classifier has been completed and validated against a stratified sample of 80 organisations. Sixty-nine were correctly classified and eleven remained ambiguous, with most ambiguous cases reflecting genuine dual roles rather than simple classification error. The broader affiliation classifier was interrupted before the full pipeline was wired: scope builder, evidence retrieval, and evidence audit were in place; facet classification had not yet been connected.

I still use GRID+ as a way to think about organisation typing because it stops one label from carrying legal form, governance, funding, geography, and role at once. Those dimensions can then be analysed in relation to each other, rather than compressed before the analysis has even started.
