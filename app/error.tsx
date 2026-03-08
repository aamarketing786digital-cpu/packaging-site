'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="container text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-brand-primary mb-4">
          Something Went Wrong
        </h1>
        <h2 className="text-xl font-semibold mb-4">Server Error</h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          We apologize for the inconvenience. Our team has been notified and is working to fix the
          issue.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-hover transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-border-subtle text-brand-primary rounded-lg hover:bg-bg-subtle transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  )
}
