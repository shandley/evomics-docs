import { getLLMText, unixSource, rSource } from '@/lib/source';

export const revalidate = false;

export async function GET() {
  const unixScan = unixSource.getPages().map(getLLMText);
  const rScan = rSource.getPages().map(getLLMText);
  const scanned = await Promise.all([...unixScan, ...rScan]);

  return new Response(scanned.join('\n\n'));
}
