import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container, SectionHeading, Card, Button } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import JsonLd from '@/components/seo/JsonLd';
import { generateLocationBusinessSchema, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { locationsData, getLocationBySlug } from '@/data/locations';
import { SERVICES, BUSINESS_INFO, getWhatsAppLink } from '@/lib/constants';
import { testimonials } from '@/data/testimonials';

interface LocationPageProps {
  params: Promise<{ location: string }>;
}

// Generate paths for all location pages
export async function generateStaticParams() {
  return locationsData.map((location) => ({
    location: `${location.slug}-painting-contractor`,
  }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { location } = await params;
  const slug = location.replace('-painting-contractor', '').replace('-painters', '').replace('-painting-services', '');
  const locationData = getLocationBySlug(slug);

  if (!locationData) {
    return {
      title: 'Location Not Found',
    };
  }

  return {
    title: locationData.metaTitle,
    description: locationData.metaDescription,
    alternates: {
      canonical: `${BUSINESS_INFO.website}/${location}`,
    },
    keywords: locationData.keywords,
    openGraph: {
      title: locationData.metaTitle,
      description: locationData.metaDescription,
      url: `${BUSINESS_INFO.website}/${location}`,
      type: 'website',
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { location } = await params;
  const slug = location.replace('-painting-contractor', '').replace('-painters', '').replace('-painting-services', '');
  const locationData = getLocationBySlug(slug);

  if (!locationData) {
    notFound();
  }

  // Get testimonials from this area or nearby
  const localTestimonials = testimonials.filter(
    (t) => t.location.toLowerCase().includes(locationData.name.toLowerCase()) ||
           t.location.toLowerCase().includes('jacksonville')
  ).slice(0, 3);

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
        data={generateServiceSchema(
          `Painting Services in ${locationData.name}`,
          locationData.description,
          `${BUSINESS_INFO.website}/${location}`
        )}
      />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BUSINESS_INFO.website },
          { name: 'Service Areas', url: `${BUSINESS_INFO.website}/areas-we-serve` },
          { name: `${locationData.name} Painters`, url: `${BUSINESS_INFO.website}/${location}` },
        ])}
      />

      <Breadcrumbs
        items={[
          { label: 'Service Areas', href: '/areas-we-serve' },
          { label: `${locationData.name} Painters` },
        ]}
      />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 rounded-full px-4 py-2 mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {locationData.county}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Painters in <span className="text-teal-400">{locationData.name}, FL</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {locationData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href={getWhatsAppLink(`Hi! I'm looking for painting services in ${locationData.name}. Can I get a free quote?`)}
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

      {/* About This Area */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-800 mb-6">
                Trusted Painting Contractor in {locationData.name}
              </h2>
              <div className="prose prose-gray max-w-none prose-headings:text-navy-800 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-strong:text-navy-700 prose-li:text-gray-600">
                {locationData.longDescription.split('\n\n').map((paragraph, index) => {
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

              {/* Highlights */}
              <div className="mt-8 space-y-3">
                {locationData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Card */}
            <Card className="bg-gray-50" hover={false}>
              <h3 className="text-xl font-bold text-navy-800 mb-6">
                Our Services in {locationData.name}
              </h3>
              <div className="space-y-4">
                {SERVICES.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow group"
                  >
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                      <svg className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-navy-800 group-hover:text-teal-600 transition-colors">
                        {service.name}
                      </h4>
                      <p className="text-sm text-gray-500">{service.shortDescription}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Neighborhoods */}
      {locationData.neighborhoods && locationData.neighborhoods.length > 0 && (
        <section className="py-16 bg-gray-50">
          <Container>
            <SectionHeading
              title={`Areas We Serve in ${locationData.name}`}
              subtitle={`Paint-Techs LLC provides painting services throughout ${locationData.name} and surrounding neighborhoods.`}
            />

            <div className="flex flex-wrap justify-center gap-3">
              {locationData.neighborhoods.map((neighborhood) => (
                <span
                  key={neighborhood}
                  className="px-4 py-2 bg-white rounded-full text-gray-700 border border-gray-200 hover:border-teal-300 hover:text-teal-600 transition-colors"
                >
                  {neighborhood}
                </span>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Local Testimonials */}
      {localTestimonials.length > 0 && (
        <section className="py-20 bg-white">
          <Container>
            <SectionHeading
              title={`What ${locationData.name} Residents Say`}
              subtitle="Read what your neighbors have to say about their experience with Paint-Techs."
            />

            <div className="grid md:grid-cols-3 gap-8">
              {localTestimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-navy-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button href="/reviews" variant="outline">
                Read More Reviews
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Why Choose Us for This Area */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Local Expertise</h3>
              <p className="text-gray-600">
                We know {locationData.name} and understand the unique needs of homes in this area.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Fast Response</h3>
              <p className="text-gray-600">
                Quick estimates and flexible scheduling for {locationData.name} residents.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Trusted Quality</h3>
              <p className="text-gray-600">
                Licensed, insured, and committed to exceptional results in every {locationData.name} project.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Service Areas */}
      <section className="py-12 bg-white">
        <Container>
          <h2 className="text-xl font-bold text-navy-800 mb-6 text-center">
            We Also Serve These Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {locationsData
              .filter((loc) => loc.slug !== locationData.slug)
              .slice(0, 6)
              .map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}-painting-contractor`}
                  className="px-4 py-2 bg-gray-100 hover:bg-teal-50 text-gray-700 hover:text-teal-600 rounded-full transition-colors"
                >
                  {loc.name}
                </Link>
              ))}
            <Link
              href="/areas-we-serve"
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-colors"
            >
              View All Areas
            </Link>
          </div>
        </Container>
      </section>

      <WhatsAppCTA
        title={`Ready to Paint Your ${locationData.name} Home?`}
        subtitle={`Get a free, no-obligation estimate for your painting project in ${locationData.name}.`}
        message={`Hi! I'm looking for painting services in ${locationData.name}. Can I get a free quote?`}
      />
    </>
  );
}
