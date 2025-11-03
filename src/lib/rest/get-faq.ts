import { gql } from '@apollo/client';
import { FaqItem } from '../types/faq-item';
import { connect } from './client';
import { cache } from 'react';
import { delay, isBuildTime } from './helper';

export const getFaq = cache(
  async (
    language: string,
    module: 'service' | 'about' | 'outsourcing' | 'membership' = 'about',
    amount: number | undefined = 9999
  ): Promise<FaqItem[]> => {
    if (isBuildTime()) {
      await delay(200 + Math.random() * 300);
    }
    const { data } = await connect().query({
      query: gql`
    query Faqs {
        faqs(locales: ${language}, first: ${amount}, orderBy: updatedAt_DESC, where: {module: ${module}}) {
          question,
          anwser
        }
      }
    `,
    });

    return data.faqs;
  }
);
