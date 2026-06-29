---
title: The AI metascientist
type: method
diagramAside: true
aside: false
outline: false
---

# The AI metascientist <StatusBadge status="proof of concept" />

<p class="diagram diagram-aside-target">
  <ColorModeImage
    light="/diagrams/ai_metascientist_architecture_light.svg"
    dark="/diagrams/ai_metascientist_architecture_dark.svg"
    alt="AI metascientist architecture"
  />
</p>

The AI metascientist is a conversational AI aimed at building bibliometrics analyses. I separate interpretation, scoping, and execution to move methodological authority away from the model's judgement. In the interpretation layer, AI helps the non expert user express what they are trying to do and routes that intent toward an appropriate analytical workflow. In the scoping layer, deterministic steps constrain what can be asked and how the corpus can be built: which entities are valid, which metrics apply, which normalisations are required, and where the question needs to be narrowed before analysis can begin. In the execution layer, predefined workflows run the analysis and assemble the report from controlled blocks, rather than asking the model to generate a free-form answer from whatever it believes about bibliometrics.

<p class="diagram">
  <ColorModeImage
    light="/diagrams/conversational_bibliometrics_positioning_light.svg"
    dark="/diagrams/conversational_bibliometrics_positioning_dark.svg"
    alt="Conversational bibliometrics positioning"
  />
</p>

The separation means that AI stays are the border of the analytics: it guides non-experts in making sure they do not request under specified questions, and drafts the writing following domain specific rules. I first created a prototype on AWS, but recently moved to adapting it to more expert use for consultancy with a [Claude Projects implementation](/ai-analytics/corpus-builder/) across three coordinated projects: a corpus builder, an analytical workflow layer, and a report checker. This made the separation visible: each project had a narrow job, and the hand-offs between them are structured in an actionable way. [Biblioflow](/ai-analytics/biblioflow/) is where I would take the work next: moving the same separation of concerns out of frontier-model project files and into a local system built around smaller model tasks, a bibliometric semantic layer, and governed BigQuery execution through MCP.

I have written more on Substack: first, [Conversational bibliometrics needs a recipe, not just ingredients](https://researchmusings.substack.com/p/conversational-bibliometrics-needs) sets up the problem: conversational access is not just a usability layer, because once analytical workflows are mediated by infrastructure, the infrastructure starts deciding which methods and questions are legitimate. [The AI metascientist: designing the kitchen](https://researchmusings.substack.com/p/the-ai-metascientist-designing-the) develops the architecture more directly, including the distinction between recipes, pantry, and kitchen: execution constraints, data representation, and system architecture.

What I am trying to build is not a chatbot with better bibliometric documentation, and not a co-pilot that suggests what an analyst might do next. It is built for non-expert, as a way of making conversational analytics possible without asking the conversation itself to carry all the governance. The model can help the user move through the system; it should not be the system.
