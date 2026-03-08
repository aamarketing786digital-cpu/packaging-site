interface ArticleJsonLdProps {
  post: {
    title: string
    summary?: string
    publishedAt: string
    mainImage?: { asset: any }
    author?: string
  }
  settings?: {
    name?: string
    logo?: string
  }
}

export default function ArticleJsonLd({ post, settings }: ArticleJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const siteName = settings?.name || 'NextLevel Packaging UAE'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    image: post.mainImage
      ? `${baseUrl}${post.mainImage.asset.url}`
      : `${baseUrl}/og-image.png`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: settings?.logo || `${baseUrl}/logo.png`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
