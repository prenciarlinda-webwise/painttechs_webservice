import Container from '@/components/ui/Container';
import { Button } from '@/components/ui';
import { BUSINESS_INFO, getPhoneLink } from '@/lib/constants';

interface PriceRow {
  label: string;
  detail: string;
  range: string;
}

interface PricingSnapshotProps {
  heading?: string;
  subheading?: string;
  intro?: string;
  rows?: PriceRow[];
  hourlyRate?: string;
}

const DEFAULT_ROWS: PriceRow[] = [
  { label: 'Interior painting, 2,000 sq ft home', detail: 'Walls, ceilings, trim — 2 coats Sherwin-Williams Emerald or Aura', range: '$3,500 – $7,500' },
  { label: 'Interior painting, 3,000 sq ft home', detail: 'Whole-home interior repaint, color consult included', range: '$5,000 – $12,000' },
  { label: 'Exterior painting, 2,000 sq ft home', detail: 'Power wash, scrape, prime, 2 coats UV-resistant exterior — Florida-spec', range: '$4,000 – $9,000' },
  { label: 'Exterior painting, 3,000 sq ft home', detail: 'Two-story with detailed trim, wood rot repair as needed', range: '$7,000 – $15,000' },
  { label: 'Kitchen cabinet painting', detail: 'HVLP spray, ~30–40 doors, full prep + bonding primer', range: '$3,000 – $8,000' },
  { label: 'Single-room repaint', detail: 'Bedroom or living room, walls + trim, 1 day', range: '$300 – $800' },
  { label: 'Pool deck cool-deck coating', detail: 'Heat-reflective coating, slip-resistant additive', range: '$3 – $8 / sq ft' },
  { label: 'Commercial painting', detail: 'Quoted per project — off-hours / weekend scheduling available', range: 'Per project' },
];

export default function PricingSnapshot({
  heading = 'How much does it cost to paint a house in Jacksonville, FL?',
  subheading = 'Painting prices in Jacksonville',
  intro = 'Painting a 2,000 sq ft house in Jacksonville typically costs between $3,500 and $9,000 depending on whether you are repainting the interior, exterior, or both. The most common drivers of price are square footage, paint line (Sherwin-Williams Duration vs. SuperPaint, for example), surface condition, prep depth, and how many stories the home is. Florida humidity and UV exposure also push us toward premium paint systems on every exterior project, which slightly increases up-front cost but doubles repaint cycle from 5 to 10 years.',
  rows = DEFAULT_ROWS,
  hourlyRate = '$40 – $80 per hour for a professional painter in Jacksonville, FL. Most local painting companies — including Paint-Techs LLC — quote by the project rather than by the hour so you know the full cost up front.',
}: PricingSnapshotProps) {
  return (
    <section className="relative py-20 bg-[#fff6ec]" id="pricing">
      <span aria-hidden className="absolute top-8 left-12 text-orange-300/70 text-2xl tracking-widest select-none">· *  ·</span>
      <span aria-hidden className="absolute bottom-12 right-16 text-orange-300/60 text-2xl tracking-widest select-none">·  · *</span>

      <Container>
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-700 mb-3">
            {subheading}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4 leading-tight">
            {heading}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed bg-white/80 border-l-4 border-orange-400 rounded-r-2xl pl-5 py-4">
            {intro}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_18px_42px_-12px_rgba(0,0,0,0.10)] border border-orange-100/70 overflow-hidden">
          <div className="grid grid-cols-12 bg-orange-50/70 text-navy-800 text-sm font-bold uppercase tracking-wide px-6 py-3">
            <div className="col-span-7 md:col-span-7">Painting service</div>
            <div className="col-span-5 md:col-span-5 text-right">Typical Jacksonville price</div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-12 items-center px-6 py-5 ${i !== rows.length - 1 ? 'border-b border-orange-100/60' : ''}`}
            >
              <div className="col-span-7 md:col-span-7">
                <p className="font-semibold text-navy-800">{row.label}</p>
                <p className="text-sm text-gray-600 mt-1">{row.detail}</p>
              </div>
              <div className="col-span-5 md:col-span-5 text-right">
                <span className="inline-block font-bold text-orange-700 text-base md:text-lg whitespace-nowrap">
                  {row.range}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-3xl p-6 border border-blue-100/60 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.12)]">
            <h3 className="text-lg font-bold text-navy-800 mb-2">
              What is the hourly rate for a painter in Jacksonville, Florida?
            </h3>
            <p className="text-navy-700/85 text-[15px] leading-relaxed">{hourlyRate}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-orange-100/60 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.12)]">
            <h3 className="text-lg font-bold text-navy-800 mb-2">
              Is a free, on-site estimate really free?
            </h3>
            <p className="text-navy-700/85 text-[15px] leading-relaxed">
              Yes. Every Paint-Techs LLC estimate is free, written, itemized, and includes a fixed price (not a range). No deposit and no commitment until you sign. Estimates available daily 8 AM – 10 PM at {BUSINESS_INFO.phone}.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href={getPhoneLink()} variant="primary" size="lg" external>
            Get my free quote — {BUSINESS_INFO.phone}
          </Button>
          <span className="text-sm text-navy-700/80">
            Open daily 8 AM – 10 PM · Same-week scheduling
          </span>
        </div>
      </Container>
    </section>
  );
}
