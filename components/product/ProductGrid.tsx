'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Package } from 'lucide-react'

interface Product {
  _id: string
  name: { en: string }
  slug: string | { current: string }
  sku: string
  category: { name: string; slug: string | { current: string } }
  mainImage?: { asset: any; alt?: string }
  pricing?: { showPrice: boolean; priceFrom?: number; priceTo?: number }
  badges?: Array<{ label: string; color: string }>
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-text-secondary">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
      {products.map((product) => (
        <Link
          key={product._id}
          href={`/products/${typeof product.category.slug === 'string' ? product.category.slug : product.category.slug.current}/${typeof product.slug === 'string' ? product.slug : product.slug.current}`}
          className="group"
        >
          <div className="group/card bg-white rounded-2xl overflow-hidden border border-border-subtle hover:border-brand-primary/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 h-full flex flex-col">
            {/* Product Image */}
            {product.mainImage ? (
              <div className="aspect-[4/3] bg-bg-subtle overflow-hidden relative border-b border-border-subtle">
                <Image
                  src={urlFor(product.mainImage.asset).width(400).height(300).url()}
                  alt={product.mainImage.alt || product.name.en}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full group-hover/card:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Badges */}
                {product.badges && product.badges.length > 0 && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {product.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-xs font-bold text-white rounded-full shadow-md backdrop-blur-sm"
                        style={{ backgroundColor: badge.color }}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
              </div>
            ) : (
              <div className="aspect-[4/3] bg-gradient-to-br from-bg-subtle to-bg-base flex flex-col items-center justify-center border-b border-border-subtle relative overflow-hidden group-hover/card:bg-brand-primary/5 transition-colors duration-500">
                <Package className="w-12 h-12 text-border-strong mb-3 group-hover/card:scale-110 group-hover/card:text-brand-primary/30 transition-all duration-500" />
                <span className="text-sm font-medium text-text-tertiary">Image coming soon</span>
              </div>
            )}

            {/* Product Info */}
            <div className="p-5 sm:p-6 flex flex-col flex-grow">
              {product.category && (
                <p className="text-xs text-brand-accent font-bold mb-3 uppercase tracking-wider">
                  {product.category.name}
                </p>
              )}
              <h3 className="text-xl font-bold mb-3 text-brand-primary group-hover/card:text-brand-accent transition-colors line-clamp-2 leading-tight">
                {product.name.en}
              </h3>
              <p className="text-sm text-text-secondary mb-6 font-medium">SKU: {product.sku}</p>

              <div className="mt-auto">
                {/* CTA */}
                <div className="pt-5 border-t border-border-subtle flex items-center justify-between">
                  <span className="text-sm font-bold text-brand-primary group-hover/card:text-brand-accent transition-colors">
                    View Specifications
                  </span>
                  <div className="w-8 h-8 rounded-full bg-brand-primary/5 flex items-center justify-center group-hover/card:bg-brand-accent group-hover/card:text-white transition-all duration-300">
                     <svg className="w-4 h-4 transform group-hover/card:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

ProductGrid.Skeleton = function Skeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="border border-border-subtle rounded-lg overflow-hidden">
          <div className="aspect-square bg-bg-subtle animate-pulse" />
          <div className="p-4 space-y-2">
            <div className="h-4 bg-bg-subtle rounded animate-pulse" />
            <div className="h-3 bg-bg-subtle rounded w-2/3 animate-pulse" />
            <div className="h-3 bg-bg-subtle rounded w-1/2 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}
