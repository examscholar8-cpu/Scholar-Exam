
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Groups from './pages/Groups';
import Wallet from './pages/Wallet';
import AdminPanel from './pages/AdminPanel';
import NGOInfo from './pages/NGOInfo';
import Auth from './pages/Auth';
import { User, UserRole, Invitation } from './types';
import { MOCK_USER } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: 1,
      groupId: 2,
      groupName: "Kisan Shakti Samuh",
      invitedBy: "Vijay Pratap",
      status: 'PENDING',
      createdAt: new Date().toISOString()
    }
  ]);

  // Mock auto-login for demonstration
  useEffect(() => {
    const stored = localStorage.getItem('auth_user');
    if (stored) {
      setUser(JSON.parse(stored));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_user');
  };

  const handleAcceptInvite = (id: number) => {
    setInvitations(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'ACCEPTED' as const } : inv));
    // In a real app, this would trigger joining the group
    setTimeout(() => {
      setInvitations(prev => prev.filter(inv => inv.id !== id));
    }, 2000);
  };

  const handleRejectInvite = (id: number) => {
    setInvitations(prev => prev.filter(inv => inv.id !== id));
  };

  if (!isAuthenticated) {
    return <Auth onLogin={(u) => { setUser(u); setIsAuthenticated(true); localStorage.setItem('auth_user', JSON.stringify(u)); }} />;
  }

  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Sidebar role={user?.role || UserRole.USER} onLogout={handleLogout} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar 
            user={user} 
            invitations={invitations.filter(i => i.status === 'PENDING')} 
            onAccept={handleAcceptInvite}
            onReject={handleRejectInvite}
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard user={user!} />} />
              <Route path="/groups" element={<Groups user={user!} />} />
              <Route path="/wallet" element={<Wallet user={user!} />} />
              <Route path="/admin" element={user?.role === UserRole.USER ? <Navigate to="/" /> : <AdminPanel user={user!} />} />
              <Route path="/ngo" element={<NGOInfo />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
