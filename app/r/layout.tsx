import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { rSource } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/r'>) {
  return (
    <DocsLayout tree={rSource.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
