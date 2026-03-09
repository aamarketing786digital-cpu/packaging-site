import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '@/sanity/env'

// Validate Sanity configuration
if (!projectId) {
  console.warn(
    '\x1b[33m%s\x1b[0m',
    '⚠️  Sanity Project ID not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local\n' +
    'Get your Project ID from: https://www.sanity.io/manage\n' +
    'Using mock data for development.'
  )
}

const config = {
  projectId: projectId || 'mock', // Fallback for development
  dataset,
  apiVersion,
  useCdn: false, // Disable for ISR
  stega: {
    enabled: false,
  },
  token: token || undefined, // Use token for authenticated requests
}

export const client = createClient(config)

/**
 * Check if using mock data (Sanity not configured)
 */
const isUsingMockData = !projectId

/**
 * Helper function to fetch data with caching
 * Uses React.cache() for deduplication per request
 */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown> | undefined,
  tags?: string[]
): Promise<T> {
  if (isUsingMockData) {
    return getMockData<T>(query)
  }

  return client.fetch<T>(query, params || {}, {
    cache: 'force-cache',
    next: {
      tags,
    },
  })
}

/**
 * Mock data for development when Sanity is not configured
 */
function getMockData<T>(query: string): T {
  if (query.includes('post') || query.includes('blog')) {
    // Return mock blog posts
    return [
      {
        _id: 'post1',
        _type: 'post',
        title: '5 Essential Packaging Materials Every UAE Business Needs',
        slug: { current: 'essential-packaging-materials-uae-business' },
        summary: 'Discover the top packaging solutions that help UAE businesses protect their products and impress customers.',
        content: [],
        publishedAt: '2025-01-15T08:00:00Z',
        _updatedAt: '2025-01-15T08:00:00Z',
        featured: true,
        mainImage: null,
        categories: [],
        seo: { metaTitle: 'Essential Packaging Materials UAE', metaDescription: 'Top packaging solutions for UAE businesses' }
      },
      {
        _id: 'post2',
        _type: 'post',
        title: 'How to Choose the Right Corrugated Box for Your Products',
        slug: { current: 'choose-right-corrugated-box' },
        summary: 'A complete guide to selecting the perfect corrugated box based on weight, size, and protection needs.',
        content: [],
        publishedAt: '2025-01-10T08:00:00Z',
        _updatedAt: '2025-01-10T08:00:00Z',
        featured: false,
        mainImage: null,
        categories: [],
        seo: {}
      },
      {
        _id: 'post3',
        _type: 'post',
        title: 'Sustainable Packaging: Trends Shaping the UAE Market in 2025',
        slug: { current: 'sustainable-packaging-trends-uae-2025' },
        summary: 'Explore eco-friendly packaging options that are gaining popularity among environmentally conscious businesses.',
        content: [],
        publishedAt: '2025-01-05T08:00:00Z',
        _updatedAt: '2025-01-05T08:00:00Z',
        featured: true,
        mainImage: null,
        categories: [],
        seo: {}
      },
      {
        _id: 'post4',
        _type: 'post',
        title: 'Stretch Film vs Shrink Wrap: Understanding the Differences',
        slug: { current: 'stretch-film-vs-shrink-wrap-differences' },
        summary: 'Learn about the key differences between these two popular packaging materials and when to use each.',
        content: [],
        publishedAt: '2024-12-20T08:00:00Z',
        _updatedAt: '2024-12-20T08:00:00Z',
        featured: false,
        mainImage: null,
        categories: [],
        seo: {}
      },
      ] as T
  }

  if (query.includes('product')) {
    // Return mock products for development
    return [
      {
        _id: 'prod1',
        _type: 'product',
        name: { en: 'Heavy Duty Corrugated Box' },
        slug: { current: 'heavy-duty-corrugated-box' },
        sku: 'CD-HD-001',
        category: { name: 'Corrugated Boxes', slug: 'corrugated-boxes' },
        description: { en: 'Industrial strength corrugated boxes designed for heavy items. Double wall construction provides extra durability.' },
        specifications: [
          { label: 'Material', value: 'Double Wall Corrugated' },
          { label: 'Size', value: '18x12x6 inches' },
          { label: 'Weight Capacity', value: 'Up to 25kg' },
          { label: 'Certification', value: 'ISO 9001' }
        ],
        images: [{ isPrimary: true, asset: { _ref: 'image-placeholder' } }],
        mainImage: null,
        pricing: { showPrice: false, moq: 50, unit: 'pieces', priceFrom: 0, priceTo: 0 },
        badges: [{ label: 'Best Seller', color: '#FF6B35' }],
        seo: { metaTitle: 'Heavy Duty Corrugated Box | NextLevel Packaging', metaDescription: 'Industrial strength corrugated boxes for heavy items' }
      },
      {
        _id: 'prod2',
        _type: 'product',
        name: { en: 'Stretch Film Roll 500mm' },
        slug: { current: 'stretch-film-roll-500mm' },
        sku: 'SF-500-001',
        category: { name: 'Stretch Films', slug: 'stretch-films' },
        description: { en: 'Premium quality stretch film for pallet wrapping. 500mm width, 23 micron thickness for maximum load stability.' },
        specifications: [
          { label: 'Width', value: '500mm' },
          { label: 'Thickness', value: '23 microns' },
          { label: 'Length', value: '150m' },
          { label: 'Elongation', value: '250%' }
        ],
        images: [{ isPrimary: true, asset: { _ref: 'image-placeholder' } }],
        mainImage: null,
        pricing: { showPrice: true, priceFrom: 45, priceTo: 85, moq: 10, unit: 'rolls' },
        badges: [{ label: 'Popular', color: '#FF6B35' }],
        seo: {}
      },
      {
        _id: 'prod3',
        _type: 'product',
        name: { en: 'Bubble Wrap 100m Roll' },
        slug: { current: 'bubble-wrap-100m' },
        sku: 'BW-100-001',
        category: { name: 'Bubble Wrap', slug: 'bubble-wrap' },
        description: { en: 'Protective bubble wrap for fragile items. 100m roll with small bubbles for optimal protection.' },
        specifications: [
          { label: 'Bubble Size', value: '10mm diameter' },
          { label: 'Roll Length', value: '100m' },
          { label: 'Width', value: '1.2m' },
          { label: 'Perforation', value: 'No' }
        ],
        images: [{ isPrimary: true, asset: { _ref: 'image-placeholder' } }],
        mainImage: null,
        pricing: { showPrice: true, priceFrom: 25, priceTo: 45, moq: 20, unit: 'rolls' },
        badges: [],
        seo: {}
      },
      {
        _id: 'prod4',
        _type: 'product',
        name: { en: 'Clear Packaging Tape' },
        slug: { current: 'clear-packaging-tape' },
        sku: 'PT-CLR-001',
        category: { name: 'Tapes', slug: 'tapes' },
        description: { en: 'Crystal clear packaging tape for professional box sealing. 48mm width, 66m length per roll.' },
        specifications: [
          { label: 'Width', value: '48mm' },
          { label: 'Length', value: '66m' },
          { label: 'Thickness', value: '50 microns' },
          { label: 'Adhesive', value: 'Acrylic' }
        ],
        images: [{ isPrimary: true, asset: { _ref: 'image-placeholder' } }],
        mainImage: null,
        pricing: { showPrice: true, priceFrom: 5, priceTo: 15, moq: 100, unit: 'rolls' },
        badges: [{ label: 'New', color: '#10B981' }],
        seo: {}
      },
      {
        _id: 'prod5',
        _type: 'product',
        name: { en: 'Cardboard Boxes Mailing Box' },
        slug: { current: 'cardboard-mailing-box' },
        sku: 'CB-MB-001',
        category: { name: 'Boxes', slug: 'boxes' },
        description: { en: 'Self-locking mailing boxes made from recycled cardboard. Perfect for e-commerce and subscription boxes.' },
        specifications: [
          { label: 'Size', value: '12x9x4 inches' },
          { label: 'Material', value: 'Recycled Cardboard' },
          { label: 'EFL Rating', value: '32 ECT' },
          { label: 'Closure', value: 'Self-Locking' }
        ],
        images: [{ isPrimary: true, asset: { _ref: 'image-placeholder' } }],
        mainImage: null,
        pricing: { showPrice: true, priceFrom: 8, priceTo: 18, moq: 100, unit: 'pieces' },
        badges: [{ label: 'Eco-Friendly', color: '#10B981' }],
        seo: {}
      },
      {
        _id: 'prod6',
        _type: 'product',
        name: { en: 'Kraft Paper Roll 80gsm' },
        slug: { current: 'kraft-paper-roll-80gsm' },
        sku: 'PP-80-001',
        category: { name: 'Packaging Paper', slug: 'packaging-paper' },
        description: { en: 'Natural brown kraft paper roll for wrapping and interleaving. 80gsm weight, ideal for food packaging.' },
        specifications: [
          { label: 'GSM', value: '80gsm' },
          { label: 'Roll Width', value: '900mm' },
          { label: 'Length', value: '200m' },
          { label: 'Material', value: 'Virgin Kraft' }
        ],
        images: [{ isPrimary: true, asset: { _ref: 'image-placeholder' } }],
        mainImage: null,
        pricing: { showPrice: true, priceFrom: 35, priceTo: 55, moq: 5, unit: 'rolls' },
        badges: [{ label: 'Food Safe', color: '#3B82F6' }],
        seo: {}
      },
    ] as T
  }

  if (query.includes('category')) {
    // Return categories array directly - format matches GROQ projection "slug": slug.current
    return [
      { _id: 'cat1', name: 'Corrugated Boxes', slug: 'corrugated-boxes', order: 1 },
      { _id: 'cat2', name: 'Stretch Films', slug: 'stretch-films', order: 2 },
      { _id: 'cat3', name: 'Bubble Wrap', slug: 'bubble-wrap', order: 3 },
      { _id: 'cat4', name: 'Tapes', slug: 'tapes', order: 4 },
      { _id: 'cat5', name: 'Packaging Paper', slug: 'packaging-paper', order: 5 },
      { _id: 'cat6', name: 'Boxes', slug: 'boxes', order: 6 },
    ] as T
  }

  if (query.includes('blogCategory') || query.includes("'postCategory'")) {
    // Return blog categories
    return [
      { _id: 'bc1', name: 'Packaging Guides', slug: 'packaging-guides' },
      { _id: 'bc2', name: 'Industry Insights', slug: 'industry-insights' },
      { _id: 'bc3', name: 'Sustainability', slug: 'sustainability' },
      { _id: 'bc4', name: 'Product Tips', slug: 'product-tips' },
    ] as T
  }

  if (query.includes('settings')) {
    return {
      whatsappNumber: '+971500000000',
      phoneNumber: '+971500000000',
      email: 'info@nextlevelpackaging.ae',
      address: 'Dubai, UAE',
      socialLinks: {},
      name: 'NextLevel Packaging UAE',
      businessHours: 'Sat - Thu: 9:00 AM - 6:00 PM'
    } as T
  }

  return {} as T
}

/**
 * Get all products with basic projections
 */
export async function getProducts() {
  return sanityFetch<any[]>(
    `*[_type == "product"]{
      _id,
      name,
      "slug": slug.current,
      sku,
      category->{name, "slug": slug.current},
      mainImage,
      pricing,
      badges,
      seo
    }|order(order asc)`
  )
}

/**
 * Get product by slug
 */
export async function getProductBySlug(slug: string) {
  return sanityFetch<any>(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      "slug": slug.current,
      sku,
      category->{name, "slug": slug.current},
      description,
      specifications,
      images[],
      pricing,
      badges,
      seo,
      _createdAt,
      _updatedAt
    }`,
    { slug },
    [`product:${slug}`]
  )
}

/**
 * Get all categories
 */
export async function getCategories() {
  return sanityFetch<any[]>(
    `*[_type == "category"]{
      _id,
      name,
      "slug": slug.current,
      description,
      icon,
      order
    }|order(order asc)`
  )
}

/**
 * Get blog categories
 */
export async function getBlogCategories() {
  return sanityFetch<any[]>(
    `*[_type == "postCategory"]{
      _id,
      name,
      "slug": slug.current
    }|order(name asc)`
  )
}

/**
 * Get products by category slug
 */
export async function getProductsByCategory(categorySlug: string) {
  return sanityFetch<any[]>(
    `*[_type == "product" && category->slug.current == $categorySlug]{
      _id,
      name,
      "slug": slug.current,
      sku,
      category->{name, "slug": slug.current},
      mainImage,
      pricing,
      badges
    }|order(order asc)`,
    { categorySlug },
    ['products', `category:${categorySlug}`]
  )
}

/**
 * Get all blog posts
 */
export async function getPosts(limit = 10) {
  return sanityFetch<any[]>(
    `*[_type == "post"] | order(publishedAt desc)[0...$limit]{
      _id,
      title,
      "slug": slug.current,
      summary,
      mainImage,
      publishedAt,
      categories[]->{name, "slug": slug.current},
      featured,
      seo
    }`,
    { limit },
    ['posts']
  )
}

/**
 * Get post by slug
 */
export async function getPostBySlug(slug: string) {
  return sanityFetch<any>(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      summary,
      content,
      mainImage,
      publishedAt,
      categories[]->{name, "slug": slug.current},
      featured,
      seo,
      _createdAt,
      _updatedAt
    }`,
    { slug },
    [`post:${slug}`]
  )
}

/**
 * Get site settings - STATIC VALUES (not from Sanity)
 * Contact details remain static and can be updated here
 */
export async function getSettings() {
  // Static contact information - update these values directly
  return {
    whatsappNumber: '+971500000000',
    phoneNumber: '+971500000000',
    email: 'info@nextlevelpackaging.ae',
    address: 'Dubai, UAE',
    socialLinks: {
      facebook: 'https://facebook.com/nextlevelpackaging',
      instagram: 'https://instagram.com/nextlevelpackaging',
      linkedin: 'https://linkedin.com/company/nextlevelpackaging',
      twitter: 'https://twitter.com/nextlevelpackaging'
    },
    businessHours: 'Sat - Thu: 9:00 AM - 6:00 PM',
    name: 'NextLevel Packaging UAE'
  }
}
