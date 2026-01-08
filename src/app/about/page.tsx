import { Metadata } from 'next';
import Image from 'next/image';
import { Container, SectionHeading, Card, Button } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import JsonLd from '@/components/seo/JsonLd';
import { generateMetadata } from '@/lib/metadata';
import { generateAboutPageSchema } from '@/lib/schema';
import { BUSINESS_INFO } from '@/lib/constants';

export const metadata: Metadata = generateMetadata({
  title: 'About Paint-Techs LLC - Jacksonville Painting Contractor',
  description: 'Learn about Paint-Techs LLC, Jacksonville\'s trusted painting contractor. Our experienced team delivers quality interior, exterior, and cabinet painting services throughout Northeast Florida.',
  path: '/about',
});

const values = [
  {
    icon: '',
    title: 'Quality First',
    description: 'We never cut corners. Every project receives the same meticulous attention to detail, from preparation to final walkthrough.',
  },
  {
    icon: '',
    title: 'Customer Focused',
    description: 'Your satisfaction is our priority. We listen to your needs, communicate clearly, and deliver results that exceed expectations.',
  },
  {
    icon: '',
    title: 'Reliable Service',
    description: 'We show up on time, work efficiently, and complete projects on schedule. You can count on Paint-Techs.',
  },
  {
    icon: '',
    title: 'Premium Materials',
    description: 'We use only top-quality paints and materials from trusted brands to ensure beautiful, long-lasting results.',
  },
];

const teamFeatures = [
  'Background-checked professionals',
  'Ongoing training and education',
  'Years of combined experience',
  'Detail-oriented craftsmen',
  'Respectful and courteous',
  'Fully insured and bonded',
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={generateAboutPageSchema()} />
      <Breadcrumbs items={[{ label: 'About' }]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-teal-400">Paint-Techs LLC</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We&apos;re a locally owned and operated painting company dedicated to transforming homes and businesses throughout Jacksonville and Northeast Florida with expert craftsmanship and exceptional service.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-teal-500 font-semibold mb-4">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-6">
                Built on Quality and Trust
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Paint-Techs LLC was founded with a simple mission: to provide Jacksonville homeowners and businesses with painting services that combine exceptional quality, fair pricing, and outstanding customer service.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We understand that your home is your most valuable asset and that your business represents your livelihood. That&apos;s why we approach every project with the care and attention it deserves, treating your property as if it were our own.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                From small touch-up jobs to complete interior and exterior transformations, our experienced team has the skills, equipment, and dedication to deliver results that exceed your expectations.
              </p>

              <div className="flex gap-8">
                <div>
                  <div className="text-4xl font-bold text-teal-500">500+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-teal-500">5.0</div>
                  <div className="text-gray-600">Google Rating</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-teal-500">5+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Why Choose Paint-Techs?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-200 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Licensed and fully insured for your protection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-200 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Premium paints from Sherwin-Williams, Benjamin Moore, PPG</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-200 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Detailed preparation for lasting results</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-200 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free estimates with transparent pricing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-200 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Available 7 days a week, 8AM-10PM</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-teal-200 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Satisfaction guaranteed on every project</span>
                  </li>
                </ul>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400 rounded-2xl -z-10"></div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <Container>
          <SectionHeading
            title="Our Core Values"
            subtitle="These principles guide everything we do at Paint-Techs"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-navy-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-navy-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Professional Team</h3>
                <div className="grid grid-cols-2 gap-4">
                  {teamFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-block text-teal-500 font-semibold mb-4">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-6">
                Experienced Professionals You Can Trust
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our painters aren&apos;t just employees, they&apos;re skilled craftsmen who take pride in their work. Each team member is carefully selected, background-checked, and trained to meet our high standards.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We invest in ongoing training and education to ensure our team stays current with the latest techniques, products, and safety practices. When Paint-Techs arrives at your home, you can expect professionalism, respect, and expert workmanship.
              </p>
              <Button href="/contact" variant="primary">
                Meet Our Team
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Service Area */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-800 mb-6">
              Proudly Serving Jacksonville & Northeast Florida
            </h2>
            <p className="text-gray-600 mb-8">
              Paint-Techs LLC serves homeowners and businesses throughout the greater Jacksonville area, including Nocatee, Ponte Vedra Beach, Jacksonville Beach, Atlantic Beach, St. Augustine, Fernandina Beach, Middleburg, Orange Park, and Yulee.
            </p>
            <Button href="/areas-we-serve" variant="outline">
              View All Service Areas
            </Button>
          </div>
        </Container>
      </section>

      <WhatsAppCTA
        title="Ready to Get Started?"
        subtitle="Contact us today for a free, no-obligation estimate on your painting project."
      />
    </>
  );
}
