
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { TrendingUp, Phone, Lock, ChevronRight, Fingerprint } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    onLogin({
      id: Date.now(),
      name: isLogin ? "Rajesh Kumar" : "New User",
      mobile: mobile || "9876543210",
      role: mobile.includes('999') ? UserRole.SUPER_ADMIN : UserRole.USER,
      status: true,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="md:w-1/2 bg-slate-900 relative p-8 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600 rounded-full blur-[120px] opacity-10 -ml-20 -mb-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-white font-black text-2xl tracking-tighter">भारत समूह</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Bharat Samuh Anudan</p>
            </div>
          </div>

          <div className="space-y-6 max-w-sm">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Empowering Rural Bharat digitally.</h2>
            <p className="text-slate-400 text-lg leading-relaxed">Secure your community's future with India's first group-based transparent donation platform.</p>
          </div>
        </div>

        <div className="relative z-10 pt-12 md:pt-0">
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
             <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Fingerprint className="w-6 h-6 text-orange-400" />
             </div>
             <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Security Grade</p>
                <p className="text-white font-semibold">Bank Level AES-256 Encryption</p>
             </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md space-y-8 bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
          <div className="text-center">
            <h3 className="text-2xl font-black text-slate-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
            <p className="text-slate-500 text-sm mt-2">{isLogin ? 'Enter your registered mobile number' : 'Join our community-led donation network'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="tel" 
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="98765-XXXXX"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Pin / Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 transition-all"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Forgot Pin?</button>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 group"
            >
              {isLogin ? 'Login to Dashboard' : 'Sign Up Now'}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-white px-4">OR</div>
          </div>

          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="w-full py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all"
          >
            {isLogin ? 'Create a New Account' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
