---
title: Tropical Neglected Diseases
---

# Tropical Neglected Diseases

A cluster and spatial analysis of eight Neglected Tropical Diseases (NTDs) across 149 countries, using WHO incidence and prevalence data. NTDs are not rare diseases; they persist in neglected areas, and most have been eradicated from high-income countries while remaining endemic elsewhere. The analytical question was which countries carry the highest burden, which diseases co-occur, and where spatial clusters of one disease — Lymphatic Filariasis — are concentrated.

The dataset is heterogeneous by design: the WHO measures different NTDs differently, reporting new cases for some and treated individuals for others. Rather than harmonise these into a single unit, the analysis treats each measure as a proxy for burden in context — a simplification flagged explicitly, since normalising rabies deaths against leprosy prevalence is not epidemiologically clean.

Data preparation ran in R using `rgdal` and `spdplyr` to load Natural Earth shapefiles and merge with WHO CSVs by country name; name mismatches required manual reconciliation. Burden was normalised against estimated population to produce per-million figures, which shifted the country rankings substantially: China drops out of the rabies top three; Guinea-Bissau and Zimbabwe replace it.

Association rule mining via the `arules` package tested which NTDs co-occur across countries. Leprosy dominates — it is present in 82% of countries in the dataset — which inflates its association with everything else and makes the itemset results less informative than they first appear. Removing leprosy from further association analysis is the methodologically correct step; the post flags this without pursuing it.

Spatial analysis used point data for Lymphatic Filariasis from ntdmap.org: 7,000 prevalence points, kernel density estimation in `spatstat`, contour extraction to identify clusters. Five clusters account for 31% of cases, concentrated in Egypt (Nile corridor), Sri Lanka, Zanzibar, and a Ghana-Togo-Nigeria band — each with documented mass drug administration histories, which the spatial pattern reflects.

Visualisation used Carto for the interactive choropleth map, with jenks classification updating dynamically on filter; R and Tableau for statistical outputs.

*Code and data not public.*
