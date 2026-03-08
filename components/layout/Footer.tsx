"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ArrowRight, MapPin, Phone, Mail, Instagram, Linkedin, Facebook } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-dark text-white overflow-hidden pt-20 pb-10 border-t border-white/10">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-primary/20 rounded-full blur-[120px] transform -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-4 pr-0 lg:pr-12">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white/10 border border-white/20 shadow-lg flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:bg-brand-accent">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl text-white tracking-tight">
                NextLevel<span className="text-brand-accent">.</span>
              </span>
            </Link>
            <p className="text-white/80 mb-8 leading-relaxed font-light">
              Elevating brands through premium, sustainable packaging solutions across the UAE. Industrial grade protection meets exceptional design.
            </p>
            <div className="flex gap-4">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all duration-300 transform hover:-translate-y-1">
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="font-heading font-semibold mb-6 text-lg text-white">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Products', 'Sustainability', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-white/80 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-brand-accent transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="font-heading font-semibold mb-6 text-lg text-white">Top Categories</h4>
            <ul className="space-y-4">
              {[
                { name: 'Corrugated Boxes', slug: 'corrugated-boxes' },
                { name: 'Stretch Films', slug: 'stretch-films' },
                { name: 'Bubble Wrap', slug: 'bubble-wrap' },
                { name: 'Packaging Tapes', slug: 'tapes' }
              ].map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/products/${cat.slug}`} className="text-sm text-white/80 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-brand-accent transition-colors" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="font-heading font-semibold mb-6 text-lg text-white">Get in Touch</h4>
            <ul className="space-y-4 mb-8">
              <li>
                <a href="tel:+971500000000" className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  +971 50 000 0000
                </a>
              </li>
              <li>
                <a href="mailto:info@nextlevelpackaging.ae" className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  info@nextlevelpackaging.ae
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                Industrial Area 15, Sharjah, UAE
              </li>
            </ul>

            <div className="relative group">
              <input
                type="email"
                placeholder="Join our newsletter"
                className="w-full bg-white/10 border border-white/20 focus:border-brand-accent/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-all"
              />
              <button aria-label="Subscribe" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-accent hover:bg-brand-accent-light rounded-lg flex items-center justify-center text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-normal text-white"
        >
          <p>&copy; {currentYear} NextLevel Packaging LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
