---
title: AV|VA
type: tool
---

# AV|VA: AI Validation & Verification Advisor

I built AV|VA when I started seeing colleagues use AI to build analytics or documents without properly checking the output. I saw the same pattern in AI analytics work generally: people marvelling at how fast they got a coherent-looking result, with no equivalent check on whether that result actually held up. Human-in-the-loop was treated as sufficient oversight — but reading a fluently written 40-page document closely enough to catch its errors is a genuinely hard cognitive task, not a rubber stamp. I think of it as wanting to be the third supervisor, not the first or second: I want the draft to reach me only once it's been checked for internal and external coherence, so my judgement and domain expertise go toward what's actually left to decide, not toward catching errors a machine could have caught first.

That said, checking every output the same way doesn't make sense — a private brainstorm and a compliance-sensitive intelligence document don't carry the same stakes. The first may only need a quick assumption check; the second needs external verification, legal and source precision, and probably a human who understands the domain well enough to notice when the model has made something sound official that isn't.

The [Vacuity index](/evaluation/vacuity-index/) experience added a second layer: validating the question itself, not just the answer — is the task well formed, does the construct make sense, should this question be answered in this form at all?

<p class="diagram">
  <ColorModeImage
    light="/diagrams/av_va_risk_routing_light.svg"
    dark="/diagrams/av_va_risk_routing_dark.svg"
    alt="AV|VA validation and verification framework with risk-proportional routing"
  />
</p>

AV|VA currently asks four questions: what kind of task did the AI do, what the output will be used for, what happens if it's wrong, and whether the answer can be checked against a source. Those answers produce a risk level and a corresponding verification route.

The tool then recommends checks that match the task rather than applying one generic review prompt to everything: some outputs need self-critique, some need an assumption audit, some need source verification, some need a rule-based or computational check, and some need a second model — because the first model is too invested in its own frame (see [Meta-evaluation](/evaluation/meta-evaluation/) for that technique in practice, comparing two models' reviews of the same document).