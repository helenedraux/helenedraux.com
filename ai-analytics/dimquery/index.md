---
title: DimQuery
---

# DimQuery <StatusBadge status="live tool" />

DimQuery is a live Custom GPT for writing Dimensions queries on Google BigQuery. It was built for a practical problem: Dimensions has a rich analytical schema, but using it well requires knowing where fields live, which fields repeat, when to UNNEST, how classifications behave, and how easily a query can produce plausible-looking but methodologically wrong results.

The tool is schema-aware and bibliometrically constrained. It has access to the Dimensions data analytics schema, checks field paths against that schema, applies rules for repeated fields, and distinguishes between bibliometric choices that are easy to blur in SQL: publication-level and assignment-level counting, full counting and other counting logics, open access categories, and the different classification systems available in Dimensions.

DimQuery was built incrementally, with rules added as common failure modes appeared. That made it useful, but it also made the maintenance problem visible. Each new instruction could prevent one kind of error while leaving another untouched, and the tool still had to generate the method and the query in the same conversational move unless explicitly told otherwise. That one-shot pattern is fragile: a query can be syntactically valid, schema-compatible, and still answer the wrong question, calculate a ratio the wrong way round, or choose a shortcut that changes the analysis.

The absence of fixed query patterns is part of the issue. DimQuery can see the schema and may notice, for example, that a relevant count already exists in a table, but it can still rewrite the logic from scratch rather than use the safer available field. It does not operate through governed templates or MCP-style functions that constrain the route from question to query; it composes the query on the spot, which is useful for flexibility but difficult to make reliable.

The tool has improved as ChatGPT has improved, and it remains useful for analysts who already understand what a valid Dimensions query should look like. It can speed up drafting, check schema details, and surface bibliometric assumptions that might otherwise stay implicit. But it is not a system for carrying methodological responsibility on its own, especially for non-experts.

DimQuery sits on the path toward the AI metascientist because it showed both the value and the ceiling of prompt-based conversational bibliometrics. Schema grounding, classification rules, and methodological instructions can make a model more useful, but they do not replace workflow infrastructure. The next step is to move the fragile parts out of the prompt and into governed execution: explicit patterns, semantic constraints, auditable steps, and controlled access to the data.
