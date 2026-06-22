---
title: Claude Projects as semi-structured workflows
---

# Claude Projects as semi-structured workflows

Most uses of large language model interfaces treat each session as self-contained. The model responds to a prompt; the conversation ends; the next session starts without memory of what came before. This is appropriate for general assistance. It is poorly suited to analytical work that unfolds over days or weeks, where intermediate results accumulate, constraints tighten, and the analytical frame shifts in response to what has already been examined.

Claude Projects change this by persisting context across sessions. Project instructions, uploaded documents, and conversation history remain available when a new session begins. The effect is not memory in the human sense — it is closer to a shared working directory with a standing brief. What persists is not recall of prior reasoning but access to prior artefacts and stated constraints.

This persistence makes Projects useful for something more specific than open-ended chat: semi-structured analytical workflows. A semi-structured workflow is one where the overall objective and governing rules are fixed, but the path through the analysis is responsive to intermediate findings. The workflow has state. Constraints accumulate. Partial outputs from earlier sessions inform later ones. The analyst returns to the same project repeatedly, each time extending rather than restarting the work.

## The pattern

A workable project-based workflow has three components: a standing brief, a set of persistent artefacts, and a session rhythm.

The standing brief defines what the project is for, what constraints apply, and what outputs are expected. It is written once and revised rarely. It functions as methodology encoded in natural language — not a prompt for a single task but a charter for a series of related tasks.

Persistent artefacts are documents, data extracts, prior analyses, or structured notes uploaded to the project. They ground the model in material that does not need to be re-supplied each session. As the workflow progresses, new artefacts are added: intermediate tables, draft interpretations, lists of open questions.

The session rhythm is how the analyst uses the project over time. A typical rhythm might be: open the project, review what was produced last session, pose the next analytical step, produce and inspect output, save or upload the result, close. The session is a unit of work within a longer arc, not a complete analysis.

## A worked example

Consider evaluating a set of institutional research outputs across multiple dimensions — scope, rigour, influence, novelty. A single prompt asking for a holistic assessment of fifty papers will produce something superficial and difficult to audit.

A project-based approach structures this differently. The standing brief defines the evaluation dimensions and the standard of evidence required for each. A spreadsheet of outputs is uploaded as a persistent artefact. Session one decomposes the evaluation into dimension-specific sub-tasks and produces a template for structured assessment. Session two applies the template to the first ten outputs and flags inconsistencies in the data. Session three revises the template based on what session two revealed and continues the assessment. Each session builds on the last. The project accumulates both outputs and refinements to the method.

The result after several sessions is not a single answer but a traceable analytical process: dimension definitions, assessment records, noted exceptions, revised instructions. This is closer to governed workflow than to chatbot interaction.

## Limits

Projects do not enforce structure. Nothing prevents the analyst from abandoning the standing brief, contradicting prior outputs, or allowing context to drift. Persistence is availability, not discipline. The semi-structured quality depends entirely on how the analyst maintains the project over time.

Context windows remain finite. A project with many uploaded artefacts and long conversation history will eventually hit limits. Artefact management — what to keep, what to summarise, what to archive — becomes part of the workflow itself.

The model does not know that it is in a workflow. It has no concept of session boundaries, completion criteria, or methodological obligations beyond what the standing brief states. Governance is external: the analyst must enforce consistency, check outputs against prior sessions, and decide when the workflow is complete.

Projects are a useful infrastructure for analytical work that extends beyond a single sitting. They are not a substitute for method. The standing brief must encode enough structure to keep the work coherent; the analyst must maintain enough discipline to make persistence valuable rather than confusing.

---

*Polished.*
