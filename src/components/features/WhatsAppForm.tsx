'use client';

import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { BUSINESS_INFO, FORMSPREE_ID, SERVICES, getPhoneLink } from '@/lib/constants';

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  propertyType: string;
  squareFootage: string;
  rooms: string;
  cabinets: string;
  timeline: string;
  additionalInfo: string;
}

// Multi-step lead form. Submits to Formspree on step 3; the WhatsApp/Call CTAs
// in the success state are alternative contact paths, not the primary submission.
export default function WhatsAppForm({ isOpen, onClose, defaultService = '' }: QuoteFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    serviceType: defaultService,
    propertyType: 'residential',
    squareFootage: '',
    rooms: '',
    cabinets: '',
    timeline: '',
    additionalInfo: '',
  });
  const [step, setStep] = useState(1);
  const [state, handleFormspreeSubmit] = useForm(FORMSPREE_ID);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (!isOpen) return null;

  // Success state — show after Formspree confirms receipt
  if (state.succeeded) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-navy-800 mb-2">Quote request received</h2>
          <p className="text-gray-600 mb-6">
            Thanks, {formData.name.split(' ')[0] || 'there'} — a Paint-Techs estimator will be in touch within 24 hours about your {formData.serviceType.toLowerCase() || 'painting'} project.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={getPhoneLink()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-5 text-sm transition"
            >
              Call now — {BUSINESS_INFO.phone}
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-5 text-sm transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-xl font-bold">Get a Free Painting Quote</h2>
          <p className="text-orange-100 text-sm">Three quick steps. We&apos;ll reply within 24 hours.</p>
          <div className="mt-4 flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-colors ${s <= step ? 'bg-white' : 'bg-white/30'}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleFormspreeSubmit} className="p-6">
          {/* Hidden routing context for the Formspree inbox */}
          <input type="hidden" name="_subject" value={`New quote — ${formData.serviceType || 'painting'} (${formData.propertyType})`} />
          <input type="hidden" name="propertyType" value={formData.propertyType} />
          <input type="hidden" name="squareFootage" value={formData.squareFootage} />
          <input type="hidden" name="rooms" value={formData.rooms} />
          <input type="hidden" name="cabinets" value={formData.cabinets} />
          <input type="hidden" name="timeline" value={formData.timeline} />
          <input type="hidden" name="serviceType" value={formData.serviceType} />

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-navy-800 mb-4">Your Information</h3>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="John Smith"
                />
                <ValidationError field="name" prefix="Name" errors={state.errors} className="text-xs text-red-600 mt-1" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="(904) 555-0123"
                />
                <ValidationError field="phone" prefix="Phone" errors={state.errors} className="text-xs text-red-600 mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="you@example.com"
                />
                <ValidationError field="email" prefix="Email" errors={state.errors} className="text-xs text-red-600 mt-1" />
              </div>

              <div>
                <label htmlFor="serviceTypeSelect" className="block text-sm font-medium text-gray-700 mb-1">Service Needed *</label>
                <select
                  id="serviceTypeSelect"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.name}>{service.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="propertyType"
                      value="residential"
                      checked={formData.propertyType === 'residential'}
                      onChange={handleChange}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-gray-700">Residential</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="propertyType"
                      value="commercial"
                      checked={formData.propertyType === 'commercial'}
                      onChange={handleChange}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-gray-700">Commercial</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-navy-800 mb-4">Project Details</h3>

              {(formData.serviceType === 'Interior Painting' || formData.serviceType === 'Exterior Painting') && (
                <>
                  <div>
                    <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700 mb-1">Approximate Square Footage</label>
                    <select
                      id="squareFootage"
                      name="squareFootage"
                      value={formData.squareFootage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    >
                      <option value="">Select size...</option>
                      <option value="Under 1,000">Under 1,000 sq ft</option>
                      <option value="1,000-1,500">1,000 - 1,500 sq ft</option>
                      <option value="1,500-2,000">1,500 - 2,000 sq ft</option>
                      <option value="2,000-2,500">2,000 - 2,500 sq ft</option>
                      <option value="2,500-3,000">2,500 - 3,000 sq ft</option>
                      <option value="3,000-4,000">3,000 - 4,000 sq ft</option>
                      <option value="4,000+">4,000+ sq ft</option>
                    </select>
                  </div>

                  {formData.serviceType === 'Interior Painting' && (
                    <div>
                      <label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-1">Number of Rooms</label>
                      <select
                        id="rooms"
                        name="rooms"
                        value={formData.rooms}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      >
                        <option value="">Select rooms...</option>
                        <option value="1-2">1-2 rooms</option>
                        <option value="3-4">3-4 rooms</option>
                        <option value="5-6">5-6 rooms</option>
                        <option value="7-8">7-8 rooms</option>
                        <option value="9+">9+ rooms (whole house)</option>
                      </select>
                    </div>
                  )}
                </>
              )}

              {formData.serviceType === 'Cabinet Painting' && (
                <div>
                  <label htmlFor="cabinets" className="block text-sm font-medium text-gray-700 mb-1">Number of Cabinet Doors/Drawers</label>
                  <select
                    id="cabinets"
                    name="cabinets"
                    value={formData.cabinets}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  >
                    <option value="">Select amount...</option>
                    <option value="10-20">10-20 (small kitchen)</option>
                    <option value="20-30">20-30 (medium kitchen)</option>
                    <option value="30-40">30-40 (large kitchen)</option>
                    <option value="40+">40+ (extra large)</option>
                  </select>
                </div>
              )}

              {formData.serviceType === 'Commercial Painting' && (
                <div>
                  <label htmlFor="commercialSquareFootage" className="block text-sm font-medium text-gray-700 mb-1">Approximate Square Footage</label>
                  <select
                    id="commercialSquareFootage"
                    name="squareFootage"
                    value={formData.squareFootage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  >
                    <option value="">Select size...</option>
                    <option value="Under 2,000">Under 2,000 sq ft</option>
                    <option value="2,000-5,000">2,000 - 5,000 sq ft</option>
                    <option value="5,000-10,000">5,000 - 10,000 sq ft</option>
                    <option value="10,000-20,000">10,000 - 20,000 sq ft</option>
                    <option value="20,000+">20,000+ sq ft</option>
                  </select>
                </div>
              )}

              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">Preferred Timeline</label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                >
                  <option value="">Select timeline...</option>
                  <option value="ASAP">As soon as possible</option>
                  <option value="Within 2 weeks">Within 2 weeks</option>
                  <option value="Within 1 month">Within 1 month</option>
                  <option value="Within 2-3 months">Within 2-3 months</option>
                  <option value="Just getting quotes">Just getting quotes</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Additional Info */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-navy-800 mb-4">Additional Information</h3>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us more about your project (optional)
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                  placeholder="Any specific details, color preferences, or questions you have..."
                ></textarea>
                <ValidationError field="additionalInfo" prefix="Details" errors={state.errors} className="text-xs text-red-600 mt-1" />
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-navy-800 mb-2">Quote Summary</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Name:</span> {formData.name}</p>
                  <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                  {formData.email && <p><span className="font-medium">Email:</span> {formData.email}</p>}
                  <p><span className="font-medium">Service:</span> {formData.serviceType}</p>
                  <p><span className="font-medium">Property:</span> {formData.propertyType === 'residential' ? 'Residential' : 'Commercial'}</p>
                  {formData.squareFootage && <p><span className="font-medium">Size:</span> {formData.squareFootage} sq ft</p>}
                  {formData.rooms && <p><span className="font-medium">Rooms:</span> {formData.rooms}</p>}
                  {formData.cabinets && <p><span className="font-medium">Cabinets:</span> {formData.cabinets}</p>}
                  {formData.timeline && <p><span className="font-medium">Timeline:</span> {formData.timeline}</p>}
                </div>
              </div>

              <ValidationError errors={state.errors} className="text-sm text-red-600" />
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={step === 1 && (!formData.name || !formData.phone || !formData.serviceType)}
                className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={state.submitting}
                className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {state.submitting ? 'Sending…' : 'Send my quote request'}
              </button>
            )}
          </div>
        </form>

        <div className="px-6 pb-6">
          <p className="text-xs text-gray-500 text-center">
            Free quote. We reply within 24 hours. Your information stays private.
          </p>
        </div>
      </div>
    </div>
  );
}
