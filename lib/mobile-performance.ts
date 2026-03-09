/**
 * Mobile Performance Utilities
 * Optimizes animations and interactions for mobile devices
 */

/**
 * Check if the device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/**
 * Check if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if device is low-end (affects animation performance)
 */
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4
  if (cores <= 2) return true

  // Check memory (if available)
  const memory = (navigator as any).deviceMemory
  if (memory && memory <= 2) return true

  // Check if mobile
  if (isMobile()) {
    // Check connection speed
    const connection = (navigator as any).connection
    if (connection && (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
      return true
    }
  }

  return false
}

/**
 * Get animation duration based on device capabilities
 */
export function getAnimationDuration(defaultDuration: number): number {
  if (prefersReducedMotion()) return 0
  if (isLowEndDevice()) return defaultDuration * 0.5
  return defaultDuration
}

/**
 * Get animation config for Framer Motion based on device
 */
export function getMotionConfig(defaultConfig: any = {}) {
  const shouldReduce = prefersReducedMotion() || isLowEndDevice()

  return {
    transition: {
      duration: shouldReduce ? 0 : (defaultConfig.transition?.duration || 0.5),
      ease: defaultConfig.transition?.ease || [0.25, 0.1, 0.25, 1],
    },
    ...defaultConfig,
  }
}

/**
 * Optimized viewport margin for useInView on mobile
 */
export function getViewportMargin(): string {
  return isMobile() ? '0px' : '-100px'
}

/**
 * Check if should lazy load component
 */
export function shouldLazyLoad(componentName: string): boolean {
  // Always lazy load heavy components on mobile
  const heavyComponents = ['BlogHero', 'Testimonials', 'FinalCTASection', 'MapEmbed']
  return isMobile() || heavyComponents.includes(componentName)
}
