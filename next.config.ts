import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporarily disabled Turbopack due to cache corruption
  // turbopack: {},
    async redirects() {
    return [
      /* --- MAPPING FROM LIVE SITEMAP TO NEW LOCAL VERSION --- */
      { source: "/painting-services-jacksonville-fl/", destination: "/jacksonville-house-painters", permanent: true },
      { source: "/painting-services-nocatee-fl/", destination: "/nocatee-house-painters", permanent: true },
      { source: "/painting-services-ponte-vedra-beach-fl/", destination: "/ponte-vedra-beach-house-painters", permanent: true },
      { source: "/painting-services-jacksonville-beach-fl/", destination: "/jacksonville-beach-house-painters", permanent: true },
      { source: "/painting-services-atlantic-beach-fl/", destination: "/atlantic-beach-house-painters", permanent: true },
      { source: "/painting-services-st-augustine-fl/", destination: "/st-augustine-house-painters", permanent: true },
      { source: "/painting-services-middleburg-fl/", destination: "/middleburg-house-painters", permanent: true },
      { source: "/painting-services-orange-park-fl/", destination: "/orange-park-house-painters", permanent: true },
      { source: "/painting-services-fernandina-beach-fl/", destination: "/fernandina-beach-house-painters", permanent: true },
      { source: "/painting-services-yulee-fl/", destination: "/yulee-house-painters", permanent: true },

      /* --- SERVICE DIRECTORY MIGRATION --- */
      { source: "/interior-painting-services/", destination: "/services/interior-painting", permanent: true },
      { source: "/exterior-painting-services/", destination: "/services/exterior-painting", permanent: true },
      { source: "/cabinet-painting-services/", destination: "/services/cabinet-painting", permanent: true },
      { source: "/commercial-painting-services/", destination: "/services/commercial-painting", permanent: true },

      /* --- CLEANUP OF INTERMEDIATE LOCAL SLUGS --- */
      // This ensures if anyone accessed the '-painting-contractor' versions locally,
      // they are now correctly funneled to the final destination.
      { source: "/jacksonville-painting-contractor", destination: "/jacksonville-house-painters", permanent: true },
      { source: "/nocatee-painting-contractor", destination: "/nocatee-house-painters", permanent: true },
      { source: "/ponte-vedra-beach-painting-contractor", destination: "/ponte-vedra-beach-house-painters", permanent: true },
      { source: "/jacksonville-beach-painting-contractor", destination: "/jacksonville-beach-house-painters", permanent: true },
      { source: "/atlantic-beach-painting-contractor", destination: "/atlantic-beach-house-painters", permanent: true },
      { source: "/st-augustine-painting-contractor", destination: "/st-augustine-house-painters", permanent: true },
      { source: "/fernandina-beach-painting-contractor", destination: "/fernandina-beach-house-painters", permanent: true },
      { source: "/middleburg-painting-contractor", destination: "/middleburg-house-painters", permanent: true },
      { source: "/orange-park-painting-contractor", destination: "/orange-park-house-painters", permanent: true },
      { source: "/yulee-painting-contractor", destination: "/yulee-house-painters", permanent: true },

      /* --- STATIC PAGE TRAILING SLASH CLEANUP --- */
      { source: "/about/", destination: "/about", permanent: true },
      { source: "/contact/", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
