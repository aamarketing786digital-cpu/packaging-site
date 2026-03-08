import { urlFor } from '@/sanity/lib/image'

interface ProductJsonLdProps {
  product: any
  settings?: {
    whatsappNumber?: string
    phoneNumber?: string
  }
}

export default function ProductJsonLd({ product, settings = {} }: ProductJsonLdProps) {
  const phoneNumber = settings?.phoneNumber || '+971500000000'
  const primaryImage = product.images.find((img: any) => img.isPrimary) || product.images[0]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name.en,
    sku: product.sku,
    description: product.description.en,
    image: primaryImage ? urlFor(primaryImage.asset).url() : undefined,
    brand: {
      '@type': 'Brand',
      name: 'NextLevel Packaging',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AED',
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'NextLevel Packaging',
        telephone: phoneNumber,
      },
    },
    ...(product.pricing?.showPrice && product.pricing.priceFrom && {
      priceRange: `${product.pricing.priceFrom} - ${product.pricing.priceTo} AED`,
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
