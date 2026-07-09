# Biblioscope

I built Biblioscope to monitor how the bibliometrics field is changing in ways that should change how we structure, enrich, or interpret data in Dimensions, the scholarly database by Digital Science. A weekly feed could have told me what has been published, but it could not have told me where that work sits in the field, whether a method is emerging inside an established area or between areas that do not usually touch, or whether a paper is borrowing references from a part of the field it would not normally cite. 

## How the pipeline works

The baseline corpus is built from a versioned Dimensions query (built using the first version of the Corpus Builder on Claude Projects) that defines the perimeter of bibliometrics for this system. I included the publications that used bibliometrics as a methods as well as built on these methods. The records are stored in BigQuery and materialised locally, producing roughly 160,800 papers from January 2000 to April 2026 for clustering, inspection, and weekly comparison. Each paper is embedded with SPECTER2 and clustered from local neighbourhoods into 100 named meso-clusters. Those sit on top of a finer 1,546-cluster partition and roll up into 15 macro regions used for context in the weekly brief.

The structure keeps two kinds of relatedness apart: 
* the embedding space captures topical proximity: which papers sit near each other by language and content. 
* and bibliographic coupling captures papers that are built from similar reference lists, which translated into intellectual proximity
Both are useful, but they should not be blended silently: a paper can sound like one part of the field while citing like another, and those disagreements are often what we are interested in.

Once the clusters have been named and checked, that baseline structure is held constant. The weekly monitor does not recluster the field, because reclustering would make week-to-week movement harder to interpret. New papers are embedded with the same configuration and assigned to their nearest baseline cluster. The system then computes signals from that assignment layer: clusters receiving unusual weekly volume, papers sitting far from their assigned centroid, and papers whose reference structures bridge clusters that rarely connect in the founding corpus. A rule-based selection stage fills a capped brief, and the brief is generated as markdown.

## Where AI is used, and where it is not

In my system, no language model reads the weekly intake or decides what mattered this week. AI enters the system in two places: SPECTER2 provides the document representation that makes assignment and distance computable, and a language model helped label the baseline clusters offline, after the structure had already been produced, using versioned prompts and a separate validation pass.

The weekly path is deterministic: dated SQL window, fixed embedding configuration, nearest-cluster assignment, computed growth, novelty and bridge signals, fixed selection rules, generated markdown report. If a paper or cluster appears in the brief, it can be traced back to the intake record, the baseline structure, the assignment, and the signal that selected it.

The human work sits before and after that path: thresholds were calibrated against reviewed weeks, and the requirement-lane exclusions were tested out of sample before their precision number was allowed to count. The quality documentation records the precision rubrics, runbook, decision log, and recall characterisation. For instance, one recall check surfaced 0% of an independent expert list, and that result stayed in the documentation because it describes the monitor’s boundary: the system is unusualness-gated, while the expert list centred on material it deliberately treats as background.

## What comes out

Biblioscope produces three weekly artefacts:

1. The Weekly Monitoring Brief is a triage report, usually 17–25 items, where each item is either a cluster behaving unusually this week or a single paper flagged by the same signal logic. It does not claim to identify the important papers of the week. It tells a data analyst where to spend ten minutes looking. Across five reviewed weeks, 34.5% of surfaced items were worth a human look, measured on 110 rows: 64 papers and 46 clusters. The other 65.5% were false attention. The noise is measured and capped, not written around.
2. The requirement-lane packet answers one standing stakeholder question with a capped review load. The shipped lane, MR-B2, watches for signs that the data infrastructure bibliometrics depends on — bibliographic databases, identifier systems, linkage systems — is failing or migrating. It returns at most 25 rows, each produced by a versioned registry of trigger patterns and exclusions. Each row carries the clause that caught it and an evidence excerpt for review. These rows are candidates awaiting adjudication, not findings.
3. The quality documentation makes the system’s claims checkable. It records the rubrics, measured precision, recall characterisation, runbook, and decision log. It also keeps the brief and lane metrics separate, because they use different units and different rubrics. That is what I mean by auditable here: not a claim about intent, but a set of artefacts someone else can inspect.

## Example output: one real week

The brief itself is still a bit dry in my first version. This excerpt comes from the week of 4–10 May 2026, the fourth week the monitor had run against the baseline structure. The weekly intake contained 798 papers, and the monitor surfaced 25 signals.

```markdown id="x3r9bt"
Rank 3 — cluster highlight (M050) — IMPORTANT
- flags: growth, bridge
- cluster: AI applications in education and business marketing
- n_papers_week: 21 · volume ratio: 2.1× baseline
- founding cluster size: 1,985 papers

Rank 4 — cluster highlight (M069) — IMPORTANT
- flags: growth, novelty, bridge
- cluster: ML/deep learning in remote sensing and climate forecasting
- n_papers_week: 9 · volume ratio: 2.2× baseline
- founding cluster size: 808 papers

Rank 11 — paper highlight (M070) — IMPORTANT
- flags: novelty, bridge
- paper: Toponym-Based Genealogical Writing in al-Andalus:
  al-Rushāṭī's Iqtibās al-Anwār
- assigned: Bibliometric mapping of finance and Islamic studies
- reference structure couples into: social-science mapping
- founding coupling overlap between these areas: 14%

MR-B2 lane
- 11 strong candidates queued for capped review
- each row carries trigger clauses and an evidence excerpt
```

The machine output is not meant to interpret itself, but it gives the analyst enough structure to read quickly and check the basis for novelty. In this week’s brief, the two growth signals are the first things to log: 
* the cluster on bibliometric studies of AI in education and marketing, with 1,985 founding papers, ran at 2.1× its baseline. 
* the cluster on machine learning and deep learning in remote sensing and climate forecasting, with 808 founding papers, ran at 2.2× and triggered growth, novelty, and bridge flags in the same week. 
That combination suggests an area whose methods vocabulary may be moving.

The al-Andalus paper is a different, in that it is assigned to a cluster around Islamic-studies and finance bibliometrics, but its reference structure reaches into general social-science mapping. Those two regions share only 14% coupling in the founding map. One paper is an anecdote; if the same bridge recurs over several weeks, it becomes evidence that humanities scholars may be importing science-mapping methods in a way Dimensions should represent.

Most of the other slots were ordinary applied bibliometric reviews, including locust research, cryptocurrency taxation, and a paper on a botanical genus. That is the known operating floor, not a surprise. Two Ukrainian-language items also appeared in the highlights, one on OSINT methods in criminal investigation and one on health-system governance. They are not the main story of the week, but they are a useful perimeter check because the monitor is not filtered to the Anglophone centre of the field.

The lane packet ran separately and queued 11 candidates for the data-substrate question, the largest single-week batch in the reviewed series to date. Each row carried the registry clauses that triggered it and an evidence excerpt for review. The wording matters here: candidates, not conclusions. The lane’s job is to reduce a stakeholder question to a capped review list with complete provenance.

Taken together, the week produced two growth signals to log, one bridge paper to watch sceptically, a known noise floor, and 11 lane candidates for human adjudication. The machine narrowed the field, and the analyst still did the reading.

## What it could be used for

My immediate use case was to apply it to methodology intelligence for Dimensions; which I was working towards before leaving employment. This could be used by a data analyst working on coverage, enrichment, classification, identifiers, and linkage can use the brief to ask whether a method is emerging that Dimensions should adopt, represent, or watch: a disambiguation approach, a classification technique, a linkage method, or a signal that the field’s data substrate is shifting.

The same pattern can support other bounded monitoring questions, provided the question is specific enough to write rules for. A funder could watch a portfolio area for methodological drift, a publisher could watch changes in evaluation practice, and a data provider could run lanes for identifier failures, dataset adoption, or coverage gaps. The constraint is the same in each case: define the corpus or lane, freeze the rules, and measure the noise. Another planned extension was to include grants and patents to get an early and applied signal; this would make a very powerful field monitor, using Dimensions' strengths.
