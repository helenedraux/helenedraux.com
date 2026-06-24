---
title: GRID+
type: framework
---

# GRID+

GRID and its successor ROR give every research organisation a persistent identifier and a type. The type field is the problem. It conflates two different things — governance structure (government, private, NGO) and organisational purpose (healthcare, education, archive) — into a single flat category that answers neither question cleanly. An analyst asking "where is AI research happening, and who controls those organisations?" cannot get there from GRID types. The categories were convenient to curate, not designed to support analytical questions.

GRID+ is a multi-facet classification framework built to replace that flat type with something analytically useful. It classifies each organisation across five dimensions: legal structure, funding source, governance, territory served, and primary role. Each dimension is independent; an organisation's legal structure does not determine its primary role, and its funding source does not determine its governance. The combination of facets supports the questions analysts actually ask — about funding flows, decision-making authority, geographic scope, and organisational function — rather than the questions that were easy to answer from a name and a website.

## Design principles

Three principles distinguish GRID+ from ad hoc organisation typing. First, retrieved evidence over model memory: Wikipedia, Wikidata, and official public sources are the primary inputs for classification, with provenance recorded for every facet value. A model's parametric knowledge of an organisation is not a reliable source; public records are. Second, layered automation: deterministic rules handle high-confidence cases (ministries, universities, international bodies), small local models handle semantic verification and targeted repair, and frontier models handle only the cases that remain unresolved after earlier layers. Third, GRID hierarchy as structure: parent-child relationships in GRID are used to support control jurisdiction and inheritance rules, not ignored.

The result is reproducible in a way that human curation is not. A human curator classifying thousands of organisations will be inconsistent across sessions, influenced by the order in which organisations appear, and unable to document the reasoning behind each decision. Deterministic rules and explicitly documented classification logic produce the same output on rerun and make the reasoning inspectable.

## Applications

The first application was a funder classifier: 7,500 organisations extracted from publication acknowledgements, classified across the five facets, and used to map national research funding ecosystems into six patterns — direct state, agency-mediated, institutional, hybrid, philanthropy-visible, and low differentiation. That work is documented in the Substack piece [Mapping the global funding landscape](/notes/).

The broader GRID+ framework extends this to all research organisations appearing in publication affiliations, not just funders. The goal is to support questions about where research is performed, under what governance, and with what funding structure — across the full population of organisations in the scholarly record. That work was interrupted before the classification pipeline was fully wired.

## Status

The funder classifier is complete and validated against a stratified sample of 80 organisations, of which 69 were correctly classified and 11 remained ambiguous — most of the ambiguous cases reflecting genuine dual roles rather than classification error. The broader affiliation classifier is in setup phase: scope builder, evidence retrieval, and evidence audit are in place; facet classification is not yet wired.

*Framework and taxonomy public at the conceptual level. Classification rules, prompt logic, and pipeline implementation not public.*
