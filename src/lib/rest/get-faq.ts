import { gql } from '@apollo/client';
import { FaqItem } from '../types/faq-item';
import { connect } from './client';
import { cache } from 'react';

export const getFaq = cache(
  async (
    language: string,
    module: 'service' | 'about' | 'outsourcing' | 'membership' = 'about',
    amount: number | undefined = 9999
  ): Promise<FaqItem[]> => {
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
