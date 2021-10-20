import { gql } from 'apollo-boost';

export const WALLET = gql`
  query wallet($username: String) {
    wallet(username: $username)
  }
`;
