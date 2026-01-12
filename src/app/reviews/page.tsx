import { Metadata } from 'next';
import { Container, Button } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import GoogleReviewsEmbed from '@/components/features/GoogleReviewsEmbed';
import JsonLd from '@/components/seo/JsonLd';
import { generateReviewSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { generateMetadata } from '@/lib/metadata';
import { testimonials, getSortedTestimonials, getAverageRating, TOTAL_GOOGLE_REVIEWS } from '@/data/testimonials';
import { BUSINESS_INFO } from '@/lib/constants';

export const metadata: Metadata = generateMetadata({
  title: 'Customer Reviews - 5-Star Rated Painters Jacksonville FL',
  description: 'Read what Jacksonville homeowners say about Paint-Techs LLC. 5-star rated painting contractor with hundreds of satisfied customers. See our reviews!',
  path: '/reviews',
});

export default function ReviewsPage() {
  const avgRating = getAverageRating();
  const sortedReviews = getSortedTestimonials();

  return (
    <>
      <JsonLd
        data={generateReviewSchema(
          testimonials.map((t) => ({
            name: t.name,
            rating: t.rating,
            text: t.text,
            date: t.date,
          }))
        )}
      />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BUSINESS_INFO.website },
          { name: 'Reviews', url: `${BUSINESS_INFO.website}/reviews` },
        ])}
      />

      <Breadcrumbs items={[{ label: 'Reviews' }]} />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="review-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#review-grid)" />
          </svg>
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 mb-8">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">Trusted by Jacksonville Homeowners</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Real Reviews from
              <span className="block text-orange-400">Real Customers</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              Our commitment to quality speaks through our customers. See why Jacksonville homeowners choose Paint-Techs for their painting projects.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-1">{avgRating}</div>
                <div className="flex justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-400">Google Rating</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-1">{TOTAL_GOOGLE_REVIEWS}+</div>
                <p className="text-sm text-gray-400">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-1">100%</div>
                <p className="text-sm text-gray-400">Satisfaction</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Google Reviews Embed - Modern Design */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <GoogleReviewsEmbed reviews={sortedReviews} />
        </Container>
      </section>

      {/* Leave a Review */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-800 mb-4">
              Had a Great Experience?
            </h2>
            <p className="text-gray-600 mb-6">
              We&apos;d love to hear from you! Your feedback helps us improve and helps other homeowners find quality painting services.
            </p>
            <Button
              href={`${BUSINESS_INFO.links.gmbSearch}`}
              variant="primary"
              external
            >
              Leave a Review on Google
            </Button>
          </div>
        </Container>
      </section>

      <WhatsAppCTA />
    </>
  );
}
