import { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductClient from '@/components/product/ProductClient'

export const revalidate = 3600

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>
}

// Mock data since Sanity is not connected
const mockProduct = {
  _id: 'mock-1',
  name: { en: 'Heavy Duty Double Wall Corrugated Box' },
  slug: { current: 'heavy-duty-double-wall-corrugated-box' },
  sku: 'CD-HD-001',
  category: { name: 'Corrugated Boxes', slug: { current: 'corrugated-boxes' } },
  description: {
    en: 'Our Heavy Duty Double Wall Corrugated Boxes provide exceptional strength and protection for your most demanding shipping and storage needs. Engineered with premium kraft paper, these boxes resist crushing, puncturing, and tearing during transit.\n\nIdeal for industrial parts, heavy electronics, or fragile items requiring extra cushioning. The fluting structure absorbs shocks, making it the perfect choice for e-commerce fulfillment and export shipments across the UAE and globally.',
  },
  pricing: {
    showPrice: true,
    priceFrom: 4.5,
    priceTo: 12.0,
    moq: 500,
    unit: 'Pieces',
  },
  specifications: [
    { label: 'Material', value: 'Double Wall Kraft Corrugated Board' },
    { label: 'Flute Type', value: 'B/C Flute (approx. 7mm thickness)' },
    { label: 'Bursting Strength', value: 'High (ECT Edge Crush Test Certified)' },
    { label: 'Color', value: 'Natural Brown (Custom Printing Available)' },
    { label: 'Recyclability', value: '100% Recyclable & Biodegradable' },
  ],
  badges: [
    { label: 'Best Seller', color: '#ef4444' },
    { label: 'Eco-Friendly', color: '#10b981' },
  ],
  images: [
    { isPrimary: true, alt: 'Heavy Duty Box Front View' },
    { isPrimary: false, alt: 'Box Stacked View' },
    { isPrimary: false, alt: 'Box Thickness Detail' },
  ],
}

const mockSettings = {
  whatsappNumber: '+971xx1234567',
  phoneNumber: '+971 xx 123 4567',
}

const mockRelatedProducts = [
  {
    _id: 'mock-2',
    name: { en: 'Standard Single Wall Box' },
    slug: { current: 'standard-single-wall-box' },
    sku: 'CD-SW-002',
    category: { name: 'Corrugated Boxes', slug: { current: 'corrugated-boxes' } },
    pricing: { showPrice: true, priceFrom: 2.0 },
  },
  {
    _id: 'mock-3',
    name: { en: 'Printed Mailing Box' },
    slug: { current: 'printed-mailing-box' },
    sku: 'MB-PR-001',
    category: { name: 'Mailing Boxes', slug: { current: 'mailing-boxes' } },
    pricing: { showPrice: false },
  },
  {
    _id: 'mock-4',
    name: { en: 'Die-Cut Storage Box' },
    slug: { current: 'die-cut-storage-box' },
    sku: 'DC-ST-003',
    category: { name: 'Storage Solutions', slug: { current: 'storage-solutions' } },
    pricing: { showPrice: true, priceFrom: 5.5 },
  },
]

export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const { slug } = await params
  
  // Format slug to regular title for mock data SEO
  const formattedTitle = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return {
    title: `${formattedTitle} | NextLevel Packaging UAE`,
    description: `Buy premium ${formattedTitle} in Dubai, Sharjah, and Ajman. Best wholesale packaging materials for businesses.`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params

  // Override mock product names based on the URL for realism while testing
  const displayProduct = {
    ...mockProduct,
    name: { en: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') },
    category: { 
      name: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      slug: { current: category }
    }
  }

  return (
    <main className="min-h-screen bg-bg-base">
      {/* Header & Breadcrumbs */}
      <section className="bg-white border-b border-border-subtle pt-20 pb-4 lg:pt-24 lg:pb-6 relative z-10 shadow-sm">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: displayProduct.category.name, href: `/products/${category}` },
              { label: displayProduct.name.en, current: true },
            ]}
          />
        </div>
      </section>

      {/* Main Product Layout (Client Component for Interactivity) */}
      <ProductClient 
        product={displayProduct} 
        settings={mockSettings} 
        relatedProducts={mockRelatedProducts} 
      />
    </main>
  )
}
