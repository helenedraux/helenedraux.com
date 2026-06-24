---
title: Approach
---

# Approach

## Why document methods

I document methods because I want to share them, because I think it matters that people understand where data comes from, and — less nobly — because I will otherwise forget. Documentation is also how I think: writing a method down forces a precision that using it does not.

## On trusting AI

I do not trust AI to have understood me. I challenge it constantly and do not take its outputs at face value. Models are skewed toward accepting their own work; a single model reviewing its own output will miss what a second model, or a human, would catch. That observation is what led me to build [AV|VA](/tools/ava/): a structured evaluation approach that scales scrutiny to stakes. High-stakes outputs get checked and double-checked, with human review at the ceiling. Lower-stakes outputs, or outputs that are one step in a larger process, get lighter treatment. The check is proportional, not uniform.

The pipeline logic follows the same principle. I layer deterministic rules first, then small local models for targeted tasks, then consistency and rule-following checks, and reserve frontier models for what the earlier layers cannot resolve. Each layer has a narrow job. The confidence of the final output comes from the architecture, not from any single model's fluency.

## AI at the boundary

For non-expert users, I place AI at the edges of an analytical process rather than at its centre. Natural language is where most people are comfortable; structured data and query logic is where most errors happen. So I design systems where users express intent in natural language at the input — [Loom](/projects/loom/), for instance, uses an onboarding prompt that lets a user configure the tool through conversation — and where AI helps shape the output into something readable. The analytical core stays deterministic and auditable.

## Layered disclosure

What I make public is what is mine to release. Conceptual approaches, design logic, and findings are public. Prompt logic, scoring internals, and orchestration detail for work that is not solely mine are not. Each page on this site marks where that boundary falls.
