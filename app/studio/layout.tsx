import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio | NextLevel Packaging CMS',
  robots: 'noindex, nofollow',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-bg-base text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
