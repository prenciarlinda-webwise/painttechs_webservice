import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,

  async redirects() {
    return [
      { source: '/services/interior-painting',           destination: '/interior-painting',           statusCode: 301 },
      { source: '/services/exterior-painting',           destination: '/exterior-painting',           statusCode: 301 },
      { source: '/services/cabinet-painting',            destination: '/cabinet-painting',            statusCode: 301 },
      { source: '/services/commercial-painting',         destination: '/commercial-painting',         statusCode: 301 },
      { source: '/services/pool-deck-painting-staining', destination: '/pool-deck-painting-staining', statusCode: 301 },
      { source: '/services/:slug*',                      destination: '/services',                    statusCode: 301 },

      { source: '/locations/:loc',                       destination: '/:loc-house-painters',         statusCode: 301 },
      { source: '/areas/:loc',                           destination: '/:loc-house-painters',         statusCode: 301 },
      { source: '/painting-services/:slug',              destination: '/:slug',                       statusCode: 301 },

      { source: '/cdn-cgi/l/email-protection',           destination: '/contact',                     statusCode: 301 },
    ];
  },
};

export default nextConfig;
