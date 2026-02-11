
import React, { useState, useMemo } from 'react';
import { User, Group } from '../types';
import { 
  Plus, 
  Users, 
  Search, 
  Share2, 
  MapPin, 
  ChevronRight, 
  X, 
  UserPlus, 
  Info, 
  CheckCircle2, 
  UserCheck, 
  Filter,
  Sparkles,
  ArrowRight,
  Loader2
} from 'lucide-react';

interface GroupsProps {
  user: User;
}

const Groups: React.FC<GroupsProps> = ({ user }) => {
  const [groups, setGroups] = useState<Group[]>([
    { id: 1, leaderId: 1, groupCode: 'GRP-RAJ-101', totalMembers: 45, name: 'Village Unity Group', location: 'Rajasthan' },
    { id: 2, leaderId: 2, groupCode: 'GRP-BHR-202', totalMembers: 120, name: 'Kisan Shakti Samuh', location: 'Bihar' },
    { id: 3, leaderId: 5, groupCode: 'GRP-DLH-303', totalMembers: 28, name: 'Pragati Mahila Mandal', location: 'Delhi' },
    { id: 4, leaderId: 8, groupCode: 'GRP-UP-404', totalMembers: 75, name: 'Gramin Vikas Sangh', location: 'Uttar Pradesh' },
    { id: 5, leaderId: 10, groupCode: 'GRP-MP-505', totalMembers: 15, name: 'Small Farmer Coop', location: 'Madhya Pradesh' },
  ]);

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [memberFilter, setMemberFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [inviteIdentifier, setInviteIdentifier] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // New Group Form State
  const [newGroupName, setNewGroupName] = useState('');
  const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
  const [currentInvite, setCurrentInvite] = useState('');
  const [isAddingInvite, setIsAddingInvite] = useState(false);
  const [creationStatus, setCreationStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS'>('IDLE');

  const filteredGroups = useMemo(() => {
    return groups.filter(group => {
      const matchesSearch = 
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        group.groupCode.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = locationFilter === 'all' || group.location === locationFilter;
      
      let matchesMembers = true;
      if (memberFilter === 'small') matchesMembers = group.totalMembers < 50;
      else if (memberFilter === 'medium') matchesMembers = group.totalMembers >= 50 && group.totalMembers <= 100;
      else if (memberFilter === 'large') matchesMembers = group.totalMembers > 100;

      return matchesSearch && matchesLocation && matchesMembers;
    });
  }, [groups, searchTerm, memberFilter, locationFilter]);

  const handleAddInvite = () => {
    const trimmed = currentInvite.trim();
    // Basic 10-digit mobile validation
    const phoneRegex = /^[0-9]{10}$/;
    if (trimmed && !invitedMembers.includes(trimmed) && phoneRegex.test(trimmed)) {
      setIsAddingInvite(true);
      // Simulate checking user registry
      setTimeout(() => {
        setInvitedMembers([...invitedMembers, trimmed]);
        setCurrentInvite('');
        setIsAddingInvite(false);
      }, 600);
    }
  };

  const removeInvite = (index: number) => {
    setInvitedMembers(invitedMembers.filter((_, i) => i !== index));
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName) return;

    setCreationStatus('LOADING');
    
    // Simulate API delay for blockchain/ledger initialization
    setTimeout(() => {
      const newGroup: Group = {
        id: Date.now(),
        leaderId: user.id,
        groupCode: `GRP-${user.name.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 899) + 100}`,
        totalMembers: 1 + invitedMembers.length,
        name: newGroupName,
        location: 'Local Region', 
      };

      setCreationStatus('SUCCESS');
      setTimeout(() => {
        setGroups([newGroup, ...groups]);
        setIsModalOpen(false);
        setNewGroupName('');
        setInvitedMembers([]);
        setCurrentInvite('');
        setCreationStatus('IDLE');
      }, 1500);
    }, 1200);
  };

  const handleOpenInvite = (group: Group) => {
    setSelectedGroup(group);
    setIsInviteModalOpen(true);
    setInviteSuccess(false);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteIdentifier) return;
    setInviteSuccess(true);
    setInviteIdentifier('');
    setTimeout(() => {
      setIsInviteModalOpen(false);
      setInviteSuccess(false);
    }, 2000);
  };

  const locations = Array.from(new Set(groups.map(g => g.location).filter(Boolean)));

  return (
    <div className="space-y-6 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Community Groups</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage your active samuhs and discover new community funds.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-xl shadow-orange-200 hover:-translate-y-0.5 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Create New Group
        </button>
      </header>

      {/* Filters Section */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search groups by name or code..." 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl transition-all hover:bg-white hover:border-blue-200">
              <Filter className="w-4 h-4 text-slate-400" />
              <select 
                value={memberFilter}
                onChange={(e) => setMemberFilter(e.target.value)}
                className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Sizes</option>
                <option value="small">Small (&lt;50)</option>
                <option value="medium">Medium (50-100)</option>
                <option value="large">Large (&gt;100)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl transition-all hover:bg-white hover:border-blue-200">
              <MapPin className="w-4 h-4 text-slate-400" />
              <select 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All States</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {(searchTerm || memberFilter !== 'all' || locationFilter !== 'all') && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setMemberFilter('all');
                  setLocationFilter('all');
                }}
                className="text-xs font-black text-red-500 hover:text-red-600 px-3 uppercase tracking-widest bg-red-50 rounded-2xl hover:bg-red-100 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGroups.map(group => (
            <div key={group.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 group">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 ring-4 ring-blue-50">
                    <Users className="w-7 h-7" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleOpenInvite(group)}
                      className="p-2.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all flex items-center gap-2 group/btn border border-transparent hover:border-orange-100"
                      title="Invite Members"
                    >
                      <UserPlus className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{group.name}</h3>
                <p className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full inline-block mb-6 tracking-wider">{group.groupCode}</p>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{group.totalMembers} Members</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>{group.location || 'Rajasthan'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest block mb-1">Fund Pool</span>
                    <span className="text-base font-black text-slate-900">₹{(group.totalMembers * 1250).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest block mb-1">Impact</span>
                    <span className="text-base font-black text-green-600">High</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-5 bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-all text-sm font-bold text-slate-600 flex items-center justify-center gap-3">
                Manage Samuh
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] p-16 text-center border border-slate-200 border-dashed">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
            <Search className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">No results match your search</h3>
          <p className="text-slate-500 font-medium mt-2 max-w-xs mx-auto">Try broadening your filters or searching by a different group code.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setMemberFilter('all');
              setLocationFilter('all');
            }}
            className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Create Group Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col md:flex-row">
            
            {/* Left Side: Form */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
              {creationStatus === 'SUCCESS' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12 animate-in slide-in-from-bottom-4 duration-500">
                   <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                      <CheckCircle2 className="w-12 h-12" />
                   </div>
                   <h2 className="text-3xl font-black text-slate-900">Samuh Initialized!</h2>
                   <p className="text-slate-500 font-medium max-w-sm">Welcome to the leadership. Your new community group has been successfully deployed to the platform.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight">Create Samuh</h3>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Founding Member Dashboard</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                      <X className="w-6 h-6 text-slate-400" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateGroup} className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Group Name</label>
                      <div className="relative">
                        <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                        <input 
                          type="text"
                          value={newGroupName}
                          onChange={(e) => setNewGroupName(e.target.value)}
                          placeholder="e.g. Adarsh Gram Sewa Samuh"
                          className="w-full pl-14 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 text-slate-900 font-bold placeholder:text-slate-300 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Invite Members via Mobile</label>
                        <span className="text-[10px] text-blue-600 font-black uppercase bg-blue-50 px-3 py-1 rounded-full">{invitedMembers.length} Joined</span>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <UserPlus className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
                          <input 
                            type="tel"
                            value={currentInvite}
                            onChange={(e) => setCurrentInvite(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            placeholder="10-digit mobile number"
                            className="w-full pl-14 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 text-slate-900 font-bold placeholder:text-slate-300 transition-all"
                          />
                        </div>
                        <button 
                          type="button"
                          disabled={currentInvite.length < 10 || isAddingInvite}
                          onClick={handleAddInvite}
                          className="px-6 py-4 bg-slate-900 disabled:bg-slate-200 text-white rounded-3xl font-black text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                        >
                          {isAddingInvite ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add'}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 min-h-[60px] bg-slate-50/50 p-4 rounded-[2rem] border-2 border-dashed border-slate-100">
                        {invitedMembers.length === 0 && !isAddingInvite && (
                          <p className="text-xs text-slate-300 font-bold italic w-full text-center py-4">Optionally invite members by mobile number to build your initial team.</p>
                        )}
                        {invitedMembers.map((member, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-2xl text-xs font-bold border border-slate-200 shadow-sm animate-in zoom-in duration-200">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            <span>+91 {member}</span>
                            <button onClick={() => removeInvite(idx)} className="ml-1 text-slate-300 hover:text-red-500 transition-colors">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl shadow-slate-200 relative overflow-hidden group/notice">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full -mr-16 -mt-16 blur-3xl opacity-20 group-hover/notice:scale-110 transition-transform"></div>
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                          <Sparkles className="w-5 h-5 text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Founding Rules</p>
                          <p className="text-xs font-medium leading-relaxed opacity-80">
                            By initializing this samuh, you agree to follow the platform's governance transparency rules. You will be responsible for validating the first 3 payout requests.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={!newGroupName || creationStatus !== 'IDLE'}
                      className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white rounded-3xl font-black text-base transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-[0.98] relative overflow-hidden"
                    >
                      {creationStatus === 'LOADING' ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Registering on Ledger...
                        </>
                      ) : (
                        <>
                          Initialize Community Samuh
                          <ChevronRight className="w-6 h-6" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Right Side: Card Preview */}
            <div className="hidden lg:flex w-96 bg-slate-50 border-l border-slate-100 p-10 flex-col justify-center items-center">
               <div className="mb-10 text-center">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Platform Preview</h4>
                 <p className="text-xs font-bold text-slate-500">Live preview of your group card</p>
               </div>
               
               <div className="w-full bg-white rounded-[2.5rem] border-2 border-blue-600 shadow-2xl shadow-blue-500/10 overflow-hidden transform hover:scale-105 transition-all duration-500 animate-in fade-in slide-in-from-right-8 duration-700">
                  <div className="p-8">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                      <Users className="w-7 h-7" />
                    </div>
                    <h5 className="text-xl font-black text-slate-900 mb-1 truncate leading-tight">
                      {newGroupName || 'Samuh Name'}
                    </h5>
                    <p className="text-[10px] font-mono font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full inline-block mb-6 tracking-widest">
                      GRP-NEW-DEPLOY
                    </p>
                    
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span>{1 + invitedMembers.length} Founders</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-50">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest block mb-1">Launch Pool</span>
                          <span className="text-lg font-black text-slate-900">₹{((1 + invitedMembers.length) * 1250).toLocaleString()}</span>
                        </div>
                        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                           <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] text-center">
                    Community Secure
                  </div>
               </div>

               <div className="mt-12 text-center space-y-4">
                  <div className="flex justify-center -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-4 border-slate-50 bg-slate-200 flex items-center justify-center">
                         <Users className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-4 border-slate-50 bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">
                      +{invitedMembers.length}
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-slate-400 max-w-[200px] leading-relaxed mx-auto">
                    This card will be visible to everyone in the <span className="text-slate-900 font-black">Bharat Samuh</span> network.
                  </p>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Invite Modal for Existing Groups */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             {inviteSuccess ? (
               <div className="p-16 text-center space-y-6 animate-in zoom-in duration-300">
                 <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-12 h-12" />
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 tracking-tight">Broadcast Sent!</h3>
                 <p className="text-slate-500 font-medium">Invitation has been sent to the network. They will appear in the group once they accept.</p>
               </div>
             ) : (
               <>
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Invite to {selectedGroup?.name}</h3>
                  <button onClick={() => setIsInviteModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
                <form onSubmit={handleSendInvite} className="p-8 space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Member Mobile or ID</label>
                    <div className="relative">
                      <UserPlus className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
                      <input 
                        type="text"
                        value={inviteIdentifier}
                        onChange={(e) => setInviteIdentifier(e.target.value)}
                        placeholder="Search by 987XXXXXXX..."
                        className="w-full pl-14 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 text-slate-900 font-bold placeholder:text-slate-300 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-blue-50 border-2 border-blue-100 rounded-[2rem] flex items-start gap-4">
                    <UserCheck className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800 leading-relaxed font-bold">
                      Direct invitations are faster than group codes. Use this for family members or trusted neighbors.
                    </p>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-3xl font-black text-base transition-all shadow-2xl active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    Send Group Invite
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
               </>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
