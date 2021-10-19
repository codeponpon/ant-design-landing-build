import { useQuery } from '@apollo/client';
import { USER_ME } from '../gql/userMe';

function useAuth() {
  const { data, loading, error, refetch } = useQuery(USER_ME);
  return { data, loading, error, refetch };
}

export default useAuth;
