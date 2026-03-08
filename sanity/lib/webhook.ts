import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

const secret = process.env.SANITY_WEBHOOK_SECRET || ''

/**
 * Verify Sanity webhook signature
 * @param body - Raw request body as string or object
 * @param signature - Signature from x-sanity-webhook-signature header
 * @returns true if signature is valid
 */
export async function verifyWebhookSignature(
  body: string | Record<string, unknown>,
  signature: string
): Promise<boolean> {
  if (!secret) {
    console.error('SANITY_WEBHOOK_SECRET is not configured')
    return false
  }

  const bodyString = typeof body === 'string' ? body : JSON.stringify(body)

  return isValidSignature(bodyString, secret, signature)
}

/**
 * Get signature header name
 */
export const WEBHOOK_SIGNATURE_HEADER = SIGNATURE_HEADER_NAME
