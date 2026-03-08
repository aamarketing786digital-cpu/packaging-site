'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, LayoutGrid } from 'lucide-react'

interface ProductFiltersProps {
  categories: Array<{
    _id: string
    name: string
    slug: string
  }>
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const pathname = usePathname()

  return (
    <div className="bg-white border border-border-subtle rounded-2xl p-6 md:p-8 sticky top-24 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border-subtle">
        <div className="w-10 h-10 bg-brand-primary/5 rounded-xl flex items-center justify-center text-brand-primary">
          <LayoutGrid className="w-5 h-5" />
        </div>
        <h3 className="font-heading font-bold text-xl text-brand-primary">Categories</h3>
      </div>
      
      <ul className="space-y-2">
        <li>
          <Link
            href="/products"
            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
              pathname === '/products' || pathname === '/products/all'
                ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                : 'text-text-secondary hover:bg-bg-subtle hover:text-brand-primary'
            }`}
          >
            All Products
            {(pathname === '/products' || pathname === '/products/all') && (
              <ChevronRight className="w-4 h-4 ml-2 opacity-70" />
            )}
          </Link>
        </li>
        {categories.map((category) => {
          const isActive = pathname.includes(`/products/${category.slug}`)
          return (
            <li key={category._id}>
              <Link
                href={`/products/${category.slug}`}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 font-medium group ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                    : 'text-text-secondary hover:bg-bg-subtle hover:text-brand-primary'
                }`}
              >
                {category.name}
                <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${isActive ? 'opacity-70' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
