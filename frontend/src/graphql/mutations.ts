import { gql } from '@apollo/client';

export const MARK_ALERT_AS_READ = gql`
mutation MarkAlertAsRead($id: Int!) {
  markAlertAsRead(id: $id) {
    id
    isRead
  }
}
`;

export const UPDATE_THRESHOLD = gql`
    mutation UpdateThreshold($id: ID!, $metricType: String!, $minValue: Float!, $maxValue: Float!, $notes: String!) {
        updateThreshold(id: $id, metricType: $metricType, minValue: $minValue, maxValue: $maxValue, notes: $notes) {
            id
            metricType
            minValue
            maxValue
            notes
        }
    }
`;