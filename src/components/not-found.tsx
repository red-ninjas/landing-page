'use client';

import PageWidth from '@himalaya-ui/core/page-width';
import Section from '@himalaya-ui/core/section';
import { PageHeader } from './layout/page-header';

export default function NotFoundComponent() {
  return (
    <div
      className="light"
      style={{
        background: 'var(--color-background-1000)',
        color: 'var(--color-foreground-1000)',
      }}
    >
      <Section
        pt={{ xs: 5.75, lg: 7.5 }}
        pb={{ xs: 5.75, lg: 7.5 }}
        style={{
          overflow: 'hidden',
        }}
      >
        <PageWidth w={'100%'} py={0}>
          <PageHeader align="center" title="Page not found"></PageHeader>
        </PageWidth>
      </Section>
    </div>
  );
}
