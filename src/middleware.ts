export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/contacts/:path*",
    "/deals/:path*",
    "/companies/:path*",
    "/activities/:path*",
  ],
};

