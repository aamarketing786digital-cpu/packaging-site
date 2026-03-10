'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, Package, ShoppingCart } from 'lucide-react'

/**
 * Skeleton loader for Product Detail page
 * Provides visual feedback while product data is being fetched
 */
export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Breadcrumb Skeleton */}
      <div className="bg-bg-subtle border-b border-border-subtle">
        <div className="container py-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
              className="w-16 h-4 rounded bg-border-subtle"
            />
            <ChevronLeft className="w-4 h-4 text-border-subtle" />
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
              className="w-24 h-4 rounded bg-border-subtle"
            />
          </div>
        </div>
      </div>

      {/* Back Button Skeleton */}
      <div className="container py-4">
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
          className="w-32 h-10 rounded-lg bg-border-subtle"
        />
      </div>

      {/* Product Main Section */}
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Skeleton */}
          <div className="space-y-4">
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
              className="aspect-square rounded-2xl bg-border-subtle relative overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="w-16 h-16 text-border-strong/30" />
              </div>
            </motion.div>

            {/* Thumbnail Skeletons */}
            <div className="flex gap-3 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                  className="w-20 h-20 rounded-xl bg-border-subtle flex-shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            {/* Category Badge */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
              className="w-24 h-6 rounded-full bg-border-subtle"
            />

            {/* Title */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
              className="w-full h-10 rounded-lg bg-border-subtle"
            />
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
              className="w-3/4 h-10 rounded-lg bg-border-subtle"
            />

            {/* SKU */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
              className="w-32 h-5 rounded bg-border-subtle"
            />

            {/* Divider */}
            <div className="h-px bg-border-subtle" />

            {/* Description */}
            <div className="space-y-3">
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                className="w-full h-4 rounded bg-border-subtle"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                className="w-full h-4 rounded bg-border-subtle"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                className="w-5/6 h-4 rounded bg-border-subtle"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                className="w-4/6 h-4 rounded bg-border-subtle"
              />
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                className="w-40 h-8 rounded-lg bg-border-subtle"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                className="w-24 h-8 rounded-lg bg-border-subtle"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-4">
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                className="flex-1 h-14 rounded-xl bg-border-subtle flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5 text-border-strong/40" />
              </motion.div>
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                className="w-14 h-14 rounded-xl bg-border-subtle"
              />
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-4">
              {['Quality', 'Delivery', 'Support'].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                    className="w-8 h-8 rounded-full bg-border-subtle"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                    className="w-16 h-4 rounded bg-border-subtle"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Section Skeleton */}
      <div className="container mt-12">
        <div className="bg-white rounded-2xl border border-border-subtle overflow-hidden">
          {/* Section Header */}
          <div className="px-6 py-5 border-b border-border-subtle">
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
              className="w-48 h-7 rounded bg-border-subtle"
            />
          </div>

          {/* Spec Items */}
          <div className="divide-y divide-border-subtle">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="grid grid-cols-3 sm:grid-cols-4 px-6 py-4">
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                  className="h-4 rounded bg-border-subtle"
                />
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                  className="col-span-2 sm:col-span-3 h-4 rounded bg-border-subtle"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Section Skeleton */}
      <div className="bg-bg-subtle border-t border-border-subtle py-12 mt-12">
        <div className="container">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
              className="w-64 h-10 rounded-lg bg-border-subtle"
            />
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
              className="w-32 h-10 rounded-lg bg-border-subtle hidden sm:block"
            />
          </div>

          {/* Product Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-border-subtle p-4 flex items-center gap-4 h-full">
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                  className="w-24 h-24 rounded-xl bg-border-subtle flex-shrink-0 flex items-center justify-center"
                >
                  <Package className="w-10 h-10 text-border-strong/30" />
                </motion.div>
                <div className="flex-1 space-y-3">
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                    className="w-16 h-4 rounded bg-border-subtle"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                    className="w-full h-5 rounded bg-border-subtle"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                    className="w-3/4 h-5 rounded bg-border-subtle"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Compact skeleton for product card in grids
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-border-subtle h-full flex flex-col">
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
        className="aspect-[4/3] bg-border-subtle relative flex items-center justify-center"
      >
        <Package className="w-12 h-12 text-border-strong/20" />
      </motion.div>
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
          className="w-16 h-4 rounded bg-border-subtle"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
          className="w-full h-6 rounded bg-border-subtle"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
          className="w-3/4 h-6 rounded bg-border-subtle"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
          className="w-24 h-5 rounded bg-border-subtle mt-auto"
        />
      </div>
    </div>
  )
}
