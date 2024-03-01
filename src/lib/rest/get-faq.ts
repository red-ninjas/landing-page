import { gql } from '@apollo/client';
import { FaqItem } from '../types/faq-item';
import { HYGRAPH_CLIENT } from './client';

export const getFaq = async (
  language: string,
  amount: number | undefined = 9999
): Promise<FaqItem[]> => {
  const { data } = await HYGRAPH_CLIENT.query({
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
};
