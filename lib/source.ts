import { unix, r } from '@/.source';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

// UNIX for Biologists documentation
export const unixSource = loader({
  baseUrl: '/unix',
  source: unix.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

// R for Biologists documentation (placeholder for future)
export const rSource = loader({
  baseUrl: '/r',
  source: r.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

// Helper functions
export function getPageImage(page: InferPageType<typeof unixSource>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/unix/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof unixSource>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
