import { gql } from '@apollo/client';

export const GET_DOCTOR = gql`
query GetDoctor($id: Int!) {
  doctor(id: $id) {
    id
    userId
    specialty
    user {
      id
      username
      email
    }
    patients {
      id
      medicalHistory
      user {
        username
      }
    }
  }
}
`;

export const GET_CURRENT_DOCTOR = gql`
query GetCurrentDoctor($userId: Int!) {
  currentDoctor(userId: $userId) {
    id
    userId
    specialty
    user {
      id
      username
      email
    }
    patients {
      id
      medicalHistory
      user {
        username
      }
    }
  }
}
`;