import { notFound } from 'next/navigation';
import { Container, SectionHeading, Card, Button } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import PricingSnapshot from '@/components/sections/PricingSnapshot';
import JsonLd from '@/components/seo/JsonLd';
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { servicesData, getServiceBySlug } from '@/data/services';
import { BUSINESS_INFO, getWhatsAppLink, SERVICE_AREAS } from '@/lib/constants';
import Link from 'next/link';

// Service-specific pricing rows. Numbers are typical Jacksonville/Northeast Florida
// painting-industry ranges as of 2026 and are kept in sync with the homepage block.
const SERVICE_PRICING: Record<string, { heading: string; intro: string; rows: { label: string; detail: string; range: string }[] }> = {
  'interior-painting': {
    heading: 'How much does interior painting cost in Jacksonville, FL?',
    intro:
      'Interior painting in Jacksonville typically costs $300 for a single-room repaint and $5,000–$12,000 for a whole-home interior repaint depending on square footage, ceiling height, and trim complexity. Most Jacksonville homeowners spend $4,000–$7,000 on a 2,000–3,000 sq ft full interior repaint with two coats of Sherwin-Williams Emerald or Benjamin Moore Aura.',
    rows: [
      { label: 'Single-room repaint', detail: 'Walls + trim, ~12×14 ft bedroom or living room, 1 day', range: '$300 – $800' },
      { label: 'Kitchen + dining + living room', detail: 'Open-plan main floor, walls + ceilings, 2 days', range: '$1,500 – $3,500' },
      { label: 'Whole-home interior, 2,000 sq ft', detail: 'Walls, ceilings, trim, doors — 2 coats premium paint', range: '$3,500 – $7,500' },
      { label: 'Whole-home interior, 3,000 sq ft', detail: 'Includes color consult, furniture protection, full prep', range: '$5,000 – $12,000' },
      { label: 'Trim-only interior repaint', detail: 'Baseboards, casing, doors throughout home', range: '$1,000 – $2,500' },
      { label: 'Accent wall', detail: 'Single feature wall, color match, 1 day', range: '$200 – $500' },
    ],
  },
  'exterior-painting': {
    heading: 'How much does exterior painting cost in Jacksonville, FL?',
    intro:
      'Exterior painting for a Jacksonville home costs $4,000–$15,000 depending on stories, square footage, prep depth, and wood-rot repair needed. A typical 2,000 sq ft single-story exterior runs $4,000–$6,000; a two-story 3,000 sq ft home runs $9,000–$15,000. Every Paint-Techs LLC exterior quote includes power washing, surface prep, Florida-formulated UV-resistant paint, and a 5-year workmanship warranty.',
    rows: [
      { label: 'Exterior, 2,000 sq ft single-story', detail: 'Power wash, scrape, prime, 2 coats Sherwin-Williams Duration', range: '$4,000 – $6,000' },
      { label: 'Exterior, 2,000 sq ft two-story', detail: 'Lift access, gables, second-floor trim, full prep', range: '$6,500 – $9,000' },
      { label: 'Exterior, 3,000 sq ft two-story', detail: 'Detailed trim, soffits, fascia, wood-rot repair as needed', range: '$9,000 – $15,000' },
      { label: 'Trim-only exterior repaint', detail: 'Fascia, soffits, garage trim, door + shutters', range: '$1,500 – $3,500' },
      { label: 'Garage door repaint', detail: 'Single or double door, prep + 2 coats', range: '$200 – $500' },
      { label: 'Stucco repaint, 2,000 sq ft', detail: 'Elastomeric coating for hairline cracks', range: '$5,000 – $8,500' },
    ],
  },
  'cabinet-painting': {
    heading: 'How much does kitchen cabinet painting cost in Jacksonville, FL?',
    intro:
      'Kitchen cabinet painting in Jacksonville costs $3,000–$12,000 depending on door count, finish system, and whether you choose a single color or a two-tone scheme. The Paint-Techs LLC standard is HVLP spray application with a Sherwin-Williams ProClassic or Benjamin Moore Advance waterborne lacquer, which delivers a factory-smooth finish that holds up 10+ years. Cabinet painting typically saves 50–70% compared to full cabinet replacement.',
    rows: [
      { label: 'Bathroom vanity refinish', detail: 'Single vanity, 2–6 doors, full strip + spray', range: '$500 – $1,500' },
      { label: 'Built-in or island refinish', detail: 'Bookshelf, entertainment center, or kitchen island', range: '$1,000 – $3,000' },
      { label: 'Kitchen, 30 doors, single color', detail: 'White or bright color, HVLP spray', range: '$3,500 – $6,500' },
      { label: 'Kitchen, 40 doors, two-tone', detail: 'White uppers + colored lowers, designer scheme', range: '$6,000 – $9,000' },
      { label: 'Kitchen, 50+ doors, premium', detail: 'Custom color match, grain fill on oak, hardware upgrade', range: '$8,000 – $12,000' },
      { label: 'Hardware + soft-close upgrade', detail: 'Add-on to any cabinet job — new pulls, soft-close hinges', range: '$300 – $900' },
    ],
  },
  'commercial-painting': {
    heading: 'How much does commercial painting cost in Jacksonville, FL?',
    intro:
      'Commercial painting in Jacksonville costs $1.50–$3.50 per square foot for interior work and $2.50–$5 per square foot for exterior, with most projects falling between $3,000 and $25,000 total. Pricing reflects access requirements, off-hours scheduling, surface conditions, and the type of coating system needed. Paint-Techs LLC quotes commercial projects per project (not hourly) and works nights, weekends, and off-hours to keep your business running.',
    rows: [
      { label: 'Small office, ≤2,000 sq ft interior', detail: 'Walls + ceilings, 2 coats, after-hours scheduling', range: '$3,000 – $8,000' },
      { label: 'Retail space, 3,000–5,000 sq ft', detail: 'Brand-color match, fixtures protected, single overnight close', range: '$8,000 – $18,000' },
      { label: 'Restaurant repaint', detail: 'Interior + accent walls, kitchen-safe coatings', range: '$5,000 – $15,000' },
      { label: 'Storefront exterior repaint', detail: 'Facade, signage area, awning trim, 1–2 elevations', range: '$4,000 – $10,000' },
      { label: 'Warehouse interior', detail: 'High-CFM block walls, ceiling deck, line striping', range: '$1.50 – $3 / sq ft' },
      { label: 'Multi-unit complex exterior', detail: 'Per-unit pricing with volume discount', range: 'Per project' },
    ],
  },
  'pool-deck-painting-staining': {
    heading: 'How much does pool deck painting cost in Jacksonville, FL?',
    intro:
      'Pool deck painting in Jacksonville costs $3–$8 per square foot depending on the coating system and deck condition. A typical 500 sq ft pool deck runs $1,800–$3,500 for cool-deck coating, and a 1,000 sq ft deck runs $3,500–$6,500. Cool-deck coatings reduce surface temperature by up to 40°F and include slip-resistant additives — essential for bare-feet safety on hot Florida afternoons.',
    rows: [
      { label: 'Cool-deck coating, 500 sq ft', detail: 'Heat-reflective + slip-resistant additive, prep + 2 coats', range: '$1,800 – $3,500' },
      { label: 'Cool-deck coating, 1,000 sq ft', detail: 'Full pool surround, includes crack repair', range: '$3,500 – $6,500' },
      { label: 'Concrete pool deck stain', detail: 'Translucent acid stain or solid color, sealed', range: '$3 – $5 / sq ft' },
      { label: 'Decorative flake finish', detail: 'Multi-color fleck pattern in clear coat, high-end look', range: '$4 – $8 / sq ft' },
      { label: 'Cool-deck refinishing', detail: 'Recoat existing cool deck that is faded or peeling', range: '$2.50 – $5 / sq ft' },
      { label: 'Pool deck repair + recoat combo', detail: 'Crack repair, hollow-spot patch, then full cool-deck coat', range: '$2,500 – $5,500' },
    ],
  },
};

interface ServicePageContentProps {
  slug: string;
}

export default function ServicePageContent({ slug }: ServicePageContentProps) {
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={generateServiceSchema(
          service.name,
          service.description,
          `${BUSINESS_INFO.website}/${slug}`
        )}
      />
      <JsonLd data={generateFAQSchema(service.faqs)} />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BUSINESS_INFO.website },
          { name: 'Services', url: `${BUSINESS_INFO.website}/services` },
          { name: service.name, url: `${BUSINESS_INFO.website}/${slug}` },
        ])}
      />

      <Breadcrumbs
        items={[
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]}
      />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {service.heroTitle}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {service.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href={getWhatsAppLink(`Hi! I'm interested in ${service.name} services. Can I get a free quote?`)}
                variant="whatsapp"
                size="lg"
                external
              >
                Get Free Quote
              </Button>
              <Button href={`tel:${BUSINESS_INFO.phoneRaw}`} variant="white" size="lg" external>
                Call {BUSINESS_INFO.phone}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Direct Answer Summary for AI Overviews */}
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8">
                <p className="text-gray-700 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="prose prose-gray max-w-none prose-headings:text-navy-800 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-strong:text-navy-700">
                <h2>About Our {service.name} Services</h2>
                {service.longDescription.split('\n\n').map((paragraph, index) => {
                  // Handle H2 headers
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
                  }
                  // Handle bold text and list items
                  const processedText = paragraph
                    .split('\n')
                    .map((line, lineIndex) => {
                      // List items starting with **text:**
                      if (line.startsWith('**') && line.includes(':**')) {
                        const parts = line.match(/^\*\*(.+?):\*\*\s*(.*)$/);
                        if (parts) {
                          return (
                            <div key={lineIndex} className="mb-3">
                              <strong className="text-navy-700">{parts[1]}:</strong>{' '}
                              <span className="text-gray-600">{parts[2]}</span>
                            </div>
                          );
                        }
                      }
                      // Bullet list items
                      if (line.startsWith('- ')) {
                        return (
                          <li key={lineIndex} className="text-gray-600 ml-4">
                            {line.replace('- ', '').replace(/\*\*(.+?)\*\*/g, '$1')}
                          </li>
                        );
                      }
                      // Regular line
                      return line ? <span key={lineIndex}>{line} </span> : null;
                    });
                  return <div key={index} className="mb-4">{processedText}</div>;
                })}
              </div>

              {/* Benefits */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-navy-800 mb-6">
                  Benefits of Our {service.name} Services
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <svg className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-navy-800 mb-6">
                  Our {service.name} Process
                </h2>
                <div className="space-y-6">
                  {service.process.map((step) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-800 mb-1">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-navy-800 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <Card key={index} className="border border-gray-200" hover={false}>
                      <h3 className="font-bold text-navy-800 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Areas We Serve */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-navy-800 mb-6">
                  {service.name} Service Areas
                </h2>
                <p className="text-gray-600 mb-6">
                  Paint-Techs LLC provides professional {service.name.toLowerCase()} services throughout Jacksonville and Northeast Florida. We serve homeowners in these communities:
                </p>
                <div className="flex flex-wrap gap-3">
                  {SERVICE_AREAS.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/${area.slug}-house-painters`}
                      title={`${area.name} Painters`}
                      className="px-4 py-2 bg-gray-100 hover:bg-teal-50 text-gray-700 hover:text-teal-600 rounded-full transition-colors text-sm"
                    >
                      {area.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0">
                  <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
                  <p className="text-teal-100 mb-6">
                    Contact us today for a free, no-obligation estimate on your {service.name.toLowerCase()} project.
                  </p>
                  <Button
                    href={getWhatsAppLink(`Hi! I'm interested in ${service.name} services.`)}
                    variant="white"
                    className="w-full mb-3"
                    external
                  >
                    WhatsApp Us
                  </Button>
                  <Button
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white hover:text-teal-600"
                    external
                  >
                    Call {BUSINESS_INFO.phone}
                  </Button>
                </Card>

                {/* Other Services */}
                <Card>
                  <h3 className="font-bold text-navy-800 mb-4">Our Other Services</h3>
                  <ul className="space-y-3">
                    {servicesData
                      .filter((s) => s.slug !== slug)
                      .map((s) => (
                        <li key={s.id}>
                          <a
                            href={`/${s.slug}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors"
                          >
                            <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            {s.name}
                          </a>
                        </li>
                      ))}
                  </ul>
                </Card>

                {/* Trust Badges */}
                <Card className="bg-gray-50 border border-gray-200" hover={false}>
                  <h3 className="font-bold text-navy-800 mb-4">Why Choose Us</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Licensed & Insured
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Premium Paints
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      5-Star Rated
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Free Estimates
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {SERVICE_PRICING[slug] && (
        <PricingSnapshot
          heading={SERVICE_PRICING[slug].heading}
          subheading={`${service.name} prices in Jacksonville`}
          intro={SERVICE_PRICING[slug].intro}
          rows={SERVICE_PRICING[slug].rows}
        />
      )}

      <WhatsAppCTA
        title={`Get Your Free ${service.name} Estimate`}
        subtitle="Contact Paint-Techs LLC today. We'll provide a detailed quote and answer all your questions."
        message={`Hi! I'm interested in ${service.name} services. Can I get a free quote?`}
      />
    </>
  );
}
