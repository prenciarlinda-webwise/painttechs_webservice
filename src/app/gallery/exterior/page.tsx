'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import { getProjectsByCategory, GalleryProject } from '@/data/gallery';
import JsonLd from '@/components/seo/JsonLd';
import { generateGalleryCategorySchema } from '@/lib/schema';

const exteriorProjects = getProjectsByCategory('Exterior');
const schemaProjects = exteriorProjects.map(p => ({
  title: p.title,
  image: p.images[0].src,
  location: p.location,
  description: p.description,
}));

export default function ExteriorGalleryPage() {
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (project: GalleryProject, imageIndex: number = 0) => {
    setSelectedProject(project);
    setCurrentImageIndex(imageIndex);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev < selectedProject.images.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev > 0 ? prev - 1 : selectedProject.images.length - 1
      );
    }
  };

  return (
    <>
      <JsonLd data={generateGalleryCategorySchema('Exterior', schemaProjects)} />
      <Breadcrumbs items={[{ label: 'Gallery', href: '/gallery' }, { label: 'Exterior Painting' }]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Exterior Painting <span className="text-orange-200">Gallery</span>
            </h1>
            <p className="text-xl text-orange-100 leading-relaxed">
              Browse our portfolio of exterior painting projects throughout Jacksonville and Northeast Florida. From beachfront homes to historic properties, see how we transform home exteriors with premium paints and expert craftsmanship.
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery Navigation */}
      <section className="py-6 bg-white border-b border-gray-100">
        <Container>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/gallery" className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors text-sm">
              All Projects
            </Link>
            <span className="px-5 py-2.5 bg-orange-500 text-white rounded-lg font-medium text-sm">
              Exterior Painting
            </span>
            <Link href="/gallery/interior" className="px-5 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg font-medium transition-colors text-sm">
              Interior Painting
            </Link>
            <Link href="/gallery/cabinet" className="px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-colors text-sm">
              Cabinet Painting
            </Link>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="text-center mb-10">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-navy-800">{exteriorProjects.length}</span> exterior painting projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exteriorProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group border border-gray-100"
              >
                {/* Main Image */}
                <div
                  className="aspect-[4/3] relative cursor-pointer overflow-hidden"
                  onClick={() => openLightbox(project, 0)}
                >
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-white text-sm font-medium">Click to view {project.images.length} photos</span>
                    </div>
                  </div>
                  {/* Image Count */}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-white text-xs font-medium">{project.images.length} photos</span>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                {project.images.length > 1 && (
                  <div className="flex gap-1 p-2 bg-gray-50">
                    {project.images.slice(0, 4).map((image, idx) => (
                      <div
                        key={idx}
                        className="relative w-1/4 aspect-square cursor-pointer rounded overflow-hidden"
                        onClick={() => openLightbox(project, idx)}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover hover:opacity-80 transition-opacity"
                        />
                        {idx === 3 && project.images.length > 4 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">+{project.images.length - 4}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-navy-800 mb-1">{project.title}</h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {project.location}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 p-3 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="max-w-5xl max-h-[80vh] relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedProject.images[currentImageIndex].src}
              alt={selectedProject.images[currentImageIndex].alt}
              width={1200}
              height={800}
              className="object-contain max-h-[80vh]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white font-bold text-lg">{selectedProject.title}</h3>
              <p className="text-gray-300 text-sm">{selectedProject.location}</p>
              <p className="text-gray-400 text-xs mt-1">
                {currentImageIndex + 1} / {selectedProject.images.length}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 p-3 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {selectedProject.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Why Choose Section */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title="Expert Exterior Painting"
            subtitle="Our exterior painting services protect and beautify your home against Florida's challenging climate."
          />

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">UV Protection</h3>
              <p className="text-gray-600">
                Premium paints with UV-resistant additives prevent fading and maintain vibrant colors despite Florida&apos;s intense sun.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Weather Resistant</h3>
              <p className="text-gray-600">
                Marine-grade coatings and salt-resistant paints for coastal properties that withstand humidity and storms.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Lasting Protection</h3>
              <p className="text-gray-600">
                Thorough surface preparation and quality materials ensure your exterior paint job lasts 8-10 years.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <WhatsAppCTA
        title="Ready for a Stunning Exterior?"
        subtitle="Get a free quote for your exterior painting project today!"
      />
    </>
  );
}
