'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, SectionHeading } from '@/components/ui';

interface FAQ {
  question: string;
  answer: string;
}

interface HomeFAQProps {
  faqs: FAQ[];
}

export default function HomeFAQ({ faqs }: HomeFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Get answers to common questions about our painting services in Jacksonville, FL"
        />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="font-semibold text-navy-800 pr-4 text-lg">
                    {faq.question}
                  </h3>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      openIndex === index
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA below FAQ */}
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">
              Have more questions? We&apos;re here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/faq"
                title="Painting FAQs - Common Questions Answered"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold rounded-lg transition-colors"
              >
                View All FAQs
              </Link>
              <Link
                href="/contact"
                title="Contact Jacksonville Painters - Free Estimate"
                className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}