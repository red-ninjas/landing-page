'use client';

import ConfigProvider from '@himalaya-ui/core/config';
import { LayoutProvider } from '@himalaya-ui/core/layout';
import NextStyleRegistry from '@himalaya-ui/core/next/registry';
import type { PropsWithChildren } from 'react';

import { getThemes } from './theme';
import { ClientLayout } from './layout/client-layout';

export interface ClientProviderParams {
  lng: string;
}
export const ClientProvider = ({
  children,
  lng,
}: PropsWithChildren<ClientProviderParams>) => {
  const themes = getThemes();
  return (
    <NextStyleRegistry>
      <ConfigProvider themes={themes} themeType="dark">
        <LayoutProvider
          radius={'9999px'}
          pageWidth={'1200px'}
          pageMargin={'30px'}
          pageWidthWithMargin={'1260px'}
        >
          <ClientLayout lng={lng}>{children}</ClientLayout>
        </LayoutProvider>
      </ConfigProvider>
    </NextStyleRegistry>
  );
};
