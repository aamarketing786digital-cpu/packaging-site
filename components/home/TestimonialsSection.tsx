'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Ahmed Al Mazrouei',
    company: 'Al Mazrouei Trading LLC',
    text: 'NextLevel Packaging has been our trusted supplier for over 5 years. Their corrugated boxes are of excellent quality and their delivery is always on time. Highly recommended for any UAE business.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    company: 'Dubai Gifts & More',
    text: 'The stretch films we ordered were perfect for our products. The team helped us choose the right thickness and size. Great customer service and competitive pricing!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mohammed Hassan',
    company: 'Fresh Food Suppliers',
    text: 'We depend on reliable packaging for our food products. NextLevel Packaging never disappoints - their bubble wrap and packaging materials are always high quality.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Lisa Chen',
    company: 'E-Commerce Solutions UAE',
    text: 'As an online retailer, we need packaging that looks good and protects products. NextLevel delivers both - our customers love the unboxing experience!',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [[currentIndex, direction], setPage] = useState([0, 0])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const nextTestimonial = () => {
    setPage([(currentIndex + 1) % testimonials.length, 1])
  }

  const prevTestimonial = () => {
    setPage([(currentIndex - 1 + testimonials.length) % testimonials.length, -1])
  }

  const currentTestimonial = testimonials[currentIndex]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring" as const, 
        stiffness: 300, 
        damping: 30
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 }
    })
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-brand-primary to-brand-primary/80">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-brand-accent text-sm font-semibold tracking-wider uppercase mb-4 border border-white/20 backdrop-blur-sm shadow-sm">
            Client Success
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white tracking-tight">
            Trusted by UAE's Best
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            See what hundreds of businesses across Dubai, Sharjah, and Ajman say about our packaging solutions.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto overflow-hidden pb-4 relative min-h-[450px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full"
            >
              <div className="relative bg-white rounded-3xl p-10 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-white/20 h-full flex flex-col justify-between overflow-hidden">
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-primary/[0.03] to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2" />
                
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 w-14 h-14 bg-gradient-to-br from-brand-primary to-brand-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-primary/20 transform -rotate-6">
                  <Quote className="w-7 h-7 text-white" />
                </div>

              {/* Stars */}
              <div className="flex gap-1.5 mb-8">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-brand-accent text-brand-accent drop-shadow-sm"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-2xl md:text-3xl font-heading text-brand-primary mb-10 leading-tight">
                "{currentTestimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-gradient-to-br from-bg-subtle to-bg-base rounded-full border-2 border-white shadow-md flex items-center justify-center">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-brand-primary to-brand-primary/60">
                    {currentTestimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-brand-primary">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-sm font-medium text-brand-accent uppercase tracking-wide">
                    {currentTestimonial.company}
                  </p>
                </div>
              </div>

                {/* Navigation Arrows */}
                <div className="absolute bottom-10 right-10 flex gap-3 z-20">
                  <button
                    onClick={prevTestimonial}
                    className="w-12 h-12 rounded-full bg-bg-base border border-border-subtle flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-12 h-12 rounded-full bg-bg-base border border-border-subtle flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4 z-10 relative">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-brand-accent w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}