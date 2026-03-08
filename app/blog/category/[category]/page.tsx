import { getPosts } from '@/lib/sanity'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import BlogGrid from '@/components/blog/BlogGrid'

export const revalidate = 60

interface BlogCategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata(
  { params }: BlogCategoryPageProps
): Promise<Metadata> {
  const { category } = await params

  // Try to find category by matching post categories
  const posts = await getPosts(100)
  const categoryPosts = posts.filter((post: any) =>
    post.categories?.some((cat: any) => cat.slug === category)
  )

  if (categoryPosts.length === 0) {
    return {
      title: 'Category Not Found',
    }
  }

  const categoryName = categoryPosts[0]?.categories?.find((cat: any) => cat.slug === category)?.name || category

  return {
    title: `${categoryName} Articles | NextLevel Packaging Blog`,
    description: `Browse all ${categoryName.toLowerCase()} articles about packaging materials, industry insights, and best practices.`,
  }
}

export async function generateStaticParams() {
  const posts = await getPosts(100)
  const categories = new Set<string>()

  posts.forEach((post: any) => {
    post.categories?.forEach((cat: any) => {
      categories.add(cat.slug)
    })
  })

  return Array.from(categories).map((category) => ({ category }))
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { category } = await params

  const [posts, allPosts] = await Promise.all([
    getPosts(100),
    getPosts(100),
  ])

  // Filter posts by category
  const categoryPosts = posts.filter((post: any) =>
    post.categories?.some((cat: any) => cat.slug === category)
  )

  if (categoryPosts.length === 0) {
    notFound()
  }

  const categoryName = categoryPosts[0]?.categories?.find((cat: any) => cat.slug === category)?.name || category

  // Get all unique categories for sidebar
  const allCategories = new Map<string, { name: string; slug: string; count: number }>()
  allPosts.forEach((post: any) => {
    post.categories?.forEach((cat: any) => {
      const existing = allCategories.get(cat.slug)
      if (existing) {
        existing.count++
      } else {
        allCategories.set(cat.slug, { name: cat.name, slug: cat.slug, count: 1 })
      }
    })
  })

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-bg-subtle border-b border-border-subtle py-12">
        <div className="container">
          <div className="max-w-3xl">
            <nav className="text-sm text-text-secondary mb-4">
              <Link href="/" className="hover:text-text-primary">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-text-primary">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-text-primary">{categoryName}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-primary mb-4">
              {categoryName}
            </h1>
            <p className="text-text-secondary text-lg">
              Browse all articles about {categoryName.toLowerCase()} in the packaging industry.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <BlogGrid posts={categoryPosts} />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-border-subtle p-6 sticky top-24">
              <h3 className="font-heading font-bold text-lg text-brand-primary mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                {Array.from(allCategories.values()).map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/blog/category/${cat.slug}`}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        cat.slug === category
                          ? 'bg-brand-primary text-white'
                          : 'text-text-secondary hover:bg-bg-subtle hover:text-brand-primary'
                      }`}
                    >
                      <span className="text-sm font-medium">{cat.name}</span>
                      <span className={`text-xs ${
                        cat.slug === category ? 'text-white/70' : 'text-text-tertiary'
                      }`}>
                        {cat.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
