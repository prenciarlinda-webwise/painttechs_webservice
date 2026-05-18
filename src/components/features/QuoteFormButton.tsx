'use client';

import { ButtonHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import QuickQuoteForm from '@/components/features/QuickQuoteForm';

// Shared modal: opens the QuickQuoteForm in an overlay.
function QuoteModal({
  open,
  onClose,
  promoTag,
  locationName = 'Jacksonville',
}: {
  open: boolean;
  onClose: () => void;
  promoTag?: string;
  locationName?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Free painting quote request"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:py-10 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md mx-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quote form"
          className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-navy-800 hover:bg-orange-500 hover:text-white transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <QuickQuoteForm locationName={locationName} promoTag={promoTag} />
      </div>
    </div>
  );
}

// Button-styled trigger (matches the Button UI component).
interface QuoteFormButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  title?: string;
  icon?: ReactNode;
  promoTag?: string;
  locationName?: string;
}

export default function QuoteFormButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  title = 'Request a free painting quote',
  icon,
  promoTag,
  locationName = 'Jacksonville',
}: QuoteFormButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        title={title}
        icon={icon}
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>
      <QuoteModal open={open} onClose={() => setOpen(false)} promoTag={promoTag} locationName={locationName} />
    </>
  );
}

// Plain trigger: render whatever the caller passes as children. Use when the
// surrounding visual layout already styles a button (footer link row, sticky
// mobile bar, custom card chrome).
interface QuoteFormTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  promoTag?: string;
  locationName?: string;
}

export function QuoteFormTrigger({
  children,
  promoTag,
  locationName = 'Jacksonville',
  ...buttonProps
}: QuoteFormTriggerProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} {...buttonProps}>
        {children}
      </button>
      <QuoteModal open={open} onClose={() => setOpen(false)} promoTag={promoTag} locationName={locationName} />
    </>
  );
}
