import Container from '@/components/ui/Container';
import type { NeighborhoodsBlock } from '@/data/locations';

interface NeighborhoodsShowcaseProps {
  block: NeighborhoodsBlock;
}

export default function NeighborhoodsShowcase({ block }: NeighborhoodsShowcaseProps) {
  return (
    <section className="relative py-20 bg-white">
      <span aria-hidden className="absolute top-8 right-12 text-blue-300/60 text-2xl tracking-widest select-none">·  · *</span>

      <Container>
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-3">{block.heading}</h2>
          {block.intro && <p className="text-gray-600 text-[16px] leading-relaxed">{block.intro}</p>}
        </div>

        <div className="space-y-12">
          {block.groups.map((group, gi) => (
            <div key={gi}>
              {group.groupTitle && (
                <h3 className="text-sm font-semibold uppercase tracking-wider text-orange-700 mb-4">
                  {group.groupTitle}
                </h3>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.entries.map((entry) => (
                  <div
                    key={entry.name}
                    className="bg-white rounded-3xl p-5 shadow-[0_8px_24px_-14px_rgba(0,0,0,0.12)] border border-blue-100/60 transition-transform hover:-translate-y-0.5"
                  >
                    <h4 className="text-base font-bold text-navy-800 mb-2">{entry.name}</h4>
                    <p className="text-navy-700/80 text-[14.5px] leading-relaxed">{entry.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
