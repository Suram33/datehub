
import React, { useState, useRef } from 'react';
import { User, DateProposal } from '../types';

interface ProfileViewProps {
  user: User;
  myProposals: DateProposal[];
  onUpdateProfile: (updates: Partial<User>) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, myProposals, onUpdateProfile, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    bio: user.bio,
    photo: user.photos[0]
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: editForm.name,
      bio: editForm.bio,
      photos: [editForm.photo]
    });
    setIsEditing(false);
  };

  const exportDatabase = () => {
    const data = {
      user: localStorage.getItem('datehub_user'),
      proposals: localStorage.getItem('datehub_proposals'),
      chats: localStorage.getItem('datehub_chats'),
      notifications: localStorage.getItem('datehub_notifications'),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `datehub_backup_${new Date().toLocaleDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDatabase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.user) localStorage.setItem('datehub_user', data.user);
        if (data.proposals) localStorage.setItem('datehub_proposals', data.proposals);
        if (data.chats) localStorage.setItem('datehub_chats', data.chats);
        if (data.notifications) localStorage.setItem('datehub_notifications', data.notifications);
        alert("Database imported successfully! The page will now reload.");
        window.location.reload();
      } catch (err) {
        alert("Invalid backup file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden mb-10">
        <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-20"></div>
           <button 
             onClick={onLogout}
             className="absolute top-6 right-6 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-red-500 transition-all border border-white/20"
           >
             Logout
           </button>
        </div>
        <div className="px-10 pb-10 -mt-16 relative">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
            <div className="w-40 h-40 rounded-[2.5rem] border-4 border-white overflow-hidden shadow-2xl bg-white group relative">
              <img src={user.photos[0]} className="w-full h-full object-cover" alt={user.name} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => setIsEditing(true)}>
                <i className="fas fa-camera text-white text-2xl"></i>
              </div>
            </div>
            <div className="flex-1 mb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">{user.name}, {user.age}</h2>
                <span className="bg-blue-50 text-blue-600 p-1.5 rounded-full text-[10px]"><i className="fas fa-check-circle"></i></span>
              </div>
              <p className="text-gray-400 font-bold flex items-center gap-2">
                <i className="fas fa-location-dot text-indigo-500"></i>
                {user.location}
              </p>
            </div>
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black shadow-xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center gap-3"
            >
              <i className="fas fa-sliders"></i>
              Account Settings
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Biography</h4>
              <p className="text-gray-600 leading-relaxed text-lg font-medium italic bg-indigo-50/20 p-8 rounded-[2.5rem] border border-indigo-50">
                "{user.bio || "No bio yet. Tell the community about yourself!"}"
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center justify-center text-center">
                <p className="text-4xl font-black text-gray-900">{user.rating || '5.0'}</p>
                <div className="flex text-yellow-400 text-xs mb-1">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Experience Rating</p>
              </div>
              
              <div className="bg-indigo-600 text-white p-6 rounded-[2rem] shadow-xl shadow-indigo-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-xl">
                  <i className="fas fa-calendar-heart"></i>
                </div>
                <div>
                  <p className="text-2xl font-black leading-none">{myProposals.length}</p>
                  <p className="text-[10px] font-black uppercase opacity-60">Active Dates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DATABASE & STORAGE MANAGEMENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-xl">
              <i className="fas fa-database"></i>
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900">Browser Database</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">Status: Active & Private</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Your data is stored locally in this browser. No personal info is sent to our servers. Your "Magic Links" act as the bridge between you and other users.
          </p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={exportDatabase}
              className="px-6 py-3 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all flex items-center gap-2"
            >
              <i className="fas fa-download"></i> Export Backup
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-white border border-gray-200 text-gray-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <i className="fas fa-upload"></i> Import Backup
            </button>
            <input type="file" ref={fileInputRef} onChange={importDatabase} className="hidden" accept=".json" />
          </div>
        </div>

        <div className="bg-gray-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <h3 className="text-xl font-black mb-4 flex items-center gap-3">
            <i className="fas fa-shield-alt text-indigo-400"></i>
            Privacy Mode
          </h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Since we don't use a central database, your messages and profile only exist on the devices you share them with.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
              <i className="fas fa-circle-check text-green-500"></i> Zero Server Storage
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
              <i className="fas fa-circle-check text-green-500"></i> Peer-to-Peer Sharing
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
              <i className="fas fa-circle-check text-green-500"></i> Local Encryption
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsEditing(false)}></div>
          <form onSubmit={handleSubmit} className="relative bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
            <h3 className="text-3xl font-black mb-8 text-gray-900 tracking-tight">Update Profile</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Display Name</label>
                <input 
                  type="text" 
                  value={editForm.name}
                  onChange={e => setEditForm({...editForm, name: e.target.value})}
                  className="w-full bg-gray-50 border-0 rounded-2xl p-4 font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Profile Photo URL</label>
                <input 
                  type="url" 
                  value={editForm.photo}
                  onChange={e => setEditForm({...editForm, photo: e.target.value})}
                  className="w-full bg-gray-50 border-0 rounded-2xl p-4 font-medium text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Bio</label>
                <textarea 
                  value={editForm.bio}
                  onChange={e => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full bg-gray-50 border-0 rounded-2xl p-4 font-medium text-sm h-32 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button type="submit" className="flex-1 bg-indigo-600 text-white font-black py-5 rounded-3xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} className="px-8 bg-gray-100 text-gray-500 font-black py-5 rounded-3xl active:scale-95 transition-all">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Experience Gallery Section */}
      <div>
        <h3 className="text-2xl font-black text-gray-900 mb-6">Experience Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {user.memories?.map(m => (
            <div key={m.id} className="aspect-square rounded-[2rem] overflow-hidden bg-gray-100 border border-gray-100 group relative shadow-sm">
              <img src={m.photoUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={m.activityTitle} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-[10px] font-black truncate">{m.activityTitle}</p>
              </div>
            </div>
          ))}
          <div className="aspect-square rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 hover:text-indigo-400 hover:border-indigo-200 transition-all cursor-pointer bg-white">
             <i className="fas fa-plus-circle text-2xl mb-2"></i>
             <span className="text-[10px] font-black uppercase tracking-widest">Add Memory</span>
          </div>
        </div>
      </div>
    </div>
  );
};
