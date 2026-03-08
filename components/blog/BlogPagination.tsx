'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Loader2 } from 'lucide-react'

interface BlogPaginationProps {
  totalItems: number
  itemsPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

export default function BlogPagination({
  totalItems,
  itemsPerPage = 6,
  currentPage = 1,
  onPageChange,
  isLoading = false,
}: BlogPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const [localPage, setLocalPage] = useState(currentPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setLocalPage(page)
    onPageChange(page)
  }

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (localPage <= 3) {
        // Show 1, 2, 3, 4, ..., totalPages
        for (let i = 1; i <= Math.min(4, totalPages); i++) {
          pages.push(i)
        }
        if (totalPages > 4) {
          pages.push('ellipsis')
          pages.push(totalPages)
        }
      } else if (localPage >= totalPages - 2) {
        // Show 1, ..., totalPages-3, totalPages-2, totalPages-1, totalPages
        pages.push(1)
        if (totalPages > 4) {
          pages.push('ellipsis')
        }
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Show 1, ..., localPage-1, localPage, localPage+1, ..., totalPages
        pages.push(1)
        if (localPage > 3) {
          pages.push('ellipsis')
        }
        pages.push(localPage - 1)
        pages.push(localPage)
        if (localPage < totalPages - 2) {
          pages.push('ellipsis')
        }
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  if (totalPages <= 1) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center gap-2 mt-12 pt-8 border-t border-border-subtle"
    >
      {/* Previous Button */}
      <motion.button
        onClick={() => handlePageChange(localPage - 1)}
        disabled={localPage === 1 || isLoading}
        className="p-2 rounded-lg border border-border-subtle hover:border-brand-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors group"
        whileHover={{ scale: localPage > 1 ? 1.05 : 1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronDown className="w-5 h-5 transform rotate-90" />
      </motion.button>

      {/* Page Numbers */}
      <div className="hidden sm:flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          const isEllipsis = page === 'ellipsis'
          const isCurrent = page === localPage

          return (
            <motion.button
              key={isEllipsis ? `ellipsis-${index}` : page}
              onClick={() => !isEllipsis && handlePageChange(page as number)}
              disabled={isEllipsis || isCurrent || isLoading}
              className={`min-w-[40px] px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                isCurrent
                  ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                  : 'bg-white text-text-primary border border-border-subtle hover:border-brand-primary/30 hover:text-brand-accent hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
              whileHover={isEllipsis || isCurrent ? {} : { scale: 1.05 }}
              whileTap={isEllipsis || isCurrent ? {} : { scale: 0.95 }}
            >
              {isEllipsis ? '...' : page}
            </motion.button>
          )
        })}
      </div>

      {/* Mobile Page Indicator */}
      <div className="sm:hidden flex items-center gap-2 text-sm text-text-secondary">
        <span>
          Page {localPage} of {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <motion.button
        onClick={() => handlePageChange(localPage + 1)}
        disabled={localPage === totalPages || isLoading}
        className="p-2 rounded-lg border border-border-subtle hover:border-brand-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors group"
        whileHover={localPage < totalPages ? { scale: 1.05 } : {}}
        whileTap={localPage < totalPages ? { scale: 0.95 } : {}}
      >
        <ChevronDown className="w-5 h-5 transform -rotate-[-90deg]" />
        {isLoading && (
          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
        )}
      </motion.button>

      {/* Load More Button (alternative view) */}
      <motion.button
        onClick={() => handlePageChange(localPage + 1)}
        disabled={localPage === totalPages || isLoading}
        className="hidden md:flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold text-sm hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        whileHover={localPage < totalPages ? { scale: 1.02 } : {}}
        whileTap={localPage < totalPages ? { scale: 0.98 } : {}}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading...
          </>
        ) : localPage < totalPages ? (
          <>
            Load More Articles
            <ChevronDown className="w-4 h-4 ml-1 transform -rotate-[-90deg]" />
          </>
        ) : (
          'No more articles'
        )}
      </motion.button>
    </motion.div>
  )
}

// Skeleton loader for pagination
BlogPagination.Skeleton = function Skeleton() {
  return (
    <div className="flex justify-center items-center gap-2 mt-12 pt-8 border-t border-border-subtle">
      <div className="h-10 w-10 bg-bg-subtle rounded-lg animate-pulse" />
      <div className="h-10 w-10 bg-bg-subtle rounded-lg animate-pulse" />
      <div className="h-10 w-10 bg-bg-subtle rounded-lg animate-pulse" />
      <div className="h-10 w-10 bg-bg-subtle rounded-lg animate-pulse" />
      <div className="h-10 w-10 bg-bg-subtle rounded-lg animate-pulse" />
    </div>
  )
}
