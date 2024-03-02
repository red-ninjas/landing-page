'use server';
import { gql } from '@apollo/client';
import { FaqItem } from '../types/faq-item';
import { connect } from './client';
import { cache } from 'react';

export const getFaq = cache(
  async (
    language: string,
    amount: number | undefined = 9999
  ): Promise<FaqItem[]> => {
    const { data } = await connect().query({
      query: gql`
    query Faqs {
        faqs(locales: ${language}, first: ${amount}, orderBy: updatedAt_DESC) {
          question,
          anwser
        }
      }
    `,
    });

    return data.faqs;
  }
);
