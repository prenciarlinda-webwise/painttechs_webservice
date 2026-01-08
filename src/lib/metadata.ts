// SEO metadata helpers

import { Metadata } from 'next';
import { BUSINESS_INFO } from './constants';

interface PageMetadata {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export const generateMetadata = ({
  title,
  description,
  path = '',
  image = '/og-image.jpg',
  noIndex = false,
}: PageMetadata): Metadata => {
  const url = `${BUSINESS_INFO.website}${path}`;
  const fullTitle = title.includes('Paint-Techs') ? title : `${title} - Paint-Techs LLC`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(BUSINESS_INFO.website),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: BUSINESS_INFO.name,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    other: {
      'geo.region': 'US-FL',
      'geo.placename': BUSINESS_INFO.address.city,
      'geo.position': `${BUSINESS_INFO.geo.latitude};${BUSINESS_INFO.geo.longitude}`,
      ICBM: `${BUSINESS_INFO.geo.latitude}, ${BUSINESS_INFO.geo.longitude}`,
    },
  };
};

// Default metadata for the site
export const defaultMetadata: Metadata = {
  title: {
    default: 'Paint-Techs LLC - Professional Painting Services Jacksonville FL',
    template: '%s - Paint-Techs LLC',
  },
  description: BUSINESS_INFO.description,
  metadataBase: new URL(BUSINESS_INFO.website),
  // Icons are handled by Next.js App Router convention (files in src/app/)
  keywords: [
    'painters jacksonville fl',
    'painting contractor jacksonville',
    'house painters jacksonville',
    'interior painting jacksonville',
    'exterior painting jacksonville',
    'cabinet painting jacksonville',
    'commercial painting jacksonville',
    'nocatee painters',
    'ponte vedra painters',
    'jacksonville beach painters',
    'st augustine painters',
    'painting company near me',
  ],
  authors: [{ name: BUSINESS_INFO.name }],
  creator: BUSINESS_INFO.name,
  publisher: BUSINESS_INFO.name,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: BUSINESS_INFO.name,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

// Service page metadata generator
export const generateServiceMetadata = (
  serviceName: string,
  serviceDescription: string,
  slug: string
): Metadata => {
  return generateMetadata({
    title: `${serviceName} Services Jacksonville FL`,
    description: `${serviceDescription} Professional ${serviceName.toLowerCase()} services in Jacksonville and Northeast Florida. Free estimates from Paint-Techs LLC. Call (904) 762-7062!`,
    path: `/services/${slug}`,
  });
};

// Location page metadata generator
export const generateLocationMetadata = (
  locationName: string,
  description: string,
  slug: string
): Metadata => {
  return generateMetadata({
    title: `${locationName} Painters - House Painting ${locationName} FL`,
    description: `${description.substring(0, 155)}...`,
    path: `/${slug}-painting-contractor`,
  });
};

// Blog post metadata generator
export const generateBlogMetadata = (
  title: string,
  description: string,
  slug: string,
  publishedDate: string
): Metadata => {
  return {
    ...generateMetadata({
      title,
      description,
      path: `/blog/${slug}`,
    }),
    openGraph: {
      type: 'article',
      publishedTime: publishedDate,
      authors: [BUSINESS_INFO.name],
    },
  };
};
