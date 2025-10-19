# Contributing to Evomics Documentation

Thank you for your interest in contributing to the Evomics Documentation project! This guide will help you understand our standards and workflow.

## Project Overview

This repository hosts comprehensive documentation for computational biology and bioinformatics education, including:

- UNIX for Biologists
- R for Biologists
- Virome Analysis (coming soon)
- Statistics for Biologists (coming soon)
- Additional guides as the curriculum expands

**Technology Stack:**
- Framework: Fumadocs (Next.js 15, React 19)
- Language: TypeScript
- Styling: Tailwind CSS
- Content: MDX (Markdown + JSX)
- Deployment: Vercel
- Domain: https://docs.evomics.org

## Development Standards

### 1. Adding a New Guide

Each guide should follow this standardized structure:

```
content/
  └── {guide-name}/           # e.g., unix, r, virome, stats
      ├── index.mdx           # Guide homepage with learning path
      ├── meta.json           # Navigation structure
      ├── chapter1.mdx        # Individual chapters/lessons
      ├── chapter2.mdx
      └── ...
```

**Process:**

1. **Create content directory**: `content/{guide-name}/`
2. **Define in source.config.ts**:
   ```typescript
   export const {guideName} = defineDocs({
     dir: 'content/{guide-name}',
     docs: {
       schema: frontmatterSchema,
       postprocess: {
         includeProcessedMarkdown: true,
       },
     },
     meta: {
       schema: metaSchema,
     },
   });
   ```

3. **Create loader in lib/source.ts**:
   ```typescript
   export const {guideName}Source = loader({
     baseUrl: '/{guide-name}',
     source: {guideName}.toFumadocsSource(),
     plugins: [lucideIconsPlugin()],
   });
   ```

4. **Create route structure**:
   - `app/{guide-name}/[[...slug]]/page.tsx` - Dynamic page handler
   - `app/{guide-name}/layout.tsx` - Guide layout with navigation
   - `app/og/{guide-name}/[...slug]/route.tsx` - OG image generation

5. **Add to landing page**: Update `app/(home)/page.tsx` with new guide card

### 2. Content Standards

#### Frontmatter Requirements

Every MDX file must include frontmatter with at minimum:

```mdx
---
title: "Clear, Descriptive Title"
description: "Concise description for SEO and cards (50-160 characters)"
---
```

Optional frontmatter fields:
- `icon`: Lucide icon name (e.g., "Terminal", "BarChart3")
- `full`: Boolean for full-width layout
- `toc`: Boolean to show/hide table of contents

#### File Naming Conventions

- Use lowercase with hyphens: `file-system-basics.mdx`
- Be descriptive but concise
- Order chapters numerically if sequential: `01-foundations.mdx`, `02-text-processing.mdx`

#### Content Structure

1. **Start with context**: Brief introduction to what the reader will learn
2. **Use headings hierarchically**: H1 for title (auto-generated), H2 for sections, H3 for subsections
3. **Include examples**: Code blocks with language specification
4. **Use callouts for important information**:
   ```mdx
   <Callout type="info">
   This is important information
   </Callout>
   ```
   Types: `info`, `warning`, `danger`, `success`

5. **Link to related content**: Use relative links for internal navigation
6. **End with exercises or next steps**: Help readers apply what they learned

#### Code Block Standards

Always specify the language for syntax highlighting:

````mdx
```bash
ls -lh /path/to/directory
```

```r
library(tidyverse)
data %>% filter(value > 10)
```

```typescript
const result = await fetchData();
```
````

### 3. Navigation Structure (meta.json)

Each guide's `meta.json` defines sidebar navigation:

```json
{
  "title": "Guide Name",
  "pages": [
    "index",
    "---Foundations---",
    "chapter1",
    "chapter2",
    "---Advanced Topics---",
    "chapter3"
  ]
}
```

- Use `"---Section Name---"` for section headers
- List pages in order of learning progression
- File names without `.mdx` extension

### 4. Git Workflow

#### Branch Naming

- Feature: `feature/unix-chapter-5`
- Bug fix: `fix/broken-link-in-r-guide`
- Content: `content/add-virome-introduction`
- Docs: `docs/update-contributing-guide`

#### Commit Messages

Follow conventional commits:

```
type(scope): brief description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature or content
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `content`: Content additions/updates
- `chore`: Maintenance tasks

Examples:
```
feat(unix): add advanced text processing chapter
fix(r): correct broken link in tidyverse section
content(virome): add metagenomic assembly tutorial
docs: update contributing guidelines
```

#### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes following these standards
3. Test locally: `npm run dev` and verify all pages render correctly
4. Build test: `npm run build` must succeed
5. Create PR with clear title and description
6. Request review from maintainer
7. Address feedback
8. Squash and merge when approved

### 5. Code Quality Standards

#### TypeScript

- Use TypeScript for all `.ts` and `.tsx` files
- Enable strict mode
- Define types explicitly, avoid `any`
- Use interfaces for props and data structures

#### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable components to `components/` directory
- Use proper TypeScript types for props

#### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use theme colors from Tailwind config

### 6. Testing Standards

Before submitting:

- [ ] Development server runs without errors: `npm run dev`
- [ ] Build completes successfully: `npm run build`
- [ ] All links work correctly (no 404s)
- [ ] Content renders properly on desktop and mobile
- [ ] Code examples are accurate and tested
- [ ] Images and assets load correctly
- [ ] Search functionality includes new content
- [ ] OG images generate correctly

### 7. Accessibility Standards

- Use semantic HTML
- Include alt text for all images
- Ensure sufficient color contrast
- Support keyboard navigation
- Use ARIA labels where appropriate
- Test with screen reader if possible

### 8. Performance Guidelines

- Optimize images before committing (use WebP when possible)
- Minimize bundle size (avoid unnecessary dependencies)
- Use Next.js Image component for images
- Lazy load heavy components
- Keep MDX files focused (split long content into chapters)

## Quick Reference Checklist

When adding a new guide:

- [ ] Created content directory: `content/{guide-name}/`
- [ ] Added definition to `source.config.ts`
- [ ] Created loader in `lib/source.ts`
- [ ] Created route handler: `app/{guide-name}/[[...slug]]/page.tsx`
- [ ] Created layout: `app/{guide-name}/layout.tsx`
- [ ] Created OG route: `app/og/{guide-name}/[...slug]/route.tsx`
- [ ] Added guide card to `app/(home)/page.tsx`
- [ ] Updated search to include new source (if content ready)
- [ ] Created `index.mdx` with learning path
- [ ] Created `meta.json` for navigation
- [ ] Added content following standards above
- [ ] Tested locally
- [ ] Build succeeds
- [ ] Created PR with clear description

## Getting Help

- Review existing guides (UNIX, R) for examples
- Check `GUIDE_TEMPLATE.md` for boilerplate structure
- Open an issue for questions or suggestions
- Contact maintainers: Scott Handley

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).
