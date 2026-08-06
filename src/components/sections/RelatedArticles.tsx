import Link from 'next/link';
import { Container, Card } from '@/components/ui';
import { getBlogPostBySlug } from '@/data/blog-posts';

interface RelatedArticlesProps {
  /** Blog post slugs to feature, in display order. Missing slugs are skipped. */
  slugs: string[];
  title?: string;
  subtitle?: string;
  /** Tailwind background utility for the section. */
  background?: string;
}

/**
 * Renders a grid of related blog post cards. Used on service and location pages
 * to pass internal-link authority from commercial pages into the blog cluster.
 * Returns null when none of the slugs resolve, so it is safe to drop anywhere.
 */
export default function RelatedArticles({
  slugs,
  title = 'Painting tips and guides',
  subtitle = 'Helpful reading from the Paint-Techs team before your project.',
  background = 'bg-gray-50',
}: RelatedArticlesProps) {
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post))
    .slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className={`py-16 ${background}`}>
      <Container>
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl font-bold text-navy-800 mb-3">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full group cursor-pointer">
                <span className="inline-block bg-teal-50 text-teal-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
                  {post.category}
                </span>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{post.readingTime}</span>
                </div>

                <h3 className="text-xl font-bold text-navy-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                <span className="inline-flex items-center text-teal-500 font-semibold group-hover:gap-2 transition-all">
                  Read more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
