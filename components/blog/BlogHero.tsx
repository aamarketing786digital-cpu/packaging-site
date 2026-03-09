'use client'

import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { getMotionConfig, prefersReducedMotion } from '@/lib/mobile-performance'

export default function BlogHero() {
  const shouldReduce = prefersReducedMotion()

  return (
    <section className="relative bg-bg-base overflow-hidden border-b border-border-subtle pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24">
      {/* Decorative Gradients - Reduce on mobile for performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-subtle to-white" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] rounded-full bg-brand-primary/5 blur-[100px] hidden sm:block" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] rounded-full bg-brand-accent/5 blur-[100px] hidden sm:block" />

      {/* Grid Pattern - Hide on mobile for performance */}
      <div
        className="absolute inset-0 opacity-[0.3] bg-[length:32px_32px] hidden sm:block"
        style={{ backgroundImage: 'radial-gradient(var(--border-subtle) 1px, transparent 1px)' }}
      />

      <div className="container relative z-10 text-center flex flex-col items-center px-4">
        <motion.div
          {...getMotionConfig({
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
          })}
          className="inline-flex flex-shrink-0 items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-border-subtle shadow-sm mb-4 sm:mb-6"
        >
          <FileText className="w-4 h-4 text-brand-accent" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-brand-primary uppercase">
            Resource Center
          </span>
        </motion.div>

        <motion.h1
          {...getMotionConfig({
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: shouldReduce ? 0 : 0.1 },
          })}
          className="text-3xl sm:text-4xl md:text-6xl font-heading font-black text-brand-primary mb-4 sm:mb-6 tracking-tight leading-tight max-w-4xl"
        >
          Insights from the <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
            Packaging Experts
          </span>
        </motion.h1>

        <motion.p
          {...getMotionConfig({
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: shouldReduce ? 0 : 0.2 },
          })}
          className="text-text-secondary text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed px-2"
        >
          Expert advice, industry trends, and strategic guides to help you optimize your supply chain, reduce costs, and protect your products.
        </motion.p>
      </div>
    </section>
  )
}
