import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { unixSource } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/unix'>) {
  return (
    <DocsLayout tree={unixSource.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
