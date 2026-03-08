/**
 * WhatsApp message context for generating pre-filled messages
 */
export interface WhatsAppMessageContext {
  productName: string
  sku?: string
  moq?: number
  unit?: string
  quantity?: number
  customMessage?: string
}

/**
 * Generate a WhatsApp URL with a pre-filled message
 * @param context - Message context including product details
 * @param phoneNumber - WhatsApp phone number (format: +971XXXXXXXXX)
 * @returns WhatsApp URL (wa.me)
 */
export function generateWhatsAppUrl(
  context: WhatsAppMessageContext,
  phoneNumber: string
): string {
  let message = ''

  if (context.customMessage) {
    message = context.customMessage
  } else {
    // Default product inquiry message format
    message = `Hi! I'm interested in ordering:\n\n`
    message += `📦 Product: ${context.productName}\n`
    if (context.sku) message += `🏷️ SKU: ${context.sku}\n`
    if (context.quantity) message += `🔢 Quantity: ${context.quantity}\n`
    message += `\nPlease confirm availability and pricing.`
  }

  // Clean phone number - remove any non-digit chars except +
  const cleanPhone = phoneNumber.replace(/[^\d+]/g, '')
  const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+${cleanPhone}`

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message)

  return `https://wa.me/${formattedPhone.replace('+', '')}?text=${encodedMessage}`
}

/**
 * Generate a generic inquiry WhatsApp URL
 * @param phoneNumber - WhatsApp phone number
 * @returns WhatsApp URL
 */
export function generateGenericWhatsAppUrl(phoneNumber: string): string {
  const message = encodeURIComponent('Hi! I have an inquiry about your packaging products.')
  const cleanPhone = phoneNumber.replace(/[^\d+]/g, '')
  const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+${cleanPhone}`

  return `https://wa.me/${formattedPhone.replace('+', '')}?text=${message}`
}
