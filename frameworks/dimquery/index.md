---
title: DimQuery
---

# DimQuery

DimQuery is a Custom GPT for writing Dimensions queries on Google BigQuery. It is schema-aware in the strict sense: it works only from fields present in the Dimensions data analytics schema, refuses to invent plausible-looking paths, and enforces the UNNEST rules that govern repeated fields. It is also bibliometrically aware: it knows the difference between publication-level and assignment-level counting, applies full counting as the default, handles open access categories correctly, and distinguishes between the classification systems Dimensions supports and what each one is valid for.

The instruction set covers several failure modes that a generic LLM asked the same questions will hit reliably. Silent multiplicative joins — where an UNNEST introduces multiplicity that inflates counts without warning — are forbidden. Substituting one classification system for another without justification is forbidden. Publisher geography, which is not a supported attribute in the schema, cannot be derived or approximated. A pre-execution checklist runs against every query before it is finalised, covering scope, schema safety, classification choice, open access handling, multiplicity, and transparency of assumptions.

The classification layer distinguishes two tiers. Tier 1 — Fields of Research (ANZSRC) and Sustainable Development Goals — is the default for analysis and evaluation: stable, internationally recognisable, suitable for longitudinal comparison. Tier 2 — Broad Research Areas and RCDC — is for explicit use only, labelled as such, and not substituted for Tier 1. Values are matched against a vocabulary snapshot; fuzzy matching is not permitted.

DimQuery still makes mistakes. The Substack series on conversational bibliometrics documents where the approach hits its ceiling: adding more instructions degrades performance rather than improving it, and schema correctness is not the same as methodological validity. A query can pass every rule in the checklist and still answer the wrong question. DimQuery is a tool for analysts who already understand the domain; it is not suitable for non-experts working without supervision.

It is still in active use. It represents an earlier point in the trajectory toward the AI metascientist: the attempt to make a single conversational model do what a governed architecture would distribute across layers.

*Schema, vocabulary snapshot, and instruction set not public. Conceptual approach documented in the Substack series on conversational bibliometrics.*
