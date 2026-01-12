import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, SectionHeading, Card, Button } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import JsonLd from '@/components/seo/JsonLd';
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { servicesData, getServiceBySlug } from '@/data/services';
import { BUSINESS_INFO, getWhatsAppLink, SERVICE_AREAS } from '@/lib/constants';
import Link from 'next/link';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: `${BUSINESS_INFO.website}/services/${slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${BUSINESS_INFO.website}/services/${slug}`,
      siteName: BUSINESS_INFO.name,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
    },
    other: {
      'geo.region': 'US-FL',
      'geo.placename': 'Jacksonville',
      'geo.position': `${BUSINESS_INFO.geo.latitude};${BUSINESS_INFO.geo.longitude}`,
      'ICBM': `${BUSINESS_INFO.geo.latitude}, ${BUSINESS_INFO.geo.longitude}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
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
          `${BUSINESS_INFO.website}/services/${slug}`
        )}
      />
      <JsonLd data={generateFAQSchema(service.faqs)} />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BUSINESS_INFO.website },
          { name: 'Services', url: `${BUSINESS_INFO.website}/services` },
          { name: service.name, url: `${BUSINESS_INFO.website}/services/${slug}` },
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
                      href={`/${area.slug}-painting-contractor`}
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
                            href={`/services/${s.slug}`}
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

      <WhatsAppCTA
        title={`Get Your Free ${service.name} Estimate`}
        subtitle="Contact Paint-Techs LLC today. We'll provide a detailed quote and answer all your questions."
        message={`Hi! I'm interested in ${service.name} services. Can I get a free quote?`}
      />
    </>
  );
}
