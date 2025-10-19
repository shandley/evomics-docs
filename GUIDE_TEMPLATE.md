# Guide Template

This template provides boilerplate code and structure for adding a new guide to Evomics Documentation.

## Quick Start

Replace `{GUIDE}` with your guide name (lowercase, hyphenated):
- Examples: `virome`, `statistics`, `machine-learning`

Replace `{GuideTitle}` with your guide's display title:
- Examples: `Virome Analysis`, `Statistics for Biologists`, `Machine Learning`

Replace `{guideId}` with camelCase identifier:
- Examples: `virome`, `statistics`, `machineLearning`

## Step-by-Step Implementation

### 1. Create Content Directory

```bash
mkdir -p content/{GUIDE}
```

### 2. Create `content/{GUIDE}/index.mdx`

```mdx
---
title: {GuideTitle}
description: Brief description of what this guide covers (50-160 characters)
---

import { Card, Cards } from 'fumadocs-ui/components/card';

# {GuideTitle}

Brief introduction to the guide. Explain who it's for and what they'll learn.

## What You'll Learn

- Key concept 1
- Key concept 2
- Key concept 3
- Key concept 4

## Prerequisites

List any required knowledge or setup:

- Prerequisite 1
- Prerequisite 2

## Learning Path

Follow these chapters in order for a structured learning experience:

<Cards>
  <Card
    title="Chapter 1: Foundations"
    href="/{GUIDE}/foundations"
    description="Introduction to core concepts"
  />
  <Card
    title="Chapter 2: Next Topic"
    href="/{GUIDE}/next-topic"
    description="Building on the basics"
  />
  {/* Add more chapter cards */}
</Cards>

## Additional Resources

- [External Resource 1](https://example.com)
- [External Resource 2](https://example.com)
```

### 3. Create `content/{GUIDE}/meta.json`

```json
{
  "title": "{GuideTitle}",
  "pages": [
    "index",
    "---Getting Started---",
    "foundations",
    "---Core Concepts---",
    "chapter2",
    "chapter3",
    "---Advanced Topics---",
    "advanced-topic"
  ]
}
```

### 4. Create Sample Chapter: `content/{GUIDE}/foundations.mdx`

```mdx
---
title: "Foundations"
description: "Introduction to core concepts of {GuideTitle}"
---

import { Callout } from 'fumadocs-ui/components/callout';

# Foundations

Brief chapter introduction.

## Section 1

Content here with explanations.

<Callout type="info">
Important information to remember
</Callout>

## Section 2

More content with code examples:

```bash
# Example command
command --option value
```

## Practical Example

Detailed example demonstrating the concepts:

```r
# R code example
library(tidyverse)
data %>% filter(value > 10)
```

## Exercises

1. Exercise 1
2. Exercise 2
3. Exercise 3

## Summary

Recap of what was covered in this chapter.

## Next Steps

Continue to [Next Chapter](./next-chapter) to learn about...
```

### 5. Update `source.config.ts`

Add your guide definition:

```typescript
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';

// ... existing guides (unix, r)

export const {guideId} = defineDocs({
  dir: 'content/{GUIDE}',
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

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
```

### 6. Update `lib/source.ts`

Add the loader for your guide:

```typescript
import { unix, r, {guideId} } from '@/.source';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

// ... existing loaders (unixSource, rSource)

// {GuideTitle} documentation
export const {guideId}Source = loader({
  baseUrl: '/{GUIDE}',
  source: {guideId}.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});
```

### 7. Create `app/{GUIDE}/[[...slug]]/page.tsx`

```typescript
import type { Metadata } from 'next';
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { {guideId}Source } from '@/lib/source';
import { getMDXComponents } from 'fumadocs-ui/mdx';
import { createRelativeLink } from '@/utils/mdx/relative-link';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = {guideId}Source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink({guideId}Source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return {guideId}Source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const page = {guideId}Source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
```

### 8. Create `app/{GUIDE}/layout.tsx`

```typescript
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/lib/layout.shared';
import { {guideId}Source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={{guideId}Source.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
```

### 9. Create `app/og/{GUIDE}/[...slug]/route.tsx`

```typescript
import { {guideId}Source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';

export const revalidate = false;

interface RouteContext {
  params: Promise<{ slug: string[] }>;
}

export async function GET(_req: Request, context: RouteContext) {
  const { slug } = await context.params;
  const page = {guideId}Source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    (
      <DefaultImage
        title={page.data.title}
        description={page.data.description}
        site="Evomics Documentation"
      />
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return {guideId}Source.getPages().map((page) => {
    const segments = [...page.slugs, 'image.png'];
    return {
      slug: segments,
    };
  });
}
```

### 10. Update `app/(home)/page.tsx`

Add your guide card to the landing page:

```typescript
<GuideCard
  icon={<YourIcon className="w-8 h-8" />}
  title="{GuideTitle}"
  description="Brief description of the guide"
  href="/{GUIDE}"
  status="available"  // or "coming-soon"
  topics={['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4']}
/>
```

### 11. Update Search (When Content Ready)

When you have content ready, update `app/api/search/route.ts`:

```typescript
import { unixSource, rSource, {guideId}Source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Note: Search currently supports single source
// Will need to combine sources when Fumadocs supports multi-source search
export const { GET } = createFromSource({guideId}Source, {
  language: 'english',
});
```

### 12. Update LLM Route (Optional)

If you want to include in the LLM text export (`app/llms-full.txt/route.ts`):

```typescript
import { getLLMText, unixSource, rSource, {guideId}Source } from '@/lib/source';

export const revalidate = false;

export async function GET() {
  const unixScan = unixSource.getPages().map(getLLMText);
  const rScan = rSource.getPages().map(getLLMText);
  const {guideId}Scan = {guideId}Source.getPages().map(getLLMText);
  const scanned = await Promise.all([...unixScan, ...rScan, ...{guideId}Scan]);

  return new Response(scanned.join('\n\n'));
}
```

## Testing Checklist

Before committing:

- [ ] Run `npm run dev` - dev server starts without errors
- [ ] Visit `http://localhost:3000` - landing page shows new guide card
- [ ] Visit `http://localhost:3000/{GUIDE}` - guide homepage renders
- [ ] Navigate through chapters - all links work
- [ ] Test search (⌘K) - new content appears in results
- [ ] Run `npm run build` - build completes successfully
- [ ] Check OG images generate correctly

## Common Icons

Import from `lucide-react`:

```typescript
import {
  Terminal,        // UNIX/CLI
  BarChart3,       // Statistics/R
  Dna,             // Genomics/Virome
  Brain,           // Machine Learning
  Database,        // Data Science
  Microscope,      // Biology
  FlaskConical,    // Lab/Experiments
  GitBranch,       // Version Control
  Code,            // Programming
  BookOpen         // General Learning
} from 'lucide-react';
```

## File Structure Summary

After completing all steps, your guide should have:

```
content/{GUIDE}/
├── index.mdx
├── meta.json
├── foundations.mdx
└── [other chapters].mdx

app/{GUIDE}/
├── [[...slug]]/
│   └── page.tsx
└── layout.tsx

app/og/{GUIDE}/
└── [...slug]/
    └── route.tsx
```

## Need Help?

- Review the UNIX guide implementation for a complete example
- Check CONTRIBUTING.md for detailed standards
- Open an issue if you have questions
