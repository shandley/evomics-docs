import { unixSource, rSource } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// TODO: Fumadocs search currently supports single source only
// For now using unixSource as primary. When multi-source support is available,
// combine both sources for unified search across all guides.
export const { GET } = createFromSource(unixSource, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
});
