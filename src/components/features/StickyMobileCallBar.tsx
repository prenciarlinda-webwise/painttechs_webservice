import { BUSINESS_INFO, getPhoneLink, getWhatsAppLink } from '@/lib/constants';

interface StickyMobileCallBarProps {
  whatsappMessage?: string;
}

export default function StickyMobileCallBar({ whatsappMessage }: StickyMobileCallBarProps) {
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
        <a
          href={getWhatsAppLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold py-3 transition"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0c3.181 0 6.167 1.24 8.413 3.488a11.82 11.82 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892h-.005a11.9 11.9 0 01-5.683-1.448L.057 24z" />
          </svg>
          <span className="text-sm">WhatsApp</span>
        </a>
      </div>
      <p className="mt-1 text-center text-[10px] text-navy-700/70">
        {BUSINESS_INFO.phone} · daily 8 AM – 10 PM
      </p>
    </div>
  );
}
