import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Painting Project Gallery - Before & After Photos',
  description: 'Browse Paint-Techs LLC painting project gallery. See before and after photos of interior, exterior, and cabinet painting projects in Jacksonville and Northeast Florida.',
  path: '/gallery',
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
