import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    const nextPath = pathname.replace(/^\/studio/, "/atelier") || "/atelier";
    return NextResponse.redirect(new URL(nextPath, request.url));
  }

  if (pathname === "/atelier/connexion") {
    return NextResponse.redirect(new URL("/atelier", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/atelier", "/atelier/:path*", "/studio", "/studio/:path*"],
};
