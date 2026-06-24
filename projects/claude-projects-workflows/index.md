---
title: Claude Projects as semi-structured workflows
---

# Claude Projects as analytical workflows

Claude Projects persist context across conversations. The standard use is a persistent chat with a set of instructions; the less obvious use is as a semi-structured analytical workflow, where the persistent context encodes state, constraints, and methodology rather than just preferences.

I arrived at this by accident. I was rebuilding the AI metascientist corpus builder for a colleague who needed something accessible without an external API or AWS infrastructure. Claude Projects was the obvious candidate: no setup friction, already available. I separated each step of the corpus construction process into a distinct file in the project context, and found that Claude followed the steps reliably — more reliably than a single long prompt, because the structure was explicit rather than embedded in prose.

The implementation runs across three coordinated projects: a corpus builder that scopes the field, agrees the definition with the user, and constructs Boolean queries through a calibrated sequence of steps; an analytical workflow layer that runs a defined set of analyses against the corpus; and a report checker that reviews the output against a set of methodological and stylistic rules. The separation is intentional: each project has a narrow job, and the hand-off between them is explicit.

## What works

In a few hours, a convincing report is achievable. The workflow is hands-on — you cannot leave it running and return — but the methodology stays owned rather than delegated. The MCPs accelerate the corpus construction considerably: Claude checks why a subfield returns limited results, validates coherence, iterates on Boolean queries, and steps back when something has not worked. It does not tire, which matters for a process that involves many small decisions.

## What does not

Compared to Google BigQuery, the analytical power is limited. Academic age calculations are difficult. Data augmentation within a conversation is close to impossible — when GRID institution types needed supplementing, I had to open a separate conversation rather than augment in place. Reproducibility is a genuine problem: fields can change value between runs, and there is no equivalent of BigQuery's monthly snapshots to pin the analysis to a fixed data state.

The most consistent failure mode is analytic laziness under pressure. Told there are too many publications, Claude will sample without flagging that the corpus is only 5,000 records. Rerunning an analysis can produce a rewritten query rather than the same query re-executed. Both failures are invisible unless you are watching closely enough to catch them.

## What would fix it

Moving the analytical layer to BigQuery would solve most of the power and reproducibility problems. A cleaner hand-off between the corpus builder and the analytical layer — passing the corpus rather than reconstructing it — would remove the sampling failure mode. The laziness where it shortcuts may be a symptom of working in-context rather than against a persistent data store; GBQ execution would change that constraint.

The pattern itself — structured files as workflow steps, Projects as an orchestration layer — is not well documented. It works, with steering. Whether it scales depends on what replaces the in-context analytical layer.

---

*Workflow pattern documented. Full prompt logic and project file structure not public.*
