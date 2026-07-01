---
title: Biblioflow
---

# Biblioflow <StatusBadge status="concept" />

Biblioflow is concept-level work for turning the [AI metascientist](/ai-analytics/ai-metascientist/) and [Claude Projects](/ai-analytics/corpus-builder/) experiments into a more local, inspectable bibliometric workflow system.

The AI metascientist established the principle: AI should sit at the border of the analysis, helping users express intent, clarify scope, and understand outputs, while methodological authority stays in governed workflows rather than in the model’s judgement. The Claude Projects implementation tested the same separation in practice: project files carried stages, gates, constraints, and hand-offs, so corpus building, analysis, and report checking could move through structured steps instead of dissolving into one long conversation.

Biblioflow brings those lessons together into a system architecture. The aim is to move the workflow out of frontier-model project files and into a local-first environment built around explicit state, small task modules, a bibliometric semantic layer, and governed BigQuery execution through MCP. The model would still be useful at the conversational boundary, but the analytical core would become less conversational: rules, gates, artefacts, audit logs, and controlled execution would determine what can happen next.

The corpus builder is the clearest starting point. Rather than asking a model to build a corpus, Biblioflow would treat corpus construction as a staged workflow: ingest the brief, confirm scope, probe seed papers, approve the field structure, choose the retrieval strategy, generate and calibrate candidate queries, validate samples, document decisions, request execution approval, and release a versioned corpus package. Each stage has a narrow job, and each gate records the human decision that allowed the workflow to continue.

That matters because corpus construction is where much of the analytical authority enters a bibliometric study. Decisions about seed papers, field boundaries, retrieval methods, false friends, exclusions, validation thresholds, and known limitations should not be hidden inside a plausible model response. They should be surfaced, versioned, and available for inspection.

The local-model component would be used only where the task is narrow enough to assess: classifying a request against known workflow types, checking whether a field definition matches approved scope, labelling validation samples against explicit inclusion criteria, detecting likely false positives, drafting limitations from recorded calibration results, or checking whether a report includes required caveats. The system would not ask a small model to invent a method or decide whether an evaluation question is valid; those decisions belong in the semantic layer and workflow rules.

The longer-term aim is for Biblioflow to make the AI metascientist less dependent on frontier-model orchestration without losing the conversational usefulness that made it worth building. The conversation remains useful for intent, scope, and explanation; the bibliometric work becomes a governed local workflow whose outputs can be traced back to the decisions, rules, and data states that produced them.
