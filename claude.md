# UNIX for Biologists - Development Context

## Project Overview

A comprehensive guide teaching UNIX/Linux command-line skills for biologists working with genomic data. Built with modern web technologies for an excellent learning experience.

## Tech Stack

- **Framework**: [Fumadocs](https://fumadocs.dev) - Modern documentation framework
- **Runtime**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX (Markdown + JSX)
- **Deployment**: Vercel
- **Icons**: Lucide React

## Project Structure

```
unix-for-biologists/
├── app/
│   ├── (home)/           # Landing page
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── docs/             # Documentation pages
│   │   ├── [[...slug]]/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/search/       # Search API
│   └── layout.tsx        # Root layout
├── content/
│   └── docs/             # MDX documentation files
│       ├── index.mdx
│       └── foundations.mdx
├── lib/
│   ├── source.ts         # Content source adapter
│   └── layout.shared.tsx # Shared layout config
├── examples/             # Example genomic data files
├── public/               # Static assets
└── _quarto-backup/       # Original Quarto content (for reference)
```

## Content Philosophy

**Biology-First Approach**
- Every example uses real genomic data formats (FASTA, FASTQ, GFF, VCF)
- No toy datasets - actual research scenarios
- Practical workflows that biologists encounter daily

**Progressive Learning**
1. Foundations - Essential commands and concepts
2. Text Processing - grep, sed, awk, pipelines
3. Biological Applications - File format handling
4. Advanced Topics - HPC, scripting, automation
5. Reference - One-liners library, troubleshooting

**Multi-Modal Learning Ecosystem**
- This guide: Comprehensive reference and advanced techniques
- [Evomics Learn](https://learn.evomics.org): Interactive terminal with instant feedback
- Cross-linking between reading and practice

## Content Guidelines

### Writing Style
- Clear, concise explanations
- Code examples for every concept
- Real-world bioinformatics use cases
- Links to interactive exercises on Evomics Learn

### MDX Components

Use Fumadocs components for enhanced content:

**Callouts** - For important information:
```mdx
<Callout type="info" title="Pro Tip">
Content here
</Callout>

<Callout type="warn" title="Be Careful">
Warning content
</Callout>

<Callout type="error" title="Danger">
Critical warning
</Callout>
```

**Cards** - For navigation and feature highlights:
```mdx
<Cards>
  <Card
    title="Chapter Title"
    href="/docs/chapter"
    description="Brief description"
  />
</Cards>
```

**Code Blocks** - With syntax highlighting:
````mdx
```bash
# Comment
command --option argument
```
````

### Frontmatter

Each MDX file should have:
```yaml
---
title: Chapter Title
description: Brief description for SEO and cards
icon: IconName  # Optional: Lucide icon name
---
```

## Development Workflow

### Local Development

```bash
npm install          # First time setup
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Run production build locally
```

### Content Updates

1. Edit MDX files in `content/docs/`
2. Fumadocs automatically generates types and routes
3. Hot reload shows changes instantly

### Adding New Chapters

1. Create new `.mdx` file in `content/docs/`
2. Add frontmatter with title and description
3. Write content using MDX components
4. File structure determines URL structure

## Deployment

**Platform**: Vercel

The site automatically deploys when pushing to the main branch:
- Production: Linked to `main` branch
- Preview: Automatic for all branches/PRs
- Domain: To be configured in Vercel dashboard

**Build Configuration** (handled automatically):
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

## Future Chapters to Add

### Planned Content

1. **Essential Commands** (Chapter 2)
   - Wildcards and pattern matching
   - Redirection and pipes
   - File permissions
   - Finding files

2. **Text Processing** (Chapter 3)
   - grep mastery
   - sed for text transformation
   - awk for columnar data
   - Regular expressions

3. **Power Tools** (Chapter 4)
   - Modern alternatives (fd, ripgrep, bat)
   - bioawk for biological formats
   - seqtk, csvtk
   - Parallel processing

4. **Biological Formats** (Chapter 5)
   - FASTA/FASTQ manipulation
   - GFF/GTF parsing
   - VCF processing
   - SAM/BAM basics

5. **Performance** (Chapter 6)
   - Handling large files
   - Compression strategies
   - GNU Parallel
   - Memory-efficient workflows

6. **HPC Clusters** (Chapter 7)
   - SSH and remote access
   - Job schedulers (SLURM, PBS)
   - Resource management
   - Batch processing

7. **Scripting** (Chapter 8)
   - Bash scripting fundamentals
   - Functions and arguments
   - Error handling
   - Automation

8. **One-Liners** (Chapter 9)
   - Curated bioinformatics one-liners
   - By file format (FASTA, FASTQ, GFF, VCF)
   - Common analysis patterns

9. **Troubleshooting** (Chapter 10)
   - Common errors
   - Debugging strategies
   - Performance issues
   - Getting help

### Appendices

- **Cheatsheet** - Quick reference for all commands
- **Regex Guide** - Regular expressions for biologists
- **File Formats** - Detailed format specifications

## Example Data

Store example files in `examples/` directory:
- Small, representative datasets
- Real biological data when possible
- Document source and usage rights
- Reference in code examples

## Integration with Evomics Learn

Link to interactive exercises throughout:
- Terminal basics
- Text processing
- File format manipulation
- Pipeline building

Pattern:
```mdx
<Callout title="Exercise: Topic Name">
Practice on [Evomics Learn: Exercise Name](https://learn.evomics.org/terminal?exercise=exercise-id)

1. Task description
2. Another task
</Callout>
```

## Search Functionality

Fumadocs includes built-in search:
- Automatic indexing of all content
- Keyboard shortcut: ⌘K / Ctrl+K
- API route: `/api/search/route.ts`
- No additional configuration needed

## Design Principles

**Modern & Clean**
- Inspired by constatic-docs aesthetic
- Professional, not overly playful
- Focus on readability
- Generous whitespace

**Accessible**
- Dark/light theme support
- Keyboard navigation
- Screen reader friendly
- Clear visual hierarchy

**Responsive**
- Mobile-first approach
- Touch-friendly navigation
- Readable code blocks on all devices

## Contributing

When others contribute:
1. Follow MDX content guidelines
2. Use real biological examples
3. Link to practice exercises
4. Test locally before committing
5. Keep biology-first focus

## License

MIT License - Free to use and adapt with attribution

## Related Projects

Part of the Evomics learning ecosystem:
- **Evomics Learn**: Interactive learning platform
- **R for Biologists**: R/tidyverse course
- **Future**: Microbial ecology, metagenomics, statistics, ML, virome analysis

## Acknowledgments

Built on the collective knowledge of the bioinformatics community:
- Stephen Turner's Bioinformatics One-Liners
- The Evomics Workshop series
- Fumadocs framework
- All contributors
