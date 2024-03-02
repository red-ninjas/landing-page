'use client';

import ConfigProvider from '@himalaya-ui/core/config';
import { LayoutProvider } from '@himalaya-ui/core/layout';
import NextStyleRegistry from '@himalaya-ui/core/next/registry';
import { createContext, useState, type PropsWithChildren } from 'react';

import { getThemes } from './theme';
import { ClientLayout } from './layout/client-layout';
import { Gradient } from '@himalaya-ui/core/themes/presets';

export interface ClientProviderContextProps {
  background?: Gradient;
  // eslint-disable-next-line no-unused-vars
  setBackground: (value: Gradient | undefined) => void;
}

export const ClientProviderContext = createContext<ClientProviderContextProps>({
  setBackground: () => {},
});

export interface ClientProviderParams {
  lng: string;
}
export const ClientProvider = ({
  children,
  lng,
}: PropsWithChildren<ClientProviderParams>) => {
  const themes = getThemes();
  const [background, setBackground] = useState<Gradient | undefined>(undefined);

  return (
    <ClientProviderContext.Provider value={{ background, setBackground }}>
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
    </ClientProviderContext.Provider>
  );
};
