import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../../apollo';
import LaunchGame from '../../components/launchGame/index';
import '../../components/less/customStyle.less';

const launchGame = (props) => {
  return (
    <ApolloProvider client={client}>
      <LaunchGame {...props} />
    </ApolloProvider>
  );
};

export default launchGame;
