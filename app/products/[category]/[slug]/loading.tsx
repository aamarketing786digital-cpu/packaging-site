import ProductDetailSkeleton from '@/components/product/ProductDetailSkeleton'

/**
 * Loading state for product detail page
 * Shown while the server component is fetching data
 */
export default function Loading() {
  return <ProductDetailSkeleton />
}
