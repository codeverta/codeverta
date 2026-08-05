import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEFAULT_LOCALE_PREFIX = "/id";
const CANONICAL_HOST = "www.codeverta.com";
const PRODUCTION_HOSTS = new Set(["codeverta.com", CANONICAL_HOST]);

export function middleware(request: NextRequest) {
  // Use the standard URL implementation so query mutations are reflected in
  // the redirect target consistently across standalone/proxied deployments.
  const url = new URL(request.url);
  const { pathname } = url;
  const forwardedHost = request.headers.get("x-forwarded-host");
  const hostHeader = forwardedHost || request.headers.get("host");
  const hostname = (hostHeader || url.hostname).split(":")[0].toLowerCase();
  let shouldRedirect = false;

  // Cloudflare Tunnel terminates HTTPS before this request reaches Next.js.
  // Only normalize the public hostname here; forcing the internal HTTP hop to
  // HTTPS causes an infinite redirect loop behind the tunnel.
  if (PRODUCTION_HOSTS.has(hostname)) {
    if (hostname !== CANONICAL_HOST) {
      url.hostname = CANONICAL_HOST;
      url.port = "";
      shouldRedirect = true;
    }
  }

  if (
    pathname === DEFAULT_LOCALE_PREFIX ||
    pathname.startsWith(`${DEFAULT_LOCALE_PREFIX}/`)
  ) {
    url.pathname = pathname.replace(DEFAULT_LOCALE_PREFIX, "") || "/";
    shouldRedirect = true;
  }

  // This legacy parameter is ignored by the page and only creates duplicates.
  if (url.searchParams.has("tag")) {
    url.searchParams.delete("tag");
    shouldRedirect = true;
  }

  // Remove the structured-data template URL previously crawled by Google.
  if (url.searchParams.has("s")) {
    url.searchParams.delete("s");
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    const redirectOrigin = PRODUCTION_HOSTS.has(hostname)
      ? `https://${CANONICAL_HOST}`
      : url.origin;
    const redirectUrl = new URL(url.pathname, redirectOrigin);
    redirectUrl.search = url.searchParams.toString();
    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    { source: "/", locale: false },
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
      locale: false,
    },
  ],
};
