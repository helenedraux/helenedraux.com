---
title: Loom
---

# Loom

Loom is a personal work tracker built around a single constraint: capture should require almost no interruption. A single keystroke records what I am working on at that moment — not a task title, not a project assignment, but a brief note of current focus. Over the course of a week, these entries accumulate into a raw log of attention.

The design assumption is sustained independent work. Team task managers optimise for coordination, assignment, and visibility across people. Loom optimises for something different: a lightweight record of how time and attention actually distribute across weeks of solo analytical work, where the boundary between projects is often fluid and the meaningful unit is what was in front of me when I stopped to note it.

At the end of each week, a local AI model reads the log and produces a structured summary. The summary is not a productivity report. It describes what was worked on, how effort distributed across themes, and any patterns that emerge from the sequence of entries — shifts in focus, recurring threads, gaps between stated priorities and recorded activity. The model runs locally; the log does not leave the machine.

The architecture is deliberately minimal. A hotkey listener, a plain-text or lightweight structured store, and a scheduled prompt that passes the week's entries to a local inference endpoint. There is no dashboard, no tagging system, no integration with calendars or email. The friction of categorising work at capture time is treated as a design failure.

Someone building a similar system would need to decide their own capture granularity, summary schema, and model. The pattern — ambient logging, periodic structured synthesis, local inference — is the transferable part. The specific prompt logic that shapes the weekly summary is not public.

---

*Overview available. Methodological detail partial. Full implementation not public.*
