
import React from 'react';
import { Target, Flag, ShieldCheck, Heart, HandHelping, Landmark, Globe, Rocket } from 'lucide-react';

const NGOInfo: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Empowering Rural India Through <br/><span className="text-orange-600">Digital Samuh Anudan</span></h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Providing a transparent, group-based financial safety net for every village household in India.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold">Our Vision</h3>
          <p className="text-slate-600 leading-relaxed text-sm">डिजिटल अनुदान प्रणाली द्वारा ग्रामीण भारत को आर्थिक सुरक्षा देना</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Flag className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold">Our Mission</h3>
          <p className="text-slate-600 leading-relaxed text-sm">ग्रुप आधारित पारदर्शी फंड वितरण प्रणाली</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold">Objectives</h3>
          <p className="text-slate-600 leading-relaxed text-sm">आर्थिक सहायता, डिजिटल सशक्तिकरण, और सामाजिक सुरक्षा</p>
        </div>
      </div>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          Key Programs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-200">
            <HandHelping className="w-10 h-10 text-blue-500 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900">Group Anudan</h4>
              <p className="text-sm text-slate-500 mt-1">Community-led monthly donation pools distributed for emergency village needs.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-200">
            <Landmark className="w-10 h-10 text-orange-500 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900">Death Benefit Scheme</h4>
              <p className="text-sm text-slate-500 mt-1">Instant financial support to the nominees of registered members in case of demise.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-200">
            <Globe className="w-10 h-10 text-green-500 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900">Village Help Desk</h4>
              <p className="text-sm text-slate-500 mt-1">Tech-enabled physical desks in every Panchayat to assist with digital literacy.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-200">
            <Rocket className="w-10 h-10 text-purple-500 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900">Digital Empowerment</h4>
              <p className="text-sm text-slate-500 mt-1">Connecting rural citizens with DBT, Jan Dhan, and Ayushman Bharat APIs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <h2 className="text-3xl font-bold">Investor Pitch Highlight</h2>
          <p className="text-slate-400 text-lg">Scalable community-driven fintech model with a massive untapped rural market opportunity. Combining social impact with high-transparency technology.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div>
              <p className="text-2xl font-bold">₹10B+</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Market Cap</p>
            </div>
            <div>
              <p className="text-2xl font-bold">1M+</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Villages</p>
            </div>
            <div>
              <p className="text-2xl font-bold">100%</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Transparent</p>
            </div>
            <div>
              <p className="text-2xl font-bold">AI</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Powered</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NGOInfo;
