import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS_INFO, SERVICES, SERVICE_AREAS, getPhoneLink, getEmailLink } from '@/lib/constants';
import { Container } from '@/components/ui';
import { QuoteFormTrigger } from '@/components/features/QuoteFormButton';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-gray-300">
      {/* Main Footer */}
      <div className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <Link href="/" title="Jacksonville Painters - Home" className="block mb-6">
                <Image
                  src="/images/logo/paint-techs-llc-logo.webp"
                  alt="Paint-Techs LLC - Professional Painting Services Jacksonville FL"
                  title="Paint-Techs LLC - Jacksonville Painters"
                  width={180}
                  height={180}
                  className="h-14 w-auto brightness-0 invert"
                  unoptimized
                />
              </Link>
              <p className="text-gray-400 mb-6">
                Jacksonville&apos;s trusted painting contractor. Quality craftsmanship, premium paints, and exceptional service for your home or business.
              </p>
              <div className="flex gap-4">
                <a
                  href={BUSINESS_INFO.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                  title="Follow Paint-Techs LLC on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={BUSINESS_INFO.links.gmb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Google Business"
                  title="View Paint-Techs LLC on Google Maps"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Our Services</h3>
              <ul className="space-y-3">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/${service.slug}`}
                      title={`${service.name} Jacksonville FL`}
                      className="text-gray-400 hover:text-orange-400 transition-colors"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services" title="All Painting Services Jacksonville FL" className="text-teal-400 hover:text-orange-300 transition-colors font-medium">
                    View All Services →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Service Areas */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Service Areas</h3>
              <ul className="space-y-3">
                {SERVICE_AREAS.slice(0, 6).map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/${area.slug}-house-painters`}
                      title={`${area.name} Painters - House Painting Services`}
                      className="text-gray-400 hover:text-orange-400 transition-colors"
                    >
                      {area.name}, FL
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/areas-we-serve" title="All Service Areas - Northeast Florida Painters" className="text-teal-400 hover:text-orange-300 transition-colors font-medium">
                    View All Areas →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href={getPhoneLink()}
                    title="Call Paint-Techs LLC Jacksonville Painters"
                    className="flex items-start gap-3 text-gray-400 hover:text-orange-400 transition-colors group"
                  >
                    <svg className="w-5 h-5 mt-0.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <span className="block font-medium text-white">{BUSINESS_INFO.phone}</span>
                      <span className="text-sm">Call or Text</span>
                    </div>
                  </a>
                </li>
                <li>
                  <QuoteFormTrigger
                    title="Request a free painting quote"
                    promoTag="footer"
                    className="flex items-start gap-3 text-left w-full text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    <svg className="w-5 h-5 mt-0.5 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span className="block">
                      <span className="block font-medium text-white">Free Quote</span>
                      <span className="text-sm">Reply within 24h</span>
                    </span>
                  </QuoteFormTrigger>
                </li>
                <li>
                  <a
                    href={getEmailLink()}
                    title="Email Paint-Techs LLC Jacksonville Painters"
                    className="flex items-start gap-3 text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    <svg className="w-5 h-5 mt-0.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <span className="block font-medium text-white">{BUSINESS_INFO.email}</span>
                      <span className="text-sm">Email Us</span>
                    </div>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <svg className="w-5 h-5 mt-0.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <span className="block font-medium text-white">{BUSINESS_INFO.address.full}</span>
                    <span className="text-sm">Service Area</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <svg className="w-5 h-5 mt-0.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="block font-medium text-white">{BUSINESS_INFO.hours.display}</span>
                    <span className="text-sm">7 Days a Week</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm text-center md:text-left">
              <p>&copy; {currentYear} {BUSINESS_INFO.name}. All rights reserved.</p>
              <p className="mt-1">
                SEO and Website Building by{' '}
                <a
                  href="https://www.websiteandseoagency.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Web Wise
                </a>
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/sitemap-page" title="Sitemap - Paint-Techs LLC Jacksonville Painters" className="text-gray-500 hover:text-orange-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
