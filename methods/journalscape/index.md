---
title: Journalscape
---

# Journalscape

A persistent question in research database evaluation is geographic representativeness: does a given corpus reflect the global distribution of research production, or does it over-index on particular regions? The standard proxies — publisher location, language — are crude. Journalscape takes a different approach: it reads the geographic signals encoded in journal titles themselves.

The premise is that journal titles carry geographic meaning, but not all geographic meaning is the same. "American Journal of Chinese Medicine" contains two geographic terms with distinct roles: "American" signals publishing identity; "Chinese" signals disciplinary tradition or topical scope. Naive extraction — find the geography, record it, count it — collapses that distinction and produces a misleading picture. A corpus that appears globally diverse on a term-frequency count may in fact be dominated by high-income-country journals that study low-income-country subjects: diversity of gaze, not diversity of voice.

Journalscape classifies the semantic role of each geographic term rather than simply detecting its presence. The classification distinguishes publishing identity, topical scope, disciplinary tradition, and scope markers such as "global" or "international" — which carry their own ambiguities, since "international" can indicate audience, aspiration, or genuine multi-country coverage depending on context. Ambiguity is preserved in the output rather than resolved by assumption.

The pipeline is hybrid: deterministic lexicon-based span detection establishes which terms are present and where; a constrained LLM classifier assigns semantic roles within those spans. The deterministic layer is the source of truth — the model cannot add spans or alter offsets, only classify within what the lexicon has already found. This separation makes errors attributable and evaluation tractable.

Once roles are classified, the relational structure becomes visible: which regions appear as publishing identities, which appear as objects of study, and whether those two distributions coincide. The more pointed analytical question is directional asymmetry: the extent to which high-income-country journals claim low-income-country regions as topical scope, and whether the reverse pattern exists at any comparable scale.

Results are pending. The classifier is built and validated; the production run against the Dimensions journal corpus has not yet been completed.

*Conceptual overview and methodology available. Pipeline code and prompt logic not public.*
