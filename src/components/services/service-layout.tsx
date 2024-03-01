'use client';

import ThemeProvider from '@himalaya-ui/core/use-config/theme-provider';

import { fallbackLng, languages } from '@/i18n/settings';

import { PlaceholderRender } from '@/lib/types/placeholder-render';
import { ServiceSubItem } from '@/lib/types/service-item';
import { PropsWithChildren } from 'react';
import { PageHeader } from 'src/components/layout/page-header';
import { FooterComponent } from '../layout/footer-component';
import { getThemes } from '../theme';
import ServiceViewComponent from './service-view-component';

export interface ServiceLayoutProps {
  lng: string;
  item: PlaceholderRender<ServiceSubItem>;
}
export default function ServiceLayout({
  lng,
  item,
  children,
}: PropsWithChildren<ServiceLayoutProps>) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const themes = getThemes();

  return (
    <>
      <PageHeader
        routeBack={`/${lng}/case-studies`}
        routeBackTitle={`Case Studies`}
        title={item.seoTitle}
        subTitle={item.title}
        image={item.image?.url}
        video={item.video?.url}
        placeholder={item.placeholder}
      ></PageHeader>
      <ThemeProvider themes={themes} themeType="light">
        <ServiceViewComponent>{children}</ServiceViewComponent>
      </ThemeProvider>
      <FooterComponent lng={lng}></FooterComponent>
    </>
  );
}
