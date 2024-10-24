import { useState } from 'react';

const Sidebar = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  
  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Patients', icon: '👥' },
    { name: 'Alerts', icon: '🔔' },
    { name: 'Records', icon: '✉️' },
  ];

  const doctorInfo = {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    status: 'Online'
  };

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-pink-800 to-pink-300 p-6 flex flex-col rounded-3xl">
      {/* Doctor Profile Section */}
      <div className="mb-8 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white p-1">
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl">👩‍⚕️</span>
          </div>
        </div>
        <h2 className="text-white font-bold text-lg">{doctorInfo.name}</h2>
        <p className="text-blue-100 text-sm">{doctorInfo.specialty}</p>
        <div className="flex items-center justify-center mt-2">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
          <span className="text-blue-100 text-sm">{doctorInfo.status}</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActivePage(item.name)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200
                  ${activePage === item.name 
                    ? 'bg-pink-200 text-white-600 font-medium shadow-lg' 
                    : 'text-blue-100 hover:bg-pink-300'}`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;