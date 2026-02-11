
import React, { useState } from 'react';
import { User, Invitation } from '../types';
import { User as UserIcon, Bell, Search, Check, X as XIcon, Clock } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  invitations: Invitation[];
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, invitations, onAccept, onReject }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 w-full max-w-xl">
        <div className="relative w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search groups, members, transactions..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5" />
            {invitations.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Notifications</span>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{invitations.length} New</span>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {invitations.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">No new notifications</p>
                  </div>
                ) : (
                  invitations.map((inv) => (
                    <div key={inv.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                          <Check className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 leading-snug">
                            {inv.invitedBy} invited you to join <span className="text-blue-600">"{inv.groupName}"</span>
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                            <Clock className="w-3 h-3" />
                            <span>Just now</span>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <button 
                              onClick={() => onAccept(inv.id)}
                              className="flex-1 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => onReject(inv.id)}
                              className="flex-1 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {invitations.length > 0 && (
                <button className="w-full py-3 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-50/50 border-t border-slate-100 transition-colors">
                  View All Notifications
                </button>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">{user?.name}</p>
            <p className="text-xs text-slate-500 mt-1 capitalize">{user?.role.replace('_', ' ').toLowerCase()}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <UserIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {showNotifications && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => setShowNotifications(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
