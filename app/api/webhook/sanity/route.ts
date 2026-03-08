import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature, WEBHOOK_SIGNATURE_HEADER } from '@/sanity/lib/webhook'
import { rateLimitMiddleware } from '@/lib/rate-limit'

interface SanityWebhookPayload {
  _id: string
  _type: 'product' | 'post' | 'category' | 'settings'
  slug?: {
    current: string
  }
  operation: 'create' | 'update' | 'delete'
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (20 requests per minute for webhooks)
    const rateLimitResponse = rateLimitMiddleware(request, {
      limit: 20,
      window: 60 * 1000, // 1 minute
    })

    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Get signature from headers
    const signature = request.headers.get(WEBHOOK_SIGNATURE_HEADER)

    if (!signature) {
      console.error('Missing webhook signature')
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Missing signature' },
        { status: 401 }
      )
    }

    // Get raw body for signature verification
    const rawBody = await request.text()

    // Verify signature
    const isValid = await verifyWebhookSignature(rawBody, signature)

    if (!isValid) {
      console.error('Invalid webhook signature')
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Parse payload
    let payload: SanityWebhookPayload
    try {
      payload = JSON.parse(rawBody)
    } catch {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Invalid JSON' },
        { status: 400 }
      )
    }

    console.log('Webhook received:', {
      type: payload._type,
      operation: payload.operation,
      slug: payload.slug?.current,
    })

    // Revalidate based on content type
    const tags: string[] = []

    switch (payload._type) {
      case 'product':
        tags.push('products')
        if (payload.slug?.current) {
          tags.push(`product:${payload.slug.current}`)
        }
        // Product changes affect categories too
        tags.push('categories')
        break

      case 'post':
        tags.push('posts')
        if (payload.slug?.current) {
          tags.push(`post:${payload.slug.current}`)
        }
        break

      case 'category':
        tags.push('categories')
        // Category changes affect products
        tags.push('products')
        if (payload.slug?.current) {
          tags.push(`category:${payload.slug.current}`)
        }
        break

      case 'settings':
        tags.push('settings')
        // Settings affect all pages (header, footer, etc.)
        revalidateTag('products', 'webhook')
        revalidateTag('posts', 'webhook')
        revalidateTag('categories', 'webhook')
        break

      default:
        console.warn('Unknown content type in webhook:', payload._type)
    }

    // Perform revalidation
    for (const tag of tags) {
      revalidateTag(tag, 'webhook')
      console.log('Revalidated tag:', tag)
    }

    return NextResponse.json(
      {
        success: true,
        revalidated: true,
        tags,
        message: 'Cache invalidated successfully',
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'Access-Control-Allow-Origin': process.env.SANITY_WEBHOOK_ORIGIN || '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Sanity-Webhook-Signature',
        },
      }
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Failed to process webhook',
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': process.env.SANITY_WEBHOOK_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Sanity-Webhook-Signature',
    },
  })
}

// Allow POST requests only
export const dynamic = 'force-dynamic'
