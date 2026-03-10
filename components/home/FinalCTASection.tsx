'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Phone, MessageCircle, Package } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
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

export default function FinalCTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="py-20">
      <div className="container">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="relative bg-gradient-to-br from-brand-primary to-brand-dark rounded-3xl p-12 md:p-20 text-center overflow-hidden shadow-2xl shadow-brand-primary/10"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary/50 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div variants={item} className="mb-6 flex justify-center">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 shadow-inner backdrop-blur-md mb-2">
                <Package className="w-8 h-8 text-brand-accent" />
              </span>
            </motion.div>

            <motion.h2 variants={item} className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight leading-tight">
              Ready to Upgrade Your <br className="hidden md:block"/> Packaging Strategy?
            </motion.h2>

            <motion.p variants={item} className="text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Join hundreds of UAE businesses partnering with NextLevel Packaging.
              Secure competitive wholesale pricing and seamless same-day delivery.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-brand-accent text-white hover:text-white rounded-xl font-bold text-lg shadow-[0_0_40px_rgba(255,107,53,0.3)] hover:shadow-[0_0_60px_rgba(255,107,53,0.5)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                <span>Get Instant Quote</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/5 border-2 border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white hover:text-brand-primary hover:border-white transition-all duration-300 w-full sm:w-auto"
              >
                Browse Catalog
              </Link>
            </motion.div>

            {/* Quick Contact Links */}
            <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.a
                variants={item}
                href="tel:+971500000000"
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-accent transition-all duration-300">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/60 font-medium mb-1 tracking-wider uppercase">Direct Line</p>
                  <p className="text-white font-semibold">+971 50 000 0000</p>
                </div>
              </motion.a>

              <motion.a
                variants={item}
                href="https://wa.me/971500000000"
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-whatsapp/20 hover:border-whatsapp/50 transition-colors backdrop-blur-sm group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-whatsapp transition-all duration-300">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/60 font-medium mb-1 tracking-wider uppercase">WhatsApp</p>
                  <p className="text-white font-semibold">Message Us Now</p>
                </div>
              </motion.a>

              <motion.div
                variants={item}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/60 font-medium mb-1 tracking-wider uppercase">Delivery</p>
                  <p className="text-white font-semibold">Same-Day Dispatch</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
