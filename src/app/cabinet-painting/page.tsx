import { Metadata } from 'next';
import ServicePageContent from '@/components/pages/ServicePageContent';
import { getServiceBySlug } from '@/data/services';
import { BUSINESS_INFO } from '@/lib/constants';

const slug = 'cabinet-painting';
const service = getServiceBySlug(slug)!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: `${BUSINESS_INFO.website}/${slug}` },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: `${BUSINESS_INFO.website}/${slug}`,
    siteName: BUSINESS_INFO.name,
    locale: 'en_US',
    type: 'website',
  },
};

export default function CabinetPaintingPage() {
  return <ServicePageContent slug={slug} />;
}
