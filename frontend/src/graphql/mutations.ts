import { gql } from '@apollo/client';

export const MARK_ALERT_AS_READ = gql`
mutation MarkAlertAsRead($id: Int!) {
  markAlertAsRead(id: $id) {
    id
    isRead
  }
}
`;

export const UPDATE_PATIENT_THRESHOLD = gql`
  mutation UpdatePatientThreshold($id: Int!, $patientThresholdInput: PatientThresholdInput!) {
    updatePatientThreshold(id: $id, patientThresholdInput: $patientThresholdInput) {
      id
      metricType
      minValue
      maxValue
      notes
      patient {
        user {
          username
        }
      }
    }
  }
`;