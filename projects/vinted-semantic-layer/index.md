---
title: Semantic layer over Vinted
---

# Semantic layer over Vinted

*Work in progress. Notes only.*

## The problem

Vinted is a second-hand marketplace organised primarily around keyword search and category browsing. For buyers looking for something specific — a particular garment type, material, era, or condition — discovery depends on how sellers title and tag their listings. There is no underlying product ontology. Similar items are separated by inconsistent vocabulary; unrelated items cluster under shared keywords.

The result is search that behaves like an index over unstructured text rather than like navigation through a curated catalogue. This is a general problem in unstructured marketplaces, but it is particularly visible in fashion, where the meaningful dimensions of a garment — cut, fabric, construction, provenance — are rarely captured in a listing title.

## The approach

The experiment aims to build a semantic layer between the marketplace's raw listings and a query interface that understands garment structure. The layer would extract or infer attributes from listing text and images, map them to a controlled vocabulary, and expose search and browse paths that follow garment semantics rather than seller phrasing.

Concretely: a listing described as "vintage 90s wool blazer brown" and one described as "brown wool jacket 1990s" should resolve to comparable attribute sets, regardless of title wording. Browse paths like "structured outerwear → wool → 1990s" should be possible even when no seller used those terms.

## Current status

This is early-stage work. The attribute vocabulary is under development. Extraction from listing text is partially prototyped; image-based inference is not yet attempted. There is no public interface. These notes record the problem framing and intended direction rather than results.

---

*Work in progress. Incomplete.*
