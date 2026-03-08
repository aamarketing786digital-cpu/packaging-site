import { Metadata } from 'next'

import AboutClient from '@/components/about/AboutClient'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About Us | NextLevel Packaging UAE',
    description:
      'Learn about NextLevel Packaging - UAE\'s trusted supplier of quality packaging materials. Serving businesses since 2010.',
    keywords: [
      'about NextLevel Packaging',
      'packaging supplier UAE',
      'wholesale packaging Dubai',
    ],
  }
}

export default function AboutPage() {
  return <AboutClient />
}
