'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Package } from 'lucide-react'

interface PageLoaderProps {
  isLoading?: boolean
}

/**
 * Modern page transition loader with smooth animation
 * Shows during route transitions and initial page loads
 */
export function PageLoader({ isLoading = false }: PageLoaderProps) {
  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center shadow-xl"
              >
                <Package className="w-10 h-10 text-white" />
              </motion.div>

              {/* Pulsing rings */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-2xl border-2 border-brand-primary/30"
              />
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute inset-0 rounded-2xl border-2 border-brand-accent/20"
              />
            </motion.div>

            {/* Loading dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15
                  }}
                  className="w-2 h-2 rounded-full bg-brand-primary"
                />
              ))}
            </div>

            {/* Brand name */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-semibold text-brand-primary/60 tracking-wider"
            >
              NextLevel Packaging
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Compact inline loader for sections
 */
export function InlineLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center"
        >
          <Package className="w-6 h-6 text-brand-primary" />
        </motion.div>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15
              }}
              className="w-1.5 h-1.5 rounded-full bg-brand-primary"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Skeleton pulse animation overlay
 */
export function SkeletonLoader({
  count = 1,
  height = 'h-4',
  width = 'w-full',
  className = ''
}: {
  count?: number
  height?: string
  width?: string
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
          className={`${height} ${width} rounded bg-bg-subtle`}
        />
      ))}
    </div>
  )
}
