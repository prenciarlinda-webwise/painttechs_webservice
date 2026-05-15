import Container from '@/components/ui/Container';
import type { ParagraphSegment } from '@/data/locations';

interface ServiceInLocationProps {
  heading: string;
  paragraph: ParagraphSegment[];
  mapEmbedSrc: string;
  postalCodes: string[];
  driveTimeFromHQ?: string;
}

export default function ServiceInLocation({
  heading,
  paragraph,
  mapEmbedSrc,
  postalCodes,
  driveTimeFromHQ,
}: ServiceInLocationProps) {
  return (
    <section className="relative py-20 bg-[#fff6ec]">
      <span aria-hidden className="absolute top-8 left-8 text-orange-400/60 text-2xl tracking-widest select-none">· *  ·</span>
      <span aria-hidden className="absolute bottom-10 right-10 text-orange-400/50 text-2xl tracking-widest select-none">·  · *</span>

      <Container>
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-4 leading-snug">
              {heading}
            </h2>

            <p className="text-gray-700 leading-relaxed text-[16px] mb-5">
              {paragraph.map((seg, i) => {
                if (typeof seg === 'string') return <span key={i}>{seg}</span>;
                return (
                  <a
                    key={i}
                    href={seg.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-700 underline decoration-orange-300 underline-offset-2 hover:decoration-orange-500"
                  >
                    {seg.text}
                  </a>
                );
              })}
            </p>

            {postalCodes.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center text-sm">
                <span className="text-xs uppercase tracking-wider text-orange-700/70 font-semibold mr-1">ZIPs we cover</span>
                {postalCodes.map((zip) => (
                  <span key={zip} className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 font-mono text-xs">
                    {zip}
                  </span>
                ))}
              </div>
            )}

            {driveTimeFromHQ && (
              <p className="mt-5 text-sm text-navy-700/80">
                <span className="font-semibold text-navy-800">From our Jacksonville office:</span> {driveTimeFromHQ}
              </p>
            )}
          </div>

          <div className="lg:col-span-2">
            <div
              className="relative rounded-3xl overflow-hidden border-4 border-white shadow-[0_18px_42px_-12px_rgba(0,0,0,0.18)]"
              style={{ transform: 'rotate(-1.2deg)' }}
            >
              <iframe
                title="Paint-Techs LLC on Google Maps"
                src={mapEmbedSrc}
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-3 text-center text-xs text-navy-700/70 italic">Paint-Techs LLC · Jacksonville, FL</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
