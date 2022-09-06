import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo';
import Lobby from '../components/lobby';

export default () => (
  <ApolloProvider client={client}>
    <Lobby />
  </ApolloProvider>
);
