import { Metadata } from 'next';
import { Container, SectionHeading, Card } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import JsonLd from '@/components/seo/JsonLd';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { BUSINESS_INFO } from '@/lib/constants';
import { generateMetadata } from '@/lib/metadata';
import { faqData, getCategories, getFAQsByCategory } from '@/data/faq';

export const metadata: Metadata = generateMetadata({
  title: 'FAQ - Painting Questions Answered - Paint-Techs LLC',
  description: 'Frequently asked questions about painting services in Jacksonville, FL. Learn about our process, pricing, timelines, and more. Paint-Techs LLC has answers!',
  path: '/faq',
});

export default function FAQPage() {
  const categories = getCategories();

  return (
    <>
      <JsonLd data={generateFAQSchema(faqData)} />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BUSINESS_INFO.website },
          { name: 'FAQ', url: `${BUSINESS_INFO.website}/faq` },
        ])}
      />

      <Breadcrumbs items={[{ label: 'FAQ' }]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-teal-400">Questions</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Find answers to common questions about our painting services, process, and what to expect when working with Paint-Techs LLC.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <Container>
          {categories.map((category) => (
            <div key={category} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold text-navy-800 mb-8 pb-4 border-b-2 border-teal-500 inline-block">
                {category}
              </h2>
              <div className="space-y-4">
                {getFAQsByCategory(category).map((faq, index) => (
                  <Card key={index} className="border border-gray-200" hover={false}>
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <h3 className="font-semibold text-navy-800 pr-4">{faq.question}</h3>
                        <span className="flex-shrink-0 w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center group-open:bg-teal-500 transition-colors">
                          <svg
                            className="w-4 h-4 text-teal-500 group-open:text-white group-open:rotate-180 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      <p className="mt-4 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-800 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-8">
              Can&apos;t find the answer you&apos;re looking for? Our team is happy to help with any questions about your painting project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors"
              >
                Contact Us
              </a>
              <a
                href="tel:+19047627062"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-teal-500 text-teal-500 hover:bg-teal-50 font-semibold rounded-lg transition-colors"
              >
                Call (904) 762-7062
              </a>
            </div>
          </div>
        </Container>
      </section>

      <WhatsAppCTA variant="compact" />
    </>
  );
}
