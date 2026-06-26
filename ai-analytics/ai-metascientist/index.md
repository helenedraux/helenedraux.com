---
title: The AI metascientist
type: method
diagramAside: true
aside: false
outline: false
---

# The AI metascientist <StatusBadge status="proof of concept" />

<p class="diagram diagram-aside-target">
  <img src="/diagrams/ai_metascientist_architecture.svg" alt="AI metascientist architecture" />
</p>

I use “AI metascientist” for a governed analytics framework for conversational bibliometrics. I do not mean that an AI system becomes a bibliometrician, which would be too grand and too fragile; I mean that conversational access to bibliometric data needs an architecture that separates the parts of the analytical process a single model tends to blur together.

The failure I care about is not only that a model makes mistakes. In bibliometrics, a model can hallucinate database fields, use a metric outside its valid conditions, compare raw counts across fields, or accept a question whose construct does not make sense, while producing an answer that reads as fluent, careful, and methodologically plausible. That is the unpleasant combination: the error does not look like an error.

I tried the prompt-heavy route first, with DimQuery and other conversational tools. It can help with bounded problems: schema paths, UNNEST rules, unsupported classifications, counting logic. But every instruction protects against a failure mode I already know how to name, while the more serious risks often come from the ones I have not anticipated. At some point, the prompt becomes a pile of warning labels attached to a machine that is still allowed to drive.

The AI metascientist puts methodological authority somewhere more stable than the model’s conversational judgment. I separate interpretation, scoping, and execution. In the interpretation layer, AI helps the user express what they are trying to understand and routes that intent toward an appropriate analytical workflow. In the scoping layer, deterministic steps constrain what can be asked and how the corpus can be built: which entities are valid, which metrics apply, which normalisations are required, and where the question needs to be narrowed before analysis can begin. In the execution layer, predefined workflows run the analysis and assemble the report from controlled blocks, rather than asking the model to generate a free-form answer from whatever it believes about bibliometrics.

That separation matters because each layer has a different job. I am comfortable using AI to help with interpretation, because natural language is the right interface for a user who knows what they want to ask but not how to express it as a bibliometric workflow. I am much less comfortable letting the same model decide whether the metric is valid, whether the corpus is coherent, and whether the report should mention a limitation. Those decisions need to sit in rules, semantic constraints, and workflow infrastructure that can be inspected.

The framework has moved through a proof-of-concept phase, including a [Claude Projects implementation](/ai-analytics/corpus-builder/) across three coordinated projects: a corpus builder, an analytical workflow layer, and a report checker. That version was not the final architecture, but it made the separation visible: each project had a narrow job, and the hand-offs between them forced the workflow to state what had been decided rather than letting context blur into analysis. [BiblioFlow](/ai-analytics/biblioflow/) is where I would take the work next: moving the same separation of concerns out of frontier-model project files and into a local system built around smaller model tasks, a bibliometric semantic layer, and governed BigQuery execution through MCP.

<p class="diagram">
  <img src="/diagrams/conversational_bibliometrics_positioning.svg" alt="Conversational bibliometrics positioning" />
</p>

I have written the longer version of this argument on Substack. [Conversational bibliometrics needs a recipe, not just ingredients](https://researchmusings.substack.com/p/conversational-bibliometrics-needs) sets up the problem: conversational access is not just a usability layer, because once analytical workflows are mediated by infrastructure, the infrastructure starts deciding which methods and questions are legitimate. [The AI metascientist: designing the kitchen](https://researchmusings.substack.com/p/the-ai-metascientist-designing-the) develops the architecture more directly, including the distinction between recipes, pantry, and kitchen: execution constraints, data representation, and system architecture.

What I am trying to build is not a chatbot with better bibliometric documentation, and not a co-pilot that suggests what an analyst might do next. It is a way of making conversational analytics possible without asking the conversation itself to carry all the governance. The model can help the user move through the system; it should not be the system.
