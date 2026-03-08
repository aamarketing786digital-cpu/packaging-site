import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 md:gap-2 text-sm font-medium" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isHome = item.label.toLowerCase() === 'home'
        return (
          <div key={index} className="flex items-center gap-1.5 md:gap-2">
            {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-text-tertiary" />}
            
            {item.current ? (
              <span className="text-brand-primary px-2.5 py-1.5 bg-brand-primary/5 rounded-md font-semibold">
                {item.label}
              </span>
            ) : item.href ? (
              <Link
                href={item.href}
                className="text-text-secondary hover:text-brand-primary transition-colors flex items-center gap-1.5 px-1 py-1.5"
              >
                {isHome ? <Home className="w-4 h-4" /> : item.label}
              </Link>
            ) : (
              <span className="text-text-secondary px-1 py-1.5">{item.label}</span>
            )}
          </div>
        )
      })}
    </nav>
  )
}
