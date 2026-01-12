import Link from 'next/link';
import { Container, SectionHeading } from '@/components/ui';
import { SERVICE_AREAS } from '@/lib/constants';

export default function ServiceAreas() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <Container>
        <SectionHeading
          title="Serving Jacksonville & Northeast Florida"
          subtitle="Paint-Techs proudly serves homeowners and businesses throughout the greater Jacksonville area."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {SERVICE_AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/${area.slug}-house-painters`}
              title={`${area.name} Painters - House Painting Services`}
              className={`group relative p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-2 ${
                area.priority ? 'border-teal-500' : 'border-transparent hover:border-teal-300'
              }`}
            >
              {area.priority && (
                <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  Top
                </span>
              )}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  area.priority ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-600 group-hover:bg-teal-50 group-hover:text-teal-600'
                } transition-colors`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`font-semibold ${area.priority ? 'text-teal-600' : 'text-navy-800 group-hover:text-teal-600'} transition-colors`}>
                    {area.name}
                  </h3>
                  <p className="text-xs text-gray-500">FL</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/areas-we-serve"
            title="All Service Areas - Northeast Florida Painters"
            className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Service Areas
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
