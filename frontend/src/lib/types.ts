export interface User {
    username: string;
}

export interface Patient {
    user: User;
    id: string;
    medicalHistory?: string;
}

export interface Doctor {
    id: string;
    userId: number;
    patients: Patient[];
}

export interface DoctorData {
    doctor: Doctor;
}

export interface CurrentDoctorData {
    currentDoctor: Doctor;
}

export interface Alert {
    id: string;
    message: string;
    severity: string;
    isRead: boolean;
    timestamp: string;
    healthRecord: {
        patient: {
            user: User;
        };
    };
}

export interface AlertsData {
    alerts: Alert[];
}
