import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getToken } from '../libs/authToken';

export const graphUrl =
  process.env.GRAPHQL_URL ||
  'https://agent-back-office-cpp-likesoft.vercel.app/api/graphql';

const httpLink = createHttpLink({
  uri: graphUrl,
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
