import { NextRequest, NextResponse } from 'next/server'

interface RateLimitEntry {
  count: number
  resetTime: number
}

// Simple in-memory rate limit store (for development)
// In production, use Redis or a similar solution
const rateLimitStore = new Map<string, RateLimitEntry>()

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  /** Maximum requests allowed within the window */
  limit: number
  /** Time window in milliseconds */
  window: number
}

/**
 * Default rate limit: 10 requests per minute
 */
const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  limit: 10,
  window: 60 * 1000, // 1 minute
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier for the rate limit (e.g., IP address)
 * @param config - Rate limit configuration
 * @returns Object with `allowed` boolean and remaining requests count
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = DEFAULT_RATE_LIMIT
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  // Clean up expired entries
  if (entry && now > entry.resetTime) {
    rateLimitStore.delete(identifier)
  }

  // Get or create entry
  const currentEntry = rateLimitStore.get(identifier) || {
    count: 0,
    resetTime: now + config.window,
  }

  // Check if limit exceeded
  if (currentEntry.count >= config.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: currentEntry.resetTime,
    }
  }

  // Increment count
  currentEntry.count++
  rateLimitStore.set(identifier, currentEntry)

  return {
    allowed: true,
    remaining: config.limit - currentEntry.count,
    resetTime: currentEntry.resetTime,
  }
}

/**
 * Get client IP address from request
 */
export function getClientIP(request: NextRequest): string {
  // Check various headers for IP address
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  if (realIP) {
    return realIP
  }

  if (cfConnectingIP) {
    return cfConnectingIP
  }

  // Fallback to a generic identifier
  return request.headers.get('user-agent') || 'unknown'
}

/**
 * Rate limit middleware for Next.js API routes
 * @param request - Next.js request object
 * @param config - Rate limit configuration
 * @returns NextResponse if rate limited, null if allowed
 */
export function rateLimitMiddleware(
  request: NextRequest,
  config: RateLimitConfig = DEFAULT_RATE_LIMIT
): NextResponse | null {
  const identifier = getClientIP(request)
  const result = checkRateLimit(identifier, config)

  // Set rate limit headers
  const headers = {
    'X-RateLimit-Limit': config.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
  }

  if (!result.allowed) {
    return NextResponse.json(
      {
        error: 'Too Many Requests',
        message: `Rate limit exceeded. Try again after ${new Date(result.resetTime).toLocaleString()}`,
      },
      {
        status: 429,
        headers,
      }
    )
  }

  return null
}

/**
 * Cleanup expired rate limit entries (call periodically)
 */
export function cleanupExpiredEntries(): void {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

// Cleanup expired entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredEntries, 5 * 60 * 1000)
}
