import { Metadata } from 'next';
import { Hero, Services, Stats, About, ServiceAreas } from '@/components/sections';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import JsonLd from '@/components/seo/JsonLd';
import { generateMetadata } from '@/lib/metadata';
import { generateHomePageSchema } from '@/lib/schema';

export const metadata: Metadata = generateMetadata({
  title: 'Professional Painting Services Jacksonville FL | Paint-Techs LLC',
  description: 'Paint-Techs LLC is Jacksonville\'s premier painting contractor. Expert interior, exterior, cabinet & commercial painting services. Licensed, insured, 5-star rated. Get a free quote today!',
  path: '/',
});

export default function HomePage() {
  const schemas = generateHomePageSchema();

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <Hero />
      <Services />
      <Stats />
      <About />
      <ServiceAreas />
      <WhatsAppCTA />
    </>
  );
}
