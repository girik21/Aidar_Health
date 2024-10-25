import { useMutation } from '@apollo/client';
import { useState } from 'react';
import mouthLab from '../../assets/mouth_lab.png';
import { MARK_ALERT_AS_READ } from '../../graphql/mutations';

interface PatientAlertProps {
    criticalPatients: {
        id: number;
        name: string;
        condition: string;
        testDate: string;
        severity: string;
    }[];
    onAlertResolved?: () => void;
}

interface PopupState {
    isOpen: boolean;
    patientId: number | null;
    patientName: string;
    condition: string;
}

export default function PatientAlert({ criticalPatients, onAlertResolved }: PatientAlertProps) {
    const [markAlertAsRead] = useMutation(MARK_ALERT_AS_READ, {
        onCompleted: () => {
            // Call the callback to refetch alerts
            if (onAlertResolved) {
                onAlertResolved();
            }
        }
    });

    const [popup, setPopup] = useState<PopupState>({
        isOpen: false,
        patientId: null,
        patientName: '',
        condition: ''
    });
    const [followUpType, setFollowUpType] = useState<'call' | 'email' | null>(null);

    const handleAlertClick = (patient: PatientAlertProps['criticalPatients'][0]) => {
        setPopup({
            isOpen: true,
            patientId: patient.id,
            patientName: patient.name,
            condition: patient.condition
        });
    };

    const handleMarkAsResolved = async () => {
        if (popup.patientId) {
            try {
                await markAlertAsRead({
                    variables: { 
                        id: popup.patientId 
                    },
                });
                
                // Close popup after marking as read
                setPopup(prev => ({ ...prev, isOpen: false }));
                setFollowUpType(null);
            } catch (error) {
                console.error('Error marking alert as read:', error);
            }
        }
    };

    const handleFollowUp = (type: 'call' | 'email') => {
        setFollowUpType(type);
    };

    const sortedPatients = [...criticalPatients].sort((a, b) => 
        new Date(b.testDate).getTime() - new Date(a.testDate).getTime()
    );

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <>
            <div className="max-w-4xl p-4 bg-dashGreen rounded-xl">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">Critical Patient Alerts</h2>
                </div>

                {/* Alert Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sortedPatients.length > 0 ? (
                        sortedPatients.map((patient) => (
                            <div
                                key={patient.id}
                                className="bg-white border-l-red-500 border-l-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 flex flex-row cursor-pointer"
                                onClick={() => handleAlertClick(patient)}
                            >
                                <div>
                                    <img
                                        src={mouthLab}
                                        alt="mouth_lab"
                                        className="w-10"
                                    />
                                </div>
                                <div className="flex ml-10">
                                    <svg className="w-5 h-5 mr-2 text-red-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {patient.name}
                                        </h3>
                                        <div className="space-y-2">
                                            <div className="text-red-600 font-medium">
                                                {patient.condition}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500 gap-1 font-extrabold">
                                                Report Period: {formatDate(patient.testDate)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-8 col-span-2">
                            No critical patients at this time
                        </div>
                    )}
                </div>
            </div>

            {/* Popup Notification */}
            {popup.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Alert Details
                            </h3>
                            <button
                                onClick={() => setPopup(prev => ({ ...prev, isOpen: false }))}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="font-medium mb-2">Patient: {popup.patientName}</p>
                            <p className="text-red-600">Condition: {popup.condition}</p>
                        </div>

                        <div className="mb-6">
                            <p className="font-medium mb-2">Follow-up Action:</p>
                            <div className="flex gap-2 mb-4">
                                <button
                                    onClick={() => handleFollowUp('call')}
                                    className={`flex-1 py-2 px-4 rounded ${
                                        followUpType === 'call'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Call Patient
                                </button>
                                <button
                                    onClick={() => handleFollowUp('email')}
                                    className={`flex-1 py-2 px-4 rounded ${
                                        followUpType === 'email'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Email Patient
                                </button>
                            </div>
                            
                            {followUpType && (
                                <div className="text-sm text-gray-600">
                                    {followUpType === 'call' 
                                        ? 'Scheduling follow-up call...'
                                        : 'Preparing follow-up email...'}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setPopup(prev => ({ ...prev, isOpen: false }))}
                                className="px-4 py-2 hover:text-gray-700 bg-red-500 rounded-xl font-extrabold text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleMarkAsResolved}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Mark as Resolved
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}