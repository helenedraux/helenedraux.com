---
title: Loom
---

# Loom

Loom is a personal work tracker built around two constraints: no friction, and no data leaving the machine.

Most productivity tools fail the first constraint immediately. Opening an app, navigating to a log, choosing a category — each step is small and each step is enough to make the habit collapse. Loom's design principle is a single keystroke that captures the current task, with no further interaction required. The second constraint ruled out every existing tool I looked at: I wanted the log to stay local, processed by a local AI model rather than sent anywhere.

Building it clarified what I actually wanted to track. That is not a trivial output of the process — understanding what to log, at what granularity, and for what purpose turned out to be most of the design work.

The intended output is a weekly summary generated from the log. The summary's value is not the big picture — I know what projects I am working on — but the small wins: the problems solved, the decisions made, the things finished that would otherwise disappear into the week without record. Those are the things that are hardest to reconstruct from memory and most useful to have when writing up work or assessing where time actually went.

Loom was interrupted before the local AI summary layer was fully built. What exists is the logging mechanism and the design for the summary; the integration with a local model is incomplete. The onboarding flow — which lets a user configure the tool through a natural language conversation rather than a settings file — reflects the broader principle described in [approach](/about/approach/): AI at the input boundary, where natural language is the right interface, rather than at the analytical core.

*Work in progress. Logging mechanism built; local AI summary layer incomplete.*
