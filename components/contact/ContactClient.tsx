'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'

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
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <main className="min-h-screen bg-bg-base overflow-hidden">
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.02] to-transparent" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />
        
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white border border-border-subtle shadow-sm mb-6"
          >
            <span className="text-sm font-semibold tracking-wide text-brand-primary uppercase">
              24/7 Dedicated Support
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight text-brand-primary mb-6"
          >
            Let's build your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
              perfect package.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Have a question about volume pricing, custom specs, or delivery times? 
            Our team is stationed across the UAE and ready to help.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Bento Contact Methods */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4"
            >
              <h2 className="text-2xl font-heading font-bold text-brand-primary mb-2 sm:col-span-2 lg:col-span-1">
                Direct Channels
              </h2>
              
              {/* WhatsApp Card */}
              {config.whatsappNumber && (
                <motion.a 
                  variants={item}
                  href={`https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white border border-border-subtle rounded-3xl p-6 hover:border-whatsapp/50 hover:shadow-xl hover:shadow-whatsapp/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-whatsapp/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-12 h-12 bg-whatsapp/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6 text-whatsapp" />
                  </div>
                  <h3 className="font-bold text-lg text-brand-primary mb-1">WhatsApp</h3>
                  <p className="text-text-secondary text-sm font-medium mb-4">{config.whatsappNumber}</p>
                  <div className="flex items-center text-whatsapp text-sm font-bold tracking-wide">
                    Live Chat <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              )}

              {/* Email Card */}
              {config.email && (
                <motion.a 
                  variants={item}
                  href={`mailto:${config.email}`}
                  className="group relative bg-white border border-border-subtle rounded-3xl p-6 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-12 h-12 bg-brand-primary/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-brand-primary mb-1">Email Support</h3>
                  <p className="text-text-secondary text-sm font-medium mb-4">{config.email}</p>
                  <div className="flex items-center text-brand-primary text-sm font-bold tracking-wide">
                    Send Message <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              )}

              {/* Phone Card */}
              {config.phoneNumber && (
                <motion.a 
                  variants={item}
                  href={`tel:${config.phoneNumber}`}
                  className="group relative bg-white border border-border-subtle rounded-3xl p-6 hover:border-brand-accent/30 hover:shadow-xl hover:shadow-brand-accent/5 transition-all duration-300 overflow-hidden sm:col-span-2 lg:col-span-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-accent/10 rounded-2xl flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-brand-primary mb-0.5">Call Office</h3>
                      <p className="text-text-secondary text-sm font-medium">{config.phoneNumber}</p>
                    </div>
                  </div>
                </motion.a>
              )}
            </motion.div>

            {/* Address & Map */}
            {config.address && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 bg-white border border-border-subtle rounded-3xl overflow-hidden shadow-sm"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-bg-subtle rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-primary mb-1">Headquarters</h3>
                      <p className="text-text-secondary text-sm leading-relaxed pr-4">
                        {config.address}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Embedded Map */}
                <div className="h-48 w-full bg-bg-subtle">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.51863646105!2d54.89781202499999!3d25.076280100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-border-subtle shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-primary/[0.03] to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-heading font-bold text-brand-primary mb-2">Drop us a line</h2>
                <p className="text-text-secondary mb-10">
                  Fill out the form below and our sales team will get back to you within 2-4 business hours.
                </p>
                <ContactForm />
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  )
}
