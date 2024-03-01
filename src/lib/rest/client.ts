import { ApolloClient, InMemoryCache } from '@apollo/client';

export const HYGRAPH_CLIENT = new ApolloClient({
  uri: process.env.HYGRAPH_API,
  cache: new InMemoryCache(),
});
