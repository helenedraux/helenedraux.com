---
title: Children voice assistant
---

# Chilren voice assistant


I was interested in building a voice assistant that I would be ok to adopt without the usual household trade-off: an always-on microphone, cloud speech processing, and a query history stored somewhere outside the home.

I'm currently building the assistant to run locally on a Raspberry Pi and handle two tasks: recognising song requests and playing them through the Spotify API, and answering general knowledge questions from a local copy of Simple Wikipedia, so most questions do not need to leave the device. Speech recognition is being designed to run locally through Whisper, and while the architecture is not intended to be polished in a product sense, it follows the central constraint: audio and questions stay at home unless the task genuinely needs an external service.

The concept is also a way of thinking about children’s interactions with AI systems. Children should be able to use computational tools without every question becoming product telemetry, training residue, or a future targeting signal. At time of writing, I'm still working on it. The goal is a local-first assistant with song requests, basic question answering, and local speech recognition; the remaining work is the usual gap between a working prototype and something robust enough to be used casually by small users with firm expectations about music.
