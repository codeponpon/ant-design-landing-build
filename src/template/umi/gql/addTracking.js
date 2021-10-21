import { gql } from 'apollo-boost';

export const ADD_TRACKING = gql`
  mutation createTracking($data: TrackingCreateInput!) {
    createTracking(data: $data)
  }
`;
