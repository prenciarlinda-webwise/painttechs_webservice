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
import { locationsData } from '@/data/locations';
import { BUSINESS_INFO, getWhatsAppLink, getPhoneLink } from '@/lib/constants';

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
    return { title: 'Post Not Found' };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `${BUSINESS_INFO.website}/blog/${slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${BUSINESS_INFO.website}/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      ...(post.featuredImage && { images: [{ url: post.featuredImage, width: 1200, height: 630 }] }),
    },
  };
}

// Extract H2 headings for table of contents
function extractHeadings(content: string): { id: string; text: string }[] {
  return content.split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const text = line.slice(3).trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return { id, text };
    });
}

// Render inline markdown: **bold**, [links](url)
function renderInline(text: string) {
  const parts: (string | React.ReactElement)[] = [];
  // Match bold and links
  const regex = /(\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      // Bold
      parts.push(<strong key={match.index} className="text-navy-800 font-semibold">{match[2]}</strong>);
    } else if (match[3] && match[4]) {
      // Link
      parts.push(
        <Link key={match.index} href={match[4]} className="text-teal-600 hover:text-teal-700 underline decoration-teal-300 hover:decoration-teal-500 transition-colors">
          {match[3]}
        </Link>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentPosts(4).filter((p) => p.slug !== slug).slice(0, 3);
  const headings = extractHeadings(post.content);
  const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const updateDate = new Date(post.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Extract first paragraph as the direct answer
  const contentLines = post.content.split('\n').filter((l) => l.trim() !== '');
  const firstParagraphIndex = contentLines.findIndex((l) => !l.startsWith('#') && !l.startsWith('!') && !l.startsWith('-') && !l.startsWith('**') && l.trim().length > 50);
  const directAnswer = firstParagraphIndex >= 0 ? contentLines[firstParagraphIndex] : post.excerpt;

  // Build content lines for rendering (skip the first H1 and the direct answer paragraph)
  let skippedDirectAnswer = false;
  let insertedMidCTA = false;
  const midpoint = Math.floor(headings.length / 2);
  let h2Count = 0;

  return (
    <>
      <JsonLd
        data={generateArticleSchema(
          post.title,
          post.excerpt,
          `${BUSINESS_INFO.website}/blog/${slug}`,
          post.publishedAt,
          post.updatedAt,
          post.author,
          post.featuredImage,
          post.category,
          post.tags
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
            <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
              <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                {post.category}
              </span>
              <time dateTime={post.publishedAt}>{publishDate}</time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            {/* E-E-A-T: Author attribution */}
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                PT
              </div>
              <div>
                <p className="text-sm font-medium text-white">Written by {post.author}</p>
                <p className="text-xs text-gray-400">
                  {post.publishedAt !== post.updatedAt ? `Updated ${updateDate}` : `Published ${publishDate}`}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Direct Answer Box — Immediately answers the user's query */}
      <section className="bg-teal-50 border-b border-teal-100">
        <Container>
          <div className="max-w-3xl py-6">
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-teal-800 mb-1">Quick Answer</p>
                <p className="text-gray-700 leading-relaxed">{renderInline(directAnswer)}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2">
              {/* E-E-A-T: Company expertise intro */}
              <div className="flex items-start gap-4 p-5 bg-navy-50 border border-navy-100 rounded-xl mb-8">
                <Image
                  src="/images/logo/paint-techs-llc-logo.webp"
                  alt="Paint-Techs LLC Logo"
                  width={48}
                  height={48}
                  className="rounded-lg flex-shrink-0"
                  unoptimized
                />
                <div className="text-sm text-gray-600">
                  <p className="font-semibold text-navy-800 mb-1">Paint-Techs LLC — Jacksonville&apos;s Trusted Painters</p>
                  <p>Licensed & insured painting contractor with {BUSINESS_INFO.aggregateRating.reviewCount} five-star Google reviews. Serving Jacksonville, Nocatee, Ponte Vedra Beach, and Northeast Florida since {BUSINESS_INFO.foundedYear}.</p>
                </div>
              </div>

              {/* Rendered Content */}
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n').map((line, index) => {
                  // Skip H1
                  if (line.startsWith('# ') && !line.startsWith('## ')) return null;

                  // Skip the direct answer paragraph (already shown above)
                  if (!skippedDirectAnswer && line.trim() === directAnswer.trim()) {
                    skippedDirectAnswer = true;
                    return null;
                  }

                  // Images
                  const imageMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
                  if (imageMatch) {
                    return (
                      <figure key={index} className="my-8">
                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-md">
                          <Image src={imageMatch[2]} alt={imageMatch[1]} fill className="object-cover" />
                        </div>
                        {imageMatch[1] && (
                          <figcaption className="text-center text-sm text-gray-500 mt-2">{imageMatch[1]}</figcaption>
                        )}
                      </figure>
                    );
                  }

                  // H2 with anchor ID
                  if (line.startsWith('## ')) {
                    h2Count++;
                    const text = line.slice(3).trim();
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

                    // Insert mid-article CTA after the midpoint H2
                    const showMidCTA = !insertedMidCTA && h2Count > midpoint && midpoint > 0;
                    if (showMidCTA) insertedMidCTA = true;

                    return (
                      <div key={index}>
                        {showMidCTA && (
                          <div className="not-prose my-10 p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white">
                            <h3 className="text-lg font-bold mb-2">Need Help With Your Painting Project?</h3>
                            <p className="text-orange-100 text-sm mb-4">
                              Paint-Techs LLC offers free estimates for all painting services in Jacksonville and Northeast Florida.
                            </p>
                            <div className="flex flex-wrap gap-3">
                              <a
                                href={getWhatsAppLink('Hi! I found your blog post and would like a free painting quote.')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-orange-600 font-semibold rounded-lg text-sm hover:bg-orange-50 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>
                                WhatsApp Us
                              </a>
                              <a
                                href={getPhoneLink()}
                                className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 text-white font-semibold rounded-lg text-sm hover:bg-white/10 transition-colors"
                              >
                                Call {BUSINESS_INFO.phone}
                              </a>
                            </div>
                          </div>
                        )}
                        <h2 id={id} className="text-2xl font-bold text-navy-800 mt-10 mb-4 scroll-mt-24">
                          {text}
                        </h2>
                      </div>
                    );
                  }

                  // H3
                  if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-semibold text-navy-800 mt-8 mb-3">{line.slice(4)}</h3>;
                  }

                  // Bold-only line
                  if (line.startsWith('**') && line.endsWith('**') && !line.includes('](')) {
                    return <p key={index} className="text-navy-800 font-semibold mt-6 mb-2">{line.slice(2, -2)}</p>;
                  }

                  // List items
                  if (line.startsWith('- ')) {
                    return (
                      <li key={index} className="text-gray-700 ml-4 mb-2 leading-relaxed list-disc">
                        {renderInline(line.slice(2))}
                      </li>
                    );
                  }

                  // Horizontal rule (related services separator)
                  if (line.trim() === '---') {
                    return <hr key={index} className="my-8 border-gray-200" />;
                  }

                  // Empty lines
                  if (line.trim() === '') return null;

                  // Paragraphs with inline markdown
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {renderInline(line)}
                    </p>
                  );
                })}
              </div>

              {/* Service Cards — Related services at bottom */}
              <div className="not-prose mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-navy-800 mb-6">Our Painting Services</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Interior Painting', slug: 'interior-painting', desc: 'Walls, ceilings, trim & accent walls' },
                    { name: 'Exterior Painting', slug: 'exterior-painting', desc: 'Weather-resistant coatings for FL homes' },
                    { name: 'Cabinet Painting', slug: 'cabinet-painting', desc: 'Kitchen & bathroom cabinet refinishing' },
                    { name: 'Pool Deck Painting', slug: 'pool-deck-painting-staining', desc: 'Cool-deck coatings & pool deck stain' },
                    { name: 'Commercial Painting', slug: 'commercial-painting', desc: 'Offices, retail & commercial spaces' },
                  ].map((svc) => (
                    <Link
                      key={svc.slug}
                      href={`/${svc.slug}`}
                      className="group flex items-start gap-3 p-4 bg-gray-50 hover:bg-teal-50 rounded-xl border border-gray-100 hover:border-teal-200 transition-all"
                    >
                      <div className="w-10 h-10 bg-teal-100 group-hover:bg-teal-200 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-navy-800 group-hover:text-teal-700 transition-colors">{svc.name}</p>
                        <p className="text-sm text-gray-500">{svc.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Service Area Links — internal-link equity flow from blog to every location page */}
              <div className="not-prose mt-10 p-6 bg-[#fff6ec] rounded-xl border border-orange-100/70">
                <h3 className="text-xl font-bold text-navy-800 mb-2">Painting services in your neighborhood</h3>
                <p className="text-sm text-navy-700/80 mb-4">
                  Paint-Techs LLC works across Duval, St. Johns, Clay, and Nassau counties. Tap the city closest to you for pricing, neighborhood specifics, and recent local projects.
                </p>
                <div className="flex flex-wrap gap-2">
                  {locationsData.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/${loc.slug}-house-painters`}
                      title={`${loc.name} House Painters - Paint-Techs LLC`}
                      className="inline-flex items-center px-3 py-1.5 bg-white text-navy-700 hover:text-orange-600 hover:bg-orange-50 border border-orange-200/60 rounded-full text-sm font-medium transition-colors"
                    >
                      {loc.name}
                    </Link>
                  ))}
                  <Link
                    href="/areas-we-serve"
                    className="inline-flex items-center px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-semibold transition-colors"
                  >
                    All service areas →
                  </Link>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* E-E-A-T: Author Box */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    PT
                  </div>
                  <div>
                    <p className="font-bold text-navy-800">{post.author}</p>
                    <p className="text-sm text-gray-500 mb-2">Paint-Techs LLC — Jacksonville, FL</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Expert painting advice from the Paint-Techs team. We&apos;re a licensed and insured painting contractor serving Jacksonville and Northeast Florida with {BUSINESS_INFO.aggregateRating.reviewCount} five-star Google reviews. Our team combines years of hands-on experience with knowledge of Florida&apos;s unique climate challenges.
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <Link href="/about" className="text-teal-600 hover:text-teal-700 text-sm font-medium">About Us</Link>
                      <Link href="/reviews" className="text-teal-600 hover:text-teal-700 text-sm font-medium">Read Reviews</Link>
                      <Link href="/contact" className="text-teal-600 hover:text-teal-700 text-sm font-medium">Contact</Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                {headings.length > 2 && (
                  <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 className="font-bold text-navy-800 mb-3 text-sm uppercase tracking-wide">In This Article</h3>
                    <nav>
                      <ul className="space-y-2">
                        {headings.map((heading) => (
                          <li key={heading.id}>
                            <a
                              href={`#${heading.id}`}
                              className="text-sm text-gray-600 hover:text-teal-600 transition-colors block leading-snug"
                            >
                              {heading.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}

                {/* Contact CTA */}
                <div className="p-5 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl text-white">
                  <h3 className="text-lg font-bold mb-2">Get a Free Quote</h3>
                  <p className="text-teal-100 text-sm mb-4">
                    Professional painting at fair prices. Free estimates, no obligation.
                  </p>
                  <a
                    href={getWhatsAppLink('Hi! I read your blog and would like a free painting estimate.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-white text-teal-700 font-semibold py-3 px-4 rounded-lg text-sm hover:bg-teal-50 transition-colors mb-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>
                    WhatsApp Us
                  </a>
                  <a
                    href={getPhoneLink()}
                    className="flex items-center justify-center gap-2 w-full border border-white/30 text-white font-semibold py-3 px-4 rounded-lg text-sm hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {BUSINESS_INFO.phone}
                  </a>
                </div>

                {/* Trust Signals */}
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">5.0</span>
                    <span className="text-sm text-gray-500">(50+ reviews)</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Licensed & Insured
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Free Estimates
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Premium Sherwin-Williams Paints
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Evening Estimates Until 10PM
                    </li>
                  </ul>
                </div>

                {/* Recent Posts */}
                <div className="p-5 bg-white rounded-xl border border-gray-100">
                  <h3 className="font-bold text-navy-800 mb-4 text-sm uppercase tracking-wide">Related Articles</h3>
                  <div className="space-y-4">
                    {recentPosts.map((recentPost) => (
                      <Link
                        key={recentPost.id}
                        href={`/blog/${recentPost.slug}`}
                        className="block group"
                      >
                        <h4 className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors text-sm leading-snug line-clamp-2">
                          {recentPost.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">{recentPost.readingTime}</p>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-teal-600 font-medium mt-4 text-sm hover:gap-2 transition-all"
                  >
                    All Articles
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <WhatsAppCTA variant="compact" />
    </>
  );
}
