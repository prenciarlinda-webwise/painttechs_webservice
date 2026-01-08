'use client';

import { Container, SectionHeading } from '@/components/ui';
import GoogleReviewsEmbed from '@/components/features/GoogleReviewsEmbed';
import { getSortedTestimonials } from '@/data/testimonials';

export default function Testimonials() {
  const sortedReviews = getSortedTestimonials();

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <SectionHeading
          title="What Our Customers Say"
          subtitle="See what Jacksonville homeowners say about us on Google."
        />

        <GoogleReviewsEmbed reviews={sortedReviews} />
      </Container>
    </section>
  );
}
