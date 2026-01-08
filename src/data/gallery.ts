// Gallery data with projects grouped by service type

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'Interior' | 'Exterior' | 'Cabinet' | 'Commercial';
  location: string;
  description: string;
  images: GalleryImage[];
  completedDate: string;
  projectUrl?: string;
}

export const galleryProjects: GalleryProject[] = [
  // RESIDENTIAL EXTERIOR PROJECT
  {
    id: 'ext-jacksonville-featured',
    title: 'Residential Exterior Transformation',
    category: 'Exterior',
    location: 'Jacksonville, FL',
    description: 'Complete home exterior transformation featuring premium weather-resistant coatings, meticulous prep work, and professional application for lasting curb appeal.',
    images: [
      { src: '/images/residential-painting.webp', alt: 'Residential exterior painting project Jacksonville FL' },
    ],
    completedDate: '2025-12',
    projectUrl: '/projects/residential-exterior-painting-jacksonville',
  },

  // CABINET PROJECT
  {
    id: 'cab-nocatee-featured',
    title: 'Kitchen Cabinet Refinishing',
    category: 'Cabinet',
    location: 'Nocatee, FL',
    description: 'Complete kitchen cabinet transformation delivering factory-smooth finishes at a fraction of replacement cost using professional HVLP spray equipment.',
    images: [
      { src: '/images/cabinet-painting-before-after-nocatee-before-after.webp', alt: 'Kitchen cabinet refinishing Nocatee FL' },
      { src: '/images/cabinet-painting-before-after-ponte-vedra-beach-fl-before-after.webp', alt: 'Cabinet painting Ponte Vedra Beach FL' },
    ],
    completedDate: '2025-11',
    projectUrl: '/projects/cabinet-refinishing-nocatee',
  },

  // COMMERCIAL PROJECT
  {
    id: 'com-jacksonville-featured',
    title: 'Commercial Retail Renovation',
    category: 'Commercial',
    location: 'Jacksonville, FL',
    description: 'Full commercial space transformation featuring retail store renovation with modern color schemes, professional prep work, and durable commercial-grade finishes.',
    images: [
      { src: '/images/commercial-painting-company-jacksonville.webp', alt: 'Commercial painting Jacksonville FL' },
      { src: '/images/commercial-interior-painting-completed.webp', alt: 'Commercial interior painting completed' },
      { src: '/images/commercial-painting-retail-store-dark-walls.webp', alt: 'Retail store dark accent walls' },
      { src: '/images/commercial-painting-services-retail-space.webp', alt: 'Retail space painting services' },
      { src: '/images/commercial-interior-painting-office-hallway.webp', alt: 'Office hallway painting' },
      { src: '/images/commercial-painting-jacksonville-retail.webp', alt: 'Jacksonville retail painting' },
    ],
    completedDate: '2025-10',
    projectUrl: '/projects/commercial-retail-renovation',
  },
];

// Helper functions
export const getProjectsByCategory = (category: 'Interior' | 'Exterior' | 'Cabinet' | 'Commercial'): GalleryProject[] => {
  return galleryProjects.filter(project => project.category === category);
};

export const getAllCategories = (): string[] => {
  return ['All', 'Exterior', 'Cabinet', 'Commercial'];
};

export const getProjectById = (id: string): GalleryProject | undefined => {
  return galleryProjects.find(project => project.id === id);
};