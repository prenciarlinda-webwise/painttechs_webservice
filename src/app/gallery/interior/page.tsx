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

const interiorProjects = getProjectsByCategory('Interior');
const schemaProjects = interiorProjects.map(p => ({
  title: p.title,
  image: p.images[0].src,
  location: p.location,
  description: p.description,
}));

export default function InteriorGalleryPage() {
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
      <JsonLd data={generateGalleryCategorySchema('Interior', schemaProjects)} />
      <Breadcrumbs items={[{ label: 'Gallery', href: '/gallery' }, { label: 'Interior Painting' }]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Interior Painting <span className="text-teal-200">Gallery</span>
            </h1>
            <p className="text-xl text-teal-100 leading-relaxed">
              Explore our interior painting transformations throughout Jacksonville homes. From open concept living spaces to cozy bedrooms, see how professional painting can completely refresh your interior spaces.
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
            <Link href="/gallery/exterior" className="px-5 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg font-medium transition-colors text-sm">
              Exterior Painting
            </Link>
            <span className="px-5 py-2.5 bg-teal-500 text-white rounded-lg font-medium text-sm">
              Interior Painting
            </span>
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
              Showing <span className="font-semibold text-navy-800">{interiorProjects.length}</span> interior painting projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interiorProjects.map((project) => (
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
            title="Professional Interior Painting"
            subtitle="Transform your living spaces with expert color consultation and flawless application."
          />

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Color Expertise</h3>
              <p className="text-gray-600">
                Professional color consultation to help you choose the perfect palette for your space and lighting.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Flawless Finish</h3>
              <p className="text-gray-600">
                Meticulous preparation and expert techniques ensure smooth, even coverage with crisp, clean lines.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Clean & Tidy</h3>
              <p className="text-gray-600">
                We protect your furniture and floors, leaving your home cleaner than we found it.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <WhatsAppCTA
        title="Ready to Refresh Your Interior?"
        subtitle="Get a free quote for your interior painting project today!"
      />
    </>
  );
}
