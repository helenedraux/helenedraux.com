# WEBSITE.md

## Purpose

The website presents a structured body of work while:
- signalling rigor and coherence  
- avoiding commercial or product framing  
- preserving intellectual property through selective disclosure  

---

## Current state

The site currently includes:
- AI metascientist (method)  
- GRID+ (framework)  
- AVA (tool)  
- homepage  

The structure is intentionally minimal and will expand incrementally.

---

## Site identity

Title:
research systems

Subtitle:
methods for knowledge and evaluation

Byline:
Hélène Draux

---

## Site structure

Top-level routes:
- /
- /methods/
- /frameworks/
- /tools/
- /notes/ (optional)
- /about/

---

## Core navigation model

The site is organised into three explicit layers:
- Methods → conceptual  
- Frameworks → applied  
- Tools → operational  

Hierarchy must be preserved:
methods > frameworks > tools

---

## Homepage structure

### Header
- title  
- subtitle  
- byline  

### Intro
Neutral description of activity:
- describing, structuring, evaluating research systems  
- focus on knowledge representation and analysis  
- mention AI evaluation context  

Constraint:
- must not read as an introduction or pitch  
- must reflect structure rather than explain intent  
- must avoid “platform” or “project” framing  

---

### Three layers section

Methods  
Conceptual approaches for representing and analysing the structure of research systems  

Frameworks  
Structured applications of methods in defined analytical contexts  

Tools  
Lightweight implementations supporting specific analytical tasks  

---

### Current work

- AI metascientist (method)  
- GRID+ (framework)  
- AVA (tool)  

---

### Perspective

- positioned within bibliometrics and research systems analysis  
- increasing focus on evaluation under automation  
- selective disclosure of full implementation  

---

### Structure

Methods → Frameworks → Tools  
Conceptual → Applied → Operational  

Methods inform frameworks.  
Frameworks organise tools.  

---

## Page templates

### Method page
- conceptual definition  
- structured explanation  
- no implementation detail  

### Framework page
- structured system  
- partial example  
- no full scoring logic  

### Tool page
- constrained functionality  
- example usage  
- no internal logic  

---

## Coherence constraint

Pages must align across layers:

- methods define concepts used by frameworks  
- frameworks structure logic used by tools  
- tools reference frameworks, not define them  

Each page must clearly belong to one layer.

---

## Depth signalling

Each page should indicate:

- overview: available  
- methodological detail: partial  
- full protocol and implementation: not public  

---

## Visual design principles

Typography:
- serif primary  
- restrained sans-serif for UI  

Layout:
- moderate density  
- left-aligned  
- no visual noise  

Color:
- off-white background  
- near-black text  
- muted accent  

---

## What to avoid

- gradients  
- animations  
- hero sections  
- product UI patterns  
- marketing language  
- calls-to-action  

---

## Iteration approach

The site is developed incrementally:

- add one page at a time  
- maintain consistency with existing pages  
- avoid expanding multiple sections simultaneously  

After each addition:
- review coherence across pages  
- adjust structure if needed  

---

## Implementation notes

Stack:
- VitePress (content)  
- Vite (tools if needed)  
- Cloudflare Pages (hosting)  

---

## Guiding principle

The site should read as:

- a system of methods  
not  
- a collection of products  

And:

- complete at the conceptual level  
- intentionally bounded at the operational level  