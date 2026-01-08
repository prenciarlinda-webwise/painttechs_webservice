import Link from 'next/link';
import { Container } from '@/components/ui';
import JsonLd from './JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { BUSINESS_INFO } from '@/lib/constants';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  const schemaItems = allItems.map((item) => ({
    name: item.label,
    url: item.href ? `${BUSINESS_INFO.website}${item.href}` : '',
  }));

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(schemaItems)} />
      <div className="bg-gray-100 py-3">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-2 text-sm">
              {allItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <svg
                      className="w-4 h-4 mx-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                  {item.href && index < allItems.length - 1 ? (
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-teal-500 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-gray-900 font-medium">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Container>
      </div>
    </>
  );
}
