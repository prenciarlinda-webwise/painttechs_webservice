import { MetadataRoute } from 'next';
import { BUSINESS_INFO } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: ['Googlebot', 'Bingbot'],
        allow: ['/_next/static/', '/_next/image'],
      },
    ],
    sitemap: `${BUSINESS_INFO.website}/sitemap.xml`,
    host: BUSINESS_INFO.website,
  };
}
