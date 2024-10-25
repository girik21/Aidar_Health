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

export const GET_DOCTOR_PATIENTS = gql`
  query GetDoctorPatients($doctorId: Int!) {
    doctor(id: $doctorId) {
      patients {
        id
        user {
          username
        }
        medicalHistory
        healthRecords {
          heartRate
          bloodPressureSystolic
          bloodPressureDiastolic
          temperature
          oxygenSaturation
          timestamp
        }
      }
    }
  }
`;

export const GET_CRITICAL_ALERTS = gql`
  query GetCriticalAlerts {
    alerts {
      id
      message
      severity
      isRead
      timestamp
      healthRecord {
        heartRate
        bloodPressureSystolic
        bloodPressureDiastolic
        temperature
        oxygenSaturation
        patient {
          user {
            username
          }
        }
      }
    }
  }
`;

export const ALERT_SUBSCRIPTION = gql`
subscription OnAlertCreated {
  alertCreated {
    id
    message
    timestamp
    severity
    isRead
    healthRecord {
      patient {
        user {
          username
        }
      }
    }
  }
}
`;

export const MARK_ALERT_AS_READ = gql`
mutation MarkAlertAsRead($id: Int!) {
  markAlertAsRead(id: $id) {
    id
    isRead
  }
}
`;

export const GET_PATIENT_THRESHOLDS = gql`
  query GetPatientThresholds {
    patientThresholds {
      id
      metricType
      minValue
      maxValue
      updatedAt
      notes
      patient {
        id
        user {
          username
        }
      }
    }
  }
`;
