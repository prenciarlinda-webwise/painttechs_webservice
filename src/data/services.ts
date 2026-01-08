// Detailed service data for service pages

export interface ServiceDetail {
  id: string;
  name: string;
  slug: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  longDescription: string;
  image: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'interior-painting',
    name: 'Interior Painting',
    slug: 'interior-painting',
    heroTitle: 'Professional Interior Painting Services',
    heroSubtitle: 'Transform Your Jacksonville Home with Expert Interior Painting',
    description: 'Our professional interior painting services bring new life to your living spaces. From single rooms to complete home makeovers, Paint-Techs delivers flawless results with premium paints and meticulous attention to detail.',
    image: '/images/interior/interior-painting-before-after-nocatee-fl-1.webp',
    longDescription: `At Paint-Techs LLC, we understand that your home's interior is a reflection of your personal style. Our experienced painting professionals are dedicated to transforming your living spaces with precision, care, and exceptional craftsmanship.

We use only premium quality paints and materials from trusted brands, ensuring vibrant colors that last for years. Our team handles everything from thorough surface preparation to the final clean-up, leaving you with beautiful, freshly painted rooms without the hassle.

Whether you're looking to refresh a single room, update your entire home, or need specialty finishes like accent walls or textured painting, Paint-Techs has the expertise to bring your vision to life.`,
    benefits: [
      'Premium quality paints with lasting durability',
      'Expert color consultation and matching',
      'Thorough surface preparation and priming',
      'Clean, dust-free work environment',
      'Furniture and floor protection',
      'Detailed trim and edge work',
      'Quick turnaround with minimal disruption',
      'Full clean-up upon completion',
    ],
    process: [
      { step: 1, title: 'Free Consultation', description: 'We visit your home to discuss your vision, assess the space, and provide color recommendations.' },
      { step: 2, title: 'Detailed Quote', description: 'Receive a transparent, itemized quote with no hidden fees or surprises.' },
      { step: 3, title: 'Surface Preparation', description: 'We properly prepare all surfaces including patching, sanding, and priming for optimal paint adhesion.' },
      { step: 4, title: 'Professional Painting', description: 'Our skilled painters apply premium paints with precision and care.' },
      { step: 5, title: 'Final Inspection', description: 'We conduct a thorough walkthrough to ensure your complete satisfaction.' },
    ],
    faqs: [
      { question: 'How long does interior painting take?', answer: 'Most single rooms can be completed in 1-2 days. Whole house projects typically take 3-7 days depending on size and complexity.' },
      { question: 'Do I need to move my furniture?', answer: 'We handle all furniture moving and protection. Large items are moved to the center of the room and covered with drop cloths.' },
      { question: 'What type of paint do you use?', answer: 'We use premium paints from brands like Sherwin-Williams, Benjamin Moore, and PPG. We recommend specific finishes based on each room\'s needs.' },
      { question: 'Do you offer color consultation?', answer: 'Yes! Our experienced team can help you choose the perfect colors that complement your home\'s style and lighting.' },
    ],
    keywords: ['interior painting', 'house painting', 'room painting', 'wall painting', 'residential painting'],
    metaTitle: 'Interior Painting Services Jacksonville FL | Paint-Techs LLC',
    metaDescription: 'Professional interior painting services in Jacksonville, FL. Expert painters, premium paints, and flawless results. Get a free quote from Paint-Techs LLC today!',
  },
  {
    id: 'exterior-painting',
    name: 'Exterior Painting',
    slug: 'exterior-painting',
    heroTitle: 'Exterior House Painting Services in Jacksonville, FL',
    heroSubtitle: 'Florida-Certified Painters Protecting Your Home from Sun, Salt & Humidity',
    description: 'Jacksonville\'s trusted exterior house painters since 2018. Paint-Techs LLC specializes in weather-resistant exterior painting that protects your home from Florida\'s intense UV rays, coastal salt air, and humidity while boosting curb appeal.',
    image: '/images/exterior/exterior-painting-nocatee-fl-1.webp',
    longDescription: `## Why Jacksonville Homes Need Specialized Exterior Painting

Your home's exterior faces unique challenges in Northeast Florida. The combination of intense UV radiation, high humidity, salt air (especially in beach communities), and seasonal storms can deteriorate exterior paint faster than in other regions. That's why Paint-Techs LLC uses only premium, Florida-formulated exterior coatings designed for our climate.

## Our Exterior Painting Expertise

With over 500 exterior painting projects completed across Jacksonville, Ponte Vedra Beach, St. Augustine, and surrounding areas, Paint-Techs LLC has developed proven techniques for lasting results:

**Surface Types We Paint:**
- Wood siding and trim (including HardiePlank)
- Vinyl and aluminum siding
- Brick and block exteriors
- Fascia, soffits, and eaves
- Garage doors and entry doors
- Shutters, railings, and accent features

**Premium Paint Brands We Use:**
- Sherwin-Williams Duration and SuperPaint
- Benjamin Moore Aura and Regal Select
- PPG Manor Hall and Timeless

## Florida Climate Protection

Our exterior painting process is specifically designed for Florida's demanding conditions:

- **UV-Resistant Formulations:** Prevent fading and chalking from intense sun exposure
- **Mold & Mildew Inhibitors:** Essential for Jacksonville's humidity levels
- **Flexible Coatings:** Expand and contract with Florida's temperature swings
- **Salt-Air Resistance:** Critical for homes near Jacksonville Beach, Ponte Vedra, and coastal areas

## What Sets Paint-Techs LLC Apart

Unlike national chains, we're a local Jacksonville painting company that understands Northeast Florida homes. Our team has painted exteriors in every neighborhood from Riverside to Nocatee, from Atlantic Beach to Orange Park. We know which products perform best in each microclimate and adjust our approach accordingly.`,
    benefits: [
      'Florida-formulated UV and weather-resistant paints',
      'Complete surface prep: power washing, scraping, caulking, priming',
      'Expert color consultation for HOA compliance',
      'Wood rot repair and minor carpentry included',
      'Protection of landscaping, walkways, and outdoor features',
      'Mold and mildew resistant coatings standard',
      '5-year workmanship warranty',
      'Fully licensed and insured in Florida',
    ],
    process: [
      { step: 1, title: 'Free Exterior Assessment', description: 'We inspect your home\'s exterior, identify repairs needed, check for wood rot, and photograph problem areas. You receive a detailed written estimate within 24 hours.' },
      { step: 2, title: 'Color Consultation & HOA Review', description: 'Choose from thousands of colors with expert guidance. We can help with HOA color approval submissions if needed.' },
      { step: 3, title: 'Thorough Surface Preparation', description: 'Power washing to remove dirt, mold, and loose paint. Scraping, sanding, wood rot repair, caulking gaps, and applying bonding primer to bare areas.' },
      { step: 4, title: 'Professional Paint Application', description: 'Two coats of premium exterior paint applied by brush, roller, or spray depending on surface type. All trim and detail work by hand.' },
      { step: 5, title: 'Final Inspection & Walkthrough', description: 'Detailed inspection with you to ensure every surface meets our standards. Touch-ups completed same day. Full cleanup of work areas.' },
    ],
    faqs: [
      { question: 'How much does exterior painting cost in Jacksonville?', answer: 'Exterior house painting in Jacksonville typically costs $3,500-$8,000 for average-sized homes (1,800-2,500 sq ft). Larger homes, multi-story properties, and extensive prep work can range $8,000-$15,000. Paint-Techs LLC provides free, detailed estimates with no hidden fees.' },
      { question: 'How long does exterior paint last in Florida?', answer: 'With quality paint and proper preparation, exterior paint in Florida typically lasts 7-10 years. Budget paints or poor prep may only last 3-5 years due to UV damage and humidity. Paint-Techs uses premium Florida-formulated paints that maximize longevity.' },
      { question: 'What\'s the best time of year to paint exteriors in Jacksonville?', answer: 'Jacksonville\'s mild winters and pleasant spring/fall make year-round exterior painting possible. We avoid painting during rain or when humidity exceeds 85%. October through May typically offers the most consistent conditions.' },
      { question: 'Do you handle wood rot repair before painting?', answer: 'Yes, wood rot repair is a standard part of our exterior painting service. We replace rotted fascia boards, repair damaged trim, fill holes, and seal cracks before painting. Extensive carpentry is quoted separately.' },
      { question: 'Can you help with HOA color approval?', answer: 'Absolutely. Many Jacksonville communities (Nocatee, Ponte Vedra, World Golf Village) have strict HOA color requirements. We can help you select approved colors and submit samples to your HOA for pre-approval.' },
    ],
    keywords: ['exterior painting jacksonville fl', 'house painters jacksonville', 'exterior house painting', 'outside house painters near me', 'jacksonville painting contractors', 'exterior paint jacksonville'],
    metaTitle: 'Exterior Painting Jacksonville FL | House Painters Near You | Paint-Techs LLC',
    metaDescription: 'Top-rated exterior house painting in Jacksonville, FL. Weather-resistant coatings, wood rot repair, 5-year warranty. Free estimates: (904) 762-7062. Serving Nocatee, Ponte Vedra & St. Augustine.',
  },
  {
    id: 'cabinet-painting',
    name: 'Cabinet Painting & Refinishing',
    slug: 'cabinet-painting',
    heroTitle: 'Professional Cabinet Painting & Refinishing in Jacksonville, FL',
    heroSubtitle: 'Transform Your Kitchen at 50-70% Less Than Cabinet Replacement Cost',
    description: 'Jacksonville\'s trusted cabinet painting and refinishing experts. Paint-Techs LLC delivers factory-smooth finishes that transform dated cabinets into stunning focal points—without the cost or hassle of full replacement.',
    image: '/images/cabinet/cabinet-painting-before-after-nocatee-fl-1.webp',
    longDescription: `Are you considering a kitchen update but dreading the $15,000-$50,000 price tag for new cabinets? Cabinet painting and refinishing from Paint-Techs LLC offers Jacksonville homeowners a smarter alternative that delivers dramatic results at a fraction of the cost.

## Cabinet Refinishing vs. Replacement: The Smart Choice

Many Jacksonville homeowners don't realize that professional cabinet refinishing can achieve the same stunning transformation as brand-new cabinets. Here's how the costs compare for a typical 30-cabinet kitchen:

**Full Cabinet Replacement:** $15,000 - $50,000+
- Includes demolition, new cabinets, installation
- Takes 4-8 weeks with significant kitchen downtime
- May require countertop and flooring modifications

**Professional Cabinet Painting:** $3,500 - $8,000
- Factory-smooth spray finish
- Completed in 3-5 days
- No demolition, no modifications needed
- Same visual transformation

## Our Cabinet Refinishing Process

At Paint-Techs LLC, we've refined our cabinet painting process to deliver results that rival factory finishes. We use professional HVLP spray equipment and specialized cabinet coatings from Sherwin-Williams and Benjamin Moore that are specifically formulated for cabinetry.

Our meticulous preparation process—including TSP cleaning, deglossing, sanding, and bonding primer application—ensures your painted cabinets will resist chipping, peeling, and everyday wear for 10+ years.

## Popular Cabinet Painting Trends in Jacksonville

Jacksonville homeowners are embracing these cabinet color trends:
- **Bright White:** Timeless, clean, and brightens any kitchen
- **Soft Gray:** Modern sophistication that pairs with any countertop
- **Navy Blue:** Bold statement for islands or lower cabinets
- **Sage Green:** Coastal-inspired warmth for beach-area homes
- **Two-Tone:** White uppers with colored lowers for designer appeal`,
    benefits: [
      'Save 50-70% compared to cabinet replacement',
      'Factory-smooth spray finish using HVLP equipment',
      'Specialized cabinet paints that resist chips and scratches',
      'Complete kitchen transformation in 3-5 days',
      'No demolition or countertop modifications required',
      'Unlimited color options including custom matching',
      'Hardware upgrade and soft-close hinge options',
      '10+ year durability with proper care',
    ],
    process: [
      { step: 1, title: 'Free In-Home Assessment', description: 'We evaluate your cabinets\' condition, discuss color options, and provide an exact quote—no surprises.' },
      { step: 2, title: 'Professional Preparation', description: 'Cabinet doors and drawers are carefully removed, labeled, and transported. All surfaces are TSP-cleaned, deglossed, and sanded.' },
      { step: 3, title: 'Bonding Primer Application', description: 'We apply specialized bonding primer designed specifically for cabinetry to ensure maximum paint adhesion.' },
      { step: 4, title: 'HVLP Spray Finishing', description: 'Multiple coats of premium cabinet paint are applied using professional spray equipment for a flawless, factory-smooth finish.' },
      { step: 5, title: 'Reinstallation & Inspection', description: 'Doors and hardware are precisely reinstalled. We conduct a detailed inspection to ensure every cabinet meets our standards.' },
    ],
    faqs: [
      { question: 'How much does cabinet painting cost in Jacksonville?', answer: 'Cabinet painting in Jacksonville typically costs $3,500-$8,000 depending on kitchen size and cabinet count. This is 50-70% less than cabinet replacement, which runs $15,000-$50,000+. We provide free, detailed quotes with no hidden fees.' },
      { question: 'Can any type of cabinet be painted?', answer: 'Yes! We successfully paint wood, MDF, laminate, and thermofoil cabinets. Our specialized primers and preparation techniques ensure proper adhesion on virtually any cabinet surface. We\'ll assess your specific cabinets during our free consultation.' },
      { question: 'How long does cabinet refinishing take?', answer: 'Most kitchen cabinet projects are completed in 3-5 days. We work efficiently while ensuring each coat cures properly. You\'ll have limited kitchen access during the project, but full use of your kitchen within a week.' },
      { question: 'Will painted cabinets hold up to daily use?', answer: 'Absolutely. We use commercial-grade cabinet coatings designed for high-traffic areas. With proper care, professionally painted cabinets last 10-15 years. Our finish resists chips, scratches, and moisture far better than DIY approaches.' },
      { question: 'What\'s the difference between cabinet painting and refinishing?', answer: 'Cabinet painting and cabinet refinishing are often used interchangeably. Both involve applying new finish to existing cabinets. We use the term "refinishing" to emphasize our comprehensive process that includes repair, prep, primer, and multiple finish coats—not just paint over existing finish.' },
    ],
    keywords: ['cabinet painting jacksonville', 'cabinet refinishing jacksonville', 'kitchen cabinet painting', 'cabinet painting cost', 'cabinet refinishing cost', 'kitchen cabinet refinishing', 'painted cabinets jacksonville'],
    metaTitle: 'Cabinet Painting Jacksonville FL | Refinishing from $3,500 | Paint-Techs LLC',
    metaDescription: 'Professional cabinet painting & refinishing in Jacksonville, FL. Save 50-70% vs replacement. Factory-smooth finish, 3-5 day completion. Free quotes: (904) 762-7062',
  },
  {
    id: 'commercial-painting',
    name: 'Commercial Painting',
    slug: 'commercial-painting',
    heroTitle: 'Commercial Painting Services',
    heroSubtitle: 'Professional Painting Solutions for Jacksonville Businesses',
    description: 'Paint-Techs provides professional commercial painting services for offices, retail spaces, restaurants, and industrial facilities throughout Jacksonville and Northeast Florida.',
    image: '/images/commercial/commercial-painting-nocatee-fl-1.webp',
    longDescription: `Your commercial space makes a powerful first impression on clients, customers, and employees. At Paint-Techs LLC, we understand that businesses have unique painting needs, including minimal disruption, strict timelines, and professional results.

Our commercial painting services cover a wide range of properties, from small offices and retail stores to large warehouses and multi-unit complexes. We work flexible hours, including evenings and weekends, to minimize impact on your business operations.

We're equipped to handle specialty coatings for high-traffic areas, epoxy floor coatings, and industry-specific requirements. Our team is fully insured and follows all safety protocols to protect your property, employees, and customers.`,
    benefits: [
      'Flexible scheduling including nights and weekends',
      'Minimal disruption to business operations',
      'Fully insured for commercial projects',
      'Specialty coatings for high-traffic areas',
      'Experienced with various commercial properties',
      'Strict adherence to timelines',
      'Safety compliance and clean work practices',
      'Volume discounts for large projects',
    ],
    process: [
      { step: 1, title: 'Site Evaluation', description: 'We assess your commercial space and discuss requirements, timeline, and any special considerations.' },
      { step: 2, title: 'Detailed Proposal', description: 'Receive a comprehensive proposal with scope of work, timeline, and transparent pricing.' },
      { step: 3, title: 'Scheduling', description: 'We create a schedule that minimizes disruption to your business, including off-hours work if needed.' },
      { step: 4, title: 'Professional Execution', description: 'Our trained crew completes the project efficiently while maintaining a safe, clean work environment.' },
      { step: 5, title: 'Final Walkthrough', description: 'We conduct a thorough inspection with you to ensure complete satisfaction before project completion.' },
    ],
    faqs: [
      { question: 'Can you work outside business hours?', answer: 'Absolutely. We regularly work evenings, nights, and weekends to accommodate business needs and minimize disruption.' },
      { question: 'Do you have experience with my type of business?', answer: 'We\'ve painted offices, retail stores, restaurants, medical facilities, warehouses, and more. We adapt our approach to each industry\'s needs.' },
      { question: 'Are you fully insured?', answer: 'Yes, we carry comprehensive liability insurance and workers\' compensation coverage for all commercial projects.' },
      { question: 'Can you handle large multi-location projects?', answer: 'Yes, we have the capacity and experience to manage multiple locations simultaneously while maintaining quality and consistency.' },
    ],
    keywords: ['commercial painting', 'office painting', 'business painting', 'industrial painting', 'retail painting'],
    metaTitle: 'Commercial Painting Services Jacksonville FL | Paint-Techs LLC',
    metaDescription: 'Professional commercial painting in Jacksonville, FL. Offices, retail, restaurants & industrial. Flexible scheduling, minimal disruption. Get a free estimate!',
  },
];

export const getServiceBySlug = (slug: string): ServiceDetail | undefined => {
  return servicesData.find((service) => service.slug === slug);
};
