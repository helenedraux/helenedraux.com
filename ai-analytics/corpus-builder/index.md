---
title: Claude Projects
diagramAside: true
aside: false
outline: false
---

# Claude Projects <StatusBadge status="implemented" />

<p class="diagram">
  <ColorModeImage
    light="/diagrams/corpus_builder_linear_light.svg"
    dark="/diagrams/corpus_builder_linear_dark.svg"
    alt="Claude Projects workflow"
  />
</p>


I needed to rebuild the [AI metascientist](/ai-analytics/ai-metascientist/) for someone who needed a system usable without an external LLM API or AWS infrastructure. The aim was to create 10 to 40-page reports from a brief question; so likely a dozen questions rather than much longer reports. The intended users were experts in the field rather than experts in the analysis itself, so less guardrails were required (especially around asking legitimate questions and therefore not requiring to validate the question). Since they were already using Claude, it was a low friction solution, and made it a reasonable place to test whether the workflow could survive outside the original prototype. Another part of the infrastructure was an MCP with extensive functions to build corpora and call faceted functions.

While building the AI metascientist and testing other prototypes doing similar analyses, I realised that one-prompt and few turns conversations were limited risked creating shiny analytics that didn't hold methodological scrutinity. I decided to split the corpus construction process into separate files, with each file carrying a defined part of the workflow: what the system should ask, which stage it was in, what counted as a legal next action, when it had to stop, and what needed explicit human approval before it could move on. This meant that the model was not being asked to remember a method from a dense instruction block; it was moving through a structure that made it more robust.

The implementation ran across three coordinated Projects: the first scoped the field, agreed the definition with the user, and built queries through a staged calibration process; a second ran a defined set of analyses against the corpus; a third checked the report against methodological and stylistic rules.

## Corpus builder
Building the corpus is arguably the most important step in bibliometrics: the builder needs to understand rules of bibliometrics as well as the subject they are trying to model. I created a ten-step process, each with their own rules and deliverable.

## Biblioanalysis
For the analysis, I fed it the 12 workflows I had created for the AI metascientist. These workflows were already organised in pre-built analytical bricks, which the Claude Project is able to call and select from. For the report, I did not use an (interview methodolog)[/writing/interviewing-yourself/] this time but instead fed it with previous reports, list of requirements I thought were important, and rules extracted from state-of-the-art reports, which created rules Claude was able to digest.
The conversation starts by producing a methodology (which I would recommmend to cross-check with another model), runs through the analysis (if ran by an analyst I would request a python file so the analyst can run it themselves, however I was not building for an analyst), produces mid-analysis results for discussion, and finally writes a report. 

## Report QA
Although the report was previously built in multi-steps conversation, it still needs to be checked for compliance with the guideline, internal coherence, and external checks. This is explicitly again built as a multi-step workflow, where the instructions are the orchestrator, and the files are attached.

## Limitations

This worked better than I expected: in a few hours, I could get to a convincing report, and the workflow preserved enough structure that I still felt I owned the method rather than watching the model improvise something adjacent to it. The MCP connection helped a lot during corpus construction: Claude could check why a subfield returned limited results, validate coherence, iterate on Boolean queries, and step back when a query had not worked. It also did not tire of small adjustments, which is useful in a process made almost entirely of small adjustments.

The limits, however, became visible just as quickly. The MCP was build on the Dimensions API, which is much more limited for complex analyses: e.g., academic age calculations were impossible with my already limited sample. Data augmentation within the same conversation was impossible and required another conversation. Reproducibility was the larger problem: when re-running the analysis another day, we did not have access to monthly snapshot to pin the analysis to a fixed data state.

All in all, for a couple of day experiment, this was really informative: Claude Projects can function as a semi-structured workflow layer when the project files encode state, constraints, and method rather than preferences. I would not use this as the final architecture for governed bibliometric analysis, but it gave me a working approximation of the [AI metascientist](/ai-analytics/ai-metascientist/): persistent context as workflow memory, project files as procedural structure, and explicit hand-offs between stages so the analysis could not entirely dissolve into conversation. The limits of that approximation are part of what led me toward [Biblioflow](/ai-analytics/biblioflow/), where the same separation of concerns would move out of Claude Projects and into a local, semantic-layer-driven system. This is however still at the conceptual level.
