import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Interior Painting Gallery - Before & After Photos Jacksonville FL',
  description: 'View our interior painting project gallery. Room transformations, color choices, and finished results from homes in Jacksonville and Northeast Florida.',
  path: '/gallery/interior',
});

export default function InteriorGalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
