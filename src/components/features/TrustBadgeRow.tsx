import { BUSINESS_INFO } from '@/lib/constants';

interface TrustBadge {
  icon: string;
  iconClass: string;
  label: string;
}

const BADGES: TrustBadge[] = [
  {
    icon: '★',
    iconClass: 'text-orange-500',
    label: `${BUSINESS_INFO.aggregateRating.ratingValue} · ${BUSINESS_INFO.aggregateRating.reviewCount} Google reviews`,
  },
  {
    icon: '✓',
    iconClass: 'text-blue-600',
    label: 'Licensed & insured in FL',
  },
  {
    icon: '◆',
    iconClass: 'text-orange-600',
    label: 'Sherwin-Williams & Benjamin Moore',
  },
  {
    icon: '◷',
    iconClass: 'text-blue-700',
    label: 'Evening estimates until 10 PM',
  },
];

export default function TrustBadgeRow() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-navy-800/90 text-sm md:text-[15px]">
      {BADGES.map((b, i) => (
        <span key={b.label} className="inline-flex items-center gap-2 whitespace-nowrap">
          {i > 0 && <span aria-hidden className="text-orange-300/70 -ml-3 mr-3 hidden md:inline">·</span>}
          <span aria-hidden className={`${b.iconClass} text-base leading-none`}>{b.icon}</span>
          <span>{b.label}</span>
        </span>
      ))}
    </div>
  );
}
