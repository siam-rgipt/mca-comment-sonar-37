import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Users, BarChart3 } from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

interface ConsultationItem {
  id: number;
  title: string;
  status: string;
}

const consultations: ConsultationItem[] = [
  { id: 1, title: 'Draft Companies (Amendment) Bill, 2025', status: 'Analysis Complete' },
  { id: 2, title: 'Rules on Corporate Social Responsibility (CSR)', status: 'In Progress' },
  { id: 3, title: 'Insolvency & Bankruptcy Code (Second Amendment)', status: 'Completed' },
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <aside className={`bg-slate-50 border-r border-slate-200 w-72 fixed top-16 left-0 h-[calc(100vh-4rem)] p-4 flex flex-col z-20 transform ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <nav className="flex-grow overflow-y-auto">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Menu</h2>
        <ul>
          <li>
            <Link
              to="/"
              onClick={handleLinkClick}
              className={`flex items-center p-3 my-1 rounded-lg transition-colors text-sm ${
                location.pathname === '/' 
                  ? 'bg-blue-100 text-blue-800 font-semibold' 
                  : 'hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Home size={18} className="mr-3" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/trends"
              onClick={handleLinkClick}
              className={`flex items-center p-3 my-1 rounded-lg transition-colors text-sm ${
                location.pathname === '/trends' 
                  ? 'bg-blue-100 text-blue-800 font-semibold' 
                  : 'hover:bg-slate-200 text-slate-700'
              }`}
            >
              <TrendingUp size={18} className="mr-3" />
              <span>Trend Analysis</span>
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              onClick={handleLinkClick}
              className={`flex items-center p-3 my-1 rounded-lg transition-colors text-sm ${
                location.pathname === '/analytics' 
                  ? 'bg-blue-100 text-blue-800 font-semibold' 
                  : 'hover:bg-slate-200 text-slate-700'
              }`}
            >
              <BarChart3 size={18} className="mr-3" />
              <span>Analytics</span>
            </Link>
          </li>
        </ul>
        
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-3">Stakeholders</h2>
        <ul>
          <li>
            <Link
              to="/stakeholderanalytics"
              onClick={handleLinkClick}
              className={`flex items-center p-3 my-1 rounded-lg transition-colors text-sm ${
                location.pathname === '/stakeholderanalytics' 
                  ? 'bg-blue-100 text-blue-800 font-semibold' 
                  : 'hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Users size={18} className="mr-3" />
              <span>Stakeholder Analytics</span>
            </Link>
          </li>
        </ul>
        
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-3">Consultations</h2>
        <ul>
          {consultations.map(consultation => (
            <li key={consultation.id}>
              <Link
                to={`/consultation/${consultation.id}`}
                onClick={handleLinkClick}
                className={`flex flex-col p-3 my-1 rounded-lg transition-colors text-sm ${
                  location.pathname === `/consultation/${consultation.id}` 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'hover:bg-slate-200'
                }`}
              >
                <span className={`font-semibold ${
                  location.pathname === `/consultation/${consultation.id}` ? '' : 'text-slate-700'
                }`}>
                  {consultation.title}
                </span>
                <span className={`text-xs mt-1 ${
                  location.pathname === `/consultation/${consultation.id}` ? 'text-blue-600' : 'text-slate-500'
                }`}>
                  {consultation.status}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="text-center text-xs text-slate-400 p-4">
        <p>&copy; 2025 Ministry of Corporate Affairs</p>
      </div>
    </aside>
  );
};

export default Sidebar;