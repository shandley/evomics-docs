# R for Biologists - Migration Plan

## Strategy: Reference Guide Approach

The R documentation will **complement, not replace** the interactive 18-lesson course. The docs platform serves as a reference guide while the full course remains available for comprehensive learning.

## Completed: Infrastructure Setup (Phase 1) ✅

All technical infrastructure is now in place:

### Routes Created
- ✅ `app/r/[[...slug]]/page.tsx` - Dynamic page handler for R guide content
- ✅ `app/r/layout.tsx` - Layout with sidebar navigation
- ✅ `app/og/r/[...slug]/route.tsx` - Open Graph image generation

### Integration Points Updated
- ✅ `app/api/search/route.ts` - Search ready (using unixSource currently, will support multi-source later)
- ✅ `app/llms-full.txt/route.ts` - Already includes rSource for LLM text export
- ✅ `content/r/meta.json` - Navigation structure created

### Testing
- ✅ `/r` route accessible at http://localhost:3000/r
- ✅ Compiled successfully without errors
- ✅ Returns 200 OK

## Source Content

**Location**: `/Users/scotthandley/Code/R-tutorials/`

**Format**: 18 RMarkdown (.Rmd) lessons designed for posit.cloud

**Structure**: 5 blocks covering:
1. Core Foundations (Lessons 1-6): tidyverse basics
2. Essential Tools (Lessons 7-9): stringr, lubridate, reproducibility
3. Statistics & Modeling (Lessons 10-11): tests, linear models
4. Advanced Methods (Lessons 12-15): purrr, nesting, tidymodels
5. Biological Applications (Lessons 16-18): RNA-seq, microbiome, metagenomics

## Proposed Reference Guide Structure

Extract and reorganize content by topic/function rather than sequential lessons:

```
content/r/
├── index.mdx                     # Overview & learning path
├── meta.json                     # Navigation (created)
│
├── foundations.mdx               # R basics, tidyverse intro
│
├── data-manipulation.mdx         # dplyr: filter, select, mutate, group_by, summarise
├── data-reshaping.mdx            # tidyr: pivot_longer, pivot_wider, nest
├── data-joining.mdx              # dplyr joins: left_join, inner_join, etc.
│
├── visualization.mdx             # ggplot2: grammar of graphics, geoms, themes
├── advanced-ggplot.mdx           # Faceting, custom themes, complex plots
│
├── string-manipulation.mdx       # stringr: str_detect, str_extract, regex
├── date-time.mdx                 # lubridate: parsing, arithmetic, time series
├── functional-programming.mdx    # purrr: map, map2, safely, list columns
│
├── statistical-testing.mdx       # rstatix, broom, hypothesis tests
├── linear-models.mdx             # lm, glm, model diagnostics
├── machine-learning.mdx          # tidymodels: workflow, tuning, evaluation
│
├── reproducible-research.mdx     # RMarkdown, here package, renv
│
├── rnaseq-analysis.mdx          # RNA-seq workflows: PCA, DE, visualization
├── microbiome-analysis.mdx      # 16S: diversity, composition, abundance
└── metagenomics-analysis.mdx    # Shotgun: functional annotation, pathways
```

## Content Extraction Guidelines

For each topic page:

### 1. Structure
```mdx
---
title: "Topic Name"
description: "Concise description (50-160 chars)"
---

# Topic Name

Brief introduction explaining what this topic covers.

## Key Concepts

Core concepts explained clearly.

## Essential Functions

### function_name()

**Purpose**: What it does

**Syntax**:
```r
function_name(arg1, arg2, ...)
```

**Example with biological data**:
```r
# Real biological example
```

**Common use cases**:
- Use case 1
- Use case 2

## Practical Example

Complete workflow showing the concept in action with biological data.

## See Also

- Related topics in this guide
- Link to full interactive course for practice

## Resources

- Relevant tidyverse documentation
- Biological examples
```

### 2. Extraction Process

**From lessons → To reference**:
1. **Extract concepts**: Take conceptual explanations
2. **Extract syntax**: Function signatures and parameters
3. **Extract examples**: Real biological code examples
4. **Reorganize**: Group by function/tool, not lesson sequence
5. **Cross-link**: Link related topics within guide
6. **Link to course**: Add callouts linking to full course for practice

### 3. What to Include

✅ **Include**:
- Function syntax and parameters
- Biological examples and use cases
- Conceptual explanations
- Best practices and common patterns
- Workflows and pipelines
- Links to interactive course

❌ **Exclude** (keep in full course):
- Homework assignments
- Step-by-step exercises
- Pedagogical scaffolding
- Linear lesson structure
- Beginner hand-holding

## Full Course Preservation

The 18-lesson RMarkdown course should remain available:

**Options**:
1. Keep in R-tutorials repository (current)
2. Deploy to GitHub Pages with RMarkdown
3. Host on posit.cloud as shared project
4. Link from docs with "For complete interactive course..."

**Cross-linking**:
- Docs → Course: "Practice interactively with the full course"
- Course → Docs: "Quick reference available at docs.evomics.org/r"

## Next Steps

### Phase 2: Content Creation (Upcoming)

1. **Start with foundations** (1-2 pages)
   - R basics and tidyverse introduction
   - Getting started with RStudio

2. **Core tidyverse** (3-4 pages)
   - Data manipulation (dplyr)
   - Data reshaping (tidyr)
   - Visualization (ggplot2)

3. **Specialized tools** (2-3 pages)
   - String manipulation (stringr)
   - Date/time (lubridate)
   - Functional programming (purrr)

4. **Statistical analysis** (2-3 pages)
   - Hypothesis testing
   - Linear models
   - Machine learning (tidymodels)

5. **Biological workflows** (3 pages)
   - RNA-seq analysis
   - Microbiome analysis
   - Metagenomics analysis

### Estimated Effort

- **Infrastructure**: ✅ Complete (2 hours)
- **Content extraction**: ~20-30 hours
  - Extract and reorganize from 18 lessons
  - Write connective tissue and transitions
  - Create biological examples
  - Test all code snippets
- **Review and polish**: ~5-10 hours

### Success Criteria

Reference guide is successful when:
- ✅ Users can quickly look up syntax
- ✅ Examples use real biological data
- ✅ Clear navigation by function/topic
- ✅ Links to full course for deep learning
- ✅ Complements (not duplicates) course
- ✅ Follows CONTRIBUTING.md standards

## Integration with Ecosystem

**Evomics Learn** (learn.evomics.org):
- Interactive terminal practice
- Real-time feedback
- UNIX-focused currently
- Could potentially add R console in future

**Evomics Docs** (docs.evomics.org):
- Reference documentation
- UNIX guide ✅ Live
- R guide 🚧 Infrastructure complete, content in progress
- Future: Virome, Statistics, ML guides

**R Course** (R-tutorials):
- 18-lesson comprehensive curriculum
- Interactive RMarkdown on posit.cloud
- Homework and exercises
- Remains separate from docs

## Questions to Consider

1. **Course deployment**: Where should the full 18-lesson course live?
   - Keep in R-tutorials repo only?
   - Deploy to GitHub Pages?
   - Host on posit.cloud?

2. **Content priority**: Which topics to extract first?
   - Start with most-used (dplyr, ggplot2)?
   - Or foundations first (R basics)?

3. **Biological examples**: Source for datasets?
   - Extract from lessons?
   - Create new small examples?
   - Link to external data?

## Notes

- Infrastructure complete as of October 19, 2025
- Following GUIDE_TEMPLATE.md standards
- Using CONTRIBUTING.md content guidelines
- Route tested and working: http://localhost:3000/r
- Ready for content extraction phase
