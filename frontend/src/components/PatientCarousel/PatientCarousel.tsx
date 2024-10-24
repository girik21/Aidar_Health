
interface PatientCarouselProps {
    patientProfiles: {
        name: string;
        lastTest: string;
        status: string;
    }[];
}

export default function PatientCarousel({ patientProfiles }: PatientCarouselProps) {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Patient Profiles</h2>
            <div className="flex space-x-4 pb-10">
                {patientProfiles.map((profile, index) => (
                    <div key={index} className="min-w-[200px] bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold">{profile.name}</h3>
                        <p>Last test: {profile.lastTest}</p>
                        <p className={profile.status === "Critical" ? "text-red-500" : "text-green-500"}>
                            Status: {profile.status}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
