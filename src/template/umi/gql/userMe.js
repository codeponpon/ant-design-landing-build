import { gql } from 'apollo-boost';

export const USER_ME = gql`
  query Me {
    userMe {
      user {
        id
        firstName
        lastName
        username
        birthday
        contact {
          mobile
          lineID
          email
        }
        bankAccounts {
          number
          bank {
            name
            code
            colorCode
            logoUrl
          }
        }
      }
      wallet {
        balance
      }
      UM
      message
    }
  }
`;
