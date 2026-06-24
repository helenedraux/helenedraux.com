---
title: Building a network
---

# Building a network

A similarity network built for a dataviz competition, using the Million Song Dataset as source material. The core task: given a set of artists each tagged with genre and origin metadata from MusicBrainz, construct an undirected network where edges connect artists who share tags, weighted by the number of shared tags.

The pipeline runs in Python and pandas: connect to the SQLite databases, extract artist-tag tuples, self-join on tag to generate source-target pairs, compute edge weights by counting shared tags per pair, drop redundant edges, attach artist names, filter to edges with weight above three, then export nodes and edges as CSVs for Gephi. The main data complication was duplicate artist names against a single artist ID, resolved by keeping the first name per ID.

The network itself was explored in Gephi. The tag distribution was sparse — most artists carry fewer than three tags — which constrained the network density and made the filtering step consequential rather than cosmetic.

*Code not public.*
