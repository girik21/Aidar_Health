import { gql } from '@apollo/client';

export const MARK_ALERT_AS_READ = gql`
mutation MarkAlertAsRead($id: Int!) {
  markAlertAsRead(id: $id) {
    id
    isRead
  }
}
`;


