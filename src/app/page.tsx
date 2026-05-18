import { Metadata } from 'next';
import { Hero, Services, Stats, About, ServiceAreas, Testimonials, HomeFAQ, PricingSnapshot } from '@/components/sections';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import JsonLd from '@/components/seo/JsonLd';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { BUSINESS_INFO } from '@/lib/constants';

// Homepage FAQ data for schema and display.
// Questions match Google's "People Also Ask" block for "painting contractors jacksonville fl"
// so we are eligible for both the PAA placement and a featured snippet on each one.
const homepageFAQs = [
  {
    question: 'How much does it cost to paint a 2,000 square foot house in Jacksonville, FL?',
    answer: 'Painting a 2,000 square foot house in Jacksonville typically costs $3,500 to $7,500 for interior repaints and $4,000 to $9,000 for exterior repaints. Most homeowners spend $5,000 to $7,000 for a full interior repaint with two coats of premium Sherwin-Williams or Benjamin Moore paint. Exterior pricing depends on stories, prep depth, and whether wood-rot repair is needed.',
  },
  {
    question: 'How much should it cost to paint the interior of a 3,000 sq ft house?',
    answer: 'Interior painting for a 3,000 sq ft Jacksonville home runs $5,000 to $12,000 depending on ceiling height, trim complexity, and paint line. The typical Paint-Techs LLC estimate for a 3,000 sq ft whole-home interior repaint is $7,000 to $9,000 using Sherwin-Williams Emerald or Benjamin Moore Aura in eggshell. Single-room interior repaints average $300 to $800.',
  },
  {
    question: 'What is the hourly rate for a painter in Jacksonville, Florida?',
    answer: 'Professional painters in Jacksonville, FL charge $40 to $80 per hour on average. Most reputable Jacksonville painting companies, including Paint-Techs LLC, quote by the project rather than the hour so the price is fixed and there are no surprises. Hourly work is more common for small touch-ups, color-sample applications, or minor repairs.',
  },
  {
    question: 'How much should it cost to paint the exterior of a 2,000 square foot house?',
    answer: 'Exterior painting for a 2,000 sq ft house in Jacksonville costs $4,000 to $9,000. A single-story 2,000 sq ft home is typically $4,000 to $6,000; a two-story comes in at $6,500 to $9,000 because of the extra labor, lift rental, and trim work. All Paint-Techs LLC exterior estimates include power washing, surface prep, two coats of UV-resistant Florida-formulated paint, and a 5-year workmanship warranty.',
  },
  {
    question: 'How much do painters cost in Jacksonville?',
    answer: `Painters in Jacksonville cost between $300 for a single-room repaint and $15,000+ for a complete two-story exterior with detailed trim and wood-rot repair. Most Jacksonville homeowners spend $4,000 to $9,000 for a typical full-house project. Paint-Techs LLC provides free, written, fixed-price estimates — call ${BUSINESS_INFO.phone} for a quote on your specific home.`,
  },
  {
    question: 'How long does it take to paint a house in Jacksonville?',
    answer: 'Interior painting in Jacksonville typically takes 2 to 5 days depending on home size and prep needs. Exterior painting takes 3 to 7 days. Kitchen cabinet refinishing takes 3 to 5 days including spray, cure, and reinstallation. Paint-Techs LLC works in zones so most of the home stays usable while we paint.',
  },
  {
    question: 'Are Paint-Techs painters licensed and insured in Jacksonville?',
    answer: `Yes — Paint-Techs LLC is fully licensed and insured in the State of Florida. We carry comprehensive general liability insurance and workers' compensation coverage on every job, and we are happy to send a copy of the certificate of insurance before work begins. We are rated 5.0 out of 5 stars across ${BUSINESS_INFO.aggregateRating.reviewCount} verified Google reviews.`,
  },
  {
    question: 'Do you offer free painting estimates in Jacksonville?',
    answer: `Yes. Every Paint-Techs LLC estimate is free, on-site, written, and itemized — with a fixed price (not a range) and no obligation. Estimates are available daily 8 AM to 10 PM including evenings and weekends. Call ${BUSINESS_INFO.phone} or send a WhatsApp message and we will schedule the visit within 24 hours.`,
  },
];

export const metadata: Metadata = {
  title: 'Jacksonville Painters - (904) 762-7062 - Paint-Techs LLC',
  description: 'Top-rated Jacksonville painters offering professional house painting services. Interior, exterior & cabinet painting. Licensed, insured, 5-star rated. Free estimates!',
  alternates: {
    canonical: BUSINESS_INFO.website,
  },
  openGraph: {
    title: 'Jacksonville Painters - (904) 762-7062 - Paint-Techs LLC',
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
    title: 'Jacksonville Painters - (904) 762-7062 - Paint-Techs LLC',
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
  return (
    <>
      {/* Page-specific structured data.
          LocalBusiness, Organization, and WebSite are emitted site-wide from
          src/app/layout.tsx — do not re-emit here. Two HousePainter nodes that
          share `@id=#localbusiness` get merged by Google and the duplicated
          `aggregateRating` blocks trigger "multiple aggregate ratings". */}
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
      <PricingSnapshot />
      <ServiceAreas />
      <HomeFAQ faqs={homepageFAQs} />
      <WhatsAppCTA />
    </>
  );
}
