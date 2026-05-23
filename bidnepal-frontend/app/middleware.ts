import { NextRequest, NextResponse } from "next/server";

const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password']
const protectedRoutes = ['/bid', '/listing', '/profile',"/setup", "/welcome"]

export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname

    const refreshToken = request.cookies.get("refreshToken")?.value;

    const redirect = (path: string) => {
        return NextResponse.redirect(new URL(path, request.url));

    }

    // Redirection check
    if (refreshToken && authRoutes.some((route) => path.startsWith(route)))
        return redirect('/');

    else if (!refreshToken && protectedRoutes.some((route) => path.startsWith(route)))
       return redirect(`/login?next=${encodeURIComponent(path)}&reason=login_required`);

}

export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password',
        '/verify-email',
        '/bid/:path*',
        '/listing/:path*',
        '/profile/:path*',
        '/setup/:path*',
        '/welcome'
    ]
}