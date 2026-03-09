'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'
import { getMotionConfig, prefersReducedMotion, isMobile } from '@/lib/mobile-performance'

type ContactSettings = {
  phoneNumber?: string;
  whatsappNumber?: string;
  email?: string;
  address?: string;
}

const DEFAULT_SETTINGS: ContactSettings = {
  phoneNumber: '+971500000000',
  whatsappNumber: '+971500000000',
  email: 'info@nextlevelpackaging.ae',
  address: 'Dubai, UAE'
}

export default function ContactClient({ settings = {} }: { settings?: ContactSettings }) {
  const config = { ...DEFAULT_SETTINGS, ...settings }
  const shouldReduce = prefersReducedMotion()
  const mobile = isMobile()

  const container = getMotionConfig({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: mobile ? 0 : 0.1 }
    }
  })

  const item = getMotionConfig({
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  })

  return (
    <main className="min-h-screen bg-bg-base overflow-hidden">
      {/* Hero Header */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.02] to-transparent" />
        {/* Reduce blur effects on mobile */}
        <div className={`absolute top-0 right-0 bg-brand-primary/5 rounded-full blur-[100px] ${mobile ? 'w-[300px] h-[300px] -translate-y-1/2 translate-x-1/4' : 'w-[600px] h-[600px] -translate-y-1/2 translate-x-1/3'}`} />
        <div className={`absolute bottom-0 left-0 bg-brand-accent/5 rounded-full blur-[80px] ${mobile ? 'w-[250px] h-[250px] translate-y-1/2 -translate-x-1/4' : 'w-[500px] h-[500px] translate-y-1/2 -translate-x-1/3'}`} />

        <div className="container relative z-10 text-center px-4">
          <motion.div
            {...getMotionConfig({
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
            })}
            className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-white border border-border-subtle shadow-sm mb-4 sm:mb-6"
          >
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-brand-primary uppercase">
              24/7 Dedicated Support
            </span>
          </motion.div>

          <motion.h1
            {...getMotionConfig({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: shouldReduce ? 0 : 0.1 },
            })}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black tracking-tight text-brand-primary mb-4 sm:mb-6"
          >
            Let's build your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
              perfect package.
            </span>
          </motion.h1>

          <motion.p
            {...getMotionConfig({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: shouldReduce ? 0 : 0.2 },
            })}
            className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed px-2"
          >
            Have a question about volume pricing, custom specs, or delivery times?
            Our team is stationed across the UAE and ready to help.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container py-12 sm:py-16 lg:py-20 xl:py-32">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-20">

          {/* Left Column: Bento Contact Methods */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              {...container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: mobile ? "0px" : "-100px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4"
            >
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-brand-primary mb-2 sm:col-span-2 lg:col-span-1">
                Direct Channels
              </h2>

              {/* WhatsApp Card */}
              {config.whatsappNumber && (
                <motion.a
                  {...item}
                  href={`https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white border border-border-subtle rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:border-whatsapp/50 hover:shadow-xl hover:shadow-whatsapp/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-whatsapp/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-whatsapp/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-whatsapp" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-brand-primary mb-1">WhatsApp</h3>
                  <p className="text-text-secondary text-xs sm:text-sm font-medium mb-3 sm:mb-4">{config.whatsappNumber}</p>
                  <div className="flex items-center text-whatsapp text-xs sm:text-sm font-bold tracking-wide">
                    Live Chat <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              )}

              {/* Email Card */}
              {config.email && (
                <motion.a
                  {...item}
                  href={`mailto:${config.email}`}
                  className="group relative bg-white border border-border-subtle rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-brand-primary mb-1">Email</h3>
                  <p className="text-text-secondary text-xs sm:text-sm font-medium mb-3 sm:mb-4 break-all">{config.email}</p>
                  <div className="flex items-center text-brand-primary text-xs sm:text-sm font-bold tracking-wide">
                    Send Message <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              )}

              {/* Phone Card */}
              {config.phoneNumber && (
                <motion.a
                  {...item}
                  href={`tel:${config.phoneNumber}`}
                  className="group relative bg-white border border-border-subtle rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-brand-primary mb-1">Phone</h3>
                  <p className="text-text-secondary text-xs sm:text-sm font-medium mb-3 sm:mb-4">{config.phoneNumber}</p>
                  <div className="flex items-center text-brand-primary text-xs sm:text-sm font-bold tracking-wide">
                    Call Now <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              )}

              {/* Address Card */}
              {config.address && (
                <motion.div
                  {...item}
                  className="group relative bg-white border border-border-subtle rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-brand-primary mb-1">Location</h3>
                  <p className="text-text-secondary text-xs sm:text-sm font-medium">{config.address}</p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              {...getMotionConfig({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: shouldReduce ? 0 : 0.3 },
              })}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
