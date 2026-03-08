import { getSettings } from '@/lib/sanity'
import { Metadata } from 'next'
import ContactClient from '@/components/contact/ContactClient'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact Us | NextLevel Packaging UAE',
    description:
      'Get in touch with NextLevel Packaging for packaging supplies in Dubai, Sharjah, and Ajman. Call, email, or WhatsApp for inquiries.',
    keywords: [
      'contact packaging supplier UAE',
      'packaging materials Dubai contact',
      'wholesale packaging contact',
      'NextLevel Packaging phone',
    ],
  }
}

export default async function ContactPage() {
  const settings = await getSettings()

  return <ContactClient settings={settings} />
}
