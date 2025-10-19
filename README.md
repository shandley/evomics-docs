# Evomics Documentation

**Comprehensive guides for computational biology and bioinformatics education**

Master the essential computational skills for modern biological research. From command-line genomics to statistical analysis in R, these guides transform wet lab biologists into computational powerhouses.

🌐 **Live Site**: [docs.evomics.org](https://docs.evomics.org)

## Available Guides

### 🖥️ UNIX for Biologists
**Command-Line Genomics from Beginner to Expert**

Master the command line for genomic data analysis. From basic navigation to advanced bioinformatics workflows using real biological data formats (FASTA, FASTQ, GFF, VCF).

[Browse UNIX Guide](https://docs.evomics.org/unix) →

**Topics Covered:**
- Essential commands and file system navigation
- Text processing (grep, sed, awk, bioawk)
- Working with genomic data formats
- HPC cluster workflows
- Bash scripting and automation

### 📊 R for Biologists
**Data Analysis and Visualization with the Tidyverse** (Coming Soon)

Learn modern R programming for biological data analysis, from data wrangling to publication-quality visualizations.

**Topics Covered:**
- tidyverse ecosystem (dplyr, ggplot2, tidyr)
- Statistical analysis for biological experiments
- RNA-seq and genomics data workflows
- Publication-ready visualizations
- Reproducible research with R Markdown

### 🧬 Virome Analysis
**Computational Methods for Viral Metagenomics** (Coming Soon)

Comprehensive guide to analyzing viral communities from metagenomic data.

### 📈 Statistics for Biologists
**Statistical Methods for Biological Research** (Coming Soon)

Essential statistical concepts and methods for designing and analyzing biological experiments.

## Who These Guides Are For

- Biology graduate students starting computational work
- Wet lab biologists moving into bioinformatics
- Bioinformaticians leveling up their skills
- Anyone working with biological data computationally

No programming experience required. Familiarity with basic biology assumed.

## Features

- **Biology-First Approach**: All examples use real biological data, not toy datasets
- **Modern Toolchain**: Learn current best practices and tools
- **Beginner to Expert**: Structured learning paths from fundamentals to advanced topics
- **Interactive Practice**: Links to hands-on exercises on [Evomics Learn](https://learn.evomics.org)
- **Searchable**: Fast, comprehensive search across all guides (⌘K)
- **Mobile Friendly**: Responsive design for learning anywhere

## Part of the Evomics Ecosystem

This documentation is one component of a multi-modal learning system:

- **[Evomics Learn](https://learn.evomics.org)** - Interactive terminal with instant feedback
- **[Evomics Docs](https://docs.evomics.org)** - Comprehensive reference guides (this site)
- **Evomics Workshops** - In-person and virtual training programs

## Technology Stack

Built with modern web technologies for fast, maintainable documentation:

- **Framework**: [Fumadocs](https://fumadocs.dev) (Next.js 15, React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX (Markdown + JSX components)
- **Deployment**: Vercel
- **Search**: Built-in full-text search

## Development

### Prerequisites

- Node.js 18+ and npm
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/shandley/evomics-docs.git
cd evomics-docs

# Install dependencies
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the documentation.

### Build for Production

```bash
npm run build
npm run start
```

### Project Structure

```
evomics-docs/
├── app/                    # Next.js app directory
│   ├── (home)/            # Landing page
│   ├── unix/              # UNIX guide routes
│   ├── r/                 # R guide routes
│   ├── api/search/        # Search API
│   └── og/                # Open Graph image generation
├── content/               # MDX content
│   ├── unix/             # UNIX for Biologists content
│   ├── r/                # R for Biologists content
│   └── [other guides]/   # Future guide content
├── lib/                   # Shared utilities
│   ├── source.ts         # Documentation source loaders
│   └── layout.shared.tsx # Shared layout configuration
├── source.config.ts       # Documentation collection definitions
├── CONTRIBUTING.md        # Contribution guidelines
└── GUIDE_TEMPLATE.md      # Template for adding new guides
```

## Contributing

We welcome contributions! Whether you've found an error, have a suggestion, or want to add content:

1. Read [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines
2. Check [GUIDE_TEMPLATE.md](./GUIDE_TEMPLATE.md) if adding a new guide
3. Open an issue or pull request

**Quick Links:**
- [Open an issue](https://github.com/shandley/evomics-docs/issues)
- [Submit a pull request](https://github.com/shandley/evomics-docs/pulls)
- [Start a discussion](https://github.com/shandley/evomics-docs/discussions)

## Adding a New Guide

Want to add a new guide to the ecosystem? Follow these steps:

1. Review [GUIDE_TEMPLATE.md](./GUIDE_TEMPLATE.md) for the complete process
2. Create content directory: `content/{guide-name}/`
3. Define the guide in `source.config.ts`
4. Create route handlers in `app/{guide-name}/`
5. Add guide card to landing page
6. Follow standards in [CONTRIBUTING.md](./CONTRIBUTING.md)

See the UNIX and R guides for complete examples.

## License

MIT License. Free to use and adapt with attribution.

[View full license](LICENSE)

## Acknowledgments

Built on the collective knowledge of the bioinformatics community:

- Stephen Turner's [Bioinformatics One-Liners](https://github.com/stephenturner/oneliners)
- The Evomics Workshop series and community
- All contributors to this project
- The open-source bioinformatics community

## Support

- **Documentation Issues**: [GitHub Issues](https://github.com/shandley/evomics-docs/issues)
- **Questions**: [GitHub Discussions](https://github.com/shandley/evomics-docs/discussions)
- **Evomics Program**: [evomics.org](https://evomics.org)

---

Built with ❤️ for the bioinformatics community
