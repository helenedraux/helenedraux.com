---
title: BiblioFlow
---

# BiblioFlow

BiblioFlow is a concept for a local-first, fully integrated bibliometric analysis pipeline: corpus builder, analytical workflow layer, and report checker running as a single system on local language models.

The design addresses two limitations of the Claude Projects implementation described elsewhere on this site. First, locality: the pipeline runs on local models rather than frontier APIs, which matters for data that should not leave the machine. Second, a formal semantic layer: rather than relying on a model's parametric knowledge of bibliometric entities and relationships, BiblioFlow encodes them explicitly — what the entities are, how they relate to each other, which metrics are valid, and how to calculate them. The corpus builder includes a decision layer that selects the appropriate construction method for a given analytical question. The analytical layer operates against the semantic layer rather than against free-form model knowledge.

The relationship to the AI metascientist is direct: BiblioFlow is the local, integrated instantiation of the same separation-of-concerns architecture. The Claude Projects version approximates it with frontier models and conversational orchestration; BiblioFlow would replace both with a structured pipeline where local models handle narrowly scoped tasks and the semantic layer provides the methodological authority the models themselves cannot supply.

This remains a concept. No implementation exists beyond the design.

*Concept-level documentation only. No implementation public or private.*
