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
  return children
}
