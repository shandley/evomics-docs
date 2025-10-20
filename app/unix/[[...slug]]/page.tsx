import { getPageImage, unixSource } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';

export default async function Page(props: PageProps<'/unix/[[...slug]]'>) {
  const params = await props.params;
  const page = unixSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  // Filter TOC to include H2 and H3 headings (depth 2 and 3)
  const filteredToc = page.data.toc?.filter((item) => item.depth <= 3) || [];

  return (
    <DocsPage toc={filteredToc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(unixSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return unixSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/unix/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = unixSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
