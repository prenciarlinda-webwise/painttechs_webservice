// Gallery data with projects grouped by service type

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'Interior' | 'Exterior' | 'Cabinet';
  location: string;
  description: string;
  images: GalleryImage[];
  completedDate: string;
}

export const galleryProjects: GalleryProject[] = [
  // EXTERIOR PAINTING PROJECTS
  {
    id: 'ext-nocatee-1',
    title: 'Single-Family Home Exterior',
    category: 'Exterior',
    location: 'Nocatee, FL',
    description: 'Complete exterior repaint of a 2,800 sq ft single-family home. Scope included full pressure washing, wood rot repair, caulking, priming, and two coats of premium exterior paint on all siding, trim, fascia, and soffits.',
    images: [
      { src: '/images/exterior/exterior-painting-nocatee-fl-1.webp', alt: 'Exterior painting project in Nocatee FL - front view' },
      { src: '/images/exterior/exterior-painting-nocatee-fl-11.webp', alt: 'Exterior painting project in Nocatee FL - detail view' },
    ],
    completedDate: '2025-11',
  },
  {
    id: 'ext-ponte-vedra-2',
    title: 'Coastal Estate Exterior',
    category: 'Exterior',
    location: 'Ponte Vedra Beach, FL',
    description: 'Full exterior painting of a 4,200 sq ft oceanfront property. Work included extensive prep work, salt-air resistant coatings, trim and accent painting, garage doors, and front entry door refinishing.',
    images: [
      { src: '/images/exterior/exterior-painting-ponte-vedra-beach-fl-2.webp', alt: 'Exterior painting in Ponte Vedra Beach FL - main view' },
      { src: '/images/exterior/exterior-painting-before-after-ponte-vedra-beach-fl-12.webp', alt: 'Exterior painting in Ponte Vedra Beach FL - before after' },
    ],
    completedDate: '2025-10',
  },
  {
    id: 'ext-st-augustine-3',
    title: 'Historic Home Restoration',
    category: 'Exterior',
    location: 'St. Augustine, FL',
    description: 'Exterior restoration of a 3,100 sq ft historic district home. Project required careful surface prep to preserve original details, complete trim repaint, and durable weather-resistant finish application.',
    images: [
      { src: '/images/exterior/exterior-painting-st-augustine-fl-3.webp', alt: 'Historic home exterior painting in St Augustine FL' },
      { src: '/images/exterior/exterior-painting-st-augustine-fl-13.webp', alt: 'St Augustine exterior painting completed' },
    ],
    completedDate: '2025-09',
  },
  {
    id: 'ext-jax-beach-4',
    title: 'Beach House Repaint',
    category: 'Exterior',
    location: 'Jacksonville Beach, FL',
    description: 'Complete exterior repaint of a 2,400 sq ft beach house. Included power washing, scraping, sanding, caulking all joints, and application of marine-grade exterior paint designed for coastal conditions.',
    images: [
      { src: '/images/exterior/exterior-painting-jacksonville-beach-fl-4.webp', alt: 'Beach house exterior painting in Jacksonville Beach FL' },
      { src: '/images/exterior/exterior-painting-jacksonville-beach-fl-14.webp', alt: 'Jacksonville Beach home painting completed' },
    ],
    completedDate: '2025-08',
  },
  {
    id: 'ext-atlantic-beach-5',
    title: 'Contemporary Home Exterior',
    category: 'Exterior',
    location: 'Atlantic Beach, FL',
    description: 'Exterior painting of a 3,000 sq ft contemporary residence. Scope covered full exterior siding, all trim work, garage door, shutters, and accent areas with UV-resistant premium paint.',
    images: [
      { src: '/images/exterior/exterior-painting-atlantic-beach-fl-5.webp', alt: 'Contemporary home exterior painting in Atlantic Beach FL' },
      { src: '/images/exterior/exterior-painting-atlantic-beach-fl-15.webp', alt: 'Atlantic Beach exterior painting finished' },
    ],
    completedDate: '2025-07',
  },
  {
    id: 'ext-orange-park-6',
    title: 'Traditional Home Exterior',
    category: 'Exterior',
    location: 'Orange Park, FL',
    description: 'Full exterior repaint of a 2,600 sq ft traditional-style home. Work included pressure washing, minor wood repairs, complete body and trim painting, and front porch ceiling refresh.',
    images: [
      { src: '/images/exterior/exterior-painting-orange-park-fl-6.webp', alt: 'Traditional home exterior painting in Orange Park FL' },
      { src: '/images/exterior/exterior-painting-orange-park-fl-16.webp', alt: 'Orange Park home painting completed' },
    ],
    completedDate: '2025-06',
  },
  {
    id: 'ext-middleburg-7',
    title: 'Country Estate Exterior',
    category: 'Exterior',
    location: 'Middleburg, FL',
    description: 'Comprehensive exterior painting of a 3,500 sq ft country home on acreage. Project included main residence exterior, attached garage, and detached workshop building.',
    images: [
      { src: '/images/exterior/exterior-painting-middleburg-fl-7.webp', alt: 'Country estate exterior painting in Middleburg FL' },
      { src: '/images/exterior/exterior-painting-middleburg-fl-17.webp', alt: 'Middleburg estate painting completed' },
    ],
    completedDate: '2025-05',
  },
  {
    id: 'ext-fernandina-8',
    title: 'Victorian Home Exterior',
    category: 'Exterior',
    location: 'Fernandina Beach, FL',
    description: 'Detailed exterior painting of a 2,900 sq ft Victorian-style home. Special attention to ornate trim, decorative brackets, porch railings, and window surrounds.',
    images: [
      { src: '/images/exterior/exterior-painting-fernandina-beach-fl-8.webp', alt: 'Victorian home exterior painting in Fernandina Beach FL' },
    ],
    completedDate: '2025-04',
  },
  {
    id: 'ext-yulee-9',
    title: 'New Construction Exterior',
    category: 'Exterior',
    location: 'Yulee, FL',
    description: 'Exterior painting for a newly constructed 2,200 sq ft home. Included primer coat and two finish coats on all exterior surfaces, trim, fascia, soffits, and garage door.',
    images: [
      { src: '/images/exterior/exterior-painting-yulee-fl-9.webp', alt: 'New construction exterior painting in Yulee FL' },
    ],
    completedDate: '2025-03',
  },
  {
    id: 'ext-jax-10',
    title: 'Urban Jacksonville Home',
    category: 'Exterior',
    location: 'Jacksonville, FL',
    description: 'Complete exterior transformation of a 2,100 sq ft urban home. Full prep work, body and trim painting, front door, and window trim accent work.',
    images: [
      { src: '/images/exterior/exterior-painting-jacksonville-fl-10.webp', alt: 'Urban home exterior painting in Jacksonville FL' },
    ],
    completedDate: '2025-02',
  },

  // INTERIOR PAINTING PROJECTS
  {
    id: 'int-nocatee-1',
    title: 'Whole House Interior',
    category: 'Interior',
    location: 'Nocatee, FL',
    description: 'Complete interior repaint of a 3,200 sq ft home including living areas, bedrooms, hallways, and ceilings. All walls prepped, patched, primed where needed, and finished with two coats.',
    images: [
      { src: '/images/interior/interior-painting-before-after-nocatee-fl-1.webp', alt: 'Whole house interior painting in Nocatee FL' },
      { src: '/images/interior/interior-painting-before-after-nocatee-fl-11.webp', alt: 'Nocatee interior painting detail' },
    ],
    completedDate: '2025-11',
  },
  {
    id: 'int-ponte-vedra-2',
    title: 'Master Suite & Bedrooms',
    category: 'Interior',
    location: 'Ponte Vedra Beach, FL',
    description: 'Interior painting of master suite and three additional bedrooms totaling approximately 1,800 sq ft. Included walls, ceilings, closets, and trim touch-ups.',
    images: [
      { src: '/images/interior/interior-painting-before-after-ponte-vedra-beach-fl-2.webp', alt: 'Master suite interior painting in Ponte Vedra Beach FL' },
      { src: '/images/interior/interior-painting-before-after-ponte-vedra-beach-fl-12.webp', alt: 'Ponte Vedra bedroom painting' },
    ],
    completedDate: '2025-10',
  },
  {
    id: 'int-st-augustine-3',
    title: 'Historic Home Interior',
    category: 'Interior',
    location: 'St. Augustine, FL',
    description: 'Interior restoration of a 2,400 sq ft historic property. Careful prep work around original trim and moldings, complete wall and ceiling repaint throughout main living areas.',
    images: [
      { src: '/images/interior/interior-painting-before-after-st-augustine-fl-3.webp', alt: 'Historic home interior painting in St Augustine FL' },
      { src: '/images/interior/interior-painting-before-after-st-augustine-fl-13.webp', alt: 'St Augustine interior painting detail' },
    ],
    completedDate: '2025-09',
  },
  {
    id: 'int-jax-beach-4',
    title: 'Open Floor Plan Home',
    category: 'Interior',
    location: 'Jacksonville Beach, FL',
    description: 'Interior painting of a 2,000 sq ft open concept beach home. Living room, dining area, kitchen walls, and connected hallways all painted for seamless flow.',
    images: [
      { src: '/images/interior/interior-painting-before-after-jacksonville-beach-fl-4.webp', alt: 'Open floor plan interior painting in Jacksonville Beach FL' },
      { src: '/images/interior/interior-painting-before-after-jacksonville-beach-fl-14.webp', alt: 'Jacksonville Beach interior completed' },
    ],
    completedDate: '2025-08',
  },
  {
    id: 'int-atlantic-beach-5',
    title: 'Main Living Areas',
    category: 'Interior',
    location: 'Atlantic Beach, FL',
    description: 'Interior painting of main living areas totaling 1,500 sq ft. Included living room, dining room, foyer, and hallways with full wall prep and two-coat finish.',
    images: [
      { src: '/images/interior/interior-painting-before-after-atlantic-beach-fl-5.webp', alt: 'Main living areas interior painting in Atlantic Beach FL' },
      { src: '/images/interior/interior-painting-atlantic-beach-fl-15.webp', alt: 'Atlantic Beach interior painting finished' },
    ],
    completedDate: '2025-07',
  },
  {
    id: 'int-orange-park-6',
    title: 'Family Home Interior',
    category: 'Interior',
    location: 'Orange Park, FL',
    description: 'Complete interior refresh of a 2,800 sq ft family home. All bedrooms, bathrooms, living spaces, and hallways painted with durable washable finishes.',
    images: [
      { src: '/images/interior/interior-painting-before-after-orange-park-fl-6.webp', alt: 'Family home interior painting in Orange Park FL' },
    ],
    completedDate: '2025-06',
  },
  {
    id: 'int-middleburg-7',
    title: 'Country Home Interior',
    category: 'Interior',
    location: 'Middleburg, FL',
    description: 'Interior painting of a 3,000 sq ft country home. Main living areas, four bedrooms, bonus room, and all hallways repainted with full prep work.',
    images: [
      { src: '/images/interior/interior-painting-before-after-middleburg-fl-7.webp', alt: 'Country home interior painting in Middleburg FL' },
    ],
    completedDate: '2025-05',
  },
  {
    id: 'int-fernandina-8',
    title: 'Cottage Interior Refresh',
    category: 'Interior',
    location: 'Fernandina Beach, FL',
    description: 'Interior painting of a 1,600 sq ft coastal cottage. All rooms including kitchen, living areas, bedrooms, and bathrooms freshly painted.',
    images: [
      { src: '/images/interior/interior-painting-before-after-fernandina-beach-fl-8.webp', alt: 'Cottage interior painting in Fernandina Beach FL' },
    ],
    completedDate: '2025-04',
  },
  {
    id: 'int-yulee-9',
    title: 'New Home Interior',
    category: 'Interior',
    location: 'Yulee, FL',
    description: 'Interior painting upgrade for a newly built 2,400 sq ft home. Upgraded from builder-grade to premium paints throughout all living spaces and bedrooms.',
    images: [
      { src: '/images/interior/interior-painting-before-after-yulee-fl-9.webp', alt: 'New home interior painting in Yulee FL' },
    ],
    completedDate: '2025-03',
  },
  {
    id: 'int-jax-10',
    title: 'Downtown Townhouse',
    category: 'Interior',
    location: 'Jacksonville, FL',
    description: 'Interior painting of a 1,900 sq ft three-story townhouse. All levels painted including stairwell, living areas, bedrooms, and accent walls.',
    images: [
      { src: '/images/interior/interior-painting-before-after-jacksonville-fl-10.webp', alt: 'Downtown townhouse interior painting in Jacksonville FL' },
    ],
    completedDate: '2025-02',
  },

  // CABINET PAINTING PROJECTS
  {
    id: 'cab-nocatee-1',
    title: 'Full Kitchen Cabinet Refinish',
    category: 'Cabinet',
    location: 'Nocatee, FL',
    description: 'Complete kitchen cabinet refinishing including 42 cabinet doors, drawer fronts, and all cabinet frames. Professional spray application for smooth factory-like finish.',
    images: [
      { src: '/images/cabinet/cabinet-painting-before-after-nocatee-fl-1.webp', alt: 'Kitchen cabinet painting before after in Nocatee FL' },
    ],
    completedDate: '2025-10',
  },
  {
    id: 'cab-ponte-vedra-2',
    title: 'Kitchen Cabinet Transformation',
    category: 'Cabinet',
    location: 'Ponte Vedra Beach, FL',
    description: 'Cabinet refinishing for a large kitchen with 56 doors and drawers. Included thorough deglossing, sanding, priming, and multiple finish coats with new hardware installation.',
    images: [
      { src: '/images/cabinet/cabinet-painting-before-after-ponte-vedra-beach-fl-2.webp', alt: 'Kitchen cabinet transformation in Ponte Vedra Beach FL' },
    ],
    completedDate: '2025-08',
  },
];

// Helper functions
export const getProjectsByCategory = (category: 'Interior' | 'Exterior' | 'Cabinet'): GalleryProject[] => {
  return galleryProjects.filter(project => project.category === category);
};

export const getAllCategories = (): string[] => {
  return ['All', 'Exterior', 'Interior', 'Cabinet'];
};

export const getProjectById = (id: string): GalleryProject | undefined => {
  return galleryProjects.find(project => project.id === id);
};
