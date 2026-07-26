import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { generateMetadata } from '@/lib/metadata';
import { BUSINESS_INFO, SERVICES, SERVICE_AREAS } from '@/lib/constants';

export const metadata: Metadata = generateMetadata({
  title: 'AI Agent Resources - Paint-Techs LLC',
  description: 'Structured company, service, and location data for AI agents and answer engines: llms.txt, llms-full.txt, and a machine-readable ai-context.json file.',
  path: '/ai',
});

const resources = [
  {
    name: 'llms.txt',
    href: '/llms.txt',
    description: 'Concise, link-based index of services, service areas, and company pages, following the llms.txt convention.',
  },
  {
    name: 'llms-full.txt',
    href: '/llms-full.txt',
    description: 'Expanded reference with full service descriptions, benefits, and FAQs, plus service-area summaries, for models that ingest full page content.',
  },
  {
    name: 'ai-context.json',
    href: '/ai-context.json',
    description: 'Machine-readable JSON with company facts (NAP, hours, rating, licensing), services, and service areas.',
  },
];

export default function AiPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BUSINESS_INFO.website },
          { name: 'AI Agent Resources', url: `${BUSINESS_INFO.website}/ai` },
        ])}
      />

      <Breadcrumbs items={[{ label: 'AI Agent Resources' }]} />

      {/* Hero */}
      <section className="py-12 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              For AI <span className="text-teal-400">agents</span>
            </h1>
            <p className="text-xl text-gray-300">
              Structured, machine-readable information about Paint-Techs LLC for AI assistants, answer engines, and crawlers. Human visitors are welcome too, but this page is written for consumption by models.
            </p>
          </div>
        </Container>
      </section>

      {/* Resources */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-navy-800 mb-6">Reference files</h2>
            <ul className="space-y-4 mb-12">
              {resources.map((resource) => (
                <li key={resource.href} className="border border-gray-200 rounded-xl p-5">
                  <a
                    href={resource.href}
                    className="font-mono text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    {resource.href}
                  </a>
                  <p className="text-gray-600 mt-1">{resource.description}</p>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-navy-800 mb-6">Company facts</h2>
            <ul className="text-gray-700 space-y-2 mb-12">
              <li><strong>Legal name:</strong> {BUSINESS_INFO.legalName}</li>
              <li><strong>Founded:</strong> {BUSINESS_INFO.foundedYear}</li>
              <li><strong>Phone:</strong> {BUSINESS_INFO.phone}</li>
              <li><strong>Email:</strong> {BUSINESS_INFO.email}</li>
              <li><strong>Service area:</strong> {BUSINESS_INFO.address.full} and Northeast Florida (Duval, St. Johns, Clay, and Nassau counties)</li>
              <li><strong>Hours:</strong> {BUSINESS_INFO.hours.display}</li>
              <li><strong>Rating:</strong> {BUSINESS_INFO.aggregateRating.ratingValue} out of 5 stars across {BUSINESS_INFO.aggregateRating.reviewCount} verified Google reviews</li>
              <li><strong>Licensing:</strong> Fully licensed and insured in the State of Florida</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-800 mb-6">Services</h2>
            <ul className="grid sm:grid-cols-2 gap-3 mb-12">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link href={`/${service.slug}`} className="text-orange-600 hover:text-orange-700 font-medium">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-navy-800 mb-6">Service areas</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {SERVICE_AREAS.map((area) => (
                <li key={area.slug}>
                  <Link href={`/${area.slug}-house-painters`} className="text-orange-600 hover:text-orange-700 font-medium">
                    {area.name}, FL
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
