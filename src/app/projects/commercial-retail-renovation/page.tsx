'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BUSINESS_INFO, getWhatsAppLink, getPhoneLink } from '@/lib/constants';

const projectImages = [
  {
    src: '/images/commercial-painting-before-orange-walls.webp',
    alt: 'Commercial retail renovation before - orange walls Jacksonville FL',
    title: 'Before: Original Orange Walls',
    category: 'before',
  },
  {
    src: '/images/commercial-painting-after-orange-accent.webp',
    alt: 'Commercial retail renovation before - orange accent wall Jacksonville FL',
    title: 'Before: Orange Accent Wall',
    category: 'before',
  },
  {
    src: '/images/commercial-painting-before-wall-prep.webp',
    alt: 'Commercial retail renovation before - wall preparation Jacksonville FL',
    title: 'Before: Wall Prep Stage',
    category: 'before',
  },
  {
    src: '/images/commercial-interior-painting-completed.webp',
    alt: 'Commercial retail renovation completed Jacksonville FL',
    title: 'After: Interior Complete',
    category: 'after',
  },
  {
    src: '/images/commercial-painting-before-retail-prep.webp',
    alt: 'Commercial retail renovation before - retail space preparation Jacksonville FL',
    title: 'Before: Retail Space Prep',
    category: 'before',
  },
  {
    src: '/images/commercial-painting-retail-store-dark-walls.webp',
    alt: 'Commercial retail renovation with dark accent walls Jacksonville FL',
    title: 'After: Dark Accent Walls',
    category: 'after',
  },
  {
    src: '/images/commercial-painting-before-demolition.webp',
    alt: 'Commercial retail renovation before - demolition Jacksonville FL',
    title: 'Before: Demo & Prep',
    category: 'before',
  },
  {
    src: '/images/commercial-painting-services-retail-space.webp',
    alt: 'Commercial retail renovation completed Jacksonville FL',
    title: 'After: Retail Space Complete',
    category: 'after',
  },
  {
    src: '/images/commercial-interior-painting-office-hallway.webp',
    alt: 'Commercial retail renovation office hallway Jacksonville FL',
    title: 'After: Office Hallway',
    category: 'after',
  },
  {
    src: '/images/commercial-painting-jacksonville-retail.webp',
    alt: 'Commercial retail renovation complete Jacksonville FL',
    title: 'After: Retail Location Complete',
    category: 'after',
  },
  {
    src: '/images/commercial-painting-company-jacksonville.webp',
    alt: 'Commercial retail renovation project Jacksonville FL',
    title: 'After: Project Showcase',
    category: 'after',
  },
  {
    src: '/images/commercial-painting-contractor-florida.webp',
    alt: 'Commercial retail renovation workmanship Jacksonville FL',
    title: 'After: Professional Workmanship',
    category: 'after',
  },
  {
    src: '/images/commercial-painting-services-preparation.webp',
    alt: 'Commercial retail renovation surface preparation Jacksonville FL',
    title: 'After: Surface Preparation Complete',
    category: 'after',
  },
  {
    src: '/images/commercial-painting-near-me-jacksonville.webp',
    alt: 'Commercial retail renovation project Jacksonville FL',
    title: 'After: Jacksonville Project',
    category: 'after',
  },
  {
    src: '/images/commercial-painting-project-retail-interior.webp',
    alt: 'Commercial retail renovation interior design Jacksonville FL',
    title: 'After: Retail Interior Design',
    category: 'after',
  },
];

export default function CommercialRetailRenovation() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [filter, setFilter] = useState<'all' | 'before' | 'after'>('all');

  const filteredImages = filter === 'all'
    ? projectImages
    : projectImages.filter(img => img.category === filter);

  const openLightbox = (index: number) => {
    const actualIndex = projectImages.findIndex(img => img.src === filteredImages[index].src);
    setCurrentImage(actualIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % projectImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + projectImages.length) % projectImages.length);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-navy-900 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900"></div>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">
              Commercial Painting Project
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Commercial Retail Renovation in Jacksonville, FL
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Complete commercial space transformation featuring retail store renovation with modern color schemes,
              professional prep work, and durable commercial-grade finishes.
            </p>
            <div className="flex flex-wrap gap-4 text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Jacksonville, FL
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Retail & Commercial Space
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {projectImages.length} Project Photos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Images & Description */}
            <div className="lg:col-span-2">
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {(['all', 'before', 'after'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filter === tab
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} {tab !== 'all' && `(${projectImages.filter(i => i.category === tab).length})`}
                  </button>
                ))}
              </div>

              {/* Image Gallery Grid */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                {filteredImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        image.category === 'before' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                      }`}>
                        {image.category.toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white text-sm font-medium">{image.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Project Overview */}
              <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Project Overview</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  This comprehensive commercial painting project in Jacksonville showcases Paint-Techs LLC expertise
                  in transforming retail and business spaces. Our team completed a full-scale renovation of this
                  commercial property, including extensive demolition work, surface preparation, and application
                  of durable commercial-grade finishes.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  The project featured dramatic before-and-after transformations, including the conversion of
                  dated orange walls to modern accent features, professional office hallway painting, and
                  complete retail space renovations with sophisticated dark accent walls that create a
                  contemporary shopping experience.
                </p>

                <h3 className="text-xl font-semibold text-navy-900 mb-4">Scope of Work</h3>
                <ul className="grid md:grid-cols-2 gap-3 mb-6">
                  {[
                    'Complete space demolition & prep',
                    'Drywall repair & finishing',
                    'Commercial-grade primer application',
                    'Multi-room color coordination',
                    'Accent wall creation',
                    'Office hallway painting',
                    'Retail floor-to-ceiling coverage',
                    'Trim & detail work',
                    'High-traffic durability coatings',
                    'Final walkthrough & touch-ups',
                  ].map((service, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {service}
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold text-navy-900 mb-4">Why Choose Paint-Techs for Commercial Projects?</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Commercial spaces require specialized attention to minimize business disruption while delivering
                  exceptional results. Paint-Techs LLC offers flexible scheduling including nights and weekends,
                  uses fast-drying commercial-grade paints, and maintains strict timelines to keep your business
                  operational.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We understand that your commercial space represents your brand. Our team works closely with
                  business owners to select colors and finishes that align with brand identity while providing
                  the durability needed for high-traffic environments.
                </p>
              </div>

              {/* Location Info */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">Commercial Painting Service Areas</h3>
                <p className="text-gray-600 mb-4">
                  Paint-Techs LLC provides professional commercial painting services for businesses throughout
                  Northeast Florida, including offices, retail stores, restaurants, and industrial facilities in:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Jacksonville', 'Nocatee', 'Ponte Vedra Beach', 'Jacksonville Beach', 'St. Augustine', 'Orange Park', 'Fleming Island', 'Mandarin'].map((area) => (
                    <span key={area} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Quick Quote Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* WhatsApp Quote Box */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Get a Free Commercial Quote</h3>
                    <p className="text-green-100 text-sm">Quick response via WhatsApp</p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">
                      Need professional painting for your business? Get a free, no-obligation quote today!
                    </p>
                    <a
                      href={getWhatsAppLink("Hi! I'm interested in commercial painting services for my business in Jacksonville. I saw your retail project and would like a free quote.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp Us Now
                    </a>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 text-center">Or call us directly</p>
                      <a
                        href={getPhoneLink()}
                        className="flex items-center justify-center gap-2 mt-2 text-navy-900 font-semibold hover:text-orange-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {BUSINESS_INFO.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Commercial Benefits */}
                <div className="bg-navy-900 rounded-xl p-6 text-white mb-6">
                  <h3 className="font-semibold mb-4">Commercial Painting Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-sm">Flexible night & weekend scheduling</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-sm">Minimal business disruption</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-sm">Commercial-grade durability</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-sm">Fully licensed & insured</span>
                    </li>
                  </ul>
                </div>

                {/* Related Services */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-semibold text-navy-900 mb-4">Related Services</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/services/commercial-painting" className="text-gray-600 hover:text-orange-500 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Commercial Painting Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/interior-painting" className="text-gray-600 hover:text-orange-500 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Interior Painting
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/exterior-painting" className="text-gray-600 hover:text-orange-500 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Exterior Painting
                      </Link>
                    </li>
                    <li>
                      <Link href="/gallery" className="text-gray-600 hover:text-orange-500 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        View More Projects
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-white hover:text-gray-300"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-white hover:text-gray-300"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="relative max-w-5xl max-h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={projectImages[currentImage].src}
              alt={projectImages[currentImage].alt}
              width={1200}
              height={800}
              className="object-contain w-full h-full"
            />
            <div className="text-center mt-4">
              <span className={`inline-block px-3 py-1 rounded text-sm font-medium mr-2 ${
                projectImages[currentImage].category === 'before' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}>
                {projectImages[currentImage].category.toUpperCase()}
              </span>
              <span className="text-white">{projectImages[currentImage].title}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}