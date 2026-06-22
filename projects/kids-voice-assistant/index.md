---
title: Local voice assistant for kids
---

# Local voice assistant for kids

Commercial voice assistants are built for general-purpose adult use. They assume a user who can formulate precise requests, tolerate ambiguous responses, and understand that their queries are processed remotely and may be logged. None of these assumptions hold for a voice interface aimed at young children in a household setting.

This project is a local voice assistant designed for that specific context: children roughly aged four to eight, requesting music and factual information, with no data leaving the home.

## Why local

The assistant runs on a machine in the household network. Speech is converted to text locally. Intent is resolved locally. API calls go only to the services required for the requested action — music playback and encyclopaedic lookup — not to a general-purpose conversational backend that retains interaction history.

The design decision is primarily about data boundaries rather than latency or cost. A child's requests — what songs they ask for, what questions they pose, when they use the assistant — are not data I want collected or retained by a third party. Local processing keeps the interaction log under household control.

## Architecture

The system has four layers: voice capture, speech recognition, intent routing, and service integration.

Voice capture uses a microphone array or USB microphone connected to a local server. A wake word or push-to-talk mechanism triggers recording. Push-to-talk was chosen over always-listening for a household with children — it makes activation deliberate and avoids ambient audio processing.

Speech recognition runs through a local model. The requirement is sufficient accuracy for short, simple utterances in a known language environment. Perfect transcription is less important than reliable intent extraction from imperfect input.

Intent routing is a lightweight classifier that maps transcribed text to a small set of actions: play music, answer a factual question, stop, repeat. The intent space is intentionally narrow. A general conversational agent is not the goal; a reliable handler for a bounded set of child-appropriate requests is.

Service integration connects to two external APIs. Spotify handles music playback — search by artist, song, or mood, with playback routed to a designated speaker. A simplified Wikipedia layer handles factual questions, returning short, age-appropriate summaries rather than full article text. Both integrations use authenticated API access from the local server; the child interacts only with voice.

## Design decisions

**Why Spotify and Wikipedia.** Music and factual questions are the two dominant request types. Spotify provides catalogue access without maintaining a local music library. Wikipedia provides factual coverage without building a custom knowledge base. Both have stable APIs and well-understood content licensing.

**Why not a large language model.** A general LLM could handle a wider range of queries, but it introduces unpredictability in responses, requires remote inference or substantial local compute, and expands the surface area for inappropriate content. For a bounded child-facing interface, a narrow intent set with curated service backends is more appropriate than open-ended generation.

**Why voice.** Young children who cannot yet read or type fluently can still formulate spoken requests. Voice lowers the access barrier. The trade-off is recognition error and the need for robust fallback when intent is unclear — typically a simple "I didn't understand, try again" rather than a guess.

## Limits

The assistant handles a small set of intents reliably. It does not converse, tell stories, set reminders, or control household devices beyond audio playback. Expanding the intent space increases failure modes and testing burden disproportionately.

Implementation detail — the specific speech model, intent classifier, and API integration code — is partially documented. The architecture described here is stable; the implementation is not public in full.

---

*Overview and architecture available. Implementation detail partial.*
