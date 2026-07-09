---
title: GRID+
type: framework
---

# GRID+ <StatusBadge status="validated" />

Research organisation typology is a classification project for describing research organisations in more useful terms than a single organisation-type field allows, separating legal form, funding source, governance, territory served, and role in the research ecosystem instead of asking one broad label to carry all of that meaning.

<p class="diagram">
  <ColorModeImage
    light="/diagrams/grid_pipeline_light.svg"
    dark="/diagrams/grid_pipeline_dark.svg"
    alt="GRID+ classification pipeline"
  />
</p>

The workflow combines deterministic rules, local models, and selective frontier-model use. A Python layer first handles high-confidence cases from organisation names, such as ministries, universities, and international organisations; small local models then perform semantic verification with country-specific context and repair only the fields flagged as uncertain or inconsistent; a final Python validation step normalises values and enforces the schema before unresolved cases are selectively patched with a stronger commercial LLM.

The point is not to use the largest model for every decision, but to design a system where each layer has a narrow role: deterministic rules handle clear cases, local models audit and repair ambiguous ones, and frontier models are reserved for uncertainty that remains after local processing. This makes the pipeline more inspectable and reduces unnecessary dependence on external models.

In the funder classifier, deterministic and local-model stages reached around 90% coverage across most classification dimensions, and an independent LLM-as-judge spot-check of 80 stratified organisations found 69 classifications correct and 11 questionable, with many ambiguous cases reflecting genuinely mixed roles rather than simple errors, such as companies that both fund research and conduct it.

I'm now moving the research organisations, beyond the funders, and adding broader Wikipedia and Wikidata evidence layer. However, the project already shows how research classification can be built as a governed workflow rather than a single model judgement: evidence retrieval, local classification, targeted repair, schema validation, selective escalation, and auditable quality checks.
