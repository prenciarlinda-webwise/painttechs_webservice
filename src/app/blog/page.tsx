import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container, SectionHeading, Card } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import JsonLd from '@/components/seo/JsonLd';
import { generateMetadata } from '@/lib/metadata';
import { generateBlogListSchema } from '@/lib/schema';
import { blogPosts, getBlogCategories } from '@/data/blog-posts';

export const metadata: Metadata = generateMetadata({
  title: 'Painting Tips & Blog - Paint-Techs LLC Jacksonville FL',
  description: 'Expert painting tips, guides, and advice from Jacksonville painting professionals. Learn about color selection, preparation, maintenance, and more.',
  path: '/blog',
});

export default function BlogPage() {
  const categories = getBlogCategories();
  const blogSchemaData = blogPosts.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
  }));

  return (
    <>
      <JsonLd data={generateBlogListSchema(blogSchemaData)} />
      <Breadcrumbs items={[{ label: 'Blog' }]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Painting Tips & <span className="text-teal-400">Expert Advice</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Helpful guides, tips, and insights from our professional painting team. Learn how to get the best results for your home painting projects.
            </p>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <Container>
          <div className="flex flex-wrap gap-3">
            <span className="text-gray-600 font-medium py-2">Categories:</span>
            <button className="px-4 py-2 bg-teal-500 text-white rounded-full font-medium">
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-teal-50 hover:text-teal-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...blogPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full group cursor-pointer p-0 overflow-hidden">
                  {/* Featured Image */}
                  <div className="aspect-[16/9] relative overflow-hidden">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <span className="absolute bottom-4 left-4 bg-white text-teal-600 text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h2 className="text-xl font-bold text-navy-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center text-teal-500 font-semibold group-hover:gap-2 transition-all">
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter/CTA */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-800 mb-4">
              Need Professional Painting Help?
            </h2>
            <p className="text-gray-600 mb-6">
              While our blog provides helpful DIY tips, some projects are best left to professionals. Contact Paint-Techs for expert painting services in Jacksonville.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors"
            >
              Get a Free Quote
            </a>
          </div>
        </Container>
      </section>

      <WhatsAppCTA variant="compact" />
    </>
  );
}
