'use client'

import { useState } from 'react'
import BlogGrid from './BlogGrid'
import BlogCategoryFilters from './BlogCategoryFilters'

interface BlogPageClientProps {
  posts: any[]
  categories: Array<{ name: string; slug: string }>
}

export default function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Filter posts by category
  const filteredPosts = activeCategory
    ? posts.filter((post) =>
        post.categories?.some((cat: any) => cat.slug === activeCategory)
      )
    : posts

  return (
    <>
      {/* Category Filters */}
      <section className="container py-8">
        <BlogCategoryFilters
          categories={categories}
          activeCategory={activeCategory || undefined}
          onCategoryChange={setActiveCategory}
        />
      </section>

      {/* Blog Posts */}
      <section className="container py-12">
        <BlogGrid posts={filteredPosts} />
      </section>
    </>
  )
}
