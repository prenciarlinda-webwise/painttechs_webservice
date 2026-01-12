// JSON-LD Schema markup generators for SEO

import { BUSINESS_INFO, SERVICE_AREAS, SERVICES } from './constants';

// Enhanced geo coordinates and postal details for service areas
export const LOCATION_DATA: Record<string, {
  lat: number;
  lng: number;
  postalCodes: string[];
  county: string;
  fips?: string;
  wikipediaSameAs?: string;
}> = {
  'jacksonville': {
    lat: 30.3322,
    lng: -81.6557,
    postalCodes: ['32099', '32201', '32202', '32204', '32205', '32206', '32207', '32208', '32209', '32210', '32211', '32216', '32217', '32218', '32219', '32220', '32221', '32222', '32223', '32224', '32225', '32226', '32227', '32244', '32246', '32250', '32254', '32256', '32257', '32258'],
    county: 'Duval County',
    fips: '12031',
  },
  'nocatee': {
    lat: 30.1033,
    lng: -81.3931,
    postalCodes: ['32081', '32082'],
    county: 'St. Johns County',
    fips: '12109',
    wikipediaSameAs: 'https://en.wikipedia.org/wiki/Nocatee,_Florida',
  },
  'ponte-vedra-beach': {
    lat: 30.2397,
    lng: -81.3856,
    postalCodes: ['32082', '32004'],
    county: 'St. Johns County',
    fips: '12109',
  },
  'jacksonville-beach': {
    lat: 30.2947,
    lng: -81.3931,
    postalCodes: ['32250'],
    county: 'Duval County',
    fips: '12031',
  },
  'atlantic-beach': {
    lat: 30.3347,
    lng: -81.3981,
    postalCodes: ['32233'],
    county: 'Duval County',
    fips: '12031',
  },
  'st-augustine': {
    lat: 29.8947,
    lng: -81.3145,
    postalCodes: ['32080', '32084', '32086', '32092', '32095'],
    county: 'St. Johns County',
    fips: '12109',
  },
  'fernandina-beach': {
    lat: 30.6699,
    lng: -81.4626,
    postalCodes: ['32034', '32035'],
    county: 'Nassau County',
    fips: '12089',
  },
  'middleburg': {
    lat: 30.0688,
    lng: -81.8606,
    postalCodes: ['32068'],
    county: 'Clay County',
    fips: '12019',
  },
  'orange-park': {
    lat: 30.1660,
    lng: -81.7106,
    postalCodes: ['32003', '32065', '32073'],
    county: 'Clay County',
    fips: '12019',
  },
  'yulee': {
    lat: 30.6311,
    lng: -81.5811,
    postalCodes: ['32097'],
    county: 'Nassau County',
    fips: '12089',
  },
};

// Legacy export for backwards compatibility
export const LOCATION_GEO: Record<string, { lat: number; lng: number }> = Object.fromEntries(
  Object.entries(LOCATION_DATA).map(([key, value]) => [key, { lat: value.lat, lng: value.lng }])
);

// Premium HousePainter Master Schema (Primary schema for homepage)
// Uses specific HousePainter type for better Local SEO and Map Pack visibility
export const generateHousePainterSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'HousePainter',
  '@id': `${BUSINESS_INFO.website}/#localbusiness`,
  name: 'Paint-Techs LLC - Painting Company',
  url: `${BUSINESS_INFO.website}/`,
  telephone: BUSINESS_INFO.phoneRaw,
  email: BUSINESS_INFO.email,
  image: `${BUSINESS_INFO.website}/logo.png`,
  priceRange: '$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS_INFO.address.city,
    addressRegion: BUSINESS_INFO.address.stateAbbr,
    postalCode: BUSINESS_INFO.address.zip,
    addressCountry: BUSINESS_INFO.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: String(BUSINESS_INFO.geo.latitude),
    longitude: String(BUSINESS_INFO.geo.longitude),
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '22:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '41',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Painting Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cabinet Painting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Painting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Exterior Painting' } },
    ],
  },
});

// LocalBusiness Schema (legacy support)
export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'HousePainter',
  '@id': `${BUSINESS_INFO.website}/#localbusiness`,
  name: 'Paint-Techs LLC - Painting Company',
  alternateName: 'Jacksonville Painters',
  legalName: BUSINESS_INFO.legalName,
  description: 'Professional Jacksonville painters offering residential and commercial painting services. Interior, exterior, and cabinet painting throughout Northeast Florida. Evening estimates available until 10PM.',
  url: `${BUSINESS_INFO.website}/`,
  telephone: BUSINESS_INFO.phoneRaw,
  email: BUSINESS_INFO.email,
  image: `${BUSINESS_INFO.website}/logo.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS_INFO.address.city,
    addressRegion: BUSINESS_INFO.address.stateAbbr,
    postalCode: BUSINESS_INFO.address.zip,
    addressCountry: BUSINESS_INFO.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: String(BUSINESS_INFO.geo.latitude),
    longitude: String(BUSINESS_INFO.geo.longitude),
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '22:00',
    },
  ],
  priceRange: '$',
  paymentAccepted: ['Cash', 'Credit Card', 'Check'],
  areaServed: SERVICE_AREAS.map((area) => ({
    '@type': 'City',
    name: area.name,
    '@id': `${BUSINESS_INFO.website}/${area.slug}-house-painters`,
  })),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '41',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    BUSINESS_INFO.links.gmb,
    BUSINESS_INFO.links.facebook,
    BUSINESS_INFO.links.instagram,
  ].filter((link) => link !== '#'),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Painting Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cabinet Painting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Painting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Exterior Painting' } },
    ],
  },
});

// Organization Schema
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BUSINESS_INFO.website}/#organization`,
  name: BUSINESS_INFO.name,
  alternateName: 'Jacksonville Painters',
  legalName: BUSINESS_INFO.legalName,
  url: BUSINESS_INFO.website,
  logo: `${BUSINESS_INFO.website}/images/logo/paint-techs-llc-logo.webp`,
  image: `${BUSINESS_INFO.website}/images/logo/paint-techs-llc-logo.webp`,
  description: 'Professional Jacksonville painters offering residential and commercial painting services. Interior, exterior, and cabinet painting throughout Northeast Florida.',
  telephone: BUSINESS_INFO.phone,
  email: BUSINESS_INFO.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS_INFO.address.street,
    addressLocality: BUSINESS_INFO.address.city,
    addressRegion: BUSINESS_INFO.address.stateAbbr,
    postalCode: BUSINESS_INFO.address.zip,
    addressCountry: BUSINESS_INFO.address.country,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: BUSINESS_INFO.phone,
    contactType: 'customer service',
    availableLanguage: ['English', 'Spanish', 'Portuguese'],
    areaServed: {
      '@type': 'State',
      name: 'Florida',
    },
  },
  sameAs: [
    BUSINESS_INFO.links.gmb,
    BUSINESS_INFO.links.facebook,
    BUSINESS_INFO.links.instagram,
    BUSINESS_INFO.links.linkedin,
    BUSINESS_INFO.links.yelp,
  ].filter((link) => link && link !== '#'),
  knowsAbout: [
    'Interior Painting',
    'Exterior Painting',
    'Cabinet Painting',
    'Cabinet Refinishing',
    'Commercial Painting',
    'Residential Painting',
  ],
  areaServed: SERVICE_AREAS.map((area) => ({
    '@type': 'City',
    name: area.name,
  })),
});

// Priority Nocatee Service Area Schema
// Uses Geographical Entity Injection with Wikipedia sameAs for Local Map Pack visibility
export const generateNocateeLocationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'HousePainter',
  name: 'Paint-Techs LLC - Nocatee',
  description: 'Premium residential painting services in Nocatee, FL. Specializing in cabinet refinishing and luxury interior painting. Evening estimates available until 10PM.',
  url: `${BUSINESS_INFO.website}/nocatee-house-painters/`,
  telephone: BUSINESS_INFO.phoneRaw,
  areaServed: [
    {
      '@type': 'Place',
      name: 'Nocatee',
      sameAs: 'https://en.wikipedia.org/wiki/Nocatee,_Florida',
    },
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '30.1033',
        longitude: '-81.3931',
      },
      geoRadius: '10000',
    },
  ],
  knowsAbout: ['Cabinet Painting', 'Interior Painting', 'Residential Painting'],
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${BUSINESS_INFO.website}/nocatee-house-painters/`,
  },
});

// Specialized Cabinet Painting Service Schema
// Helps Google pull "Provides this service" justifications in search results
export const generateCabinetPaintingServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Cabinet Painting',
  provider: {
    '@type': 'HousePainter',
    name: 'Paint-Techs LLC',
    url: `${BUSINESS_INFO.website}/`,
  },
  areaServed: {
    '@type': 'State',
    name: 'Florida',
  },
  description: 'Professional cabinet painting and refinishing services in Northeast Florida. High-quality finishes for kitchen and bathroom cabinetry.',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    description: 'Contact for custom pricing and free estimates.',
  },
});

// Interior Painting Service Schema
export const generateInteriorPaintingServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Interior Painting',
  provider: {
    '@type': 'HousePainter',
    name: 'Paint-Techs LLC',
    url: `${BUSINESS_INFO.website}/`,
  },
  areaServed: {
    '@type': 'State',
    name: 'Florida',
  },
  description: 'Professional interior house painting services in Jacksonville and Northeast Florida. Transform your indoor spaces with expert color consultation and flawless application.',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    description: 'Contact for custom pricing and free estimates.',
  },
});

// Exterior Painting Service Schema
export const generateExteriorPaintingServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Exterior Painting',
  provider: {
    '@type': 'HousePainter',
    name: 'Paint-Techs LLC',
    url: `${BUSINESS_INFO.website}/`,
  },
  areaServed: {
    '@type': 'State',
    name: 'Florida',
  },
  description: 'Professional exterior house painting services in Jacksonville and Northeast Florida. Weather-resistant coatings designed for Florida climate.',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    description: 'Contact for custom pricing and free estimates.',
  },
});

// Service Schema (generic)
export const generateServiceSchema = (
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description: serviceDescription,
  url: serviceUrl,
  provider: {
    '@type': 'HousePainter',
    name: BUSINESS_INFO.name,
    '@id': `${BUSINESS_INFO.website}/#localbusiness`,
  },
  areaServed: {
    '@type': 'State',
    name: 'Florida',
  },
  serviceType: 'Painting Service',
});

// FAQ Schema
export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Review/Aggregate Rating Schema
export const generateReviewSchema = (reviews: {
  name: string;
  rating: number;
  text: string;
  date: string;
}[]) => {
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_INFO.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.name,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.text,
      datePublished: review.date,
    })),
  };
};

// Breadcrumb Schema
export const generateBreadcrumbSchema = (
  items: { name: string; url: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// Article/Blog Post Schema
export const generateArticleSchema = (
  title: string,
  description: string,
  url: string,
  publishedDate: string,
  modifiedDate: string,
  authorName: string,
  imageUrl?: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description: description,
  url: url,
  datePublished: publishedDate,
  dateModified: modifiedDate,
  author: {
    '@type': 'Organization',
    name: authorName,
  },
  publisher: {
    '@type': 'Organization',
    name: BUSINESS_INFO.name,
    logo: {
      '@type': 'ImageObject',
      url: `${BUSINESS_INFO.website}/images/logo.png`,
    },
  },
  ...(imageUrl && {
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
    },
  }),
});

// WebSite Schema for sitelinks searchbox
export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BUSINESS_INFO.website}/#website`,
  name: BUSINESS_INFO.name,
  url: BUSINESS_INFO.website,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BUSINESS_INFO.website}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

// Location-specific HousePainter Schema with enhanced AreaServed
// Uses HousePainter type and Geographical Entity Injection for Local Map Pack
export const generateLocationBusinessSchema = (
  locationName: string,
  locationSlug: string,
  description: string,
  county: string,
  neighborhoods?: string[]
) => {
  const locationData = LOCATION_DATA[locationSlug] || LOCATION_DATA['jacksonville'];

  // Build areaServed with Wikipedia sameAs if available
  const primaryAreaServed: Record<string, unknown> = {
    '@type': 'Place',
    name: locationName,
  };

  // Add Wikipedia sameAs for geographical entity injection
  if (locationData.wikipediaSameAs) {
    primaryAreaServed.sameAs = locationData.wikipediaSameAs;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'HousePainter',
    '@id': `${BUSINESS_INFO.website}/${locationSlug}-house-painters/#localbusiness`,
    name: `Paint-Techs LLC - ${locationName}`,
    alternateName: `Paint-Techs ${locationName} Painters`,
    description: `${description} Evening estimates available until 10PM.`,
    url: `${BUSINESS_INFO.website}/${locationSlug}-house-painters/`,
    telephone: BUSINESS_INFO.phoneRaw,
    email: BUSINESS_INFO.email,
    image: `${BUSINESS_INFO.website}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: locationName,
      addressRegion: 'FL',
      postalCode: locationData.postalCodes[0],
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: String(locationData.lat),
      longitude: String(locationData.lng),
    },
    areaServed: [
      primaryAreaServed,
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: String(locationData.lat),
          longitude: String(locationData.lng),
        },
        geoRadius: '10000',
      },
      // Add neighborhoods as additional service areas
      ...(neighborhoods || []).slice(0, 5).map((neighborhood) => ({
        '@type': 'Neighborhood',
        name: neighborhood,
        containedInPlace: {
          '@type': 'City',
          name: locationName,
        },
      })),
    ],
    knowsAbout: ['Cabinet Painting', 'Interior Painting', 'Exterior Painting', 'Residential Painting'],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BUSINESS_INFO.website}/${locationSlug}-house-painters/`,
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: String(locationData.lat),
        longitude: String(locationData.lng),
      },
      geoRadius: '25 mi',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Painting Services in ${locationName}`,
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${service.name} in ${locationName}`,
          description: service.shortDescription,
          url: `${BUSINESS_INFO.website}/services/${service.slug}`,
          areaServed: {
            '@type': 'City',
            name: locationName,
          },
        },
      })),
    },
    priceRange: '$',
    currenciesAccepted: 'USD',
    paymentAccepted: ['Cash', 'Credit Card', 'Check'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '22:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '41',
    },
    sameAs: [
      BUSINESS_INFO.links.gmb,
      BUSINESS_INFO.links.facebook,
      BUSINESS_INFO.links.instagram,
    ].filter((link) => link !== '#'),
  };
};

// About Page Schema
export const generateAboutPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${BUSINESS_INFO.website}/about/#webpage`,
  name: 'About Paint-Techs LLC',
  description: 'Learn about Paint-Techs LLC, Jacksonville\'s trusted painting contractor. Our experienced team delivers quality interior, exterior, and cabinet painting services.',
  url: `${BUSINESS_INFO.website}/about`,
  mainEntity: {
    '@type': 'Organization',
    '@id': `${BUSINESS_INFO.website}/#organization`,
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    url: BUSINESS_INFO.website,
    logo: `${BUSINESS_INFO.website}/images/logo/paint-techs-llc-logo.webp`,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    foundingLocation: {
      '@type': 'Place',
      name: 'Jacksonville, Florida',
    },
    areaServed: {
      '@type': 'State',
      name: 'Florida',
    },
    knowsAbout: [
      'Interior Painting',
      'Exterior Painting',
      'Cabinet Painting',
      'Commercial Painting',
    ],
  },
});

// Contact Page Schema
export const generateContactPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${BUSINESS_INFO.website}/contact/#webpage`,
  name: 'Contact Paint-Techs LLC',
  description: 'Contact Paint-Techs LLC for free painting estimates in Jacksonville, FL. Call (904) 762-7062 or message us on WhatsApp. Evening estimates available until 10PM.',
  url: `${BUSINESS_INFO.website}/contact`,
  mainEntity: {
    '@type': 'HousePainter',
    '@id': `${BUSINESS_INFO.website}/#localbusiness`,
    name: 'Paint-Techs LLC - Painting Company',
    telephone: BUSINESS_INFO.phoneRaw,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.stateAbbr,
      postalCode: BUSINESS_INFO.address.zip,
      addressCountry: BUSINESS_INFO.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: String(BUSINESS_INFO.geo.latitude),
      longitude: String(BUSINESS_INFO.geo.longitude),
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '22:00',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS_INFO.phoneRaw,
      contactType: 'customer service',
      availableLanguage: ['English', 'Spanish', 'Portuguese'],
    },
  },
});

// Gallery/Collection Page Schema
export const generateGallerySchema = (
  projects: { title: string; image: string; location: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${BUSINESS_INFO.website}/gallery/#webpage`,
  name: 'Paint-Techs Project Gallery',
  description: 'View our portfolio of completed painting projects in Jacksonville, FL. Interior, exterior, cabinet painting before and after photos.',
  url: `${BUSINESS_INFO.website}/gallery`,
  mainEntity: {
    '@type': 'ImageGallery',
    name: 'Paint-Techs Painting Projects',
    description: 'Portfolio of completed residential and commercial painting projects.',
    image: projects.slice(0, 10).map((project) => ({
      '@type': 'ImageObject',
      name: project.title,
      contentUrl: `${BUSINESS_INFO.website}${project.image}`,
      description: `${project.title} in ${project.location}`,
    })),
  },
});

// Services List Schema (for /services page)
export const generateServicesListSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${BUSINESS_INFO.website}/services/#itemlist`,
  name: 'Paint-Techs Painting Services',
  description: 'Professional painting services offered by Paint-Techs LLC in Jacksonville, FL. Evening estimates available until 10PM.',
  url: `${BUSINESS_INFO.website}/services`,
  numberOfItems: SERVICES.length,
  itemListElement: SERVICES.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      name: service.name,
      description: service.shortDescription,
      url: `${BUSINESS_INFO.website}/services/${service.slug}`,
      provider: {
        '@type': 'HousePainter',
        '@id': `${BUSINESS_INFO.website}/#localbusiness`,
        name: BUSINESS_INFO.name,
      },
    },
  })),
});

// Service Areas Schema (for /areas-we-serve page)
export const generateServiceAreasSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BUSINESS_INFO.website}/areas-we-serve/#webpage`,
  name: 'Paint-Techs Service Areas',
  description: 'Paint-Techs LLC serves Jacksonville, Nocatee, Ponte Vedra Beach, St. Augustine, and all of Northeast Florida. Evening estimates available until 10PM.',
  url: `${BUSINESS_INFO.website}/areas-we-serve`,
  mainEntity: {
    '@type': 'HousePainter',
    '@id': `${BUSINESS_INFO.website}/#localbusiness`,
    name: 'Paint-Techs LLC - Painting Company',
    areaServed: SERVICE_AREAS.map((area) => {
      const locationData = LOCATION_DATA[area.slug];
      const areaServed: Record<string, unknown> = {
        '@type': 'Place',
        name: area.name,
        '@id': `${BUSINESS_INFO.website}/${area.slug}-house-painters`,
      };
      // Add Wikipedia sameAs for geographical entity injection
      if (locationData?.wikipediaSameAs) {
        areaServed.sameAs = locationData.wikipediaSameAs;
      }
      return areaServed;
    }),
  },
});

// Blog List Schema
export const generateBlogListSchema = (
  posts: { title: string; slug: string; excerpt: string; publishedAt: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${BUSINESS_INFO.website}/blog/#blog`,
  name: 'Paint-Techs Painting Tips & Advice Blog',
  description: 'Expert painting tips, home improvement advice, and project guides from Paint-Techs LLC in Jacksonville, FL.',
  url: `${BUSINESS_INFO.website}/blog`,
  publisher: {
    '@type': 'Organization',
    '@id': `${BUSINESS_INFO.website}/#organization`,
    name: BUSINESS_INFO.name,
  },
  blogPost: posts.slice(0, 10).map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${BUSINESS_INFO.website}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
    },
  })),
});

// Gallery Category Schema for service-specific galleries
export const generateGalleryCategorySchema = (
  category: 'Exterior' | 'Interior' | 'Cabinet',
  projects: { title: string; image: string; location: string; description: string }[]
) => {
  const categoryInfo = {
    Exterior: {
      name: 'Exterior Painting Gallery',
      description: 'Browse our portfolio of exterior house painting projects in Jacksonville, FL. Before and after photos of home exteriors throughout Northeast Florida.',
      serviceLink: '/services/exterior-painting',
    },
    Interior: {
      name: 'Interior Painting Gallery',
      description: 'View our interior painting project gallery featuring homes in Jacksonville, FL. Room transformations, color choices, and finished results.',
      serviceLink: '/services/interior-painting',
    },
    Cabinet: {
      name: 'Cabinet Painting Gallery',
      description: 'See our cabinet painting and refinishing transformations in Jacksonville, FL. Before and after photos showing kitchen cabinet makeovers.',
      serviceLink: '/services/cabinet-painting',
    },
  };

  const info = categoryInfo[category];

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${BUSINESS_INFO.website}/gallery/${category.toLowerCase()}/#webpage`,
    name: info.name,
    description: info.description,
    url: `${BUSINESS_INFO.website}/gallery/${category.toLowerCase()}`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${BUSINESS_INFO.website}/#website`,
    },
    about: {
      '@type': 'Service',
      name: `${category} Painting`,
      url: `${BUSINESS_INFO.website}${info.serviceLink}`,
      provider: {
        '@type': 'HousePainter',
        '@id': `${BUSINESS_INFO.website}/#localbusiness`,
        name: BUSINESS_INFO.name,
      },
    },
    mainEntity: {
      '@type': 'ImageGallery',
      name: `${category} Painting Projects by Paint-Techs LLC`,
      description: info.description,
      numberOfItems: projects.length,
      image: projects.slice(0, 10).map((project) => ({
        '@type': 'ImageObject',
        name: project.title,
        contentUrl: `${BUSINESS_INFO.website}${project.image}`,
        description: project.description,
        contentLocation: {
          '@type': 'Place',
          name: project.location,
        },
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BUSINESS_INFO.website },
        { '@type': 'ListItem', position: 2, name: 'Gallery', item: `${BUSINESS_INFO.website}/gallery` },
        { '@type': 'ListItem', position: 3, name: info.name, item: `${BUSINESS_INFO.website}/gallery/${category.toLowerCase()}` },
      ],
    },
  };
};

// Homepage Schema (combines multiple schemas)
// Uses premium HousePainter master schema for optimal Local SEO
export const generateHomePageSchema = () => [
  generateHousePainterSchema(),
  generateWebsiteSchema(),
  generateOrganizationSchema(),
];

// Alternative homepage schema with Cabinet Painting service emphasis
export const generateHomePageSchemaWithServices = () => [
  generateHousePainterSchema(),
  generateWebsiteSchema(),
  generateOrganizationSchema(),
  generateCabinetPaintingServiceSchema(),
];
