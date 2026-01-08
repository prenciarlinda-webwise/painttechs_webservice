import { Metadata } from 'next';
import Link from 'next/link';
import { Container, SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { generateMetadata } from '@/lib/metadata';
import { locationsData } from '@/data/locations';
import { SERVICES, BUSINESS_INFO } from '@/lib/constants';

export const metadata: Metadata = generateMetadata({
  title: 'Sitemap | Paint-Techs LLC',
  description: 'Browse all pages on the Paint-Techs LLC website. Find information about our painting services, service areas, gallery, and more.',
  path: '/sitemap-page',
});

const mainPages = [
  { name: 'Home', href: '/', description: 'Welcome to Paint-Techs LLC' },
  { name: 'About Us', href: '/about', description: 'Learn about our company and team' },
  { name: 'Services', href: '/services', description: 'View all our painting services' },
  { name: 'Gallery', href: '/gallery', description: 'See our completed projects' },
  { name: 'Areas We Serve', href: '/areas-we-serve', description: 'Find painters in your area' },
  { name: 'Reviews', href: '/reviews', description: 'Read customer testimonials' },
  { name: 'Blog', href: '/blog', description: 'Painting tips and inspiration' },
  { name: 'FAQ', href: '/faq', description: 'Frequently asked questions' },
  { name: 'Contact', href: '/contact', description: 'Get in touch with us' },
];

export default function SitemapPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BUSINESS_INFO.website },
          { name: 'Sitemap', url: `${BUSINESS_INFO.website}/sitemap-page` },
        ])}
      />

      <Breadcrumbs items={[{ label: 'Sitemap' }]} />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Site <span className="text-teal-400">Map</span>
            </h1>
            <p className="text-xl text-gray-300">
              Navigate our website easily. Find all pages, services, and locations.
            </p>
          </div>
        </Container>
      </section>

      {/* Sitemap Content */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Pages */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-navy-800">Main Pages</h2>
              </div>
              <ul className="space-y-3">
                {mainPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <div>
                        <span className="font-medium text-navy-800 group-hover:text-orange-600 transition-colors">
                          {page.name}
                        </span>
                        <p className="text-sm text-gray-500">{page.description}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-navy-800">Our Services</h2>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services"
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-500 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div>
                      <span className="font-medium text-navy-800 group-hover:text-teal-600 transition-colors">
                        All Services
                      </span>
                      <p className="text-sm text-gray-500">Overview of all painting services</p>
                    </div>
                  </Link>
                </li>
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-500 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <div>
                        <span className="font-medium text-navy-800 group-hover:text-teal-600 transition-colors">
                          {service.name}
                        </span>
                        <p className="text-sm text-gray-500">{service.shortDescription}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Areas */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-navy-800">Service Areas</h2>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/areas-we-serve"
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div>
                      <span className="font-medium text-navy-800 group-hover:text-blue-600 transition-colors">
                        All Service Areas
                      </span>
                      <p className="text-sm text-gray-500">View all locations we serve</p>
                    </div>
                  </Link>
                </li>
                {locationsData.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/${location.slug}-painting-contractor`}
                      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <div>
                        <span className="font-medium text-navy-800 group-hover:text-blue-600 transition-colors">
                          {location.name} Painters
                        </span>
                        <p className="text-sm text-gray-500">{location.county}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Links Bar */}
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-navy-800 mb-4">Quick Links</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-100 text-gray-700 rounded-full font-medium transition-colors border border-gray-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View Gallery
              </Link>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-100 text-gray-700 rounded-full font-medium transition-colors border border-gray-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* XML Sitemap Link */}
      <section className="py-8 bg-white border-t border-gray-100">
        <Container>
          <div className="text-center text-sm text-gray-500">
            <p>
              Looking for the XML sitemap for search engines?{' '}
              <a href="/sitemap.xml" className="text-teal-600 hover:text-teal-700 font-medium">
                View sitemap.xml
              </a>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
