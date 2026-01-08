'use client';

import { useState } from 'react';
import { BUSINESS_INFO, SERVICES } from '@/lib/constants';

interface WhatsAppFormProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

interface FormData {
  name: string;
  phone: string;
  serviceType: string;
  propertyType: string;
  squareFootage: string;
  rooms: string;
  cabinets: string;
  timeline: string;
  additionalInfo: string;
}

export default function WhatsAppForm({ isOpen, onClose, defaultService = '' }: WhatsAppFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    serviceType: defaultService,
    propertyType: 'residential',
    squareFootage: '',
    rooms: '',
    cabinets: '',
    timeline: '',
    additionalInfo: '',
  });

  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateWhatsAppMessage = () => {
    let message = `Hi Paint-Techs! I'd like to request a quote.\n\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Phone:* ${formData.phone}\n`;
    message += `*Service:* ${formData.serviceType}\n`;
    message += `*Property Type:* ${formData.propertyType === 'residential' ? 'Residential' : 'Commercial'}\n`;

    if (formData.serviceType === 'Interior Painting' || formData.serviceType === 'Exterior Painting') {
      if (formData.squareFootage) {
        message += `*Approx. Square Footage:* ${formData.squareFootage} sq ft\n`;
      }
      if (formData.rooms && formData.serviceType === 'Interior Painting') {
        message += `*Number of Rooms:* ${formData.rooms}\n`;
      }
    }

    if (formData.serviceType === 'Cabinet Painting' && formData.cabinets) {
      message += `*Number of Cabinets/Doors:* ${formData.cabinets}\n`;
    }

    if (formData.timeline) {
      message += `*Preferred Timeline:* ${formData.timeline}\n`;
    }

    if (formData.additionalInfo) {
      message += `\n*Additional Details:*\n${formData.additionalInfo}\n`;
    }

    message += `\nLooking forward to hearing from you!`;

    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp.replace('+', '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">Get a Free Quote</h2>
              <p className="text-green-100 text-sm">Fill out the form and we&apos;ll message you on WhatsApp</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-4 flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  s <= step ? 'bg-white' : 'bg-white/30'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-navy-800 mb-4">Your Information</h3>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="(904) 555-0123"
                />
              </div>

              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Needed *
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="propertyType"
                      value="residential"
                      checked={formData.propertyType === 'residential'}
                      onChange={handleChange}
                      className="w-4 h-4 text-green-500 focus:ring-green-500"
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
                      className="w-4 h-4 text-green-500 focus:ring-green-500"
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
                    <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700 mb-1">
                      Approximate Square Footage
                    </label>
                    <select
                      id="squareFootage"
                      name="squareFootage"
                      value={formData.squareFootage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
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
                      <label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Rooms
                      </label>
                      <select
                        id="rooms"
                        name="rooms"
                        value={formData.rooms}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
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
                  <label htmlFor="cabinets" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Cabinet Doors/Drawers
                  </label>
                  <select
                    id="cabinets"
                    name="cabinets"
                    value={formData.cabinets}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
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
                  <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700 mb-1">
                    Approximate Square Footage
                  </label>
                  <select
                    id="squareFootage"
                    name="squareFootage"
                    value={formData.squareFootage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
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
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                  placeholder="Any specific details, color preferences, or questions you have..."
                ></textarea>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-navy-800 mb-2">Quote Summary</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Name:</span> {formData.name}</p>
                  <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                  <p><span className="font-medium">Service:</span> {formData.serviceType}</p>
                  <p><span className="font-medium">Property:</span> {formData.propertyType === 'residential' ? 'Residential' : 'Commercial'}</p>
                  {formData.squareFootage && <p><span className="font-medium">Size:</span> {formData.squareFootage} sq ft</p>}
                  {formData.rooms && <p><span className="font-medium">Rooms:</span> {formData.rooms}</p>}
                  {formData.cabinets && <p><span className="font-medium">Cabinets:</span> {formData.cabinets}</p>}
                  {formData.timeline && <p><span className="font-medium">Timeline:</span> {formData.timeline}</p>}
                </div>
              </div>
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
                className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Send via WhatsApp
              </button>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-xs text-gray-500 text-center">
            By submitting, you&apos;ll be redirected to WhatsApp to complete your quote request.
          </p>
        </div>
      </div>
    </div>
  );
}
