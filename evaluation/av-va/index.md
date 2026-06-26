---
title: AV|VA
type: tool
---

# AV|VA


I built AV|VA because I kept running into the same problem with AI-assisted work: the answer can be checked after the fact, but the question often escapes scrutiny. A model will usually answer what it has been asked, and it will do so fluently enough that a badly framed task can start to look like a reasonable one. For me, that is where the risk begins.

AV|VA separates two checks that often get collapsed. Validation happens before the answer: is the task well formed, does the construct make sense, should this question be answered in this form at all? Verification happens after the answer: does the output hold up against sources, rules, expert judgment, computation, or another model that had no part in producing it? I do not treat those as interchangeable, because they catch different failures at different moments.

<p class="diagram">
  <img src="/diagrams/av_va_risk_routing.svg" alt="AV|VA validation and verification with risk-proportional routing" />
</p>

I wanted the checking process to scale with the consequence of being wrong, because a private brainstorm and a compliance-sensitive intelligence document should not go through the same ritual. The first may only need a quick assumption check; the second needs external verification, legal and source precision, and probably a human who understands the domain well enough to notice when the model has made something sound official that is not. AV|VA asks four questions: what kind of task did the AI do, what the output will be used for, what happens if it is wrong, and whether the answer can be checked against a source. Those answers produce a risk level and a corresponding verification route.

The tool then recommends checks that match the task rather than applying one generic review prompt to everything. Some outputs need self-critique, some need an assumption audit, some need source verification, some need a rule-based or computational check, and some need a second model precisely because the first model is too invested in its own frame. I do not mean emotionally invested, although it can feel that way after the third confident restatement of the same mistake.

The cross-model step became clearer in a prompt engineering experiment. Three AI-generated research security intelligence documents were sent to two models with the same review prompt. One model stayed largely inside the documents’ own frame and produced structured internal consistency checks. The other checked against external sources, identified a fictitious regulatory category presented as official, caught legally imprecise institution-affiliation claims, and distinguished between sanctions lists and export-control lists in ways that matter for compliance use. The result held on a second run with an improved prompt.

That experiment did not tell me that one model is always better than another; it told me that verification behaviour matters, and that a review workflow needs to make that behaviour visible. For compliance and intelligence content, I care less about whether the review sounds rigorous than whether it checks the right things: external status, legal precision, source validity, and the limits of the document’s claims.

The public AV|VA tool provides the conceptual framework and verification prompts. The underlying scoring logic and task-method matrix are documented on the tool site.
