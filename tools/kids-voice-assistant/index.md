---
title: Kids voice assistant
---

# Kids voice assistant


I built this because the obvious answer to “can the children ask a voice assistant for songs and facts?” was, in our house, not Alexa. I wanted the useful part of a voice assistant without accepting the household bargain that usually comes with it: an always-on microphone, cloud speech processing, and a query history sitting somewhere I do not control.

The assistant runs locally on a Raspberry Pi and handles two tasks. It recognises song requests and plays them through the Spotify API; it also answers general knowledge questions from a local copy of Simple Wikipedia, so the question does not need to leave the device. Speech recognition runs through Whisper locally. The architecture is not elegant in the product sense, but it follows the constraint I cared about: audio and questions stay at home unless the task genuinely needs an external service, as Spotify obviously does, because even I have limits in how far I am willing to recreate modern infrastructure before breakfast.

The privacy constraint shaped the design more than any feature list would have done. I did not want a system that behaved like a commercial assistant with a different wake word; I wanted something narrow enough that I could understand what it was doing and where the data went. That meant accepting trade-offs in reliability and convenience. Local speech recognition can be slower and less forgiving; a Simple Wikipedia dump will not answer everything; the whole thing occasionally behaves like a project rather than an appliance, because that is what it is.

I am interested in this partly as a parent and partly as someone who works on AI systems. Children should be able to interact with computational tools without every question becoming training residue, product telemetry, or a future targeting signal. That does not mean building a sealed-off toy version of the internet; it means making the boundaries visible enough that I can decide which services enter the loop and why.

This is still a moving project, not a finished product. What exists is a local-first assistant with song requests, basic question answering, and local speech recognition; what remains is the usual gap between a working prototype and something robust enough to be treated casually by small users with very firm expectations about music.
