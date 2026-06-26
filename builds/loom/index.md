---
title: Loom
---

# Loom


I built Loom because I wanted a work tracker I would actually use, which sounds like a low bar until you count how many systems fail exactly there. If I have to open an app, find the right project, choose a category, and write a note, the system has already lost me; each step is small, but together they create enough friction for the habit to fail.

The design starts with a single keystroke: I press it, Loom captures what I am working on, and I do not have to negotiate with an interface at the exact moment I am trying to stay inside the work. I also wanted the data to stay on my machine, because a personal work log contains unfinished thinking, client context, and small private signals that I do not want to send to a cloud service simply because the dashboard looked tidy.

Building it made me realise that I first had to decide what I wanted to know about my work: not every task, not every minute, and not a taxonomy elaborate enough to become its own administrative hobby. The useful level sits somewhere between “worked on AI” and “edited paragraph three of section two for twelve minutes,” which looks obvious only after I have tried logging both and regretted each in a different way.

I wanted Loom to turn the log into a weekly account of the work I would otherwise forget. I usually know the broad shape of my week, so I do not need a tool to tell me which projects occupied it; what I lose are the small resolved things, such as the bug fixed, the methodological decision made, the awkward paragraph finally made less awkward, or the piece of reasoning that will be needed later but will not announce itself as important at the time. Those details disappear from memory first and then become irritatingly relevant when I have to write up the work.

The local AI layer was meant to produce that weekly account without sending the log elsewhere. I built the logging mechanism and designed the summary layer, but I did not complete the local model integration. The onboarding flow points toward the same design instinct I use elsewhere: AI belongs where natural language is useful, especially at the boundary where a person configures a system through conversation rather than a settings file. The analytical core should remain simple enough that I can understand what it did on a Tuesday, which is a useful test for any personal tool.
