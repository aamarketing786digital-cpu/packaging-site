'use client'

import { motion, useInView } from 'framer-motion'
import { Award, Users, Truck, Shield, Quote, Target, Leaf } from 'lucide-react'
import { useRef } from 'react'

const MotionSection = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function AboutClient() {
  return (
    <main className="min-h-screen bg-bg-base overflow-hidden">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-subtle via-bg-base to-white" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
        <div 
          className="absolute inset-0 opacity-[0.4] bg-[length:24px_24px]" 
          style={{ backgroundImage: 'radial-gradient(var(--border-subtle) 1px, transparent 1px)' }} 
        />
        
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/60 border border-white/80 shadow-sm backdrop-blur-md mb-8"
          >
            <span className="text-sm font-semibold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent">
              Est. 2010 • United Arab Emirates
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-black tracking-tight text-brand-primary mb-8 leading-tight"
          >
            Raising the Standard of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
              Packaging Quality
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            We are more than just suppliers. We are strategic partners providing premium, 
            reliable, and innovative packaging materials to the UAE's most demanding businesses.
          </motion.p>
        </div>
      </section>

      {/* Our Story & Mission */}
      <MotionSection className="container py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            {/* Image Placeholder representing the warehouse/story */}
            <div className="aspect-[4/5] md:aspect-square bg-gradient-to-br from-bg-subtle to-white rounded-3xl border border-border-subtle shadow-xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-brand-primary/0 transition-colors duration-700" />
              {/* Optional: <Image src="..." fill className="object-cover" alt="Our Warehouse" /> */}
              
              <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg transform translate-y-4 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-500">
                <Quote className="w-10 h-10 text-brand-accent mb-4" />
                <p className="text-brand-primary font-heading text-xl font-medium leading-snug">
                  "Our mission is simple: to make sure your products look exceptional and arrive safely, every single time."
                </p>
              </div>
            </div>
            {/* Decorative background shape */}
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/10 to-transparent rounded-[40px] -z-10 blur-2xl opacity-50" />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-brand-accent mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" /> Our Story
              </h2>
              <h3 className="text-4xl font-heading font-bold text-brand-primary">From Local Supplier to Regional Partner</h3>
            </div>
            
            <div className="prose prose-lg text-text-secondary">
              <p>
                Founded in 2010, NextLevel Packaging started with a vision to bridge the gap in the UAE market between affordabilty and premium quality. What began as a small operation in Dubai has steadily grown into a regional powerhouse.
              </p>
              <p>
                As e-commerce, logistics, and retail expanded rapidly across the Emirates, we scaled our operations to meet the demand—without ever compromising on the meticulous standards our early clients loved.
              </p>
              <p>
                Today, we supply thousands of businesses across Dubai, Sharjah, and Ajman. We don't just sell corrugated boxes and stretch films; we optimize our clients' supply chains by ensuring they never run out of the materials that keep their operations moving.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border-subtle">
              <div>
                <div className="text-4xl font-black text-brand-primary font-heading mb-1">10+</div>
                <div className="text-sm font-semibold text-text-secondary uppercase tracking-wide">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-black text-brand-accent font-heading mb-1">5000+</div>
                <div className="text-sm font-semibold text-text-secondary uppercase tracking-wide">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Core Values Bento Grid */}
      <section className="bg-brand-primary py-32 relative overflow-hidden">
        {/* Graphic elements */}
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-accent/20 blur-[120px]" />
        
        <div className="container relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-widest uppercase text-white/60 mb-3">
              Why Choose Us
            </h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-white">
              The NextLevel Advantage
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Uncompromising Quality',
                desc: 'ISO-certified materials ensuring maximum durability and product protection.',
                gradient: 'from-blue-500/20 to-cyan-500/20'
              },
              {
                icon: Truck,
                title: 'Lightning Logistics',
                desc: 'Same-day or next-day delivery across major UAE business hubs.',
                gradient: 'from-brand-accent/20 to-orange-400/20'
              },
              {
                icon: Users,
                title: 'Dedicated Focus',
                desc: 'Personalized account management tailored completely to your business volume.',
                gradient: 'from-emerald-500/20 to-teal-500/20'
              },
              {
                icon: Leaf,
                title: 'Sustainable Options',
                desc: 'Eco-friendly kraft materials and recyclable corrugated solutions.',
                gradient: 'from-green-500/20 to-emerald-500/20'
              }
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 rounded-3xl p-8 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10`} />
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold font-heading text-white mb-3">{value.title}</h4>
                <p className="text-white/70 leading-relaxed text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Certifications */}
      <MotionSection className="container py-24 text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-heading font-bold text-brand-primary mb-4">
            Certified Excellence
          </h2>
          <p className="text-text-secondary text-lg">
            Our commitment to quality is backed by industry certifications and compliance with international standards, guaranteeing safety and reliability.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {[
            { tag: 'ISO 9001:2015', label: 'Quality Management' },
            { tag: 'FSC Certified', label: 'Sustainable Sourcing' },
            { tag: 'REACH Compliant', label: 'EU Safety Standards' }
          ].map((cert, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white px-8 py-6 rounded-2xl border border-border-subtle shadow-sm flex flex-col items-center justify-center min-w-[200px]"
            >
              <Shield className="w-8 h-8 text-brand-accent mb-3 opacity-80" />
              <div className="font-bold text-brand-primary text-xl mb-1">{cert.tag}</div>
              <div className="text-sm text-text-secondary tracking-wide uppercase">{cert.label}</div>
            </motion.div>
          ))}
        </div>
      </MotionSection>

      {/* CTA Layer */}
      <section className="relative container py-24">
        <div className="absolute inset-0 bg-brand-primary/5 rounded-[3rem]" />
        <div className="relative bg-white rounded-[3rem] p-12 md:p-20 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-border-subtle overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-primary to-brand-accent" />
          
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-primary mb-6">
            Ready to upgrade your packaging?
          </h2>
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            Get in touch with our team to discuss bulk orders, custom requirements, and how we can add value to your supply chain.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-brand-primary/25"
          >
            Contact Sales Team
          </a>
        </div>
      </section>
    </main>
  )
}
