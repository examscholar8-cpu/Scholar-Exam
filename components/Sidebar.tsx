
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  ShieldCheck, 
  Info, 
  LogOut,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, onLogout }) => {
  const isAdmin = role !== UserRole.USER;

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/groups', icon: Users, label: 'My Groups' },
    { to: '/wallet', icon: Wallet, label: 'Wallet & Payout' },
    ...(isAdmin ? [{ to: '/admin', icon: ShieldCheck, label: 'Admin Portal' }] : []),
    { to: '/ngo', icon: Info, label: 'NGO Mission' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800 transition-all duration-300">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shrink-0">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div className="hidden md:block overflow-hidden">
          <h1 className="text-white font-bold truncate leading-tight">भारत समूह</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Bharat Samuh</p>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="hidden md:block font-medium text-sm flex-1">{item.label}</span>
            <ChevronRight className="hidden md:block w-4 h-4 opacity-0 group-hover:opacity-40" />
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className="hidden md:block font-medium text-sm text-left">Logout Session</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
