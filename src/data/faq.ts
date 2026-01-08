// FAQ data for FAQ page and schema markup

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  // General Questions
  {
    question: 'How do I get a free quote from Paint-Techs?',
    answer: 'Getting a free quote is easy! Simply click the WhatsApp button on our website to message us directly, or call us at (904) 762-7062. We\'ll schedule a convenient time to visit your property, discuss your project, and provide a detailed, no-obligation estimate.',
    category: 'General',
  },
  {
    question: 'What areas do you serve?',
    answer: 'Paint-Techs LLC serves Jacksonville and the surrounding Northeast Florida areas including Nocatee, Ponte Vedra Beach, Jacksonville Beach, Atlantic Beach, St. Augustine, Fernandina Beach, Middleburg, Orange Park, and Yulee. Contact us to confirm service in your area.',
    category: 'General',
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Yes, Paint-Techs LLC is fully licensed and insured. We carry comprehensive liability insurance and workers\' compensation coverage to protect your property and our team. We\'re happy to provide proof of insurance upon request.',
    category: 'General',
  },
  {
    question: 'What are your business hours?',
    answer: 'We\'re available 7 days a week from 8:00 AM to 10:00 PM. Our extended hours allow us to accommodate busy schedules and provide prompt responses to your inquiries. For commercial projects, we can also work outside regular business hours.',
    category: 'General',
  },
  {
    question: 'Do you offer warranties on your work?',
    answer: 'Yes, we stand behind our work with a satisfaction guarantee. We offer warranties on both materials and workmanship. The specific warranty terms depend on the project type and materials used, which we\'ll discuss during your consultation.',
    category: 'General',
  },

  // Interior Painting
  {
    question: 'How long does interior painting take?',
    answer: 'The timeline depends on the scope of your project. A single room typically takes 1-2 days, while a complete home interior may take 3-7 days. We\'ll provide a detailed timeline during your estimate and keep you informed throughout the project.',
    category: 'Interior Painting',
  },
  {
    question: 'Do I need to move my furniture before you arrive?',
    answer: 'No, we handle all furniture moving and protection. We\'ll carefully move items to the center of each room and cover everything with drop cloths. For large or delicate items, we may discuss special arrangements during your consultation.',
    category: 'Interior Painting',
  },
  {
    question: 'What type of paint do you recommend for interiors?',
    answer: 'We recommend premium paints from Sherwin-Williams, Benjamin Moore, and PPG. The specific finish depends on the room - flat or matte for ceilings, eggshell or satin for walls, and semi-gloss for trim and high-moisture areas like bathrooms and kitchens.',
    category: 'Interior Painting',
  },
  {
    question: 'Can you help me choose paint colors?',
    answer: 'Absolutely! Our experienced team provides color consultation as part of our service. We\'ll consider your home\'s lighting, existing decor, and personal preferences to help you select colors you\'ll love for years to come.',
    category: 'Interior Painting',
  },

  // Exterior Painting
  {
    question: 'How often should I repaint my home\'s exterior?',
    answer: 'In Florida\'s climate, most homes need exterior repainting every 5-7 years. However, factors like sun exposure, paint quality, and proper maintenance can affect this timeline. Signs it\'s time to repaint include fading, chalking, peeling, or cracking paint.',
    category: 'Exterior Painting',
  },
  {
    question: 'What\'s the best time of year to paint exteriors in Florida?',
    answer: 'We can paint exteriors year-round in Florida, but spring and fall typically offer the most ideal conditions with moderate temperatures and lower humidity. We always monitor weather forecasts and will never paint in rain or extreme conditions.',
    category: 'Exterior Painting',
  },
  {
    question: 'Do you power wash before painting?',
    answer: 'Yes, thorough surface preparation is essential for lasting results. We power wash exterior surfaces to remove dirt, mildew, and loose paint. After washing, we allow adequate drying time before applying any primers or paints.',
    category: 'Exterior Painting',
  },
  {
    question: 'How do you protect my landscaping during exterior painting?',
    answer: 'We take great care to protect your landscaping. We use drop cloths, plastic sheeting, and careful application techniques. Plants near the house are covered or gently moved, and we clean up thoroughly each day.',
    category: 'Exterior Painting',
  },

  // Cabinet Painting
  {
    question: 'Is painting cabinets as good as replacing them?',
    answer: 'Professional cabinet painting can achieve stunning results that look brand new at a fraction of the replacement cost. If your cabinets are structurally sound, painting is an excellent option that can save you 50-70% compared to new cabinets.',
    category: 'Cabinet Painting',
  },
  {
    question: 'Can you paint laminate cabinets?',
    answer: 'Yes, with proper preparation, laminate cabinets can be painted successfully. We use specialized primers and paints designed to adhere to laminate surfaces. During your consultation, we\'ll assess your cabinets and recommend the best approach.',
    category: 'Cabinet Painting',
  },
  {
    question: 'How long does cabinet painting take?',
    answer: 'A typical kitchen takes 3-5 days for cabinet painting. This allows time for proper preparation, primer application, multiple paint coats with appropriate drying time, and careful reinstallation of doors and hardware.',
    category: 'Cabinet Painting',
  },
  {
    question: 'Will painted cabinets chip or peel?',
    answer: 'With proper preparation and quality materials, painted cabinets are highly durable. We use specialized cabinet paints formulated to resist chipping, scratching, and everyday wear. Proper surface prep is key to ensuring the finish lasts.',
    category: 'Cabinet Painting',
  },

  // Commercial Painting
  {
    question: 'Can you paint our business without disrupting operations?',
    answer: 'Yes, we specialize in minimizing disruption to businesses. We offer flexible scheduling including evenings, nights, and weekends. We can also work in phases to keep portions of your business operational during the project.',
    category: 'Commercial Painting',
  },
  {
    question: 'Do you have experience with commercial properties?',
    answer: 'Yes, we have extensive experience painting offices, retail spaces, restaurants, medical facilities, warehouses, and more. We understand the unique requirements of commercial projects including compliance, timelines, and professional standards.',
    category: 'Commercial Painting',
  },
  {
    question: 'Can you match our brand colors exactly?',
    answer: 'Absolutely. We can match any brand colors using computerized color matching technology. Whether you have a Pantone number, sample chip, or existing painted surface, we\'ll ensure your brand colors are replicated precisely.',
    category: 'Commercial Painting',
  },

  // Pricing & Payment
  {
    question: 'How do you determine pricing?',
    answer: 'Our pricing is based on several factors including project size, surface condition, paint type, complexity of the work, and accessibility. We provide detailed, transparent quotes with no hidden fees so you know exactly what to expect.',
    category: 'Pricing',
  },
  {
    question: 'Do you require a deposit?',
    answer: 'For most projects, we require a deposit to secure your spot on our schedule and cover initial material costs. The deposit amount and payment schedule will be clearly outlined in your proposal. We accept multiple payment methods.',
    category: 'Pricing',
  },
  {
    question: 'Do you offer financing?',
    answer: 'While we don\'t offer direct financing, we can work with you on payment schedules for larger projects. Contact us to discuss options that fit your budget.',
    category: 'Pricing',
  },
];

export const getFAQsByCategory = (category: string): FAQItem[] => {
  return faqData.filter((faq) => faq.category === category);
};

export const getCategories = (): string[] => {
  return [...new Set(faqData.map((faq) => faq.category))];
};

export const getGeneralFAQs = (): FAQItem[] => {
  return faqData.filter((faq) => faq.category === 'General');
};
