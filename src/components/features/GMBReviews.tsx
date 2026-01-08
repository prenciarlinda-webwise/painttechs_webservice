'use client';

import { BUSINESS_INFO } from '@/lib/constants';

interface GMBReviewsProps {
  className?: string;
}

export default function GMBReviews({ className = '' }: GMBReviewsProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-900 p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
            <svg className="w-10 h-10" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold">Paint-Techs LLC</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-semibold">5.0</span>
              <span className="text-gray-300">on Google</span>
            </div>
            <p className="text-sm text-gray-300 mt-2">Click the map to see reviews and directions</p>
          </div>
        </div>
      </div>

      {/* Google Maps Embed - Interactive with Reviews */}
      <a
        href={BUSINESS_INFO.links.gmb}
        target="_blank"
        rel="noopener noreferrer"
        className="block aspect-video relative group cursor-pointer"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d883011.5245123599!2d-82.28811641930854!3d30.172458415508522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xabf5561190f05815%3A0x564b53fd12603bd0!2sPaint-Techs%20LLC%20-%20Painting%20Company!5e0!3m2!1sen!2s!4v1767775457415!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Paint-Techs LLC on Google Maps - Click to view reviews"
          className="pointer-events-auto"
        ></iframe>
      </a>

      {/* CTA */}
      <div className="p-6 bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={BUSINESS_INFO.links.gmb}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-800 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            View Reviews on Google
          </a>
          <a
            href={`https://search.google.com/local/writereview?placeid=ChIJFVjxkBFX-YgR0DtgEv1TtWQ`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-navy-800 text-navy-800 hover:bg-orange-500 hover:border-orange-500 hover:text-white font-semibold rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Leave a Review
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Your feedback helps us improve and helps others find quality painting services!
        </p>
      </div>
    </div>
  );
}
