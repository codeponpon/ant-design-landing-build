import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../../apollo';
import LobbyProvider from '../../components/lobbyProvider';

const shortName = (props) => {
  return (
    <ApolloProvider client={client}>
      <LobbyProvider shortname={props.match.params.shortName} />;
    </ApolloProvider>
  );
};

export default shortName;
