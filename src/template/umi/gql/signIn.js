import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation signIn($data: SignInInput) {
    signIn(data: $data) {
      __typename
      ... on SignInOutputSuccess {
        user {
          id
          username
        }
        token
      }
      ... on SignInOutputError {
        messages
      }
    }
  }
`;
