'use client';

import { useForm, ValidationError } from '@formspree/react';
import { FORMSPREE_ID, SERVICES, getPhoneLink, BUSINESS_INFO } from '@/lib/constants';

interface QuickQuoteFormProps {
  locationName: string;
  defaultService?: string;
  promoTag?: string;
}

export default function QuickQuoteForm({ locationName, defaultService = '', promoTag }: QuickQuoteFormProps) {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  if (state.succeeded) {
    return (
      <div className="relative w-full max-w-md rounded-3xl bg-[#fff6ec] border border-orange-200/60 shadow-[0_18px_48px_-12px_rgba(234,113,30,0.25)] p-6 md:p-7 text-center">
        <span aria-hidden className="absolute -top-2 right-6 text-orange-500 text-xl tracking-widest select-none">· · ·</span>
        <div className="mx-auto w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-3">
          <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-navy-800 mb-1">Thanks — we got it.</h3>
        <p className="text-sm text-gray-600 mb-4">
          A Paint-Techs estimator will reach out within 24 hours about your {locationName} project.
        </p>
        <a
          href={getPhoneLink()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-5 text-sm transition"
        >
          Or call now — {BUSINESS_INFO.phone}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md rounded-3xl bg-[#fff6ec] border border-orange-200/60 shadow-[0_18px_48px_-12px_rgba(234,113,30,0.25)] p-6 md:p-7"
    >
      <span aria-hidden className="absolute -top-2 right-6 text-orange-500 text-xl tracking-widest select-none">· · ·</span>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-navy-800">
          Brush me a quote in <span className="italic text-orange-600">{locationName}</span>
        </h3>
        <p className="text-sm text-gray-600 mt-1">Free, no-obligation. Replies within 24h.</p>
      </div>

      {/* Hidden routing context — appears in the Formspree inbox so we know which page submitted */}
      <input type="hidden" name="_subject" value={`New quote — ${locationName} (${promoTag || 'site'})`} />
      <input type="hidden" name="location" value={locationName} />
      {promoTag && <input type="hidden" name="promoTag" value={promoTag} />}

      <div className="space-y-3">
        <div>
          <input
            type="text"
            required
            name="name"
            placeholder="Your name"
            className="w-full px-4 py-2.5 rounded-2xl bg-white border border-orange-200/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          <ValidationError field="name" prefix="Name" errors={state.errors} className="text-xs text-red-600 mt-1" />
        </div>
        <div>
          <input
            type="tel"
            required
            name="phone"
            placeholder="Phone (e.g. 904-555-0123)"
            className="w-full px-4 py-2.5 rounded-2xl bg-white border border-orange-200/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          <ValidationError field="phone" prefix="Phone" errors={state.errors} className="text-xs text-red-600 mt-1" />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            className="w-full px-4 py-2.5 rounded-2xl bg-white border border-orange-200/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          <ValidationError field="email" prefix="Email" errors={state.errors} className="text-xs text-red-600 mt-1" />
        </div>
        <div>
          <select
            name="serviceType"
            required
            defaultValue={defaultService}
            className="w-full px-4 py-2.5 rounded-2xl bg-white border border-orange-200/70 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          >
            <option value="">Service needed…</option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <textarea
            name="project"
            rows={2}
            placeholder="A line about your project (optional)"
            className="w-full px-4 py-2.5 rounded-2xl bg-white border border-orange-200/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
          />
          <ValidationError field="project" prefix="Project" errors={state.errors} className="text-xs text-red-600 mt-1" />
        </div>
      </div>

      <ValidationError errors={state.errors} className="text-sm text-red-600 mt-3" />

      <button
        type="submit"
        disabled={state.submitting}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white font-semibold py-3 px-5 transition shadow-[0_8px_20px_-6px_rgba(234,113,30,0.55)]"
      >
        {state.submitting ? 'Sending…' : 'Brush me a quote →'}
      </button>

      <p className="mt-3 text-[11px] text-gray-500 text-center">
        Free quote. We reply within 24 hours. Your info stays private.
      </p>
    </form>
  );
}
