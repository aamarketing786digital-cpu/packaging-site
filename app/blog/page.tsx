import { getPosts, getBlogCategories } from '@/lib/sanity'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const BlogHero = dynamic(() => import('@/components/blog/BlogHero'), {
  ssr: true,
})

// BlogPageClient is loaded dynamically to avoid blocking hydration
const BlogPageClient = dynamic(() => import('@/components/blog/BlogPageClient'))

export const revalidate = 60 // Revalidate every minute

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Packaging Insights & Industry Guides | NextLevel Packaging Blog',
    description:
      'Expert articles on packaging materials, industry insights, sustainability tips, and product guides from UAE\'s leading packaging supplier.',
      keywords: [
      'packaging blog UAE',
      'packaging industry insights',
      'sustainable packaging guide',
      'corrugated boxes tips',
      'packaging materials best practices',
    ],
  }
}

export default async function BlogPage() {
  const posts = await getPosts(12)
  const categories = await getBlogCategories()

  return (
    <main className="min-h-screen">
      <BlogHero />
      <BlogPageClient posts={posts} categories={categories} />
    </main>
  )
}
