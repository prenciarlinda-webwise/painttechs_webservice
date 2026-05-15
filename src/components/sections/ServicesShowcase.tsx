import Link from 'next/link';
import Container from '@/components/ui/Container';
import type { ServicesShowcaseBlock } from '@/data/locations';

interface ServicesShowcaseProps {
  block: ServicesShowcaseBlock;
}

// Per client direction 2026-05-09: location pages should emphasize service types
// (interior, exterior, cabinet, pool deck, commercial) over neighborhood enumeration.
// SIL block already covers local areas inline, so this section is the primary
// services-emphasis surface on every location page.
export default function ServicesShowcase({ block }: ServicesShowcaseProps) {
  return (
    <section className="relative py-20 bg-white">
      <span aria-hidden className="absolute top-8 right-12 text-orange-300/60 text-2xl tracking-widest select-none">·  · *</span>

      <Container>
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-3">{block.heading}</h2>
          {block.intro && <p className="text-gray-600 text-[16px] leading-relaxed">{block.intro}</p>}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {block.cards.map((card, i) => {
            const accents = [
              { dot: '#ea711e', border: 'border-orange-200/70' },
              { dot: '#2563eb', border: 'border-blue-200/70' },
              { dot: '#d4650f', border: 'border-orange-200/70' },
              { dot: '#3a6e98', border: 'border-blue-200/70' },
              { dot: '#ea711e', border: 'border-orange-200/70' },
            ];
            const a = accents[i % accents.length];
            return (
              <Link
                key={card.serviceSlug}
                href={`/${card.serviceSlug}`}
                className={`group bg-white rounded-3xl p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.10)] border ${a.border} hover:shadow-[0_18px_42px_-12px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-0.5 flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    aria-hidden
                    className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: a.dot }}
                  />
                  <h3 className="text-lg font-bold text-navy-800 group-hover:text-orange-700 transition-colors">
                    {card.serviceName}
                  </h3>
                </div>
                <p className="text-navy-700/85 text-[14.5px] leading-relaxed flex-1">{card.tagline}</p>
                <span className="mt-4 inline-flex items-center text-orange-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  See full scope
                  <span aria-hidden className="ml-1 group-hover:ml-2 transition-all">→</span>
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
