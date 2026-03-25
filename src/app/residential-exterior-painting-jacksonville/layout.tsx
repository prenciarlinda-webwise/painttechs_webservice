import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Residential Exterior Painting Project Jacksonville FL - Before & After',
  description: 'View our residential exterior painting project in Jacksonville, FL. Before and after photos showcasing professional house painting by Paint-Techs LLC.',
  path: '/residential-exterior-painting-jacksonville',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
