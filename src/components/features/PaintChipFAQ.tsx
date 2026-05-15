'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface PaintChipFAQProps {
  faqs: FAQ[];
  heading: string;
  subheading?: string;
}

export default function PaintChipFAQ({
  faqs,
  heading,
  subheading,
}: PaintChipFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-navy-800">{heading}</h2>
        {subheading && <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{subheading}</p>}
      </div>

      <div className="grid gap-4 max-w-3xl mx-auto">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.10)] border border-orange-100/70 overflow-hidden transition-transform hover:-translate-y-0.5"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-start gap-4 text-left px-6 py-5"
                aria-expanded={isOpen}
              >
                <span
                  aria-hidden
                  className="mt-1 w-3 h-3 rounded-full flex-shrink-0 bg-orange-500"
                  style={{ boxShadow: '0 0 0 4px #fff6ec' }}
                />
                <span className="flex-1 text-navy-800 font-semibold text-base md:text-lg">{faq.question}</span>
                <span
                  aria-hidden
                  className="text-navy-700 text-xl transition-transform"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-5 -mt-1">
                  <div className="ml-7 text-navy-700/90 leading-relaxed text-[15px]">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
