interface OrganizationJsonLdProps {
  settings?: {
    name?: string
    phoneNumber?: string
    email?: string
    address?: string
    logo?: string
    socialLinks?: {
      facebook?: string
      instagram?: string
      linkedin?: string
      twitter?: string
    }
  }
}

export default function OrganizationJsonLd({ settings }: OrganizationJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const name = settings?.name || 'NextLevel Packaging UAE'
  const phone = settings?.phoneNumber || '+971500000000'
  const email = settings?.email || 'info@nextlevelpackaging.ae'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: name,
    url: baseUrl,
    logo: settings?.logo || `${baseUrl}/logo.png`,
    description:
      'Leading packaging materials supplier in Dubai, UAE. Corrugated boxes, stretch films, bubble wrap, and more.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: phone,
      contactType: 'sales',
      email: email,
      availableLanguage: 'English',
    },
    address: settings?.address
      ? {
          '@type': 'PostalAddress',
          addressCountry: 'AE',
          addressLocality: 'Dubai',
          streetAddress: settings.address,
        }
      : undefined,
    sameAs: settings?.socialLinks
      ? [
          settings.socialLinks.facebook,
          settings.socialLinks.instagram,
          settings.socialLinks.linkedin,
          settings.socialLinks.twitter,
        ].filter(Boolean)
      : [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
