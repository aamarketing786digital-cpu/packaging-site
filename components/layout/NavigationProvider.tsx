'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { PageLoader } from './PageLoader'

/**
 * Navigation Provider - Shows PageLoader during route transitions
 * Wraps the app to provide smooth loading states between pages
 */
export default function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const isInitialLoad = useRef(true)
  const previousPathname = useRef(pathname)
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    // Skip showing loader on initial page load
    if (isInitialLoad.current) {
      isInitialLoad.current = false
      previousPathname.current = pathname
      return
    }

    // Only show loader when pathname actually changes
    if (pathname !== previousPathname.current) {
      previousPathname.current = pathname
      setIsLoading(true)

      // Hide loader quickly - page content is already rendered
      timerRef.current = setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [pathname])

  return (
    <>
      <PageLoader isLoading={isLoading} />
      {children}
    </>
  )
}
