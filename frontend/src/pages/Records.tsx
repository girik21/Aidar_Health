import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_HEALTH_RECORDS } from "../graphql/queries";

interface User {
  id: string;
  username: string;
}

interface Patient {
  id: string;
  user: User;
}

interface HealthRecord {
  id: string;
  patient: Patient;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  temperature: number;
  oxygenSaturation: number;
  timestamp: string;
  notes?: string;
}

interface SortConfig {
  key: keyof HealthRecord | 'bloodPressure';
  direction: 'ASC' | 'DESC';
}

export default function Records() {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'timestamp',
    direction: 'DESC'
  });

  const { data, loading, error } = useQuery(GET_HEALTH_RECORDS, {
    variables: {
      sortOrder: sortConfig.direction,
      sortBy: sortConfig.key === 'bloodPressure' ? 'bloodPressureSystolic' : sortConfig.key,
    }
  });

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ASC' ? 'DESC' : 'ASC'
    }));
  };

  const getSortIcon = (key: SortConfig['key']) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'ASC' ? '↑' : '↓';
  };

  const getVitalStatus = (record: HealthRecord) => {
    const ranges = {
      heartRate: { min: 60, max: 100 },
      bloodPressureSystolic: { min: 90, max: 120 },
      bloodPressureDiastolic: { min: 60, max: 80 },
      temperature: { min: 36.1, max: 37.2 },
      oxygenSaturation: { min: 95, max: 100 }
    };

    const statuses = [];
    if (record.heartRate < ranges.heartRate.min || record.heartRate > ranges.heartRate.max) {
      statuses.push('Heart Rate');
    }
    if (record.bloodPressureSystolic < ranges.bloodPressureSystolic.min ||
      record.bloodPressureSystolic > ranges.bloodPressureSystolic.max) {
      statuses.push('Systolic BP');
    }
    if (record.bloodPressureDiastolic < ranges.bloodPressureDiastolic.min ||
      record.bloodPressureDiastolic > ranges.bloodPressureDiastolic.max) {
      statuses.push('Diastolic BP');
    }
    if (record.temperature < ranges.temperature.min || record.temperature > ranges.temperature.max) {
      statuses.push('Temperature');
    }
    if (record.oxygenSaturation < ranges.oxygenSaturation.min ||
      record.oxygenSaturation > ranges.oxygenSaturation.max) {
      statuses.push('O2 Saturation');
    }
    return statuses;
  };

  const groupRecordsByPatient = (records: HealthRecord[]) => {
    return records.reduce((acc, record) => {
      const patientId = record.patient.id;
      if (!acc[patientId]) acc[patientId] = [];
      acc[patientId].push(record);
      return acc;
    }, {} as Record<string, HealthRecord[]>);
  };

  if (error) return <div>Error: {error.message}</div>;

  const groupedRecords = data ? groupRecordsByPatient(data.healthRecords) : {};

  return (
    <div className="p-6 max-w-7xl mx-auto overflow-x-auto">
      <h1 className="text-2xl font-bold text-gray-800">Health Records</h1>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        Object.entries(groupedRecords).map(([patientId, records]) => (
          <div key={patientId} className="my-6 bg-white p-4 rounded-lg shadow-md max-w-full overflow-x-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Patient: {records[0].patient.user.username}
            </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left" onClick={() => handleSort('timestamp')}>Timestamp {getSortIcon('timestamp')}</th>
                  <th className="px-6 py-3 text-left" onClick={() => handleSort('heartRate')}>Heart Rate {getSortIcon('heartRate')}</th>
                  <th className="px-6 py-3 text-left" onClick={() => handleSort('bloodPressure')}>Blood Pressure {getSortIcon('bloodPressure')}</th>
                  <th className="px-6 py-3 text-left" onClick={() => handleSort('temperature')}>Temperature {getSortIcon('temperature')}</th>
                  <th className="px-6 py-3 text-left" onClick={() => handleSort('oxygenSaturation')}>O2 Saturation {getSortIcon('oxygenSaturation')}</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {records.map((record) => {
                  const abnormalVitals = getVitalStatus(record);
                  return (
                    <tr key={record.id} className={`hover:bg-gray-50 ${abnormalVitals.length ? 'bg-red-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(record.timestamp).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{record.heartRate} bpm</td>
                      <td className="px-6 py-4 whitespace-nowrap">{record.bloodPressureSystolic}/{record.bloodPressureDiastolic} mmHg</td>
                      <td className="px-6 py-4 whitespace-nowrap">{record.temperature}°C</td>
                      <td className="px-6 py-4 whitespace-nowrap">{record.oxygenSaturation}%</td>
                      <td className="px-6 py-4 whitespace-nowrap">{abnormalVitals.length ? `Abnormal: ${abnormalVitals.join(', ')}` : 'Normal'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>

  );
}
