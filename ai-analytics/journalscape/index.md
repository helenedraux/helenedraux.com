---
title: Journalscape
---

# Journalscape <StatusBadge status="classifier validated" />

Journalscape is a classifier for analysing how geography appears in the journal titles of a research corpus, focusing on the places journals name in the words readers see first and the role those place names play.

Geographic terms in titles are not equivalent: in “American Journal of Chinese Medicine”, one term points toward publishing identity while the other points toward disciplinary tradition or topical scope, so extracting and counting place names would flatten the signal the project is trying to study.

Journalscape classifies the role of each geographic term rather than treating geography as one undifferentiated feature, separating publishing identity, topical scope, disciplinary tradition, and scope markers such as “global” or “international”. Where the title does not support a clean interpretation, the ambiguity remains visible rather than being forced into a confident label.

The pipeline is deliberately hybrid: a deterministic lexicon-based layer finds geographic spans and records their offsets, while a constrained local language model assigns semantic roles within those spans. The deterministic layer remains the source of truth, so the model cannot add new places, move offsets, or rewrite the extraction step; this keeps errors attributable and makes evaluation possible.

Once the roles are classified, the corpus can be analysed for directional asymmetry: which regions appear as publishing identities, which appear mainly as objects of study, and whether high-income-country journals claim lower-income regions as topical scope more often than the reverse. The classifier has been built and validated, though the production run against the Dimensions journal corpus has not yet been completed.
