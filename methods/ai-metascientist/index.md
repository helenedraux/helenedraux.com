---
title: AI metascientist
type: method
---

# The AI metascientist

The AI metascientist is a governed analytics framework for conversational bibliometrics. The core claim is about separation of concerns: interpretation, scoping, and execution are kept as distinct layers rather than collapsed into a single model handling everything at once. The governance comes from that architecture, not from any particular model's capability.

## The problem it addresses

Generalist LLMs asked to perform bibliometric analysis will produce fluent, methodologically plausible output that fails in ways invisible to non-experts. They hallucinate database fields, apply metrics outside their valid conditions, compare across fields on raw counts, and — more fundamentally — accept poorly formed questions without flagging that the construct is incoherent. The failure mode is not that the model produces errors; it is that the errors look like results.

Adding more instructions to the prompt does not fix this. Each instruction protects against one failure mode while making the prompt more brittle, and the failure modes that matter most are the ones not yet anticipated. The protection scales linearly with foresight, which is the wrong shape for a problem where the dangerous failures are the unanticipated ones.

## The method

The AI metascientist addresses this by placing AI at the boundary of the analytics rather than at its centre. Three layers, each with a distinct role:

The first layer handles interpretation: AI guides a non-expert user through scoping the analysis in natural language, identifying which workflow will answer their question and what inputs it requires.

The second layer handles scoping: deterministic steps constrain what the user can ask and how the corpus is constructed. This is where methodological rules are enforced — normalisation requirements, valid metric conditions, corpus definition constraints — rather than suggested.

The third layer handles execution: predefined analytical workflows, each with its own contextualisation rules and output logic. The report the user receives assembles selected blocks from those workflows; it is not generated freely from the model's parametric knowledge.

The result is reproducible and auditable: the same inputs produce the same outputs, and the choices made at each layer are inspectable.

## What it is not

The AI metascientist is not a chatbot with bibliometric documentation. It is not a co-pilot that suggests what analysts have previously done. It is not a system that relies on the model's judgment to enforce methodological validity — judgment that shifts between model versions and fails silently when it fails at all.

The distinction that matters is where methodological authority sits. In suggestive systems it sits with the user, who must know enough to catch what the model gets wrong. In the AI metascientist it sits in the workflow infrastructure, which enforces admissibility conditions before execution rather than recommending them after the fact.

## Status

The framework has moved through a proof-of-concept phase, including a Claude Projects implementation across three coordinated projects: a corpus builder, an analytical workflow layer, and a report checker. A fuller technical treatment is available in the Substack series [Conversational bibliometrics needs a recipe, not just ingredients](/notes/) and [The AI metascientist: designing the kitchen](/notes/).

---

*Conceptual framework public. Workflow logic, scoring, and orchestration detail not public.*
