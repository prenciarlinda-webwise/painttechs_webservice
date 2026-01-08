import { Metadata } from 'next';
import { Container, SectionHeading, Card, Button } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { generateMetadata } from '@/lib/metadata';
import { generateContactPageSchema } from '@/lib/schema';
import { BUSINESS_INFO, getWhatsAppLink, getPhoneLink, getEmailLink } from '@/lib/constants';

export const metadata: Metadata = generateMetadata({
  title: 'Contact Paint-Techs LLC - Free Painting Estimates Jacksonville FL',
  description: 'Contact Paint-Techs LLC for free painting estimates in Jacksonville, FL. Call (904) 762-7062 or message us on WhatsApp. Available 7 days a week, 8AM-10PM.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={generateContactPageSchema()} />
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch with <span className="text-teal-400">Paint-Techs</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Ready to transform your space? Contact us for a free, no-obligation estimate. We&apos;re available 7 days a week to answer your questions.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeading
            title="How Would You Like to Reach Us?"
            subtitle="Choose your preferred method of contact. We typically respond within minutes!"
          />

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* WhatsApp */}
            <Card className="text-center border-2 border-green-500 bg-green-50" padding="lg">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy-800 mb-3">WhatsApp Us</h3>
              <p className="text-gray-600 mb-6">
                Fastest way to reach us! Send a message and get a quick response.
              </p>
              <Button
                href={getWhatsAppLink()}
                variant="whatsapp"
                className="w-full"
                external
              >
                Message on WhatsApp
              </Button>
              <p className="text-sm text-green-600 mt-3 font-medium">
                Typically responds in minutes
              </p>
            </Card>

            {/* Phone */}
            <Card className="text-center border-2 border-teal-500" padding="lg">
              <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy-800 mb-3">Call Us</h3>
              <p className="text-gray-600 mb-6">
                Speak directly with our team. We&apos;re here to help!
              </p>
              <Button
                href={getPhoneLink()}
                variant="primary"
                className="w-full"
                external
              >
                Call {BUSINESS_INFO.phone}
              </Button>
              <p className="text-sm text-teal-600 mt-3 font-medium">
                Available {BUSINESS_INFO.hours.display}
              </p>
            </Card>

            {/* Email */}
            <Card className="text-center border-2 border-gray-300" padding="lg">
              <div className="w-20 h-20 bg-navy-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy-800 mb-3">Email Us</h3>
              <p className="text-gray-600 mb-6">
                Send us details about your project via email.
              </p>
              <Button
                href={getEmailLink('Painting Quote Request')}
                variant="secondary"
                className="w-full"
                external
              >
                {BUSINESS_INFO.email}
              </Button>
              <p className="text-sm text-gray-500 mt-3 font-medium">
                We&apos;ll respond within 24 hours
              </p>
            </Card>
          </div>

          {/* Business Info */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <Card className="bg-gray-50" hover={false}>
              <h3 className="text-xl font-bold text-navy-800 mb-6">Business Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-800">{BUSINESS_INFO.name}</h4>
                    <p className="text-gray-600">{BUSINESS_INFO.address.full}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-800">Business Hours</h4>
                    <p className="text-gray-600">{BUSINESS_INFO.hours.display}</p>
                    <p className="text-sm text-gray-500">Monday - Sunday</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-800">Service Area</h4>
                    <p className="text-gray-600">Jacksonville & Northeast Florida</p>
                    <p className="text-sm text-gray-500">Including Nocatee, Ponte Vedra, St. Augustine</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <a
                  href={BUSINESS_INFO.links.gmb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  View on Google Maps
                </a>
              </div>
            </Card>

            {/* Map - Google Business Profile */}
            <Card className="p-0 overflow-hidden" hover={false}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d883011.5245123599!2d-82.28811641930854!3d30.172458415508522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xabf5561190f05815%3A0x564b53fd12603bd0!2sPaint-Techs%20LLC%20-%20Painting%20Company!5e0!3m2!1sen!2s!4v1767775457415!5m2!1sen!2s"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Paint-Techs LLC on Google Maps"
              ></iframe>
            </Card>
          </div>
        </Container>
      </section>

      {/* FAQ Quick Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-4">
              Have Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Check our frequently asked questions for quick answers, or reach out directly - we&apos;re always happy to help!
            </p>
            <Button href="/faq" variant="outline">
              View FAQ
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
