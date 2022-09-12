import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';

const Statement = gql`
  query Statement {
    userMe {
      user {
        id
        depositRequest {
          bankAccount {
            id
            name
            number
            bank {
              name
              code
              colorCode
              logoUrl
            }
          }
          amount
          createdAt
          transferedAt
          depositRequestStatus
          remark
        }
        withdrawRequest {
          bankAccount {
            id
            name
            number
            bank {
              name
              code
              colorCode
              logoUrl
            }
          }
          amount
          withdrawRequestStatus
          createdAt
        }
      }
    }
  }
`;

function useStatement() {
  const { data, loading, error, refetch, client } = useQuery(Statement, {
    pollInterval: 3000,
  });

  useEffect(() => {
    return () => {
      client.stop();
    };
  }, []);
  return { data, loading, error, refetch };
}

export default useStatement;
