---
title: Meta-evaluation
---

# Meta-evaluation

At Digital Science, I had access to three frontier LLMs: Claude, ChatGPT, and Gemini. At one point, we were asked to justify the cost of one of them; but while building AV|VA, I'd already concluded that verification matters, and that it's better done by another model than by the one that produced the output — see [Kadavath et al., 2022](https://arxiv.org/abs/2207.05221) on models mostly knowing what they know. No existing benchmark fit, since I wanted to test this against a report we'd actually built ourselves rather than a public dataset. So I ran a small verification exercise of my own: partly to answer the cost question, partly to show something more general: a fluent AI output is not automatically a trustworthy one.

I took an AI-generated document, produced over several turns, and asked two other models to review it across several dimensions. I then asked the original model to compare the two reviews. Every review ran in a fresh context, so no model was grading work it remembered producing.

Both reviewers surfaced genuine failures, but one was considerably better at it — mainly because it checked claims against outside sources, while the other treated the document as authoritative and could only flag internal inconsistencies. Once I rewrote the prompt to explicitly ask the weaker reviewer to verify claims outside the document's own premises, it improved sharply — and so, to a smaller degree, did the stronger one.

Two findings, then: model choice matters for review quality, and prompt design matters almost as much.