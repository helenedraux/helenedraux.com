---
title: Journalscape
---

# Journalscape <StatusBadge status="classifier validated" />

I built Journalscape because I wanted a better way to ask a very practical question: how representative is the research corpus we have at hand? Not in the abstract, and not compared to some ideal global database, but in the corpus we are actually using. Whose geography appears in it, and in what form?

For this question, I could not rely on publisher location or co-author addresses. They would answer a different question, and in this case they were not the geography I wanted. I was interested in the geography expressed in the words users see first: journal titles. Titles are not a perfect proxy, but they are a meaningful one. They tell us how journals position themselves, what places they claim, and which regions become part of a journal’s identity, scope, or intellectual tradition.

The difficulty is that geographic terms in titles do not all do the same work. “American Journal of Chinese Medicine” contains two geographic terms, but they are not equivalent. “American” points toward publishing identity; “Chinese” points toward disciplinary tradition or topical scope. If I simply extract every geographic term and count it, I lose the distinction I was trying to study in the first place. A corpus can look geographically broad in a term-frequency table while still reflecting something much more specific: certain places naming themselves, and other places appearing mainly as subjects.

Journalscape classifies the role each geographic term plays in the title, rather than treating geography as a single undifferentiated signal. I distinguish publishing identity, topical scope, disciplinary tradition, and scope markers such as “global” or “international”. Those last terms are especially slippery. “International” can mean audience, aspiration, editorial posture, or actual multi-country coverage, depending on the title and the field. I do not want the system to resolve that ambiguity by pretending it has gone away, so the output keeps ambiguity visible where the title does not support a clean classification.

The pipeline is deliberately hybrid. A deterministic lexicon-based layer finds the geographic spans and records their offsets. A constrained local language model then assigns semantic roles within those spans. The deterministic layer remains the source of truth: the model cannot add new spans, move offsets, or decide that it has noticed a country the lexicon did not find. That separation keeps the errors attributable. If the span is wrong, the lexicon layer failed. If the span is right and the role is wrong, the classifier failed. This is the sort of distinction that makes evaluation possible, and also keeps one’s debugging vocabulary from collapsing into muttering.

Once the roles are classified, the relational structure becomes visible. I can look at which regions appear as publishing identities, which appear as objects of study, and whether those distributions align. The question I am most interested in is directional asymmetry: how often high-income-country journals claim lower-income regions as topical scope, and whether the reverse pattern appears at anything like the same scale.

The classifier has been built and validated. The production run against the Dimensions journal corpus has not yet been completed.
