import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import { BUSINESS_INFO } from '@/lib/constants';

export default function About() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Licensed & Insured',
      description: 'Fully licensed painting contractor with comprehensive insurance coverage.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Premium Quality',
      description: 'We use only top-tier paints from Sherwin-Williams, Benjamin Moore, and PPG.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Always Available',
      description: 'Open 7 days a week, 8AM-10PM. We work around your schedule.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Expert Team',
      description: 'Skilled painters with years of experience and attention to detail.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-teal-500 font-semibold mb-4">
              About Paint-Techs LLC
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-6">
              Jacksonville&apos;s Trusted Painting Professionals
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Paint-Techs LLC is a locally owned and operated painting company serving Jacksonville and Northeast Florida. We take pride in delivering exceptional painting services with a focus on quality, reliability, and customer satisfaction.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our experienced team handles projects of all sizes, from single-room refreshes to complete interior and exterior transformations. We use premium paints designed for Florida&apos;s unique climate and always prepare surfaces properly for lasting results.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-500">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-800 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button href="/about" variant="primary">
              Learn More About Us
            </Button>
          </div>

          {/* Image/Visual Side */}
          <div className="relative">
            <div className="relative z-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-white">
              <div className="text-6xl font-bold mb-4">5+</div>
              <p className="text-xl font-semibold mb-2">Years Serving Jacksonville</p>
              <p className="text-teal-100 mb-8">
                Hundreds of satisfied customers throughout Northeast Florida trust Paint-Techs for their painting needs.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-teal-100">Projects</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">5.0</div>
                  <div className="text-sm text-teal-100">Google Rating</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-2xl -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-navy-800 rounded-2xl -z-10"></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
