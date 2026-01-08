'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, SectionHeading, Button } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import { galleryProjects, getAllCategories, GalleryProject } from '@/data/gallery';

const categories = getAllCategories();

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = activeCategory === 'All'
    ? galleryProjects
    : galleryProjects.filter(p => p.category === activeCategory);

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
      <Breadcrumbs items={[{ label: 'Gallery' }]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-orange-400">Work</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Browse our portfolio of completed painting projects throughout Jacksonville and Northeast Florida. Each project showcases our commitment to quality and attention to detail.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-gray-50 sticky top-0 z-20">
        <Container>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all text-sm ${
                  activeCategory === category
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
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
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      project.category === 'Exterior' ? 'bg-orange-500 text-white' :
                      project.category === 'Interior' ? 'bg-teal-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {project.category}
                    </span>
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
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{project.description}</p>
                  {project.projectUrl && (
                    <Link
                      href={project.projectUrl}
                      className="inline-flex items-center gap-1 text-orange-500 font-semibold text-sm hover:text-orange-600 hover:gap-2 transition-all"
                    >
                      View Project
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No projects found in this category.</p>
            </div>
          )}
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

      {/* Paint-Techs Difference */}
      <section className="py-16 bg-gray-50">
        <Container>
          <SectionHeading
            title="The Paint-Techs Difference"
            subtitle="Our meticulous preparation and expert application techniques deliver transformations you'll love."
          />

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Proper Preparation</h3>
              <p className="text-gray-600">
                We never skip steps. Thorough prep work ensures your paint job looks beautiful and lasts for years.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Premium Materials</h3>
              <p className="text-gray-600">
                We use only top-quality paints from Sherwin-Williams and Benjamin Moore for vibrant color and lasting durability.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Clean Results</h3>
              <p className="text-gray-600">
                Crisp lines, even coverage, and protected surfaces. We leave your home cleaner than we found it.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <WhatsAppCTA
        title="Ready to Start Your Project?"
        subtitle="Let's discuss how we can transform your space. Get a free quote today!"
      />
    </>
  );
}
