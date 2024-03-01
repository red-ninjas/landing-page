'use client';

import ThemeProvider from '@himalaya-ui/core/use-config/theme-provider';

import { fallbackLng, languages } from '@/i18n/settings';

import { PageItem } from '@/lib/types/page-item';
import { PropsWithChildren } from 'react';
import { PageHeader } from 'src/components/layout/page-header';
import { FooterComponent } from '../layout/footer-component';
import { getThemes } from '../theme';
import PageView from './page-view-component';

export interface PageLayoutProps {
  lng: string;
  item: PageItem;
}
export default function PageLayout({
  lng,
  item,
  children,
}: PropsWithChildren<PageLayoutProps>) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const themes = getThemes();

  return (
    <>
      <PageHeader title={item.title}></PageHeader>
      <ThemeProvider themes={themes} themeType="light">
        <PageView>{children}</PageView>
      </ThemeProvider>
      <FooterComponent lng={lng}></FooterComponent>
    </>
  );
}
