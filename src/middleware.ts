import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    let session = request.cookies.get('Dictionary.Session')?.value
    if (session) {
        console.log('Session cookie is present: ' + session)
    } else {
        console.log('No session cookie')
    }
    
    // return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}