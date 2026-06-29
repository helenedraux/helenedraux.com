---
title: Vacuity index
---

# The vacuity index

I've been testing AI for analytics in a lot of contexts, often by asking it to design a methodology for something in my work, to see how far I can trust it. Most of the time I ask the right questions, so I get a sensible answer. But what happens when I ask a question that can't actually be answered in the frame I'm using?

As an April Fools' piece for *Research Musings*, I asked a stupid-but-plausible one: create a "vacuity index" that measures how little a research paper actually says. The LLM ran with it faster than I expected. It didn't just produce a coherent index and it wrapped it in beautiful packaging, a decomposition into named sub-scores and a full validation strategy, which made it genuinely hard to see that it wasn't a good answer. [Read the original piece →](https://researchmusings.substack.com/p/coherent-plausible-and-wrong-input)

I think of this as a move from "garbage in, garbage out" to garbage in, confidence out. To check, I asked the same model whether the question and its answer were actually reliable: it leaned towards my framing. A neutral, unprimed version of the same question got a critical answer instead.

Generalist chatbots are built for fluency, for keeping the conversation moving, not for analytics done by non-experts. That is exactly why validation is the first half of AV|VA: before the model looks at the question, something has to step back and check that the question is meaningful in the first place.
