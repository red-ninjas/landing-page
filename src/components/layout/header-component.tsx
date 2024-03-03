'use client';

import { useTranslation } from '@/i18n/client';
import { Box } from '@himalaya-ui/core/box/box';
import Button from '@himalaya-ui/core/button';
import Header from '@himalaya-ui/core/header';
import { MobileMenuButton } from '@himalaya-ui/core/mobile-menu';
import useTheme from '@himalaya-ui/core/use-theme';
import { hexToRgb } from '@himalaya-ui/core/utils/color';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { ClientProviderContext } from '../client-provider';
import { BrandLogo, Brandtitle } from '../icons/logo';

export const HeaderComponent = ({ lng }: { lng: string }) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const currentPath = usePathname();
  const { t } = useTranslation(lng, 'home');
  const { background } = useContext(ClientProviderContext);

  useEffect(() => {
    if (document !== null) {
      const element = document.getElementById('app') as HTMLDivElement;
      if (element !== null) {
        let position = element.scrollTop;

        const handleScroll = () => {
          const moving = element.scrollTop;
          setIsActive(position > moving);
          position = moving;
        };
        element.addEventListener('scroll', handleScroll);
        return () => {
          element.removeEventListener('scroll', handleScroll);
        };
      }
    }
  }, []);

  const theme = useTheme();

  return (
    <div className={classNames('app-header', isActive ? 'show' : 'hide')}>
      <Header
        style={{
          background: background ? background.from : theme.palette.background,
          border: 0,
        }}
        h={'88px'}
      >
        <Header.Left>
          <Link legacyBehavior href={`/${lng}`}>
            <a className="logo">
              <BrandLogo size={32}></BrandLogo>
              <Brandtitle size={16}></Brandtitle>
            </a>
          </Link>
        </Header.Left>
        <Header.Right>
          <Box hide={{ xs: false, lg: true }} className="navigation-items">
            <MobileMenuButton notHiding={true}></MobileMenuButton>
          </Box>
          <Box show={{ xs: false, lg: true }} className="navigation-items">
            <Link legacyBehavior href={`/${lng}/services`}>
              <a
                className={classNames('navigation-item', {
                  active: currentPath.startsWith(`/${lng}/services`),
                })}
              >
                {t('navigation.services')}
              </a>
            </Link>

            <Link legacyBehavior href={`/${lng}/case-studies`}>
              <a
                className={classNames('navigation-item', {
                  active: currentPath.startsWith(`/${lng}/case-studies`),
                })}
              >
                {t('navigation.case-studies')}
              </a>
            </Link>

            <Link legacyBehavior href={`/${lng}/outsourcing`}>
              <a
                className={classNames('navigation-item', {
                  active: currentPath.startsWith(`/${lng}/outsourcing`),
                })}
              >
                {t('navigation.outsourcing')}
              </a>
            </Link>

            <Link legacyBehavior href={`/${lng}/about-us`}>
              <a
                className={classNames('navigation-item', {
                  active: currentPath.startsWith(`/${lng}/about-us`),
                })}
              >
                {t('navigation.about-us')}
              </a>
            </Link>

            <Link legacyBehavior href={`/${lng}/blog`}>
              <a
                className={classNames('navigation-item', {
                  active: currentPath.startsWith(`/${lng}/blog`),
                })}
              >
                {t('navigation.blog')}
              </a>
            </Link>

            <Link legacyBehavior href={`/${lng}/contact`}>
              <a>
                <Button
                  htmlType={'button'}
                  type="primary"
                  scale={1.2}
                  auto
                  effect
                  pl={1}
                  pr={1}
                  style={{
                    textTransform: 'none',
                    fontWeight: '700',
                  }}
                >
                  {t('navigation.contact-us')}
                </Button>
              </a>
            </Link>
          </Box>
        </Header.Right>
      </Header>
      <style jsx global>{`
        .navigation-items {
          display: flex;
          gap: 56px;
          align-items: center;
        }
      `}</style>
      <style jsx>{`
        .app-header {
          --tw-skew-y: 0;
          --tw-skew-x: 0;
          --tw-translate-x: 0;
          --tw-translate-y: 0;
          --tw-rotate: 0;
          --tw-scale-y: 1;
          --tw-scale-x: 1;

          transition-duration: 0.5s;
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transform: translate(var(--tw-translate-x), var(--tw-translate-y))
            rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
            skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
            scaleY(var(--tw-scale-y));

          width: 100%;
          position: sticky;
          top: 0px;
          z-index: 9999;
        }
        .app-header.show {
          --tw-translate-y: 0;
        }
        .app-header.hide {
          --tw-translate-y: -100%;
        }
        .navigation-item {
          display: flex;
          gap: 6px;
          align-items: center;
          color: ${theme.palette.foreground};
          font-size: 16px;
          position: relative;
          line-height: 24px;
          &:hover,
          &:focus {
            color: ${theme.palette.foreground};
          }

          &.active {
            font-weight: bold;
          }

          &:after {
            margin-left: auto;
            margin-right: auto;
            height: 2px;
            width: 0;
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
            left: 0;
            right: 0;
            --tw-bg-opacity: 0;
            background-color: rgba(
              ${hexToRgb(theme.palette.foreground)},
              var(--tw-bg-opacity)
            );
            position: absolute;
            bottom: -0.5rem;
            content: '';
          }

          &:hover,
          &.active {
            &:after {
              --tw-bg-opacity: 1;
              width: 100%;
            }
          }
        }

        .logo {
          display: inline-flex;
          align-items: center;
          color: ${theme.palette.foreground};
          gap: 14px;

          &:hover {
            color: ${theme.palette.accents_8};
          }
        }
      `}</style>
    </div>
  );
};
