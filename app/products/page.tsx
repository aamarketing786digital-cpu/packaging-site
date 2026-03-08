import { Suspense } from 'react'
import { getProducts, getCategories } from '@/lib/sanity'
import { Metadata } from 'next'
import ProductGrid from '@/components/product/ProductGrid'
import ProductFilters from '@/components/product/ProductFilters'
import ProductsHero from '@/components/product/ProductsHero'

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Packaging Materials Dubai | NextLevel Packaging UAE',
    description:
      'Browse our complete catalog of premium packaging materials including corrugated boxes, stretch films, bubble wrap, and more. Wholesale prices for UAE businesses.',
    keywords: [
      'packaging materials Dubai',
      'corrugated boxes UAE',
      'bubble wrap suppliers',
      'stretch films Dubai',
      'packaging supplies wholesale',
    ],
  }
}

export default async function ProductsPage() {
  // Fetch data in parallel
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <main className="min-h-screen bg-bg-base">
      <ProductsHero />

      {/* Filters and Grid */}
      <section className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters categories={categories} />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <Suspense fallback={<div className="text-center py-16">Loading products...</div>}>
              <ProductGrid products={products} />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}
