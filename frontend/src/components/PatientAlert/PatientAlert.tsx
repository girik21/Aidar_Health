import mouthLab from '../../assets/mouth_lab.png';

interface PatientAlertProps {
    criticalPatients: {
        name: string;
        condition: string;
        testDate: string;
    }[];
}

export default function PatientAlert({ criticalPatients }: PatientAlertProps) {
    return (
        <div className="max-w-4xl p-4 bg-red-100 rounded-xl cursor-pointer">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                {/* Activity Icon */}
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-900">Critical Patient Alerts</h2>
            </div>

            {/* Alert Cards */}
            <div className="space-y-4 max-w-sm">
                {criticalPatients.map((patient, index) => (
                    <div 
                        key={index}
                        className="bg-white  border-l-red-500 border-l-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 flex flex-row"
                    >
                        <div>
                            <img 
                            src={mouthLab} 
                            alt="mout_lab" 
                            className='w-10'
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
                                        {/* Clock Icon */}
                                        Last test on: {patient.testDate}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {criticalPatients.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                        No critical patients at this time
                    </div>
                )}
            </div>
        </div>
    );
}