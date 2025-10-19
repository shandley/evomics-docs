import { unixSource } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// TODO: Add rSource when R guide content is available
export const { GET } = createFromSource(unixSource, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
});
