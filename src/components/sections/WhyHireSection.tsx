import Container from '@/components/ui/Container';
import type { WhyHireCard } from '@/data/locations';

interface WhyHireSectionProps {
  heading: string;
  cards: WhyHireCard[];
}

export default function WhyHireSection({ heading, cards }: WhyHireSectionProps) {
  return (
    <section className="relative py-20 bg-[#fff6ec]">
      <span aria-hidden className="absolute top-8 left-12 text-orange-300/70 text-2xl tracking-widest select-none">· *  ·</span>
      <span aria-hidden className="absolute bottom-12 right-16 text-orange-300/60 text-2xl tracking-widest select-none">·  · *</span>

      <Container>
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 max-w-3xl">{heading}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.12)] border border-orange-100/70 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 text-sm font-bold"
                >
                  {i + 1}
                </span>
                <h3 className="text-base md:text-lg font-bold text-navy-800 leading-snug">{card.title}</h3>
              </div>
              <p className="text-navy-700/85 text-[15px] leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
