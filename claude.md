# UNIX for Biologists - Development Context

## Project Overview

Comprehensive UNIX/command-line guide for biologists and bioinformaticians. Part of the Evomics Learning Ecosystem with multi-modal teaching approach.

## Tech Stack

- **Quarto** (v1.3+) - Book framework with multi-format output (HTML, PDF, ePub)
- **Markdown/QMD** - Chapter content format
- **GitHub Pages** - Hosting for HTML version
- **YAML** - Configuration (_quarto.yml)

## Architecture

### Multi-Modal Learning System

This guide is one component of an integrated learning ecosystem:

```
Evomics Learning Ecosystem
├── Interactive Exercises (learn.evomics.org)
│   ├── UNIX Terminal (implemented)
│   ├── R Console via WebR (in development)
│   └── Future: Python notebooks, specialized tools
├── Written Guides (GitHub repos)
│   ├── unix-for-biologists (this repo)
│   ├── r-tidyverse-for-biologists
│   └── Future: microbial-ecology, metagenomics, ML, virome, AI-for-bioinformatics
└── Presentations/Videos (future)
    └── Slides, screencasts, lectures
```

### Learning Flow

```
Read Guide → Practice Exercises → Reference Guide → Apply to Research
    ↓              ↓                    ↓                 ↓
  WHY            HOW               WHEN/WHERE         MASTERY
```

## Key Design Decisions

### Biology-First Approach

- Every concept illustrated with genomic data examples
- No toy datasets - real FASTA, FASTQ, GFF, VCF files
- Examples mirror actual research workflows
- Target audience: wet lab biologists transitioning to computational work

### Progressive Complexity

**Foundations (Ch 1-2):** Essential commands and navigation
**Text Processing (Ch 3-4):** grep/sed/awk + modern alternatives
**Biological Applications (Ch 5-6):** Real file formats and performance
**Advanced (Ch 7-8):** HPC clusters and scripting
**Reference (Ch 9-10):** One-liners library and troubleshooting

### Integration with evomics-learn

Each chapter cross-links to relevant interactive exercises:

```markdown
::: {.callout-note}
## Practice This Concept
Complete [Exercise 5: File Processing](https://learn.evomics.org/terminal?exercise=file-processing)
:::
```

Exercises link back to guide for advanced concepts:
```typescript
successMessage: () =>
  "For advanced techniques, see Guide Chapter 4: Power Tools"
```

### Modern Tools Focus

Beyond traditional grep/awk, cover:
- **bioawk** - awk for biological formats
- **seqtk** - FASTA/FASTQ manipulation
- **csvtk/miller** - Modern CSV/TSV tools
- **parallel** - Parallel processing
- **pigz** - Parallel compression
- **jq** - JSON parsing for API data

## File Structure

```
unix-for-biologists/
├── _quarto.yml              # Quarto configuration
├── index.qmd                # Book homepage
├── chapters/                # Main content
│   ├── 01-foundations.qmd
│   ├── 02-essential-commands.qmd
│   ├── 03-text-processing.qmd
│   ├── 04-power-tools.qmd
│   ├── 05-biological-formats.qmd
│   ├── 06-performance.qmd
│   ├── 07-hpc-clusters.qmd
│   ├── 08-scripting.qmd
│   ├── 09-oneliners.qmd
│   └── 10-troubleshooting.qmd
├── appendices/              # Reference materials
│   ├── cheatsheet.qmd
│   ├── regex-guide.qmd
│   └── file-formats.qmd
├── examples/                # Sample data and scripts
│   ├── data/
│   └── scripts/
├── _site/                   # Generated output (gitignored)
├── references.bib           # Bibliography
└── styles.css               # Custom styles
```

## Content Guidelines

### Writing Style

- Concise and practical
- Assume biology background, not CS background
- Explain "why" not just "how"
- Show expected output for examples
- Include common pitfalls and troubleshooting

### Code Examples

Always include:
```bash
# Comment explaining what this does
command --option argument
```

Show output when helpful:
```bash
$ grep "^>" sequences.fasta | wc -l
1234
```

Use callouts for important points:
```markdown
::: {.callout-warning}
## Dangerous Command
`rm -rf` is permanent. No undo!
:::

::: {.callout-tip}
## Pro Tip
Use Tab completion to avoid typos
:::

::: {.callout-note}
## Practice Exercise
Try this on [Evomics Learn](https://learn.evomics.org/terminal)
:::
```

### Biological Examples

Prefer real genomic scenarios:
- Counting sequences in FASTA files
- Filtering VCF by quality score
- Extracting genes from GFF annotations
- Processing paired-end FASTQ files
- Calculating coverage statistics
- Batch processing multiple samples

Avoid generic examples like "processing customer data" or "analyzing logs"

## Chapter 9: One-Liners Strategy

### Sources

1. **Stephen Turner's collection** - https://github.com/stephenturner/oneliners
   - Start with this as foundation
   - Cite properly in chapter
   - Curate: remove outdated or less useful ones

2. **Novel contributions**
   - LLM-generated one-liners for modern tools
   - Community suggestions via GitHub issues
   - Patterns from real bioinformatics workflows

### Organization

Group by use case:
- FASTA/FASTQ manipulation
- GFF/GTF/BED parsing
- VCF filtering and analysis
- Quality control
- Format conversions
- Parallel processing
- Statistical summaries
- Performance optimization

### Format

For each one-liner:
```markdown
### Count sequences longer than 500bp

```bash
bioawk -c fastx '{ if(length($seq) > 500) print ">"$name"\n"$seq }' input.fasta | grep -c "^>"
```

**What it does:** Filters FASTA to sequences >500bp and counts them

**When to use:** Quality control, pre-filtering for assembly

**Performance:** Fast even on large files (streaming, no sort)

**Variations:**
- Change 500 to any threshold
- Use `>` output.fasta to save filtered sequences
```

## Future Expansion

This repo is designed to be part of a growing ecosystem:

### Planned Guides

- **microbial-ecology-guide** - 16S/18S analysis, diversity metrics, QIIME2 workflows
- **metagenomics-guide** - Assembly, binning, taxonomic/functional profiling
- **statistics-for-biologists** - R-based stats complementing r-tidyverse repo
- **ml-for-genomics** - Machine learning applications in genomics
- **virome-analysis** - Viral metagenomics and discovery
- **ai-for-bioinformatics** - Using LLMs and AI tools for analysis

### Expansion Strategy

Each guide follows same pattern:
1. Separate GitHub repository
2. Quarto-based book
3. Integration with evomics-learn interactive exercises
4. Cross-linking between guides
5. Unified landing page at learn.evomics.org

### evomics-learn Roadmap

Current: UNIX terminal + basic R console
Planned:
- Python/Jupyter notebook environment
- Specialized analysis tools (alignment viewers, tree visualization)
- AWS backend for compute-intensive analyses
- Course progress tracking across all modules
- Instructor dashboard for workshops

## Development Workflow

### Adding Content

1. Edit .qmd files in chapters/
2. Preview locally: `quarto preview`
3. Commit changes
4. Push to GitHub (auto-deploys via GitHub Actions)

### Adding Examples

1. Add sample data to examples/data/
2. Add scripts to examples/scripts/
3. Reference from chapters with relative paths
4. Keep data files small (<1MB each)

### Adding Citations

1. Add entry to references.bib
2. Cite in text: `[@turnerOneliners2014]`
3. Bibliography auto-generated by Quarto

## Publishing

### GitHub Pages

Automated via `.github/workflows/publish.yml`:
```yaml
- name: Render and Publish
  uses: quarto-dev/quarto-actions/publish@v2
  with:
    target: gh-pages
```

Manual publish:
```bash
quarto publish gh-pages
```

### PDF Generation

```bash
quarto render --to pdf
```

Requires tinytex or full LaTeX installation.

## Common Issues

**Quarto not found:** Install from https://quarto.org/docs/get-started/

**Build fails:** Check YAML syntax in _quarto.yml (indentation matters)

**Cross-references broken:** Ensure section headers have unique IDs

**Images not showing:** Use relative paths from project root

**PDF errors:** Install tinytex: `quarto install tinytex`

## Version Information

- Quarto: 1.3+
- Target audience: Biology graduate students, postdocs, bioinformaticians
- License: MIT (open for educational use)
- Citation format: Provided in README.md
