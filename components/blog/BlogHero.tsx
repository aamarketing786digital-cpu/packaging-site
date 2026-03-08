'use client'

import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

export default function BlogHero() {
  return (
    <section className="relative bg-bg-base overflow-hidden border-b border-border-subtle pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Decorative Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-subtle to-white" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] rounded-full bg-brand-primary/5 blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] rounded-full bg-brand-accent/5 blur-[100px]" />
      
      {/* Grid Pattern Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.3] bg-[length:32px_32px]" 
        style={{ backgroundImage: 'radial-gradient(var(--border-subtle) 1px, transparent 1px)' }} 
      />

      <div className="container relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex flex-shrink-0 items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border-subtle shadow-sm mb-6"
        >
          <FileText className="w-4 h-4 text-brand-accent" />
          <span className="text-sm font-semibold tracking-wide text-brand-primary uppercase">
            Resource Center
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl font-heading font-black text-brand-primary mb-6 tracking-tight leading-tight max-w-4xl"
        >
          Insights from the <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
            Packaging Experts
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          Expert advice, industry trends, and strategic guides to help you optimize your supply chain, reduce costs, and protect your products.
        </motion.p>
      </div>
    </section>
  )
}
