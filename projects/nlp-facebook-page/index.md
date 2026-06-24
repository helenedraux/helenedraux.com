---
title: NLP of a Facebook page
---

# NLP of a Facebook page

A natural language analysis of Parkinson's UK's public Facebook page, conducted in Python using pandas, NLTK, and Bokeh. The work came out of a five-week data project for Parkinson's UK in November 2016; the Facebook data was collected during that engagement and analysed afterward.

The dataset divides into two groups: posts by Parkinson's UK (PUK) as the page owner, and posts by their readers (PUKreaders). The first part of the analysis compares vocabulary and framing across these two groups; subsequent parts look at speech patterns among people with Parkinson's versus carers, and at what makes posts generate engagement.

The vocabulary divergence was sharper than expected in a few places. PUK uses "condition"; their readers use "disease" — a terminological distinction Parkinson's UK is deliberate about, since Parkinson's is not curable and "condition" is the institutionally preferred term, but one that has not transferred to lay usage. PUK talks about "research"; readers talk about "money" — not because they are indifferent to research, but because money is the legible proximate action available to them. The "diagnosis" versus "diagnosed" split follows a similar logic: PUK treats diagnosis as a general clinical phenomenon; readers treat it as something that happened to their parent.

The gender finding is methodologically contingent: dads appear more frequently than mums across both groups, which probably reflects the higher male prevalence of Parkinson's rather than a sampling artefact — though the analysis also notes that women post more on Facebook, which should push in the opposite direction and doesn't fully cancel the effect.

Methods: word frequency with Counter, bigram collocations and concordance via NLTK, frequency comparison across groups by unique-author count rather than raw post count to avoid single-author inflation. Visualisation in Bokeh.

*Code not public. Data covered by the original project engagement.*
