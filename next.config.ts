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

      /* --- OLD WORDPRESS BLOG POSTS → SERVICE PAGES --- */
      // Interior painting related posts
      { source: "/interior-painting-services-in-jacksonville-fl-residential-commercial-solutions", destination: "/services/interior-painting", permanent: true },
      { source: "/transform-your-space-with-expert-interior-paint-services", destination: "/services/interior-painting", permanent: true },
      { source: "/transform-your-home-with-expert-residential-painting-in-jacksonville-fl", destination: "/services/interior-painting", permanent: true },
      { source: "/house-painting-services-refresh-your-home-with-a-splash-of-color", destination: "/services/interior-painting", permanent: true },
      { source: "/residential-painting-services-enhancing-your-home-with-a-fresh-look", destination: "/services/interior-painting", permanent: true },
      { source: "/the-best-guide-to-textured-paint-for-home-in-jacksonville-florida", destination: "/services/interior-painting", permanent: true },
      { source: "/residential-painting-companies-what-to-expect-from-professional-house-painting-services", destination: "/services/interior-painting", permanent: true },
      { source: "/interior-painting-services-transforming-your-jacksonville-home-inside-and-out", destination: "/services/interior-painting", permanent: true },
      { source: "/how-to-paint-over-water-damage-essential-tips-for-homeowners", destination: "/services/interior-painting", permanent: true },
      { source: "/wall-painting-services-transform-your-space-with-style-and-precision", destination: "/services/interior-painting", permanent: true },
      { source: "/wall-painting-services-a-fresh-look-that-lasts", destination: "/services/interior-painting", permanent: true },
      { source: "/interior-painting-jacksonville", destination: "/services/interior-painting", permanent: true },
      { source: "/ceiling-painting-101", destination: "/services/interior-painting", permanent: true },

      // Exterior painting related posts
      { source: "/why-exterior-painting-services-matter-a-complete-guide-for-homeowners", destination: "/services/exterior-painting", permanent: true },
      { source: "/transform-your-home-with-professional-exterior-painting-services-in-jacksonville-fl", destination: "/services/exterior-painting", permanent: true },
      { source: "/festive-exterior-paint-colors-that-bring-christmas-cheer-to-your-home", destination: "/services/exterior-painting", permanent: true },
      { source: "/exterior-home-painting-services", destination: "/services/exterior-painting", permanent: true },
      { source: "/the-ultimate-guide-to-exterior-painting-services-protecting-and-beautifying-your-property", destination: "/services/exterior-painting", permanent: true },

      // Commercial painting related posts
      { source: "/why-industrial-painting-services-are-vital-for-your-facility", destination: "/services/commercial-painting", permanent: true },
      { source: "/a-comprehensive-guide-to-industrial-painting-services", destination: "/services/commercial-painting", permanent: true },
      { source: "/commercial-painting-contractors-in-jacksonville-fl-your-guide-to-a-professional-finish", destination: "/services/commercial-painting", permanent: true },
      { source: "/the-ultimate-guide-to-exterior-commercial-painting-for-businesses", destination: "/services/commercial-painting", permanent: true },
      { source: "/transform-your-business-with-professional-commercial-painting-in-jacksonville-fl", destination: "/services/commercial-painting", permanent: true },
      { source: "/tag/commercial-painting", destination: "/services/commercial-painting", permanent: true },
      { source: "/tag/commercial-painting-jacksonville", destination: "/services/commercial-painting", permanent: true },
      { source: "/tag/commercial-painting-contractor", destination: "/services/commercial-painting", permanent: true },

      // General services posts
      { source: "/a-complete-guide-to-interior-and-exterior-painting-services", destination: "/services", permanent: true },
      { source: "/a-house-painting-tips-2024", destination: "/services", permanent: true },
      { source: "/advanced-painting-services-redefining-quality-in-jacksonville", destination: "/services", permanent: true },
      { source: "/understanding-the-difference-exterior-painting-services-vs-indoor-painting-essentials", destination: "/services", permanent: true },
      { source: "/affordable-painting-services-near-me", destination: "/services", permanent: true },
      { source: "/brighten-your-home-with-the-best-painting-services-near-you", destination: "/services", permanent: true },
      { source: "/the-ultimate-guide-to-jacksonville-residential-painting-services", destination: "/services", permanent: true },
      { source: "/tag/interior-and-exterior-painting-services", destination: "/services", permanent: true },
      { source: "/service", destination: "/services", permanent: true },

      // Jacksonville contractor posts
      { source: "/choosing-the-right-jacksonville-residential-painting-contractor-for-your-home", destination: "/jacksonville-house-painters", permanent: true },
      { source: "/residential-painting-company-jacksonville-fl", destination: "/jacksonville-house-painters", permanent: true },
      { source: "/top-rated-jacksonville-home-painting-services-for-stunning-interior-exterior-results", destination: "/jacksonville-house-painters", permanent: true },
      { source: "/residential-painting-services-jacksonville-fl", destination: "/jacksonville-house-painters", permanent: true },
      { source: "/professional-painting-services-in-jacksonville-fl-paint-techs-us", destination: "/jacksonville-house-painters", permanent: true },

      // About page redirect
      { source: "/paint-techs-us-will-do-professional-excellence-for-your-space", destination: "/about", permanent: true },

      /* --- OLD PAGE STRUCTURE → NEW PAGES --- */
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us/", destination: "/contact", permanent: true },
      { source: "/form/get-a-quote-painting-services", destination: "/contact", permanent: true },
      { source: "/exterior-painting-portfolio", destination: "/gallery/exterior", permanent: true },
      { source: "/cabinet-painting-portfolio", destination: "/gallery/cabinet", permanent: true },

      /* --- WORDPRESS ASSETS → HOMEPAGE (cleanup) --- */
      { source: "/wp-includes/:path*", destination: "/", permanent: true },
      { source: "/wp-content/:path*", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
