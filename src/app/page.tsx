import { Metadata } from 'next';
import { Hero, Services, Stats, About, ServiceAreas, Testimonials, HomeFAQ } from '@/components/sections';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import JsonLd from '@/components/seo/JsonLd';
import { generateHomePageSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { BUSINESS_INFO } from '@/lib/constants';

// Homepage FAQ data for schema and display
const homepageFAQs = [
  {
    question: 'How much do painters near me charge in Jacksonville?',
    answer: 'Professional painting costs in Jacksonville vary based on project scope, surface condition, and paint quality. Paint-Techs LLC provides free, detailed estimates with transparent pricing and no hidden fees. Contact us for an accurate quote for your specific project.',
  },
  {
    question: 'How do I find reliable house painters near me?',
    answer: 'Look for licensed and insured painting contractors with strong Google reviews, like Paint-Techs LLC with 50+ five-star reviews. Ask for references, get multiple quotes, and verify they use quality paints from brands like Sherwin-Williams or Benjamin Moore.',
  },
  {
    question: 'What painting services does Paint-Techs offer in Jacksonville?',
    answer: 'Paint-Techs LLC offers comprehensive painting services including interior painting, exterior house painting, cabinet refinishing, and commercial painting. We serve Jacksonville, Nocatee, Ponte Vedra Beach, St. Augustine, and all of Northeast Florida.',
  },
  {
    question: 'How long does it take to paint a house in Jacksonville?',
    answer: 'Interior painting typically takes 2-5 days depending on home size. Exterior painting takes 3-7 days. Cabinet painting requires 3-5 days. Paint-Techs works efficiently while ensuring premium results that last.',
  },
  {
    question: 'Are your Jacksonville painters licensed and insured?',
    answer: 'Yes, Paint-Techs LLC is fully licensed and insured in Florida. We carry comprehensive liability insurance and workers compensation to protect your property and give you peace of mind throughout your painting project.',
  },
  {
    question: 'Do you offer free painting estimates in Jacksonville?',
    answer: 'Yes! Paint-Techs LLC provides free, no-obligation estimates for all painting projects in Jacksonville and surrounding areas. Contact us via phone at (904) 762-7062 or WhatsApp for a quick response.',
  },
];

export const metadata: Metadata = {
  title: 'Jacksonville Painters - House Painters Near Me - Paint-Techs LLC',
  description: 'Top-rated Jacksonville painters offering professional house painting services. Interior, exterior & cabinet painting. Licensed, insured, 5-star rated. Free estimates!',
  keywords: [
    'jacksonville painters',
    'painters near me',
    'house painters near me',
    'painting services near me',
    'local painters near me',
    'professional painters near me',
    'home painters near me',
    'jacksonville house painters',
    'jacksonville painting company',
    'painting contractor jacksonville fl',
    'house painters in jacksonville fl',
  ],
  alternates: {
    canonical: BUSINESS_INFO.website,
  },
  openGraph: {
    title: 'Jacksonville Painters - House Painters Near Me - Paint-Techs LLC',
    description: 'Top-rated Jacksonville painters offering professional house painting services. Interior, exterior & cabinet painting. Licensed, insured, 5-star rated. Free estimates!',
    url: BUSINESS_INFO.website,
    siteName: BUSINESS_INFO.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BUSINESS_INFO.website}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Paint-Techs LLC - Professional House Painters in Jacksonville FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jacksonville Painters - House Painters Near Me - Paint-Techs LLC',
    description: 'Top-rated Jacksonville painters offering professional house painting services. Free estimates!',
  },
  other: {
    'geo.region': 'US-FL',
    'geo.placename': 'Jacksonville',
    'geo.position': `${BUSINESS_INFO.geo.latitude};${BUSINESS_INFO.geo.longitude}`,
    'ICBM': `${BUSINESS_INFO.geo.latitude}, ${BUSINESS_INFO.geo.longitude}`,
  },
};

export default function HomePage() {
  const schemas = generateHomePageSchema();

  return (
    <>
      {/* Structured Data */}
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <JsonLd data={generateFAQSchema(homepageFAQs)} />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BUSINESS_INFO.website },
        ])}
      />

      {/* Page Content */}
      <Hero
        title="Jacksonville Painters - Professional House Painters Near You"
        subtitle="Looking for reliable painters near me? Paint-Techs LLC delivers expert interior, exterior, and cabinet painting services throughout Jacksonville, FL. Licensed, insured, and 5-star rated."
      />
      <Services />
      <Stats />
      <Testimonials />
      <About />
      <ServiceAreas />
      <HomeFAQ faqs={homepageFAQs} />
      <WhatsAppCTA />
    </>
  );
}
