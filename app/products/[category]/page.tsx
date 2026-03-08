import { Suspense } from 'react'
import { getProductsByCategory, getCategories } from '@/lib/sanity'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductGrid from '@/components/product/ProductGrid'
import CategoryHero from '@/components/product/CategoryHero'
import ProductFilters from '@/components/product/ProductFilters'

export const revalidate = 3600

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata(
  { params }: CategoryPageProps
): Promise<Metadata> {
  const { category } = await params

  const categories = await getCategories()
  const categoryData = categories.find((c) => c.slug === category)

  if (!categoryData) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${categoryData.name} | Packaging Materials UAE`,
    description: categoryData.description || `Browse our ${categoryData.name} collection`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params

  // Fetch data in parallel
  const [products, categories] = await Promise.all([
    getProductsByCategory(category),
    getCategories(),
  ])

  const categoryData = categories.find((c) => c.slug === category)

  if (!categoryData) {
    notFound()
  }

  // Handle empty state gracefully within the layout
  const hasProducts = products && products.length > 0;

  return (
    <main className="min-h-screen bg-bg-base">
      <CategoryHero 
        name={categoryData.name} 
        description={categoryData.description} 
      />

      {/* Main Content with Sidebar */}
      <section className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters categories={categories} />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {!hasProducts ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-border-subtle shadow-sm">
                <h2 className="text-2xl font-bold font-heading text-brand-primary mb-4">
                  No products in this category yet
                </h2>
                <p className="text-text-secondary mb-8">
                  Check back soon or browse our other categories in the sidebar.
                </p>
              </div>
            ) : (
              <Suspense fallback={<div className="text-center py-16">Loading products...</div>}>
                <ProductGrid products={products} />
              </Suspense>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
