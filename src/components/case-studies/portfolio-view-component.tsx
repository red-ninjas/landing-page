'use client';

import PageWidth from '@himalaya-ui/core/page-width';
import Section from '@himalaya-ui/core/section';
import { PropsWithChildren } from 'react';

export default function PortfolioViewComponent({
  children,
}: PropsWithChildren) {
  return (
    <Section pt={{ xs: 5.75, xl: 7.5 }} pb={{ xs: 5.75, lg: 11.25 }}>
      <PageWidth py={0}>{children}</PageWidth>
    </Section>
  );
}
