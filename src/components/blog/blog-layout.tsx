'use client';

import { fallbackLng, languages } from '@/i18n/settings';

import { useTranslation } from '@/i18n/client';

import { BlogItem } from '@/lib/types/blog-item';
import { PlaceholderRender } from '@/lib/types/placeholder-render';
import { PropsWithChildren } from 'react';
import Moment from 'react-moment';
import BlogViewComponent from 'src/components/blog/blog-view.component';
import { PageHeader } from 'src/components/layout/page-header';
import { FooterComponent } from '../layout/footer-component';
import Avatar from '@himalaya-ui/core/avatar';
import Text from '@himalaya-ui/core/text';
import Box from '@himalaya-ui/core/box';
import LightThemeWrapper from '../layout/light-mode-wrapper';

export interface BlogLayoutProps {
  lng: string;
  item: PlaceholderRender<BlogItem>;
}
export default function BlogLayout({
  lng,
  item,
  children,
}: PropsWithChildren<BlogLayoutProps>) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = useTranslation(lng, 'blog');

  return (
    <>
      <PageHeader
        routeBack={`/${lng}/blog`}
        routeBackTitle={`Blog`}
        title={item.title}
        description={item.description}
        addional={
          <Box style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <Avatar mr={0.5} src={item.author.picture.url}></Avatar>
            <Text>{t('author', { name: item.author.name })}</Text>
            <Text>&nbsp;-&nbsp;</Text>
            <Text>{t('read_time', { minutes: item?.readTime || 0 })}</Text>
            <Text>&nbsp;-&nbsp;</Text>
            <Text>
              <Moment fromNow>{item.createdAt}</Moment>
            </Text>
          </Box>
        }
      ></PageHeader>
      <LightThemeWrapper>
        <BlogViewComponent item={item}>{children}</BlogViewComponent>
      </LightThemeWrapper>
      <FooterComponent lng={lng}></FooterComponent>
    </>
  );
}
