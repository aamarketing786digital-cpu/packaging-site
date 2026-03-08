'use client'

import WhatsAppButton from './WhatsAppButton'

interface WhatsAppFloatProps {
  phoneNumber?: string
}

export default function WhatsAppFloat({ phoneNumber }: WhatsAppFloatProps) {
  // Default to a placeholder number - in production this comes from Sanity Settings
  const phone = phoneNumber || '+971500000000'

  return <WhatsAppButton phoneNumber={phone} />
}
