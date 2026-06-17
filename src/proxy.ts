import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["pt", "en"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "pt";

function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  // Parse the first preferred language tag
  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase().slice(0, 2));

  return (
    (preferred.find((lang) => locales.includes(lang as Locale)) as Locale) ??
    defaultLocale
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already starts with a supported locale
  const hasLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) return NextResponse.next();

  // Redirect to detected locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip _next internals, static files and favicon
    "/((?!_next|favicon.ico|.*\\..*).*)",
  ],
};
