// Customer testimonials and reviews from Google Business Profile

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Freda Bell',
    location: 'Jacksonville, FL',
    rating: 5,
    text: 'Vitor and his staff were VERY thorough and professional from when he first gave his estimate to paint the outside of our home. Vitor carefully explained the comprehensive preparation process they would be going through, used the best materials available.',
    service: 'Exterior Painting',
    date: '2025-12-17',
  },
  {
    id: '2',
    name: 'Cathy Conner',
    location: 'Jacksonville, FL',
    rating: 5,
    text: 'Excellent company and owner. They were dependable, did quality work, used top-grade products, and left our home in much better condition than when they arrived! We will definitely use this company again and highly recommend them.',
    service: 'Exterior Painting',
    date: '2025-12-07',
  },
  {
    id: '3',
    name: 'Sarah Whitfield',
    location: 'Del Webb Ponte Vedra, FL',
    rating: 5,
    text: 'Victor & his team did an outstanding job painting the exterior of our home in Del Webb Ponte Vedra! They are all very polite, thorough, meticulous & clean up well after themselves. This was the third job Victor has done for us in the area and each has been excellent & we have been very pleased! Great work ethic!',
    service: 'Exterior Painting',
    date: '2025-12-07',
  },
  {
    id: '4',
    name: 'Cheryl Kennedy',
    location: 'Jacksonville, FL',
    rating: 5,
    text: 'They were very professional and true craftsmen. Their attention to details was superior. They did excellent prep work: power washing, sanding, hammering loose boards and removing door hardware and coach lights. Then they hand rolled the house and painted all trim twice. Pricing is very fair.',
    service: 'Exterior Painting',
    date: '2025-12-07',
  },
  {
    id: '5',
    name: 'Robert Sadowsky',
    location: 'Jacksonville, FL',
    rating: 5,
    text: 'We recently had our house painted by Paint Techs. Excellent experience with Viktor and his crew. They were very reasonably priced and did an amazing job. Showed up early on day one, explained the process and what to expect and then got to work.',
    service: 'Exterior Painting',
    date: '2025-12-07',
  },
  {
    id: '6',
    name: 'Matt Alexander',
    location: 'Jacksonville, FL',
    rating: 5,
    text: 'They will paint your house like it is their own. Attention to detail and using high end paint at a very reasonable price. I got five other estimates before I chose Paint Techs for exterior house painting. I made the right decision using Vitor and his team.',
    service: 'Exterior Painting',
    date: '2025-11-07',
  },
  {
    id: '7',
    name: 'Erin Trude',
    location: 'Jacksonville, FL',
    rating: 5,
    text: 'Victor and his team did a phenomenal job painting our main living space and kitchen. It was done in a day and it looks amazing! Victor was kind, punctual, reasonable, and trustworthy.',
    service: 'Interior Painting',
    date: '2025-11-07',
  },
  {
    id: '8',
    name: 'Evangeline Cordova',
    location: 'Jacksonville, FL',
    rating: 5,
    text: 'I must say Vitor & his crew came in & got the job done. They were very professional & they did an outstanding job on my bedroom ceiling. Top notch company with professional results. I am a very happy customer, I will be calling Paint-Techs LLC again!',
    service: 'Interior Painting',
    date: '2025-10-07',
  },
  {
    id: '9',
    name: 'Michael R.',
    location: 'Jacksonville Beach, FL',
    rating: 5,
    text: 'We needed our beach house exterior repainted and Paint-Techs exceeded our expectations. They used high-quality, weather-resistant paint that looks beautiful. Great communication throughout the project.',
    service: 'Exterior Painting',
    date: '2025-09-15',
  },
  {
    id: '10',
    name: 'Jennifer L.',
    location: 'Ponte Vedra Beach, FL',
    rating: 5,
    text: 'Our kitchen cabinets look brand new! Paint-Techs transformed our dated oak cabinets into beautiful white ones. The finish is smooth and flawless. Best investment we\'ve made in our home.',
    service: 'Cabinet Painting',
    date: '2025-09-01',
  },
];

// Total reviews on Google (actual count from GMB)
export const TOTAL_GOOGLE_REVIEWS = 50;
export const GOOGLE_RATING = 5.0;

export const getAverageRating = (): number => {
  return GOOGLE_RATING;
};

export const getTestimonialsByService = (service: string): Testimonial[] => {
  return testimonials.filter((t) => t.service === service);
};

export const getFeaturedTestimonials = (count: number = 3): Testimonial[] => {
  return getSortedTestimonials().slice(0, count);
};

// Sort testimonials by date (newest first)
export const getSortedTestimonials = (): Testimonial[] => {
  return [...testimonials].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};
