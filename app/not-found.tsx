import Link from 'next/link'
import { Package } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="container text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary/10 rounded-full mb-6">
          <Package className="w-10 h-10 text-brand-primary" />
        </div>
        <h1 className="text-6xl font-heading font-bold text-brand-primary mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. The page may have been moved or
          deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-hover transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 border border-border-subtle text-brand-primary rounded-lg hover:bg-bg-subtle transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </main>
  )
}
