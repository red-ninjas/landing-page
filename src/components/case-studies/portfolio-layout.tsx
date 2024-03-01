'use client';

import ThemeProvider from '@himalaya-ui/core/use-config/theme-provider';

import { fallbackLng, languages } from '@/i18n/settings';

import { CaseStudyViewItem } from '@/lib/types/case-study-item';
import { PlaceholderRender } from '@/lib/types/placeholder-render';
import { PropsWithChildren } from 'react';
import { PageHeader } from 'src/components/layout/page-header';
import { FooterComponent } from '../layout/footer-component';
import { getThemes } from '../theme';
import PortfolioViewComponent from './portfolio-view-component';

export interface PortfolioLayoutProps {
  lng: string;
  item: PlaceholderRender<CaseStudyViewItem>;
}
export default function PortfolioLayout({
  lng,
  item,
  children,
}: PropsWithChildren<PortfolioLayoutProps>) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const themes = getThemes();

  return (
    <>
      <PageHeader
        routeBack={`/${lng}/case-studies`}
        routeBackTitle={`Case Studies`}
        title={item.title}
        subTitle={item.projectName}
        image={item.headerPicture.url}
        placeholder={item.placeholder}
      ></PageHeader>
      <ThemeProvider themes={themes} themeType="light">
        <PortfolioViewComponent>{children}</PortfolioViewComponent>
      </ThemeProvider>
      <FooterComponent lng={lng}></FooterComponent>
    </>
  );
}
