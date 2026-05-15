import Link from 'next/link';
import { SERVICES } from '@/lib/constants';

interface ServicePickerProps {
  label?: string;
  className?: string;
}

// Native <details> dropdown — no JS, no client component, links stay crawlable for SEO.
export default function ServicePicker({
  label = 'Pick a service',
  className = '',
}: ServicePickerProps) {
  return (
    <details className={`group relative inline-block ${className}`}>
      <summary
        className="list-none cursor-pointer inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-orange-200/70 text-navy-800 font-semibold shadow-[0_8px_22px_-10px_rgba(0,0,0,0.18)] hover:border-orange-300 transition"
      >
        <span aria-hidden className="text-orange-600">●</span>
        {label}
        <span aria-hidden className="text-orange-500 transition-transform group-open:rotate-180">▾</span>
      </summary>
      <ul
        role="list"
        className="absolute z-20 left-0 mt-2 w-72 bg-white rounded-2xl border border-orange-100 shadow-[0_18px_42px_-12px_rgba(0,0,0,0.18)] p-2"
      >
        {SERVICES.map((service, i) => {
          const dot = ['#ea711e', '#2563eb', '#d4650f', '#3a6e98', '#ea711e'][i % 5];
          return (
            <li key={service.id}>
              <Link
                href={`/${service.slug}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 transition group/item"
              >
                <span
                  aria-hidden
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: dot }}
                />
                <div className="flex-1">
                  <div className="font-semibold text-navy-800 group-hover/item:text-orange-700">
                    {service.name}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-1">{service.shortDescription}</div>
                </div>
                <span aria-hidden className="text-gray-400 group-hover/item:text-orange-500">→</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
