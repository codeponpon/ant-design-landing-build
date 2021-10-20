import { gql } from 'graphql-tag';

export const BANKS = gql`
  query Banks {
    banks(orderBy: { seq: asc }) {
      code
      name
      logoUrl
      colorCode
      isActive
    }
  }
`;
