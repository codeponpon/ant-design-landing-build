import axios from 'axios';
import { graphUrl } from '../apollo';

const SIGN_IN = `
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

export const signIn = async (variables, graphqlUrl) => {
  try {
    const res = await axios.post(`${graphqlUrl || graphUrl}`, {
      query: SIGN_IN,
      ...variables,
    });
    console.log('sign in', res);
    if (res.status === 200) return res.data;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }

  return false;
};
