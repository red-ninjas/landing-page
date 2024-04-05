'use client';

import { useTranslation } from '@/i18n/client';
import MobileMenu from '@himalaya-ui/core/mobile-menu';
import { useConfig } from '@himalaya-ui/core/use-config';

import { MobileMenuProvider } from '@himalaya-ui/core/use-mobile-menu';
import { PropsWithChildren } from 'react';
import { HeaderComponent } from './header-component';
import NextLink from 'next/link';
export interface ClientLayoutProps {
  lng: string;
}
export const ClientLayout = ({
  children,
  lng,
}: PropsWithChildren<ClientLayoutProps>) => {
  const { layout } = useConfig();
  const { t } = useTranslation(lng, 'home');

  const menuItems = [
    { title: 'Home', url: `/${lng}` },
    { title: t('navigation.services'), url: `/${lng}/services` },
    { title: t('navigation.case-studies'), url: `/${lng}/case-studies` },
    { title: t('navigation.outsourcing'), url: `/${lng}/outsourcing` },
    { title: t('navigation.about-us'), url: `/${lng}/about-us` },
    { title: t('navigation.blog'), url: `/${lng}/blog` },
    { title: t('navigation.contact-us'), url: `/${lng}/contact` },
  ];

  return (
    <MobileMenuProvider>
      <MobileMenu w={'90%'} direction="right">
        {menuItems.map((item, index) => (
          <NextLink key={index} passHref legacyBehavior href={item.url}>
            <MobileMenu.Item scale={1.5} title={item.title} />
          </NextLink>
        ))}
      </MobileMenu>

      <div id="app" className="app-layout">
        <HeaderComponent lng={lng}></HeaderComponent>
        {children}
        <style jsx global>
          {`
            .app-layout {
              width: 100%;
              height: 100vh;
              overflow: hidden;
              overflow-y: scroll;
              position: relative;
            }
            @media only screen and (min-width: ${layout.breakpoints.md.min}) {
              .center-text-md {
                text-align: center;
              }
            }

            body,
            html {
              overflow: scroll;
              overflow-x: hidden;
              overflow-y: overlay;
            }

            ::-webkit-scrollbar-track {
              z-index: 9999;
              cursor: pointer;
            }

            ::-webkit-scrollbar-thumb {
              background: #222;
              cursor: pointer;
            }

            ::-webkit-scrollbar-corner {
              background: transparent;
            }

            ::-webkit-scrollbar {
              width: 10px;
              background: #555;
            }

            ul {
              margin: 0;
              margin-top: 2.5rem;
              margin-left: 24px;
              color: inherit;
            }
            ul > li {
              color: inherit;
              margin: 0;
              padding: 0;
              &:before {
                color: inherit;
                font-weight: 500;
                content: '—';
                margin-left: -1.5em;
              }
              line-height: 2.25rem;
            }
            .img-wrapper {
              box-sizing: border-box;
              display: block;
              overflow: hidden;
              width: initial;
              height: initial;
              background: none;
              opacity: 1;
              border: 0px;
              margin: 0px;
              padding: 0px;
              position: absolute;
              inset: 0px;
            }
          `}
        </style>
      </div>
    </MobileMenuProvider>
  );
};
