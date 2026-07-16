'use client';

import { useEffect, useState } from 'react';
import QuickQuoteForm from '@/components/features/QuickQuoteForm';
import { BUSINESS_INFO, getPhoneLink } from '@/lib/constants';

const SESSION_KEY = 'ptStillLookingShown';
const DWELL_MS = 60000;

interface StillLookingPopupProps {
  locationName?: string;
  promoTag: string;
}

// Dwell-time popup for service/location pages: if someone lingers 60s without
// converting, offer a direct call as a lower-friction alternative to the quote form.
export default function StillLookingPopup({ locationName = 'Jacksonville', promoTag }: StillLookingPopupProps) {
  const [visible, setVisible] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, DWELL_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Need help finding something?"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:py-10 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) setVisible(false);
      }}
    >
      <div className="relative w-full max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Close"
          className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-navy-800 hover:bg-orange-500 hover:text-white transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {showQuoteForm ? (
          <QuickQuoteForm locationName={locationName} promoTag={promoTag} />
        ) : (
          <div className="relative w-full max-w-md rounded-3xl bg-[#fff6ec] border border-orange-200/60 shadow-[0_18px_48px_-12px_rgba(234,113,30,0.25)] p-6 md:p-7 text-center">
            <span aria-hidden className="absolute -top-2 right-6 text-orange-500 text-xl tracking-widest select-none">· · ·</span>
            <div className="mx-auto w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-3">
              <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-navy-800 mb-1">Can&apos;t find what you&apos;re looking for?</h3>
            <p className="text-sm text-gray-600 mb-5">
              Skip the search — talk to a real Paint-Techs estimator right now.
            </p>
            <div className="space-y-2.5">
              <a
                href={getPhoneLink()}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-5 transition shadow-[0_8px_20px_-6px_rgba(234,113,30,0.55)]"
              >
                Call now — {BUSINESS_INFO.phone}
              </a>
              <button
                type="button"
                onClick={() => setShowQuoteForm(true)}
                className="w-full rounded-full border border-orange-300 hover:bg-orange-100/60 text-navy-800 font-semibold py-2.5 px-5 transition"
              >
                Or get a free quote instead
              </button>
            </div>
            <p className="mt-4 text-[11px] text-gray-500">
              {BUSINESS_INFO.hours.display}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
