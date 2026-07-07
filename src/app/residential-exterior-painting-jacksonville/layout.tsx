import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

// Retargeted 2026-07-07: original title was 70 chars (over the 50-60 target) and the
// page had no pricing, FAQ, or AEO content despite being a service-led combo page per
// the page-seo skill (pricing transparency is mandatory on that branch).
export const metadata: Metadata = generateMetadata({
  title: 'Residential Exterior Painting Jacksonville, FL - Paint-Techs',
  description: 'Residential exterior painting in Jacksonville, FL: real before-and-after photos, our process, and $4,000-15,000 pricing. Free quotes: (904) 762-7062',
  path: '/residential-exterior-painting-jacksonville',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
