'use client';

import { useState } from 'react';
import { BUSINESS_INFO, SERVICES } from '@/lib/constants';

interface QuickQuoteFormProps {
  locationName: string;
  defaultService?: string;
  promoTag?: string;
}

export default function QuickQuoteForm({ locationName, defaultService = '', promoTag }: QuickQuoteFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState(defaultService);
  const [project, setProject] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const lines = [
      `Hi Paint-Techs! I'd like a free quote in ${locationName}.`,
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      serviceType ? `Service: ${serviceType}` : '',
      project ? `Project: ${project}` : '',
      promoTag ? `Promo: ${promoTag}` : '',
    ].filter(Boolean);
    const message = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${BUSINESS_INFO.whatsapp.replace('+', '')}?text=${message}`;
    window.open(url, '_blank');
    setTimeout(() => setSubmitting(false), 800);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md rounded-3xl bg-[#fff6ec] border border-orange-200/60 shadow-[0_18px_48px_-12px_rgba(234,113,30,0.25)] p-6 md:p-7"
    >
      {/* Tiny paint-drip dots, top-right */}
      <span aria-hidden className="absolute -top-2 right-6 text-orange-500 text-xl tracking-widest select-none">· · ·</span>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-navy-800">
          Brush me a quote in <span className="italic text-orange-600">{locationName}</span>
        </h3>
        <p className="text-sm text-gray-600 mt-1">Free, no-obligation. Replies within 24h.</p>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          required
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-2xl bg-white border border-orange-200/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
        <input
          type="tel"
          required
          name="phone"
          placeholder="Phone (e.g. 904-555-0123)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2.5 rounded-2xl bg-white border border-orange-200/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
        <select
          name="serviceType"
          required
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="w-full px-4 py-2.5 rounded-2xl bg-white border border-orange-200/70 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        >
          <option value="">Service needed…</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>
        <textarea
          name="project"
          rows={2}
          placeholder="A line about your project (optional)"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full px-4 py-2.5 rounded-2xl bg-white border border-orange-200/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white font-semibold py-3 px-5 transition shadow-[0_8px_20px_-6px_rgba(234,113,30,0.55)]"
      >
        {submitting ? 'Sending…' : 'Brush me a quote →'}
      </button>

      <p className="mt-3 text-[11px] text-gray-500 text-center">
        Submitting opens WhatsApp with your details prefilled. We never share your info.
      </p>
    </form>
  );
}
