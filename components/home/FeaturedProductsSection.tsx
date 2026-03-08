'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { motion, useInView } from 'framer-motion'
import { Package } from 'lucide-react'

interface Product {
  _id: string
  name: { en: string }
  slug: string | { current: string }
  sku: string
  category?: { name: string; slug: string }
  mainImage?: { asset: any; alt?: string }
  pricing?: { showPrice: boolean; priceFrom?: number; priceTo?: number }
  badges?: Array<{ label: string; color: string }>
}

interface FeaturedProductsSectionProps {
  products: Product[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
}

export default function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Get featured products (up to 6)
  const featuredProducts = products?.slice(0, 6) ?? []

  return (
    <section ref={ref} className="py-20 bg-bg-subtle">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white text-brand-primary text-sm font-semibold tracking-wider uppercase mb-4 border border-border-subtle shadow-sm">
            Featured Products
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-brand-primary tracking-tight">
            Our Bestselling Solutions
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Discover our most popular packaging materials trusted by businesses across the UAE
          </p>
        </motion.div>

        {featuredProducts.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product._id} variants={item}>
                <Link
                  href={`/products/${product.category?.slug || 'all'}/${typeof product.slug === 'string' ? product.slug : product.slug.current}`}
                  className="group block h-full"
                >
                  <div className="group/card bg-white rounded-2xl overflow-hidden border border-border-subtle hover:border-brand-primary/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 h-full flex flex-col">
                    {/* Product Image */}
                    {product.mainImage ? (
                      <div className="aspect-[4/3] bg-bg-subtle overflow-hidden relative border-b border-border-subtle">
                        <Image
                          src={urlFor(product.mainImage.asset).width(600).height(450).url()}
                          alt={product.mainImage.alt || product.name.en}
                          width={600}
                          height={450}
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
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-text-secondary mb-6">No products available yet</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-hover transition-colors"
            >
              View All Products
            </Link>
          </div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-primary border-2 border-brand-primary rounded-xl font-semibold hover:bg-brand-primary hover:text-white transition-all duration-300"
          >
            Browse All Products
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

FeaturedProductsSection.Skeleton = function Skeleton() {
  return (
    <section className="py-20 bg-bg-subtle">
      <div className="container">
        <div className="text-center mb-12">
          <div className="h-6 bg-bg-subtle rounded w-48 mx-auto mb-4 animate-pulse" />
          <div className="h-12 bg-bg-subtle rounded w-96 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-bg-subtle rounded w-64 mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-bg-base rounded-2xl overflow-hidden h-96">
              <div className="aspect-square bg-bg-subtle animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-4 bg-bg-subtle rounded w-20 animate-pulse" />
                <div className="h-6 bg-bg-subtle rounded animate-pulse" />
                <div className="h-4 bg-bg-subtle rounded w-16 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
