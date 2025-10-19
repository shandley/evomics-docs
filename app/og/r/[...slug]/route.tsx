import { rSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/r/[...slug]'>,
) {
  const { slug } = await params;
  const page = rSource.getPage(slug.slice(0, -1));
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
  return rSource.getPages().map((page) => {
    const segments = [...page.slugs, 'image.png'];
    return {
      lang: page.locale,
      slug: segments,
    };
  });
}
