import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../../apollo';
import LobbyProvider from '../../components/lobbyProvider';

const provider = (props) => {
  return (
    <ApolloProvider client={client}>
      <LobbyProvider shortname={props.location.query.shortName} />;
    </ApolloProvider>
  );
};

export default provider;
