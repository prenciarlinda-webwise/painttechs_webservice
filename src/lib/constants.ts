// Paint-Techs LLC Business Information
// NAP (Name, Address, Phone) - Consistent across all pages for Local SEO

export const BUSINESS_INFO = {
  name: 'Paint-Techs LLC',
  legalName: 'Paint-Techs LLC',
  tagline: 'Professional Painting Services in Jacksonville, FL',
  description: 'Paint-Techs LLC is Jacksonville\'s premier painting contractor offering interior, exterior, cabinet, and commercial painting services. Serving Jacksonville, Nocatee, Ponte Vedra Beach, St. Augustine, and surrounding areas.',

  // Contact Information
  phone: '(904) 762-7062',
  phoneRaw: '+19047627062',
  whatsapp: '+19047627062',
  email: 'info@paint-techs.us',
  website: 'https://www.paint-techs.us',

  // Address (NAP consistency - critical for local SEO)
  // Note: Service Area Business (SAB) - no street address displayed publicly
  address: {
    street: '', // SAB - not displayed
    city: 'Jacksonville',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '32246',
    country: 'US',
    full: 'Jacksonville, FL 32246',
  },

  // Coordinates for schema markup (Jacksonville service area center)
  geo: {
    latitude: 30.3164,
    longitude: -81.4883,
  },

  // Business Hours
  hours: {
    weekdays: '8:00 AM - 10:00 PM',
    saturday: '8:00 AM - 10:00 PM',
    sunday: '8:00 AM - 10:00 PM',
    display: 'Daily 8AM - 10PM',
  },

  // Social & Directory Links
  links: {
    gmb: 'https://maps.app.goo.gl/cMBt1hHzYeySz4h28',
    gmbSearch: 'https://www.google.com/search?q=Paint-Techs+LLC+-+Painting+Company',
    facebook: 'https://www.facebook.com/p/Paint-Techs-100083284513462/',
    instagram: '#',
    linkedin: '#',
    twitter: '#',
    yelp: '#',
  },

  // Brand Colors
  colors: {
    primary: '#ea711e', // Orange
    primaryDark: '#d4650f',
    secondary: '#1e293b', // Dark Navy
    accent: '#ea711e', // Orange
  },

  // Founded year (adjust as needed)
  foundedYear: 2020,
} as const;

export const SERVICE_AREAS = [
  { name: 'Jacksonville', slug: 'jacksonville', priority: true },
  { name: 'Nocatee', slug: 'nocatee', priority: true },
  { name: 'Ponte Vedra Beach', slug: 'ponte-vedra-beach', priority: true },
  { name: 'Jacksonville Beach', slug: 'jacksonville-beach', priority: false },
  { name: 'Atlantic Beach', slug: 'atlantic-beach', priority: false },
  { name: 'St. Augustine', slug: 'st-augustine', priority: false },
  { name: 'Fernandina Beach', slug: 'fernandina-beach', priority: false },
  { name: 'Middleburg', slug: 'middleburg', priority: false },
  { name: 'Orange Park', slug: 'orange-park', priority: false },
  { name: 'Yulee', slug: 'yulee', priority: false },
] as const;

export const SERVICES = [
  {
    id: 'interior-painting',
    name: 'Interior Painting',
    shortDescription: 'Transform your indoor spaces with professional interior painting services.',
    slug: 'interior-painting',
    icon: 'interior',
  },
  {
    id: 'exterior-painting',
    name: 'Exterior Painting',
    shortDescription: 'Protect and beautify your home\'s exterior with expert painting.',
    slug: 'exterior-painting',
    icon: 'exterior',
  },
  {
    id: 'cabinet-painting',
    name: 'Cabinet Painting',
    shortDescription: 'Refresh your kitchen with professional cabinet painting and refinishing.',
    slug: 'cabinet-painting',
    icon: 'cabinet',
  },
  {
    id: 'pool-deck-painting',
    name: 'Pool Deck Painting',
    shortDescription: 'Professional pool deck painting and staining with cool deck coatings for Florida homes.',
    slug: 'pool-deck-painting-staining',
    icon: 'pool',
  },
  {
    id: 'commercial-painting',
    name: 'Commercial Painting',
    shortDescription: 'Professional painting solutions for businesses and commercial properties.',
    slug: 'commercial-painting',
    icon: 'commercial',
  },
] as const;

export const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi Paint-Techs! I\'m interested in getting a free quote for painting services. Can you help me?'
);

export const getWhatsAppLink = (customMessage?: string) => {
  const message = customMessage ? encodeURIComponent(customMessage) : WHATSAPP_MESSAGE;
  return `https://wa.me/${BUSINESS_INFO.whatsapp.replace('+', '')}?text=${message}`;
};

export const getPhoneLink = () => `tel:${BUSINESS_INFO.phoneRaw}`;

export const getEmailLink = (subject?: string) => {
  const base = `mailto:${BUSINESS_INFO.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
};
