
import React, { useState } from 'react';
import { User } from '../types';
import { CreditCard, ArrowDownRight, ArrowUpRight, Lock, CheckCircle2 } from 'lucide-react';
import { PAYMENT_SPLIT_RULES } from '../constants';

interface WalletProps {
  user: User;
}

const Wallet: React.FC<WalletProps> = ({ user }) => {
  const [balance] = useState(5200);
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  const transactions = [
    { id: 1, type: 'Credit', amount: 100, date: '2023-10-12', status: 'Completed', detail: 'Monthly Installment' },
    { id: 2, type: 'Payout', amount: 1200, date: '2023-10-05', status: 'Pending', detail: 'Harvest Support' },
    { id: 3, type: 'Credit', amount: 100, date: '2023-09-12', status: 'Completed', detail: 'Monthly Installment' },
  ];

  return (
    <div className="space-y-8">
       <header>
        <h2 className="text-2xl font-bold text-slate-900">Wallet & Payments</h2>
        <p className="text-slate-500 text-sm mt-1">Manage your funds and track community contributions.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Rupay-Logo.png" alt="RuPay" className="h-6 opacity-60 grayscale brightness-200" />
              </div>
              <p className="text-slate-400 text-sm font-medium tracking-wide">Available Balance</p>
              <h3 className="text-4xl font-bold mt-1">₹{balance.toLocaleString()}</h3>
              <div className="mt-12 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Holder</p>
                  <p className="text-sm font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Role</p>
                  <p className="text-sm font-medium">Group Member</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              Distribution Rules
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-500">Group Pool</span>
                <span className="text-sm font-bold text-slate-900">{PAYMENT_SPLIT_RULES.GROUP * 100}%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-slate-50">
                <span className="text-sm text-slate-500">Management</span>
                <span className="text-sm font-bold text-slate-900">{PAYMENT_SPLIT_RULES.MANAGEMENT * 100}%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-slate-50">
                <span className="text-sm text-slate-500">Staff Support</span>
                <span className="text-sm font-bold text-slate-900">{PAYMENT_SPLIT_RULES.STAFF * 100}%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-slate-50">
                <span className="text-sm text-slate-500">Consolidated Fund</span>
                <span className="text-sm font-bold text-slate-900">{PAYMENT_SPLIT_RULES.CONSOLIDATED * 100}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Transaction History</h3>
              <button className="text-sm text-blue-600 font-semibold hover:underline">Download Report</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Transaction</th>
                    <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Date</th>
                    <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">Status</th>
                    <th className="px-6 py-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'Credit' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                            {tx.type === 'Credit' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{tx.detail}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-tighter">ID: TXN-00{tx.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{tx.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-right font-bold text-sm ${tx.type === 'Credit' ? 'text-green-600' : 'text-slate-900'}`}>
                        {tx.type === 'Credit' ? '+' : '-'}₹{tx.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Death Claim Security</h4>
                <p className="text-sm text-slate-600">Your nominee details are verified. You are covered under our security program.</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all">
              Manage Nominee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
