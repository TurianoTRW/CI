import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/contacts/:path*",
    "/deals/:path*",
    "/companies/:path*",
    "/activities/:path*",
  ],
};

export default withAuth(
  function middleware(req) {
    // If user is on root path and authenticated, redirect to dashboard
    if (req.nextUrl.pathname === "/" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    
    // If user is on root path and not authenticated, redirect to sign-in
    if (req.nextUrl.pathname === "/" && !req.nextauth.token) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to root path for redirect logic
        if (req.nextUrl.pathname === "/") {
          return true;
        }
        // Require authentication for protected routes
        return !!token;
      },
    },
  }
);

