import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Doctor {
  id: string;
  userId: number;
  specialty: string;
  user: {
    username: string;
    email: string;
  };
}

interface SidebarProps {
  doctor: Doctor | null;
}

const Sidebar: React.FC<SidebarProps> = ({ doctor }) => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/dashboard' },
    { name: 'Patients', icon: '👥', path: '/patients' },
    { name: 'Alerts', icon: '🔔', path: '/alerts' },
    { name: 'Records', icon: '✉️', path: '/records' },
    { name: 'Thresholds', icon: '⚙️', path: '/thresholds' },
  ];

  const handleNavigation = (path: string, name: string) => {
    setActivePage(name);
    navigate(path);
  };

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-pink-800 to-pink-300 p-6 flex flex-col rounded-3xl shadow-md shadow-gray-200">
      <div className="mb-8 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white p-1">
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl">👩‍⚕️</span>
          </div>
        </div>
        <h2 className="text-white font-bold text-lg">{doctor?.user.username || 'Doctor Name'}</h2>
        <p className="text-blue-100 text-sm">{doctor?.specialty || 'Specialty'}</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleNavigation(item.path, item.name)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200
                  ${activePage === item.name 
                    ? 'bg-pink-200 text-white font-medium shadow-lg' 
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
