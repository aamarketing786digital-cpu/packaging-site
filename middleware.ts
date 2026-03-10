import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add the current pathname to headers so root layout can detect studio routes
  const response = NextResponse.next()
  response.headers.set('x-pathname', request.nextUrl.pathname)
  return response
}

export const config = {
  // Run on all routes
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
