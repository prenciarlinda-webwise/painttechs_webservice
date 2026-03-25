import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Cabinet Painting Gallery - Before & After Photos Jacksonville FL',
  description: 'See our cabinet painting and refinishing transformations. Before and after photos of kitchen cabinet makeovers in Jacksonville and Northeast Florida.',
  path: '/gallery/cabinet',
});

export default function CabinetGalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
