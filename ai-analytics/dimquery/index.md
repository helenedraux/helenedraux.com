---
title: DimQuery
---

# DimQuery <StatusBadge status="live tool" />

I built DimQuery as a Custom GPT for writing Dimensions queries on Google BigQuery. The starting point was practical: Dimensions has a rich analytical schema, but using it well requires knowing where the fields live, which fields repeat, when to UNNEST, and how quickly a harmless-looking join can turn into a count inflation machine with a pleasingly official-looking output.

DimQuery is schema-aware in the strict sense. It works only from fields present in the Dimensions data analytics schema, refuses plausible-looking paths that are not actually there, and enforces the UNNEST rules that govern repeated fields. I also made it bibliometrically aware, because syntactically valid SQL is not enough. It distinguishes publication-level and assignment-level counting, uses full counting as the default, handles open access categories correctly, and separates the classification systems Dimensions supports rather than treating them as interchangeable labels.

A lot of the instruction set came from failure modes I had seen often enough to stop finding them surprising. Silent multiplicative joins are the obvious one: the query runs, the table returns, and the numbers look convincing unless you know where the multiplicity entered. Other rules cover classification substitution, unsupported publisher geography, open access handling, and transparency of assumptions. Before a query is finalised, DimQuery runs a pre-execution checklist covering scope, schema safety, classification choice, multiplicity, and whether the analytical assumptions have been stated rather than smuggled into the query.

The classification layer has two tiers. Fields of Research and Sustainable Development Goals are the default for analysis and evaluation, because they are stable, internationally recognisable, and suitable for longitudinal comparison. Broad Research Areas and RCDC are available only for explicit use, labelled as such, and not substituted for the first tier because they happen to return a result. Values are matched against a vocabulary snapshot; fuzzy matching is not allowed, which removes some convenience and also removes a gratifying number of bad answers.

DimQuery still makes mistakes. That is partly the point of keeping it on the site. It marks an earlier stage in my thinking about conversational bibliometrics, where I tried to make a single conversational model behave responsibly by giving it enough schema knowledge, methodological rules, and examples. It can help an analyst move faster, especially when the analyst already knows what a valid answer would need to look like, but it cannot carry methodological responsibility on its own.

The ceiling became clear as the instruction set grew. Adding rules improved some behaviours and degraded others; schema correctness did not guarantee methodological validity; and a query could satisfy every item in the checklist while still answering the wrong question. DimQuery is useful for analysts who already understand the domain. It is not a tool for non-experts working without supervision, and I would not want it mistaken for one.

In retrospect, DimQuery sits on the path toward the AI metascientist. It showed me which parts of conversational bibliometrics could be handled with prompt instructions and schema grounding, and which parts needed to move into workflow infrastructure, semantic constraints, and governed execution.
