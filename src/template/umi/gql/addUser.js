import { gql } from 'apollo-boost';

export const ADD_USER = gql`
  mutation createOneUser($data: UserCreateInput!) {
    createOneUser(data: $data) {
      __typename
      ... on CreateUserOutputSuccess {
        user {
          id
          username
        }
      }
      ... on CreateUserOutputError {
        messages
      }
    }
  }
`;
