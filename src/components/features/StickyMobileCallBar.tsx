import { BUSINESS_INFO, getPhoneLink } from '@/lib/constants';
import { QuoteFormTrigger } from '@/components/features/QuoteFormButton';

// `whatsappMessage` retained for backwards compatibility; no longer used.
interface StickyMobileCallBarProps {
  whatsappMessage?: string;
}

export default function StickyMobileCallBar(_: StickyMobileCallBarProps = {}) {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-3 pt-2 bg-gradient-to-t from-[#fff6ec] via-[#fff6ec]/95 to-transparent">
      <div className="grid grid-cols-2 gap-2 rounded-full bg-white/90 backdrop-blur border border-orange-200/70 shadow-[0_12px_32px_-10px_rgba(0,0,0,0.18)] p-1">
        <a
          href={getPhoneLink()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span className="text-sm">Call</span>
        </a>
        <QuoteFormTrigger
          promoTag="sticky-mobile"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-700 hover:bg-navy-800 text-white font-semibold py-3 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span className="text-sm">Get Quote</span>
        </QuoteFormTrigger>
      </div>
      <p className="mt-1 text-center text-[10px] text-navy-700/70">
        {BUSINESS_INFO.phone} · daily 8 AM – 10 PM
      </p>
    </div>
  );
}
