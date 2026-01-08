import { Metadata } from 'next';
import Link from 'next/link';
import { Container, SectionHeading, Card, Button } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import JsonLd from '@/components/seo/JsonLd';
import { generateMetadata } from '@/lib/metadata';
import { generateServiceAreasSchema } from '@/lib/schema';
import { locationsData } from '@/data/locations';
import { BUSINESS_INFO } from '@/lib/constants';

export const metadata: Metadata = generateMetadata({
  title: 'Service Areas - Painters in Jacksonville & Northeast Florida',
  description: 'Paint-Techs LLC serves Jacksonville, Nocatee, Ponte Vedra Beach, St. Augustine, and all of Northeast Florida. Professional painting services near you. Free estimates!',
  path: '/areas-we-serve',
});

export default function AreasPage() {
  // Group locations by county
  const locationsByCounty = locationsData.reduce((acc, location) => {
    if (!acc[location.county]) {
      acc[location.county] = [];
    }
    acc[location.county].push(location);
    return acc;
  }, {} as Record<string, typeof locationsData>);

  const counties = Object.keys(locationsByCounty);

  return (
    <>
      <JsonLd data={generateServiceAreasSchema()} />
      <Breadcrumbs items={[{ label: 'Service Areas' }]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Serving <span className="text-teal-400">Jacksonville</span> & Northeast Florida
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Paint-Techs LLC proudly provides professional painting services to homeowners and businesses throughout the greater Jacksonville area and surrounding communities.
            </p>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <Container>
          <Card className="p-0 overflow-hidden" hover={false}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d440835.85687389!2d-81.95!3d30.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b716f1ceafeb%3A0xc4cd7d3896fcc7e2!2sJacksonville%2C%20FL!5e0!3m2!1sen!2sus!4v1704652800000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Paint-Techs Service Area Map"
            ></iframe>
          </Card>
        </Container>
      </section>

      {/* All Service Areas - Grid */}
      <section className="py-20 bg-gray-50">
        <Container>
          <SectionHeading
            title="Our Service Areas"
            subtitle="Professional painting services throughout Northeast Florida. Click on any location to learn more."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationsData.map((location) => (
              <Link key={location.slug} href={`/${location.slug}-painting-contractor`}>
                <Card className="h-full group cursor-pointer hover:border-orange-300 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-navy-800 group-hover:text-orange-600 transition-colors">
                        {location.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">{location.county}</p>
                      <p className="text-gray-600 text-sm line-clamp-2">{location.description}</p>
                      <span className="inline-flex items-center text-orange-600 font-medium text-sm mt-3 group-hover:gap-2 transition-all">
                        View Services
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Service Areas by County */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeading
            title="Browse by County"
            subtitle="Find painting services in your specific county."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {counties.map((county) => (
              <div key={county} className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-navy-800 text-lg mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  {county}
                </h3>
                <ul className="space-y-2">
                  {locationsByCounty[county].map((location) => (
                    <li key={location.slug}>
                      <Link
                        href={`/${location.slug}-painting-contractor`}
                        className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors py-1"
                      >
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {location.name} Painters
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Service Coverage */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card>
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Quick Response</h3>
              <p className="text-gray-600">
                Same-day or next-day estimates available for most service areas.
              </p>
            </Card>

            <Card>
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Local Expertise</h3>
              <p className="text-gray-600">
                We understand local architectural styles, HOA requirements, and climate needs.
              </p>
            </Card>

            <Card>
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Full Service</h3>
              <p className="text-gray-600">
                Interior, exterior, cabinet, and commercial painting throughout our service area.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Not in Our Area */}
      <section className="py-12 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-navy-800 mb-4">
              Don&apos;t See Your Area?
            </h2>
            <p className="text-gray-600 mb-6">
              We may still be able to help! Contact us to discuss your location and project needs.
            </p>
            <Button href="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>

      <WhatsAppCTA />
    </>
  );
}
