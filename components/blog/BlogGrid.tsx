'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface Post {
  _id: string
  title: string
  slug: string | { current: string }
  summary?: string
  mainImage?: { asset: any; alt?: string }
  publishedAt: string
  categories?: Array<{ name: string; slug: string }>
  featured?: boolean
}

interface BlogGridProps {
  posts: Post[]
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-text-secondary">No blog posts found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link
          key={post._id}
          href={`/blog/${typeof post.slug === 'string' ? post.slug : post.slug.current}`}
          className="group block h-full"
        >
          <article className="group/card bg-white rounded-2xl overflow-hidden border border-border-subtle hover:border-brand-primary/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 h-full flex flex-col relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
            
            {/* Featured badge */}
            {post.featured && (
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-brand-accent text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md backdrop-blur-sm">
                  Featured
                </span>
              </div>
            )}

            {/* Post Image */}
            {post.mainImage ? (
              <div className="aspect-[16/10] bg-bg-subtle overflow-hidden relative border-b border-border-subtle">
                <Image
                  src={urlFor(post.mainImage.asset).width(600).height(375).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out z-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              </div>
            ) : (
              <div className="aspect-[16/10] bg-gradient-to-br from-bg-subtle to-bg-base flex items-center justify-center border-b border-border-subtle relative overflow-hidden group-hover/card:bg-brand-primary/5 transition-colors duration-500">
                <span className="text-sm font-medium text-text-tertiary">No image</span>
              </div>
            )}

            {/* Post Content */}
            <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
              {/* Categories & Date */}
              <div className="flex items-center justify-between mb-4">
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.categories.slice(0, 1).map((category, index) => (
                      <span
                        key={index}
                        className="text-xs font-bold text-brand-accent uppercase tracking-wider"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
                <time className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
              </div>

              {/* Title */}
              <h3 className="text-xl font-heading font-bold mb-3 line-clamp-2 text-brand-primary group-hover/card:text-brand-accent transition-colors leading-tight">
                {post.title}
              </h3>

              {/* Summary */}
              {post.summary && (
                <p className="text-text-secondary text-sm line-clamp-3 mb-6 font-medium leading-relaxed">
                  {post.summary}
                </p>
              )}

              {/* CTA */}
              <div className="mt-auto pt-5 border-t border-border-subtle flex items-center justify-between">
                 <span className="text-sm font-bold text-brand-primary group-hover/card:text-brand-accent transition-colors">
                   Read Article
                 </span>
                 <div className="w-8 h-8 rounded-full bg-brand-primary/5 flex items-center justify-center group-hover/card:bg-brand-accent group-hover/card:text-white transition-all duration-300">
                    <svg className="w-4 h-4 transform group-hover/card:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </div>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}

BlogGrid.Skeleton = function Skeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="border border-border-subtle rounded-lg overflow-hidden">
          <div className="aspect-video bg-bg-subtle animate-pulse" />
          <div className="p-6 space-y-3">
            <div className="h-4 bg-bg-subtle rounded animate-pulse w-20" />
            <div className="h-6 bg-bg-subtle rounded animate-pulse" />
            <div className="h-4 bg-bg-subtle rounded animate-pulse" />
            <div className="h-4 bg-bg-subtle rounded animate-pulse w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}
