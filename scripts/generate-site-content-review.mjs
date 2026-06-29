import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function stripFrontmatter(content) {
  if (!content.startsWith('---')) return content
  const end = content.indexOf('\n---\n', 4)
  if (end === -1) return content
  return content.slice(end + 5)
}

const anchorMap = {
  'ai-analytics/ai-metascientist': '#the-ai-metascientist',
  'ai-analytics/corpus-builder': '#corpus-builder',
  'ai-analytics/biblioflow': '#biblioflow',
  'ai-analytics/dimquery': '#dimquery',
  'evaluation/av-va': '#avva',
  'writing/conversational-bibliometrics': '#conversational-bibliometrics',
}

function stripPageTitle(body) {
  return body.replace(/^#\s+[^\n]+(?:\n+|$)/, '').trim()
}

function isStubPage(body) {
  const trimmed = body.trim()
  return !trimmed || /^#\s+[^\n]+$/.test(trimmed)
}

function cleanBody(body, { keepTitle = false } = {}) {
  let cleaned = body
    .replace(/<StatusBadge[^>]*\/>/g, '')
    .replace(/<StatusBadge[^>]*>[^<]*<\/StatusBadge>/g, '')
    .replace(
      /<ClientOnly>[\s\S]*?<\/ClientOnly>/g,
      '[Interactive chart: bumped stacked bar demonstration]',
    )
    .replace(/<p class="diagram[^"]*">[\s\S]*?<\/p>/g, (m) => {
      const alt = m.match(/alt="([^"]+)"/)
      return alt ? `*[Diagram: ${alt[1]}]*` : ''
    })
    .replace(/<div class="cv-top-bar">[\s\S]*?<\/div>\n\n/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<SectionLanding[^>]*\/>/g, '')
    .replace(/\]\(\/[^)\s#]+(?:\/[^)\s#]+)*\/?\)/g, (match) => {
      const path = match.slice(2, -1).replace(/\/$/, '')
      const slug = path.split('/').pop()
      return `](${anchorMap[path] || `#${slug}`})`
    })
    .replace(/\]\(#ai-metascientist\)/g, '](#the-ai-metascientist)')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  if (!keepTitle) cleaned = stripPageTitle(cleaned)
  return cleaned
}

function readPage(rel, options) {
  return cleanBody(stripFrontmatter(readFileSync(join(root, rel), 'utf8')), options)
}

function section(title, body) {
  return `${body.trim()}\n`
}

const pages = {
  homepage: readPage('index.md'),
  approach: readPage('about/approach/index.md'),
  background: readPage('about/background/index.md'),
  practice: readPage('about/practice/index.md'),
  aiMetascientist: readPage('ai-analytics/ai-metascientist/index.md'),
  corpusBuilder: readPage('ai-analytics/corpus-builder/index.md'),
  biblioscope: readPage('ai-analytics/biblioscope/index.md'),
  gridPlus: readPage('ai-analytics/grid-plus/index.md'),
  journalscape: readPage('ai-analytics/journalscape/index.md'),
  dimquery: readPage('ai-analytics/dimquery/index.md'),
  biblioflow: readPage('ai-analytics/biblioflow/index.md'),
  avva: readPage('evaluation/av-va/index.md'),
  researchMusings: readPage('writing/research-musings/index.md'),
  conversationalBiblio: readPage('writing/conversational-bibliometrics/index.md'),
  tufte: readPage('writing/tufte-extensions/index.md'),
  interviewing: readPage('writing/interviewing-yourself/index.md'),
  loom: readPage('builds/loom/index.md'),
  childrenVa: readPage('builds/children-voice-assistant/index.md'),
  cv: readPage('cv/index.md', { keepTitle: true }),
  contact: readPage('about/contact/index.md'),
  references: readPage('about/references/index.md'),
  urlToDsl: readPage('tools/url-to-dsl/index.md'),
  smallMultiples: readPage('projects/small-multiples/index.md'),
  vinted: readPage('projects/vinted-semantic-layer/index.md'),
  writingPubs: readPage('methods/writing-research-publications/index.md'),
  notesMethod: readPage('notes/methodological-notes/index.md'),
  notesOngoing: readPage('notes/ongoing-work/index.md'),
  notesShort: readPage('notes/short-writings/index.md'),
}

const buildsIntro = stripFrontmatter(readFileSync(join(root, 'builds/index.md'), 'utf8'))
  .replace(/<SectionLanding[^>]*\/>/g, '')
  .replace(/^# Builds\n\n/, '')
  .trim()

const output = `# research systems — site content

**Hélène Draux** · data · AI-assisted research · governed AI

---

## Table of contents

1. [Homepage](#homepage)
2. [About](#about)
   - [Approach](#approach)
   - [Background](#background)
   - [Practice](#practice)
3. [AI analytics](#ai-analytics)
   - [The AI metascientist](#the-ai-metascientist)
   - [Claude Projects](#claude-projects)
   - [Biblioscope](#biblioscope)
   - [GRID+](#grid)
   - [Journalscape](#journalscape)
   - [DimQuery](#dimquery)
   - [Biblioflow](#biblioflow)
4. [Evaluation](#evaluation)
   - [AV|VA](#avva)
5. [Writing](#writing)
   - [Research Musings](#research-musings)
   - [Conversational bibliometrics](#conversational-bibliometrics)
   - [Tufte's extensions](#tufes-extensions)
   - [Interviewing yourself](#interviewing-yourself)
6. [Builds](#builds)
   - [Loom](#loom)
   - [Children voice assistant](#children-voice-assistant)
7. [CV](#cv)
8. [Appendix: stubs and work in progress](#appendix-stubs-and-work-in-progress)

---

## Homepage

${pages.homepage}

---

## About

*Three ways in. Approach is how I think about the work — where I put AI, why I document methods, how much weight I give a fluent answer. Background is the route here, from geomatics through research data science to governed analytics, while practice is the client-facing side: what I have delivered, for whom, and in what role.*

### Approach

${pages.approach}

### Background

${pages.background}

### Practice

*Page not yet written — TODO placeholders only on site.*

---

## AI analytics

*The centre of what I work on now: governed, conversational analytics over structured research data. These pages are meant to be read as an arc, not a catalogue. The AI metascientist is the organising idea: AI at the border of an analysis, the analytical core kept explicit enough to inspect. The corpus builder is the entry and arguably one of the most important parts of bibliometrics; Biblioscope is a working system that puts the approach to use; DimQuery is the earlier attempt whose limits pointed the way; and Biblioflow is where the work goes next. GRID+ and Journalscape are multi-step, deterministic, local-first pipelines for metadata enhancement.*

### The AI metascientist

*Status: proof of concept · Tags: governed AI, bibliometrics, conversational analytics, workflow architecture*

${pages.aiMetascientist}

### Claude Projects

*Status: implemented · Tags: Claude Projects, workflow design, conversational analytics, bibliometrics*

${pages.corpusBuilder}

### Biblioscope

*Status: operational · Tags: pipeline, field monitoring, embeddings, bibliometrics*

${pages.biblioscope}

### GRID+

*Status: validated · Tags: classification, research organisations, bibliometrics, hybrid AI pipeline*

${pages.gridPlus}

### Journalscape

*Status: classifier validated · Tags: pipeline, local language model*

${pages.journalscape}

### DimQuery

*Status: live tool · Tags: BigQuery, Dimensions, conversational analytics, bibliometrics*

${pages.dimquery}

### Biblioflow

*Status: concept · Tags: local AI, semantic layer, BigQuery MCP, bibliometrics*

${pages.biblioflow}

---

## Evaluation

*A companion to the AI analytics work: not all interactions need to be validated and verified in the same way. AV|VA separates validation (was this the right question to ask?) from verification (does the answer hold up?), and scales scrutiny to what happens if the output is wrong.*

### AV|VA

*Tags: AI evaluation, verification, validation, governed AI*

${pages.avva}

---

## Writing

*Argued designs, methods, and documented patterns — things thought through carefully enough to write down. Some develop the ideas behind the systems elsewhere on this site; some are about representation and method for their own sake. The longer-form arguments on conversational bibliometrics live in the Substack series, collected on the Conversational bibliometrics page.*

### Research Musings

${pages.researchMusings}

### Conversational bibliometrics

*Substack series index — body text forthcoming on site.*

${pages.conversationalBiblio}

### Tufte's extensions

*Tags: data visualisation, chart design, Tufte, composition over time*

${pages.tufte}

### Interviewing yourself

*Tags: AI-assisted writing, calibration, prompt method, style guide*

${pages.interviewing}

---

## Builds

${buildsIntro}

### Loom

*Tags: local AI, work tracking, personal tool, logging*

${pages.loom}

### Children voice assistant

*Tags: local AI, Raspberry Pi, voice assistant, privacy*

${pages.childrenVa}

---

## CV

${pages.cv}

---

## Appendix: stubs and work in progress

These pages exist in the site scaffold but are not yet written, are incomplete, or are not in the main navigation. They are listed here so the reviewer sees the full intended scope.

### Practice *(about — stub)*

Client-facing delivery page scaffolded with TODO placeholders: seven years end-to-end delivery at Digital Science, scoping and proposals, BigQuery + Looker + Dimensions work, senior-stakeholder presentations.

### Conversational bibliometrics *(writing — partial)*

Substack series links are live; introductory body text is marked TODO on site.

### Contact *(about — placeholder)*

${pages.contact}

### References *(about — empty)*

References page exists but has no content yet.

### URL to DSL *(tool — stub, not in nav)*

${pages.urlToDsl}

### Small multiples *(project — working notes, not in nav)*

${pages.smallMultiples}

### Semantic layer over Vinted *(project — work in progress, not in nav)*

${pages.vinted}

### Writing research publications *(method — forthcoming, not in nav)*

${pages.writingPubs}

### Notes *(forthcoming, not in nav)*

Three note sections are scaffolded but empty:

- **Methodological notes:** informal notes on methodological questions — content forthcoming
- **Ongoing work:** work in progress tracker — content forthcoming
- **Short writings:** shorter pieces outside the formal structure — content forthcoming
`

writeFileSync(join(root, '_review/site-content.md'), output)
console.log('Wrote _review/site-content.md (' + output.split('\n').length + ' lines)')
