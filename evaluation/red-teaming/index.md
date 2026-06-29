---
title: Red-teaming an analytical agent
---

I was asked to test an AI-assisted analysis system, and proposed red-teaming it. Because it was built on a proprietary dataset, I added two dimensions standard probes don't cover: commercial and methodological integrity. A system that passes the commercial alignment would be a system that simply refuses to answer questions that are outside of its remit, and a system with methodological integrity would refuse to create biased methodology and would not accept to write it down. Below is a description of what I tested through hundred+ turns spread over a few conversations; no result is discussed.

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
