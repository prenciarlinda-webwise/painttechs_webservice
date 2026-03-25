import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Commercial Retail Painting Renovation Jacksonville FL - Before & After',
  description: 'See our commercial retail space painting renovation in Jacksonville, FL. Before and after photos of a complete interior repaint by Paint-Techs LLC.',
  path: '/projects/commercial-retail-renovation',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
