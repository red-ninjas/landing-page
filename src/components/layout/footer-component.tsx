'use client';
import { useTranslation } from '@/i18n/client';
import { languagesNames } from '@/i18n/settings';
import Button from '@himalaya-ui/core/button';
import Grid from '@himalaya-ui/core/grid';
import Dribbble from '@himalaya-ui/core/icons/dribbble';
import Github from '@himalaya-ui/core/icons/github';
import Globe from '@himalaya-ui/core/icons/globe';
import Linkedin from '@himalaya-ui/core/icons/linkedin';
import PageWidth from '@himalaya-ui/core/page-width';
import Text from '@himalaya-ui/core/text';
import { useLayout } from '@himalaya-ui/core/use-layout/layout-context';
import useTheme from '@himalaya-ui/core/use-theme';
import Link from 'next/link';
import { FadeinAnimation } from '../animations/fadein-animation';

export const FooterComponent = ({ lng }: { lng: string }) => {
  const theme = useTheme();
  const layout = useLayout();
  const { t } = useTranslation(lng, 'home');

  return (
    <footer className="footer">
      <PageWidth
        pb={{ xs: 5.57, md: 11.25 }}
        style={{ borderBottom: `1px solid ${theme.palette.border}` }}
      >
        <div className="contact-us-inner">
          <Grid.Container justify={'center'}>
            <Grid xs={24} md={20} justify={'center'}>
              <FadeinAnimation delay={0} duration={500} onStart={true}>
                <Text
                  m={0}
                  font={{ xs: 2.75, md: 4.5 }}
                  lineHeight={{ xs: 3, md: 4.625 }}
                  style={{ fontWeight: 500, textAlign: 'center' }}
                >
                  {t('footer.title')}
                </Text>
              </FadeinAnimation>
            </Grid>
          </Grid.Container>
          <div className="footer-contact-us-link">
            <Link legacyBehavior href={`/${lng}/contact`}>
              <a>
                <Button
                  htmlType={'button'}
                  type="primary"
                  scale={1.5}
                  auto={{ xs: false, md: true }}
                  w="100%"
                  pl={1}
                  pr={1}
                  mt={4}
                  font={'1.125rem'}
                  style={{
                    width: '100%',
                    textTransform: 'none',
                    fontWeight: '700',
                  }}
                >
                  {t('footer.contact_us')}
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </PageWidth>
      <PageWidth>
        <div className="footer-outro">
          <Grid.Container>
            <Grid md={6} lg={6} xs={12} className="sm-order-3">
              <address className="footer-address">
                <Text
                  b
                  m={0}
                  p={0}
                  font={'1.125rem'}
                  lineHeight={'1.75rem'}
                  mb={1}
                >
                  {t('footer.company_name')}
                </Text>

                <Text
                  m={0}
                  p={0}
                  font={1}
                  lineHeight={'1.5rem'}
                  style={{
                    color: theme.palette.accents_7,
                  }}
                >
                  {t('footer.address_line_1')}
                  <br></br>
                  {t('footer.address_line_2')}
                  <br></br>
                  <b>{t('footer.address_line_3')}</b>
                </Text>
              </address>
            </Grid>
            <Grid md={6} lg={6} xs={12} className="sm-order-3">
              <address className="footer-address">
                <Text
                  b
                  m={0}
                  p={0}
                  font={'1.125rem'}
                  lineHeight={'1.75rem'}
                  mb={1}
                >
                  {t('footer.company_name')}
                </Text>

                <Text
                  m={0}
                  p={0}
                  font={1}
                  lineHeight={'1.5rem'}
                  style={{
                    color: theme.palette.accents_7,
                  }}
                >
                  {t('footer.address_line_1')}
                  <br></br>
                  {t('footer.address_line_2')}
                  <br></br>
                  <b>{t('footer.address_line_3')}</b>
                </Text>
              </address>
            </Grid>
            <Grid md={6} lg={10} xs={12} className="sm-order-3">
              <address className="footer-address">
                <Text b m={0} p={0} font={1.125} lineHeight={1.5} mb={1}>
                  <br></br>
                </Text>

                <Text
                  m={0}
                  p={0}
                  font={1}
                  lineHeight={1.5}
                  style={{
                    color: theme.palette.accents_7,
                  }}
                >
                  {t('footer.address_line_4')}
                  <br></br>
                  {t('footer.address_line_5')}
                  <br></br>
                  <b>{t('footer.address_line_6')}</b>
                </Text>
              </address>
            </Grid>
            <Grid md={12} lg={8} xs={24}>
              <div className="footer-nav">
                <Link legacyBehavior href={`/${lng}/services`}>
                  <a className="footer-navigation-link">
                    {t('navigation.services')}
                  </a>
                </Link>

                <Link legacyBehavior href={`/${lng}/case-studies`}>
                  <a className="footer-navigation-link">
                    {t('navigation.case-studies')}
                  </a>
                </Link>
                <Link legacyBehavior href={`/${lng}/blog`}>
                  <a className="footer-navigation-link">
                    {t('navigation.blog')}
                  </a>
                </Link>
                <Link legacyBehavior href={`/${lng}/outsourcing`}>
                  <a className="footer-navigation-link">
                    {t('navigation.outsourcing')}
                  </a>
                </Link>

                <Link
                  legacyBehavior
                  href={`https://www.linkedin.com/company/redninjas/`}
                >
                  <a target="_blank" className="footer-navigation-link">
                    <Linkedin size={22} />
                    LinkedIn
                  </a>
                </Link>

                <Link legacyBehavior href={`https://dribbble.com/redninjas`}>
                  <a target="_blank" className="footer-navigation-link">
                    <Dribbble size={22} />
                    Dribbble
                  </a>
                </Link>
                <Link legacyBehavior href={`https://github.com/red-ninjas`}>
                  <a target="_blank" className="footer-navigation-link">
                    <Github size={22} />
                    GitHub
                  </a>
                </Link>
              </div>
            </Grid>
            <Grid xs={24} style={{ order: 4 }}>
              <div className="footer-disclaimer-outer">
                <Text
                  m={0}
                  p={0}
                  font={0.875}
                  lineHeight={1.5}
                  style={{
                    textAlign: 'left',
                    color: theme.palette.foreground,
                  }}
                >
                  {t('footer.copyright')}
                </Text>

                <div className="footer-disclaimer">
                  <Link legacyBehavior href={`/${lng}/page/imprint`}>
                    <a className="footer-link">{t('navigation.imprint')}</a>
                  </Link>

                  <Link legacyBehavior href={`/${lng}/page/data-privacy`}>
                    <a className="footer-link">
                      {t('navigation.data-privacy')}
                    </a>
                  </Link>

                  <Link
                    legacyBehavior
                    passHref
                    href={lng == 'de' ? '/en' : '/de'}
                  >
                    <a className="footer-link">
                      <Globe size={16} />
                      <span>{languagesNames[lng == 'de' ? 'en' : 'de']}</span>
                    </a>
                  </Link>
                </div>
              </div>
            </Grid>
          </Grid.Container>
        </div>
      </PageWidth>
      <style jsx global>{`
        @media only screen and (max-width: ${layout.breakpoints.sm.max}) {
          .sm-order-3 {
            order: 3;
          }
        }
      `}</style>
      <style jsx>{`
        .footer-link {
          gap: 6px;
          display: flex;
          white-space: nowrap;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          word-break: keep-all;
          transition-property:
            color,
            background-color,
            border-color,
            text-decoration-color,
            fill,
            stroke,
            opacity,
            box-shadow,
            transform,
            filter,
            backdrop-filter,
            -webkit-backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
          opacity: 0.8;
          position: relative;
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: ${theme.palette.foreground};

          &:first-of-type {
            margin-left: 2rem;
          }

          &:hover {
            opacity: 1;
          }

          &:before {
            content: '';
            background: ${theme.palette.foreground};
            height: 70%;
            top: 15%;
            position: absolute;
            width: 1px;
            left: 0;
          }
        }
        .disclaim-spacer {
          display: inline-block;
          border: 0;
          background-color: ${theme.palette.foreground};
          border-style: none;
          height: 0.75rem;
          opacity: 0.3;
          font-weight: normal;

          &:first-of-type {
            margin-left: 2rem;
          }
          width: 1px;
        }
        .footer-disclaimer {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
        }
        .footer-disclaimer-outer {
          display: flex;
          margin-top: 2.5rem;
        }
        .footer-nav {
          gap: 12px;
          row-gap: 16px;
          width: 100%;
          display: grid;
          flex-direction: column;
          padding-bottom: 2.5rem;
          grid-template-columns: 1fr 1fr;
        }
        .contact-us-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .footer {
          padding-top: 180px;
          padding-bottom: 92px;
        }

        .footer-address {
          font-style: normal;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-navigation-link {
          color: ${theme.palette.foreground};
          font-weight: 500;
          display: flex;
          gap: 6px;
          align-items: center;
          font-size: 18px;
          &:hover,
          &:focus {
            color: ${theme.palette.accents_8};
          }
        }

        @media only screen and (max-width: ${layout.breakpoints.sm.max}) {
          .footer {
            padding-bottom: 7rem;
            padding-top: 92px;
          }
          .footer-link {
            &:first-of-type {
              padding-left: 0;
            }
          }

          .footer-copyright {
            order: 3;
          }
          .footer-nav {
            border-bottom: 1px solid ${theme.palette.border};
          }
          .footer-link {
            &:first-of-type {
              margin-left: 0;
              &:before {
                display: none;
              }
            }
          }
          .footer-disclaimer-outer {
            flex-direction: column;
            gap: 1rem;
            margin-top: 2.5rem;
          }
          .footer-address {
            margin-top: 2.5rem;
          }
          .footer-contact-us-link {
            width: 100%;
            text-align: center;
          }
          .footer-nav {
            margin-top: 2.5rem;
          }
        }
      `}</style>
    </footer>
  );
};
