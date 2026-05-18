'use client';

import Image from 'next/image';
import { Button, Container } from '@/components/ui';
import { BUSINESS_INFO, getPhoneLink } from '@/lib/constants';
import HeroReviewsSlider from '@/components/features/HeroReviewsSlider';
import QuoteFormButton from '@/components/features/QuoteFormButton';

interface HeroProps {
  title?: string;
  subtitle?: string;
  showReviews?: boolean;
}

export default function Hero({
  title = 'Professional Painting Services in Jacksonville, FL',
  subtitle = 'Transform your home or business with Paint-Techs LLC. Expert painters delivering flawless results with premium paints and exceptional craftsmanship.',
  showReviews = true,
}: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-painting-jacksonville-fl-1.webp"
          alt="Professional Jacksonville painters finishing an exterior house painting project"
          title="Jacksonville Painters - Professional House Painting Services"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/70 to-navy-900/50"></div>
      </div>

      <Container className="relative z-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text & CTAs */}
          <div>
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
              {title.split('Jacksonville').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-orange-400">Jacksonville</span>
                  )}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <QuoteFormButton
                variant="primary"
                size="lg"
                title="Request a free painting quote"
                promoTag="hero"
              >
                Get Free Quote
              </QuoteFormButton>
              <Button href={getPhoneLink()} variant="white" size="lg" external title="Call Jacksonville Painters">
                Call {BUSINESS_INFO.phone}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2 text-gray-300">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">7 Days a Week</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">Jacksonville Area</span>
              </div>
            </div>
          </div>

          {/* Right Side - Google Reviews Slider */}
          {showReviews && (
            <div className="flex justify-center lg:justify-end">
              <HeroReviewsSlider />
            </div>
          )}
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
