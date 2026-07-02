---
title: AV|VA
type: tool
---

# AV|VA: AI Validation & Verification Advisor


I built AV|VA (AI Validation & Verification Advisor) when I started seeing colleagues building analytics or documents using AI without double checking the outputs. I saw the same in AI analytics: wonder at the speed to get results that looked coherent, but no AI-based check. Human-in-the-loop was considered good enough; which on a 40-page document fluently written felt like a cognitively difficult task to do. I described this as: I want to be the third supervisor, not the first or second. I want the draft to come to me once it has been properly checked for coherent internally and externally, and I'm requested to use my human judgement and exper knowledge. 

However, AI checking every single output does not necesseraly make sense: a private brainstorm and a compliance-sensitive intelligence document. The first may only need a quick assumption check; the second needs external verification, legal and source precision, and probably a human who understands the domain well enough to notice when the model has made something sound official that is not. 

After my experience related in the Vacuity Index _Research musings_, I realised validation of the question should be added in analytics especially: is the task well formed, does the construct make sense, should this question be answered in this form at all? 

<p class="diagram">
  <ColorModeImage
    light="/diagrams/av_va_risk_routing_light.svg"
    dark="/diagrams/av_va_risk_routing_dark.svg"
    alt="AV|VA validation and verification framework with risk-proportional routing"
  />
</p>

For now, AV|VA asks four questions: what kind of task did the AI do, what the output will be used for, what happens if it is wrong, and whether the answer can be checked against a source. Those answers produce a risk level and a corresponding verification route.

The tool then recommends checks that match the task rather than applying one generic review prompt to everything: some outputs need self-critique, some need an assumption audit, some need source verification, some need a rule-based or computational check, and some need a second model because the first model is too invested in its own frame (see the page on [verification comparison](/evaluation/verification-comparison/) where I used that technique to compare outputs from two models).