import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../../apollo';
import LaunchGame from '../../components/launchGame/index';

const launchGame = (props) => {
  return (
    <ApolloProvider client={client}>
      <LaunchGame {...props} />
    </ApolloProvider>
  );
};

export default launchGame;
