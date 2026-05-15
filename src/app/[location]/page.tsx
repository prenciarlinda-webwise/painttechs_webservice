import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container, Card, Button } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import BrushDivider from '@/components/seo/BrushDivider';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import QuickQuoteForm from '@/components/features/QuickQuoteForm';
import PaintChipFAQ from '@/components/features/PaintChipFAQ';
import TrustBadgeRow from '@/components/features/TrustBadgeRow';
import StickyMobileCallBar from '@/components/features/StickyMobileCallBar';
import GoogleReviewsEmbed from '@/components/features/GoogleReviewsEmbed';
import ServiceInLocation from '@/components/sections/ServiceInLocation';
import WhyHireSection from '@/components/sections/WhyHireSection';
import ServicesShowcase from '@/components/sections/ServicesShowcase';
import JsonLd from '@/components/seo/JsonLd';
import {
  generateLocationBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  LOCATION_DATA,
} from '@/lib/schema';
import { locationsData, getLocationBySlug } from '@/data/locations';
import { getSortedTestimonials } from '@/data/testimonials';
import { SERVICES, BUSINESS_INFO, getPhoneLink } from '@/lib/constants';

interface LocationPageProps {
  params: Promise<{ location: string }>;
}

export async function generateStaticParams() {
  return locationsData.map((location) => ({
    location: `${location.slug}-house-painters`,
  }));
}

const slugFromParam = (param: string) => param.replace(/-house-painters$/, '');

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { location } = await params;
  const slug = slugFromParam(location);
  const locationData = getLocationBySlug(slug);

  if (!locationData) {
    return { title: 'Location Not Found' };
  }

  const canonicalUrl = `${BUSINESS_INFO.website}/${location}`;
  const ogImage = `${BUSINESS_INFO.website}${locationData.heroImage || '/images/hero-painting-jacksonville-fl-1.webp'}`;

  return {
    title: locationData.metaTitle,
    description: locationData.metaDescription,
    alternates: { canonical: canonicalUrl },
    // Per client direction 2026-05-09: no meta keywords on location pages — we don't surface our keyword strategy.
    openGraph: {
      title: locationData.metaTitle,
      description: locationData.metaDescription,
      url: canonicalUrl,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${locationData.name} painters - Paint-Techs LLC` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: locationData.metaTitle,
      description: locationData.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { location } = await params;
  const slug = slugFromParam(location);
  const locationData = getLocationBySlug(slug);

  if (!locationData) {
    notFound();
  }

  const sortedReviews = getSortedTestimonials();
  const localReviews = sortedReviews.filter((t) =>
    t.location.toLowerCase().includes(locationData.name.toLowerCase())
  );
  const reviewsToShow = localReviews.length >= 3 ? localReviews : sortedReviews;

  const postalCodes = (LOCATION_DATA[locationData.slug]?.postalCodes || []).slice(0, 4);

  const nearbyMap: Record<string, string[]> = {
    jacksonville: ['orange-park', 'jacksonville-beach', 'atlantic-beach', 'middleburg'],
    nocatee: ['ponte-vedra-beach', 'st-augustine', 'jacksonville', 'jacksonville-beach'],
    'ponte-vedra-beach': ['nocatee', 'jacksonville-beach', 'atlantic-beach', 'st-augustine'],
    'jacksonville-beach': ['atlantic-beach', 'ponte-vedra-beach', 'jacksonville', 'nocatee'],
    'atlantic-beach': ['jacksonville-beach', 'jacksonville', 'ponte-vedra-beach', 'fernandina-beach'],
    'st-augustine': ['nocatee', 'ponte-vedra-beach', 'jacksonville-beach', 'jacksonville'],
    'fernandina-beach': ['yulee', 'atlantic-beach', 'jacksonville', 'jacksonville-beach'],
    middleburg: ['orange-park', 'jacksonville', 'fernandina-beach', 'yulee'],
    'orange-park': ['middleburg', 'jacksonville', 'jacksonville-beach', 'st-augustine'],
    yulee: ['fernandina-beach', 'jacksonville', 'atlantic-beach', 'orange-park'],
  };
  const nearbyLocations = (nearbyMap[locationData.slug] || [])
    .map((s) => locationsData.find((l) => l.slug === s))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  const heroAccent = locationData.heroAccent || `${locationData.name}, FL`;
  const heroSubtitle = locationData.heroSubtitle || locationData.description;
  const aeoAnswer = locationData.aeoAnswer;
  const sil = locationData.serviceInLocation;
  const faqs = locationData.faqs;
  const whyHireCards = locationData.whyHireCards;
  const whyHireHeading = locationData.whyHireHeading;
  const servicesShowcase = locationData.servicesShowcase_block;

  return (
    <>
      <JsonLd
        data={generateLocationBusinessSchema(
          locationData.name,
          locationData.slug,
          locationData.description,
          locationData.county,
          locationData.neighborhoods
        )}
      />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BUSINESS_INFO.website },
          { name: 'Service Areas', url: `${BUSINESS_INFO.website}/areas-we-serve` },
          { name: `${locationData.name} Painters`, url: `${BUSINESS_INFO.website}/${location}` },
        ])}
      />
      {faqs && faqs.length > 0 && <JsonLd data={generateFAQSchema(faqs)} />}

      <Breadcrumbs
        items={[
          { label: 'Service Areas', href: '/areas-we-serve' },
          { label: `${locationData.name} Painters` },
        ]}
      />

      {/* Hero - paint-drips vibe, orange + blue + pastel */}
      <section className="relative overflow-hidden bg-[#fff6ec]">
        <span aria-hidden className="absolute top-10 left-12 text-orange-300 text-3xl tracking-widest select-none">· *  ·</span>
        <span aria-hidden className="absolute bottom-24 right-16 text-orange-300/70 text-2xl tracking-widest select-none">· · *</span>

        <Container>
          <div className="grid lg:grid-cols-2 gap-12 py-16 md:py-20 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-700 mb-3">
                Serving {locationData.county}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-navy-800 leading-tight mb-2">
                Painters in <span className="text-orange-600">{heroAccent}</span>
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-xl mt-3">
                {heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Button href={getPhoneLink()} variant="primary" size="lg" external>
                  Call {BUSINESS_INFO.phone}
                </Button>
                <span className="text-sm text-navy-700/80">or fill the form →</span>
              </div>

              {locationData.driveTimeFromHQ && (
                <p className="text-sm text-navy-700/80">
                  <span className="font-semibold text-navy-800">From our Jacksonville office:</span> {locationData.driveTimeFromHQ}
                </p>
              )}
            </div>

            <div className="lg:justify-self-end w-full">
              <QuickQuoteForm locationName={locationData.name} promoTag={`${locationData.slug}-hero`} />
            </div>
          </div>
        </Container>

        <Container>
          <div className="pb-10">
            <TrustBadgeRow />
            <div className="mt-6 flex justify-center gap-1 opacity-90">
              {['#fde2c7', '#dbeafe', '#fff1de', '#e5edf5', '#fff6ec'].map((c) => (
                <span key={c} className="h-2 w-12 md:w-16 rounded-full" style={{ background: c }} />
              ))}
            </div>
          </div>
        </Container>

        <BrushDivider color="#ffffff" />
      </section>

      {/* AEO snippet block — moved to the top so the highest-intent question gets prime real estate */}
      {aeoAnswer && (
        <section className="py-16 bg-white">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-4">
                {aeoAnswer.question}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed bg-orange-50/60 border-l-4 border-orange-400 rounded-r-2xl pl-5 py-4">
                {aeoAnswer.answer}
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* About this area — longDescription on left, sticky services + CTA on right */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <div className="prose prose-gray max-w-none prose-headings:text-navy-800 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-strong:text-navy-700 prose-li:text-gray-600">
                {locationData.longDescription.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
                  }
                  const processedText = paragraph
                    .split('\n')
                    .map((line, lineIndex) => {
                      if (line.startsWith('**') && line.includes(':**')) {
                        const parts = line.match(/^\*\*(.+?):\*\*\s*(.*)$/);
                        if (parts) {
                          return (
                            <div key={lineIndex} className="mb-3">
                              <strong className="text-navy-700">{parts[1]}.</strong>{' '}
                              <span className="text-gray-600">{parts[2]}</span>
                            </div>
                          );
                        }
                      }
                      if (line.startsWith('- ')) {
                        return (
                          <li key={lineIndex} className="text-gray-600 ml-4">
                            {line.replace('- ', '').replace(/\*\*(.+?)\*\*/g, '$1')}
                          </li>
                        );
                      }
                      return line ? <span key={lineIndex}>{line} </span> : null;
                    });
                  return <div key={index} className="mb-4">{processedText}</div>;
                })}
              </div>

              <div className="mt-8 space-y-3">
                {locationData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky right rail: services list + inline CTA card. Stays in view while reading the long content. */}
            <aside className="lg:sticky lg:top-24 self-start space-y-6">
              <Card className="bg-[#fff6ec] border border-orange-200/60" hover={false}>
                <h3 className="text-xl font-bold text-navy-800 mb-2">
                  Services in {locationData.name}
                </h3>
                <p className="text-sm text-gray-600 mb-5">
                  Tap a service to see scope, prep, and what&apos;s included.
                </p>
                <div className="space-y-3">
                  {SERVICES.map((service, i) => {
                    const chipBg = ['#fde2c7', '#dbeafe', '#fff1de', '#e5edf5', '#ffe4d1'][i % 5];
                    return (
                      <Link
                        key={service.id}
                        href={`/${service.slug}`}
                        className="flex items-center gap-4 p-3 rounded-2xl bg-white hover:shadow-md transition-shadow group"
                        style={{ borderLeft: `6px solid ${chipBg}` }}
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-navy-800 group-hover:text-orange-600 transition-colors text-sm">
                            {service.name}
                          </h4>
                        </div>
                        <span aria-hidden className="text-gray-400 group-hover:text-orange-500 transition-colors">→</span>
                      </Link>
                    );
                  })}
                </div>
              </Card>

              {/* Inline conversion CTA — keeps the lead path visible while reading */}
              <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 shadow-[0_18px_48px_-12px_rgba(234,113,30,0.45)]">
                <h3 className="text-xl font-bold mb-2">Free quote in {locationData.name}</h3>
                <p className="text-sm text-white/90 mb-4">
                  Same crew from estimate to walk-through. Reply within 24 hours.
                </p>
                <Button href={getPhoneLink()} variant="white" size="md" external>
                  Call {BUSINESS_INFO.phone}
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <BrushDivider color="#fff6ec" />

      {/* {Service} in {Location} block */}
      {sil && (
        <ServiceInLocation
          heading={sil.heading}
          paragraph={sil.paragraph}
          mapEmbedSrc={sil.mapEmbedSrc}
          postalCodes={postalCodes}
          driveTimeFromHQ={locationData.driveTimeFromHQ}
        />
      )}

      <BrushDivider color="#ffffff" flip />

      {/* Services showcase — services-first emphasis per client direction
          (interior, exterior, cabinet, pool deck, commercial). The SIL block
          above already covers neighborhood/local-area signal inline, so this
          section is intentionally service-focused, not geography-focused. */}
      {servicesShowcase && <ServicesShowcase block={servicesShowcase} />}

      {/* Why hire — extracted from longDescription, white cards on cream pastel */}
      {whyHireCards && whyHireCards.length > 0 && whyHireHeading && (
        <WhyHireSection heading={whyHireHeading} cards={whyHireCards} />
      )}

      <BrushDivider color="#ffffff" flip />

      {/* Google reviews — official embed style */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-navy-800">
              Google reviews from {locationData.name} customers
            </h2>
            <p className="text-gray-600 mt-2">
              {BUSINESS_INFO.aggregateRating.reviewCount} verified Google reviews · 5-star rated.
            </p>
          </div>
          <GoogleReviewsEmbed reviews={reviewsToShow} />
        </Container>
      </section>

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <section className="py-20 bg-[#fff6ec]">
          <Container>
            <PaintChipFAQ
              faqs={faqs}
              heading={`${locationData.name} painters FAQs`}
              subheading={`Real questions from ${locationData.name} homeowners. Same crew answering them on the estimate.`}
            />
          </Container>
        </section>
      )}

      <BrushDivider color="#ffffff" flip />

      {/* Nearby areas */}
      {nearbyLocations.length > 0 && (
        <section className="py-12 bg-white">
          <Container>
            <h2 className="text-xl font-bold text-navy-800 mb-6 text-center">
              Service areas near {locationData.name}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {nearbyLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}-house-painters`}
                  className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-navy-700 hover:text-orange-700 rounded-full transition-colors border border-orange-200/60"
                >
                  {loc.name}
                </Link>
              ))}
              <Link
                href="/areas-we-serve"
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors"
              >
                All service areas
              </Link>
            </div>
          </Container>
        </section>
      )}

      <WhatsAppCTA
        title={`Ready to repaint your ${locationData.name} home?`}
        subtitle={`Free, no-obligation estimate. Open daily until 10 PM.`}
        message={`Hi! I'm looking for painting services in ${locationData.name}. Can I get a free quote?`}
      />

      <StickyMobileCallBar
        whatsappMessage={`Hi! I'm looking for painting services in ${locationData.name}. Can I get a free quote?`}
      />
    </>
  );
}
