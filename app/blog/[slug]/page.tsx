import { getPostBySlug, getPosts, getSettings } from '@/lib/sanity'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import PortableTextRenderer from '@/components/blog/PortableTextRenderer'
import Link from 'next/link'
import ArticleJsonLd from '@/components/seo/ArticleJsonLd'

export const revalidate = 60

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.summary,
    keywords: post.seo?.focusKeyword
      ? [post.seo.focusKeyword, 'packaging UAE', 'industry insights']
      : ['packaging UAE', 'industry insights'],
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.summary,
      images: post.mainImage
        ? [urlFor(post.mainImage).width(1200).height(630).url()]
        : [],
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getPosts(100)
  return posts?.map((post: any) => ({
    slug: typeof post.slug === 'string' ? post.slug : post.slug.current
  })) ?? []
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  const [post, allPosts, settings] = await Promise.all([
    getPostBySlug(slug),
    getPosts(4),
    getSettings(),
  ])

  if (!post) {
    notFound()
  }

  // Get related posts (same category, exclude current)
  const relatedPosts = allPosts
    ?.filter((p: any) => p._id !== post._id)
    .slice(0, 3) ?? []

  return (
    <main className="min-h-screen">
      {/* Structured Data */}
      <ArticleJsonLd post={post} settings={settings} />

      {/* Article */}
      <article className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-text-secondary mb-8">
            <Link href="/" className="hover:text-text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-text-primary">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category: any, index: number) => (
                  <Link
                    key={index}
                    href={`/blog/category/${category.slug}`}
                    className="text-sm font-medium text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full hover:bg-brand-primary/20 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-brand-primary">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-text-secondary text-sm">
              <time>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>{Math.ceil(post.content?.length / 1000) || 5} min read</span>
            </div>
          </header>

          {/* Featured Image */}
          {post.mainImage && (
            <figure className="mb-12">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={urlFor(post.mainImage).width(1200).height(675).url()}
                  alt={post.mainImage.alt || post.title}
                  width={1200}
                  height={675}
                  className="object-cover"
                  priority
                />
              </div>
              {post.mainImage.caption && (
                <figcaption className="mt-2 text-center text-sm text-text-secondary">
                  {post.mainImage.caption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Summary */}
          {post.summary && (
            <div className="text-xl text-text-secondary mb-8 leading-relaxed border-l-4 border-brand-accent pl-4 italic">
              {post.summary}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <PortableTextRenderer value={post.content} />
          </div>

          {/* Tags */}
          {post.seo?.focusKeyword && (
            <div className="mt-12 pt-8 border-t border-border-subtle">
              <span className="text-sm text-text-tertiary">Tags: </span>
              <span className="text-sm text-brand-accent">{post.seo.focusKeyword}</span>
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container py-12 border-t border-border-subtle">
          <h2 className="text-2xl font-heading font-bold mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post: any) => (
              <Link
                key={post._id}
                href={`/blog/${typeof post.slug === 'string' ? post.slug : post.slug.current}`}
                className="group"
              >
                <div className="border border-border-subtle rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {post.mainImage && (
                    <div className="aspect-video bg-bg-subtle overflow-hidden">
                      <Image
                        src={urlFor(post.mainImage).width(400).height(225).url()}
                        alt={post.mainImage.alt || post.title}
                        width={400}
                        height={225}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-medium mb-2 group-hover:text-brand-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <time className="text-xs text-text-tertiary">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
