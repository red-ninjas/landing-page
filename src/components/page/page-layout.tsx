'use client';

import { fallbackLng, languages } from '@/i18n/settings';

import { PageItem } from '@/lib/types/page-item';
import { PropsWithChildren } from 'react';
import { PageHeader } from 'src/components/layout/page-header';
import { FooterComponent } from '../layout/footer-component';
import PageView from './page-view-component';
import LightThemeWrapper from '../layout/light-mode-wrapper';

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

  return (
    <>
      <PageHeader title={item.title}></PageHeader>
      <LightThemeWrapper>
        <PageView>{children}</PageView>
      </LightThemeWrapper>
      <FooterComponent lng={lng}></FooterComponent>
    </>
  );
}
