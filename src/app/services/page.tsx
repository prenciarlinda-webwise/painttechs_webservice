import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container, SectionHeading, Card, Button } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import JsonLd from '@/components/seo/JsonLd';
import { generateMetadata } from '@/lib/metadata';
import { generateServicesListSchema } from '@/lib/schema';
import { servicesData } from '@/data/services';

export const metadata: Metadata = generateMetadata({
  title: 'Painting Services Jacksonville FL - Interior, Exterior, Cabinet',
  description: 'Professional painting services in Jacksonville, FL. Interior painting, exterior painting, cabinet refinishing, and commercial painting. Free estimates from Paint-Techs LLC.',
  path: '/services',
});

const serviceImages: Record<string, string> = {
  'interior-painting': '/images/interior-living-room-sage-green-accent-wall.webp',
  'exterior-painting': '/images/exterior-painting-nocatee-fl-1.webp',
  'cabinet-painting': '/images/cabinet-painting-before-after-nocatee-before-after.webp',
  'pool-deck-painting-staining': '/images/deck-painting-services-nocatee-fl.webp',
  'commercial-painting': '/images/commercial-painting-company-jacksonville.webp',
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={generateServicesListSchema()} />
      <Breadcrumbs items={[{ label: 'Services' }]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Painting Services in <span className="text-teal-400">Jacksonville, FL</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              From interior refreshes to complete exterior transformations, Paint-Techs LLC delivers exceptional painting services for homes and businesses throughout Northeast Florida.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {servicesData.map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full border border-gray-100 hover:border-teal-500">
                  {/* Service Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={serviceImages[service.slug]}
                      alt={`${service.name} in Jacksonville FL`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent"></div>
                    <h2 className="absolute bottom-4 left-6 right-6 text-2xl font-bold text-white">
                      {service.name}
                    </h2>
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.benefits.slice(0, 4).map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center text-teal-500 font-semibold group-hover:gap-2 transition-all">
                      Learn More
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <Container>
          <SectionHeading
            title="Why Choose Paint-Techs?"
            subtitle="We're committed to delivering exceptional results on every project"
          />

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-3">Licensed & Insured</h3>
              <p className="text-gray-600">
                Fully licensed and insured painting contractor. Your property is protected throughout the project.
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                We use top-tier paints from Sherwin-Williams, Benjamin Moore, and PPG for lasting results.
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-3">Fast Turnaround</h3>
              <p className="text-gray-600">
                Efficient project completion without sacrificing quality. We respect your time and schedule.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeading
            title="Our Painting Process"
            subtitle="A proven approach that delivers consistent, beautiful results"
          />

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: 1, title: 'Free Estimate', desc: 'We visit your property and provide a detailed, no-obligation quote.' },
              { step: 2, title: 'Color Selection', desc: 'Our team helps you choose perfect colors for your space.' },
              { step: 3, title: 'Preparation', desc: 'Thorough surface prep ensures paint adhesion and longevity.' },
              { step: 4, title: 'Expert Painting', desc: 'Our skilled painters apply premium paints with precision.' },
              { step: 5, title: 'Final Inspection', desc: 'We walk through together to ensure your complete satisfaction.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-navy-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <WhatsAppCTA />
    </>
  );
}
