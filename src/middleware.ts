import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';

import { cookieName, fallbackLng, languages } from '@/i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: [
    '/((?!api|_next/static|_next/image|assets|icon|robots.txt|sitemap.xml|favicon.ico|sw.js).*)',
  ],
};

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.indexOf('icon') > -1 ||
    req.nextUrl.pathname.indexOf('chrome') > -1
  ) {
    return NextResponse.next();
  }

  let lng: string | undefined | null;
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  }
  if (!lng) {
    lng = fallbackLng;
  }

  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-invoke-language', lng);
  requestHeaders.set('x-invoke-next-path', req.nextUrl.pathname);
  requestHeaders.set('x-invoke-href', req.nextUrl.href);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || '');
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    if (lngInReferer) {
      response.cookies.set(cookieName, lngInReferer);
    }
  }

  return response;
}
