import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Card, Button } from '@/components/ui';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import WhatsAppCTA from '@/components/features/WhatsAppCTA';
import JsonLd from '@/components/seo/JsonLd';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { blogPosts, getBlogPostBySlug, getRecentPosts } from '@/data/blog-posts';
import { BUSINESS_INFO } from '@/lib/constants';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `${BUSINESS_INFO.website}/blog/${slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${BUSINESS_INFO.website}/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentPosts(3).filter((p) => p.slug !== slug);

  return (
    <>
      <JsonLd
        data={generateArticleSchema(
          post.title,
          post.excerpt,
          `${BUSINESS_INFO.website}/blog/${slug}`,
          post.publishedAt,
          post.updatedAt,
          post.author
        )}
      />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BUSINESS_INFO.website },
          { name: 'Blog', url: `${BUSINESS_INFO.website}/blog` },
          { name: post.title, url: `${BUSINESS_INFO.website}/blog/${slug}` },
        ])}
      />

      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      {/* Article Header */}
      <section className="py-12 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                {post.category}
              </span>
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-gray-300">
              {post.excerpt}
            </p>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <div className="prose prose-lg max-w-none prose-headings:text-navy-800 prose-p:text-gray-700 prose-a:text-teal-600 prose-strong:text-navy-800">
                {post.content.split('\n').map((line, index) => {
                  // Handle images
                  const imageMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
                  if (imageMatch) {
                    return (
                      <figure key={index} className="my-8">
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                          <Image
                            src={imageMatch[2]}
                            alt={imageMatch[1]}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <figcaption className="text-center text-sm text-gray-500 mt-2">{imageMatch[1]}</figcaption>
                      </figure>
                    );
                  } else if (line.startsWith('# ')) {
                    return null; // Skip the first H1, already shown in header
                  } else if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold text-navy-800 mt-10 mb-4">{line.slice(3)}</h2>;
                  } else if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-semibold text-navy-800 mt-8 mb-3">{line.slice(4)}</h3>;
                  } else if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={index} className="text-gray-800 font-semibold mt-4 mb-2">{line.slice(2, -2)}</p>;
                  } else if (line.startsWith('- ')) {
                    return <li key={index} className="text-gray-700 ml-4 mb-1">{line.slice(2)}</li>;
                  } else if (line.trim() === '') {
                    return null;
                  } else {
                    return <p key={index} className="text-gray-700 leading-relaxed mb-4">{line}</p>;
                  }
                })}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-navy-800 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    PT
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800">{post.author}</p>
                    <p className="text-gray-600 text-sm">
                      Professional painting tips and advice from the Paint-Techs team in Jacksonville, FL.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0">
                  <h3 className="text-xl font-bold mb-4">Need Professional Help?</h3>
                  <p className="text-teal-100 mb-6">
                    While DIY can be fun, some projects need a professional touch. Get a free quote from Paint-Techs!
                  </p>
                  <Button
                    href="/contact"
                    variant="white"
                    className="w-full"
                  >
                    Get Free Quote
                  </Button>
                </Card>

                {/* Recent Posts */}
                <Card>
                  <h3 className="font-bold text-navy-800 mb-4">Recent Articles</h3>
                  <div className="space-y-4">
                    {recentPosts.map((recentPost) => (
                      <Link
                        key={recentPost.id}
                        href={`/blog/${recentPost.slug}`}
                        className="block group"
                      >
                        <h4 className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors line-clamp-2">
                          {recentPost.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {recentPost.readingTime}
                        </p>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-teal-600 font-medium mt-4 hover:gap-2 transition-all"
                  >
                    View All Articles
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </Card>

                {/* Services */}
                <Card className="bg-gray-50" hover={false}>
                  <h3 className="font-bold text-navy-800 mb-4">Our Services</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/services/interior-painting" className="text-gray-600 hover:text-teal-600 transition-colors">
                        Interior Painting
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/exterior-painting" className="text-gray-600 hover:text-teal-600 transition-colors">
                        Exterior Painting
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/cabinet-painting" className="text-gray-600 hover:text-teal-600 transition-colors">
                        Cabinet Painting
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/commercial-painting" className="text-gray-600 hover:text-teal-600 transition-colors">
                        Commercial Painting
                      </Link>
                    </li>
                  </ul>
                </Card>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <WhatsAppCTA variant="compact" />
    </>
  );
}
