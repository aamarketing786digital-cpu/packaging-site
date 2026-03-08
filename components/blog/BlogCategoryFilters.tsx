'use client'

import { motion } from 'framer-motion'

interface BlogCategoryFiltersProps {
  categories: Array<{ name: string; slug: string }>
  activeCategory?: string
  onCategoryChange: (category: string | null) => void
}

const categoryColors: Record<string, string> = {
  'All': 'bg-brand-primary text-white',
  'default': 'bg-bg-subtle text-brand-primary hover:bg-brand-primary/10',
}

export default function BlogCategoryFilters({ categories, activeCategory, onCategoryChange }: BlogCategoryFiltersProps) {
  const allCategories = ['All', ...categories.map((c) => c.name)]

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {allCategories.map((category) => {
        const isActive = activeCategory === category || (category === 'All' && !activeCategory)
        const categorySlug = category === 'All' ? null : categories.find((c) => c.name === category)?.slug ?? null

        return (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(categorySlug)}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
              isActive
                ? categoryColors[category] || categoryColors.default
                : categoryColors.default
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        )
      })}
    </div>
  )
}
