interface PatientCarouselProps {
    patientProfiles: {
        name: string;
        medicalHistory?: string
    }[];
}

export default function PatientCarousel({ patientProfiles }: PatientCarouselProps) {
    return (
        <div className="max-w-4xl p-4 bg-slate-200 rounded-xl mt-5">
            <div className="flex items-center gap-2 mb-6">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-900">Your Patients</h2>
            </div>
            <div className="flex space-x-4 pb-10 overflow-x-auto">
                {patientProfiles.map((profile, index) => (
                    <div key={index} className="min-w-[200px] min-h-[100px] bg-gradient-to-b from-customPink to-pink-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer">
                        <div className="flex items-center space-x-4 justify-center text-pretty">
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <div className="text-pink-600 text-2xl">👤</div>
                            </div>
                            
                            <div className="flex flex-col">
                                <h3 className="text-lg font-bold text-gray-800">{profile.name}</h3>
                                <p className="text-sm text-blue-800 font-extrabold">{profile.medicalHistory}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}