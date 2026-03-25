import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Exterior Painting Gallery - Before & After Photos Jacksonville FL',
  description: 'Browse our exterior house painting portfolio. Before and after photos of home exteriors throughout Jacksonville and Northeast Florida.',
  path: '/gallery/exterior',
});

export default function ExteriorGalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
