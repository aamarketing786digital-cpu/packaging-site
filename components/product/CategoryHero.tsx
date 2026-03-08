'use client'

import { motion } from 'framer-motion'
import Breadcrumb from '@/components/ui/Breadcrumb'

interface CategoryHeroProps {
  name: string
  description?: string | null
}

export default function CategoryHero({ name, description }: CategoryHeroProps) {
  return (
    <section className="relative bg-bg-base overflow-hidden border-b border-border-subtle pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Decorative Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-subtle to-white" />
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[100%] rounded-full bg-brand-primary/5 blur-[100px]" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.3] bg-[length:32px_32px]" 
        style={{ backgroundImage: 'radial-gradient(var(--border-subtle) 1px, transparent 1px)' }} 
      />

      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center w-full"
        >
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: name, current: true },
            ]}
          />
        </motion.div>

        <div className="max-w-3xl flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-black text-brand-primary mb-6 tracking-tight leading-tight"
          >
            {name}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-text-secondary text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            {description || `Explore our comprehensive range of high-performance ${name.toLowerCase()} engineered for businesses across Dubai, Sharjah, and Ajman.`}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
