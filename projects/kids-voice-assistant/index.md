---
title: Local voice assistant for kids
---

# Kids voice assistant

A local, offline-first voice assistant built on Raspberry Pi for a context where the answer to "just use Alexa" was: not in this house.

The assistant handles two tasks. It recognises song requests and plays them via the Spotify API. It answers general knowledge questions using a local copy of Simple Wikipedia, so responses stay on-device and don't require a cloud query. Speech recognition runs via Whisper, also local.

The privacy constraint was the design constraint: no always-on microphone sending audio to a third-party server, no household query history accumulating somewhere else. The tradeoff is reliability — this is a moving project, not a finished product, and it behaves accordingly.

*Project notes not public.*
