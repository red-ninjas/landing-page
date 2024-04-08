import '@fontsource-variable/instrument-sans';

import { dir } from 'i18next';

import { languages } from '@/i18n/settings';

import { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { ClientProvider } from '@/components/client-provider';
import { SpeedInsights } from '@vercel/speed-insights/next';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}
export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1.0,
  minimumScale: 1.0,
  height: 'device-height',
};

export async function generateMetadata({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-next-path');
  const href = headersList.get('x-invoke-href');

  console.log(headersList);

  const languages: any = {};

  if (pathname && href) {
    const newLanguage = lng === 'de' ? 'en' : 'de';
    const newPathname = pathname.replace('/' + lng, '/' + newLanguage);

    languages[newLanguage] = newPathname;
  }

  return {
    robots: 'index,follow',
    authors: {
      name: 'RedNinjas LTD, Cyprus',
    },
    alternates: {
      canonical: pathname,
      languages,
    },
    siteName: 'RedNinjas LTD',
    locale: lng,
    metadataBase: new URL('https://redninjas.dev'),
  } as Metadata;
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icon/favicon-16x16.png"
        />
        <link rel="manifest" href="/icon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/icon/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="dark">
        <ClientProvider lng={lng}>{children}</ClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
