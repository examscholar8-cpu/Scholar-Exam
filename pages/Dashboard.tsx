
import React, { useState, useEffect } from 'react';
import { User, Wallet } from '../types';
import StatCard from '../components/StatCard';
import { 
  Users, 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  History, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getFinancialAdvice } from '../services/geminiService';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [wallets, setWallets] = useState<Wallet[]>([
    { id: 1, userId: 1, type: 'MAIN', balance: 5200 },
    { id: 2, userId: 1, type: 'GROUP', balance: 25000 },
    { id: 3, userId: 1, type: 'CONSOLIDATED', balance: 120000 },
  ]);

  const [aiAdvice, setAiAdvice] = useState("Loading AI insights...");

  useEffect(() => {
    const fetchAdvice = async () => {
      const advice = await getFinancialAdvice(wallets[1].balance, "Village Unity Group");
      setAiAdvice(advice);
    };
    fetchAdvice();
  }, []);

  const chartData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5500 },
    { name: 'Apr', amount: 2800 },
    { name: 'May', amount: 4800 },
    { name: 'Jun', amount: 5200 },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back, {user.name} 👋</h2>
          <p className="text-slate-500 text-sm mt-1">Today is a great day to contribute to your community.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm flex items-center gap-2 transition-colors">
            <ArrowUpRight className="w-4 h-4" />
            Quick Donate
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Personal Balance" 
          value={`₹${wallets[0].balance}`} 
          icon={WalletIcon} 
          color="bg-blue-500" 
          trend="12.5%" 
          trendUp={true}
        />
        <StatCard 
          label="Group Fund" 
          value={`₹${wallets[1].balance}`} 
          icon={Users} 
          color="bg-purple-500" 
          trend="4.2%" 
          trendUp={true}
        />
        <StatCard 
          label="Consolidated Fund" 
          value={`₹${wallets[2].balance}`} 
          icon={ShieldAlert} 
          color="bg-orange-500" 
          trend="2.1%" 
          trendUp={true}
        />
        <StatCard 
          label="Active Claims" 
          value="3" 
          icon={History} 
          color="bg-green-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Donation Trends</h3>
            <select className="text-sm bg-slate-50 border border-slate-200 rounded-md px-2 py-1 outline-none">
              <option>Last 6 Months</option>
              <option>Yearly</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#3b82f6' : '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-200" />
              <h4 className="font-semibold">Smart AI Advisor</h4>
            </div>
            <p className="text-sm leading-relaxed text-indigo-50 font-medium">
              "{aiAdvice}"
            </p>
            <button className="mt-6 w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-medium transition-all">
              View Detailed Insight
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Monthly Installment</p>
                      <p className="text-xs text-slate-400">Oct 12, 2023</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-green-600">+₹100</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 text-center">
              View All History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
