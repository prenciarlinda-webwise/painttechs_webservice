'use client';

import { BUSINESS_INFO, getPhoneLink } from '@/lib/constants';
import { Button, Container } from '@/components/ui';
import QuoteFormButton from '@/components/features/QuoteFormButton';

interface WhatsAppCTAProps {
  title?: string;
  subtitle?: string;
  // `message` retained for backwards compatibility with existing callers.
  // Not used since WhatsApp is no longer a primary CTA.
  message?: string;
  variant?: 'default' | 'compact';
}

export default function WhatsAppCTA({
  title = 'Ready to get started?',
  subtitle = 'Request a free quote and a Paint-Techs estimator will reply within 24 hours.',
  variant = 'default',
}: WhatsAppCTAProps) {
  const phoneLink = getPhoneLink();

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 py-8">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white text-center md:text-left">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-teal-100">{subtitle}</p>
            </div>
            <div className="flex gap-4">
              <QuoteFormButton
                variant="white"
                title="Request a free painting quote"
                promoTag="cta-compact"
              >
                Get Free Quote
              </QuoteFormButton>
              <Button href={phoneLink} variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600" external title="Call Jacksonville Painters">
                Call Now
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-10">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <QuoteFormButton
              variant="primary"
              size="lg"
              title="Request a free painting quote"
              promoTag="cta-default"
            >
              Get Free Quote
            </QuoteFormButton>

            <span className="text-gray-400">or</span>

            <Button href={phoneLink} variant="white" size="lg" external title="Call Jacksonville Painters">
              Call {BUSINESS_INFO.phone}
            </Button>
          </div>

          <p className="mt-8 text-gray-400">
            Available {BUSINESS_INFO.hours.display} - 7 Days a Week
          </p>
        </div>
      </Container>
    </section>
  );
}
