import { gql } from 'apollo-boost';

export const ADD_CONTACT = gql`
  mutation createOneContact($data: ContactCreateInput!) {
    createOneContact(data: $data) {
      __typename
      ... on ContactOutputSuccess {
        contact {
          id
        }
      }
      ... on ContactOutputError {
        messages
      }
    }
  }
`;
