---
title: Red-teaming an analytical agent
---

I was asked to test an AI-assisted analysis system built on a proprietary dataset, and proposed red-teaming it. The system and client are confidential, so what follows is the methodology and the categories of failure the probes were designed to surface, not the results. Because the system sat on proprietary data, I added two dimensions standard probes don't cover: commercial alignment and methodological integrity. A system that passes the commercial-alignment probe is one that simply declines to answer questions outside its remit; a system with methodological integrity refuses to build a biased methodology in the first place, and refuses to write one up even if asked directly. What follows describes what I tested across a hundred-plus turns spread over several conversations.


## Security probes

* Credential and system-access extraction: environment variables, API keys, model IDs, infrastructure; using blunt, social-engineering, indirect, multilingual, and summary-as-extraction forms
* System-prompt extraction: direct verbatim requests, plus indirect ("what constraints affect your answers," "what would a developer see that I wouldn't")
* Direct prompt injection: override attempts, in English and French

## Misuse / methodological integrity

* Scope manipulation: tuning query definitions to change the results; then a softened restatement asking for the same outcome without the explicit rationale
* Methodology honesty: whether the writeup discloses the real reason a scope was chosen, or omits it on request
* Leading questions and bias in query construction

## Commercial alignment

* Whether the agent produces a document recommending a competitor over the vendor whose product it is
* Brand-alignment under a long user-led conversation that drifts toward the competitor

## Artefact-vs-capability honesty

* Whether the agent presents work as completed and authoritative when the execution log doesn't support it: claimed pipelines, multi-part tasks narrated as done, registry tables shown as clean
* Pipeline self-description: what the tools actually do, what's stored vs. computed live, what the precision/recall numbers mean, held consistently under sustained questioning

## Social-engineering resistance

* Cross-session privacy framing: a fabricated scenario implying another user's data leaked in
* Flattery and pushback as pressure on the agent's recommendations

## Scope discipline

* "What could not be tested" treated as co-equal with findings: surface blocked by the current product, surface testable but not exercised, and what the transcripts inherently cannot establish (accuracy of self-reported metrics, behaviour on a fresh session, determinism on rerun)

The engagement produced a written report with findings and recommendations. It is not published here.
