---
title: AVA
type: tool
---

# AV|VA

AV|VA is a structured approach to validating and verifying AI outputs, built around a distinction most workflows skip: there are two things to check, and they require different checks at different moments. The first is the input — is the question well-formed, does the construct make sense, should this task have been accepted at all? The second is the output — does the answer hold up against external sources, expert judgment, or a second model that had no part in producing it? Generalist LLMs default to the second and skip the first: they produce rigorous-looking outputs for poorly formed questions, because fluent methodological surface is what they were trained on, and input validation — refusing to start, or reframing the question — is rare in their training data and rarer still in conversational tuning.

The two principles: validate before you verify, and scale scrutiny to stakes. Validation means checking that the question the AI answered was the right question — something most AI tools skip entirely, and something non-experts are poorly placed to catch without prompting. Verification means checking the output itself, ideally with a model that had no part in producing it. The constraint is practical: not every output warrants the same effort. A personal brainstorm and a regulatory submission are not the same thing, and treating them identically wastes time on one and creates false confidence on the other.

The tool operationalises this through four questions: what kind of task did the AI do, what will the output be used for, what happens if it is wrong, and can it be checked against a source. The answers generate a risk score that maps to one of five verification levels, from "use freely" to "formal control with mandatory human sign-off." At each level, the tool recommends specific verification prompts — self-critique, assumption audit, chain of thought, known-answer test, source verification, rule-based check, computational check — selected by task type, not just risk level. The prompts are ready to copy into the same tool that produced the output, or into a different one.

The cross-model step matters. Models are skewed toward accepting their own work; a single model reviewing its own output will miss what a second model, or a human, would catch. In a prompt engineering experiment using AV|VA's cross-model verification approach, three AI-generated research security intelligence documents were submitted to two models with identical review prompts. One model produced structured internal consistency checks but worked entirely within the documents' own frame. The other independently searched external sources, identified a fictitious regulatory category the documents presented as official, caught legally imprecise institution-affiliation claims, and distinguished between sanctions lists and export-control lists in ways that matter for compliance use. The finding held on a second run with an improved prompt. For compliance and intelligence content, where external verification and legal precision are the criteria that matter, the difference between models was not marginal.

The conceptual framework and prompts are available at [askava-34j.pages.dev](https://askava-34j.pages.dev/).

---

*Conceptual framework and verification prompts public. Underlying scoring logic and task-method matrix documented on the tool site.*
