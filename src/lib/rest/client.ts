import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const connect = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.HYGRAPH_API,
      fetchOptions: { cache: 'force-cache' },
    }),
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache(),
  });
};
