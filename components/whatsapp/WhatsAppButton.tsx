'use client'

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, MessageSquare } from "lucide-react"
import { RiWhatsappFill } from "react-icons/ri"
import { generateWhatsAppUrl } from '@/lib/whatsapp'

interface WhatsAppButtonProps {
  product?: {
    productName: string
    sku: string
    moq?: number
  }
  phoneNumber: string
  className?: string
  tooltipMessages?: string[]
  initialDelay?: number
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  product,
  phoneNumber,
  className = "",
  tooltipMessages = ["Contact us", "Quote now", "Hi, how can we help you?"],
  initialDelay = 5000,
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [currentTooltipIndex, setCurrentTooltipIndex] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const cycleRef = useRef<boolean>(false)

  // Use our existing URL generator if we have a product context,
  // otherwise just format the phone number for a generic chat link
  const whatsappUrl = product
    ? generateWhatsAppUrl(product, phoneNumber)
    : `https://wa.me/${phoneNumber.replace(/\D/g, "")}`

  // Handle click
  const handleClick = (e: React.MouseEvent) => {
    // We prevent default if placed inside another link, though we shouldn't nest them
    e.stopPropagation()
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  // Function to get random time within range (in ms)
  const getRandomTime = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // Tooltip cycle management
  useEffect(() => {
    // Initial delay before starting the cycle
    const initialTimer = setTimeout(() => {
      cycleRef.current = true
      runTooltipCycle()
    }, initialDelay)

    // Function to run the tooltip show/hide cycle
    function runTooltipCycle() {
      if (!cycleRef.current) return

      // Show tooltip
      setShowTooltip(true)

      // Hide tooltip after 5 seconds
      timerRef.current = setTimeout(() => {
        setShowTooltip(false)

        // Wait 5-8 seconds before showing next message
        const hideTime = getRandomTime(5000, 8000)
        timerRef.current = setTimeout(() => {
          // Move to next message
          setCurrentTooltipIndex((prevIndex) => (prevIndex + 1) % tooltipMessages.length)

          // Show tooltip with next message
          setShowTooltip(true)

          // Hide tooltip after 8-10 seconds
          const showTime = getRandomTime(8000, 10000)
          timerRef.current = setTimeout(() => {
            setShowTooltip(false)

            // Continue the cycle after a short delay
            timerRef.current = setTimeout(runTooltipCycle, 1000)
          }, showTime)
        }, hideTime)
      }, 5000)
    }

    return () => {
      clearTimeout(initialTimer)
      if (timerRef.current) clearTimeout(timerRef.current)
      cycleRef.current = false
    }
  }, [tooltipMessages.length, initialDelay])

  // Handle mouse enter/leave
  const handleMouseEnter = () => {
    // Clear any existing timers to prevent conflicts
    if (timerRef.current) clearTimeout(timerRef.current)
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setShowTooltip(false)
    }, 1000)
  }

  // If the button is rendered inside the product page CTA block, we style it differently
  // based on the className prop passed in.
  // Wait, the new code assumes a fixed positioning layout!
  // Let's adapt it to support BOTH the floating global variant AND the inline block variant.

  const isInline = className.includes('min-w') || className.includes('flex-1');

  if (isInline) {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} flex items-center justify-center gap-2 px-6 py-3 bg-whatsapp text-white hover:text-white rounded-lg hover:bg-whatsapp-hover transition-colors font-medium relative overflow-hidden group`}
      >
        <RiWhatsappFill className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <span>Order via WhatsApp</span>
        {/* Subtle shine effect */}
        <motion.div
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer"
        />
      </a>
    )
  }

  // Otherwise, return the beautifully animated floating version
  return (
    <div className={`fixed right-4 bottom-6 md:right-6 z-50 flex items-end ${className}`}>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="mb-1 md:mb-2 mr-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 py-2 px-3 sm:px-5 sm:py-3 shadow-lg relative"
          >
            <div className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4 text-white" />
              <motion.p
                key={currentTooltipIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="whitespace-nowrap text-xs md:text-sm font-medium text-white"
              >
                {tooltipMessages[currentTooltipIndex]}
              </motion.p>
              <ArrowRight className="ml-2 h-4 w-4 text-white" />
            </div>

            {/* Tooltip arrow - positioned on the right side */}
            <div
              className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 transform bg-emerald-600"
              style={{ right: "-4px" }}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5,
        }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-all hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-whatsapp focus:ring-offset-2 sm:h-16 sm:w-16 group"
          aria-label="Contact us on WhatsApp"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 2,
              repeatDelay: 1,
            }}
          >
            <RiWhatsappFill className="h-8 w-8 fill-white stroke-white sm:h-9 sm:w-9 block group-hover:scale-110 transition-transform" />
          </motion.div>

          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-whatsapp"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 2,
              repeatDelay: 1,
            }}
          />
        </motion.button>
      </motion.div>
    </div>
  )
}

export default WhatsAppButton
