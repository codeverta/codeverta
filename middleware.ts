import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEFAULT_LOCALE_PREFIX = "/id";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === DEFAULT_LOCALE_PREFIX ||
    pathname.startsWith(`${DEFAULT_LOCALE_PREFIX}/`)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(DEFAULT_LOCALE_PREFIX, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
