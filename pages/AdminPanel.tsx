
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { ShieldAlert, Users, Landmark, FileText, CheckCircle, XCircle } from 'lucide-react';
import StatCard from '../components/StatCard';

interface AdminPanelProps {
  user: User;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ user }) => {
  const [pendingClaims] = useState([
    { id: 1, name: 'Amit Kumar', type: 'Death Claim', date: '2023-10-10', status: 'Pending', amount: '₹1,50,000' },
    { id: 2, name: 'Sita Devi', type: 'Installment Payout', date: '2023-10-12', status: 'Pending', amount: '₹5,000' },
  ]);

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Admin Control Center</h2>
          <p className="text-slate-500 text-sm mt-1">Monitor users, funds, and approve critical operations.</p>
        </div>
        <div className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-bold border border-red-200 flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          SECURE ACCESS GRANTED
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Users" value="1,24,502" icon={Users} color="bg-blue-600" />
        <StatCard label="Consolidated Funds" value="₹12.4 Cr" icon={Landmark} color="bg-orange-600" />
        <StatCard label="Pending Claims" value="48" icon={FileText} color="bg-red-600" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Pending Approvals</h3>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Action Required</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Requester</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Claim Type</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold text-right">Requested Amount</th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pendingClaims.map(claim => (
                <tr key={claim.id}>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-800">{claim.name}</p>
                    <p className="text-[10px] text-slate-400">{claim.date}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{claim.type}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">{claim.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors" title="Approve">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Reject">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">System Alerts</h3>
          <div className="space-y-3">
             <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <p className="text-xs text-yellow-800">New high-volume transaction detected in <strong>Rajasthan Zone B</strong>.</p>
             </div>
             <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <p className="text-xs text-red-800">Database backup delayed by 12 minutes. Checking integrity.</p>
             </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Regional Insights</h3>
          <p className="text-sm text-slate-500 mb-4">Bihar region shows a 15% increase in digital group creation this month.</p>
          <button className="text-sm font-bold text-blue-600 hover:underline">Download Geographical Report</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
