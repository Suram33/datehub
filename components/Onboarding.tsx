
import React, { useState } from 'react';
import { User } from '../types';

interface OnboardingProps {
  onComplete: (user: User) => void;
  onCancel: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: 18,
    bio: '',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    location: 'Mumbai, India'
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = () => {
    const newUser: User = {
      id: `u-${Date.now()}`,
      name: formData.name,
      age: formData.age,
      bio: formData.bio,
      photos: [formData.photo],
      location: formData.location,
      lat: 19.0760,
      lng: 72.8777,
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
      memories: []
    };
    onComplete(newUser);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-indigo-600">
      <div className="absolute inset-0 bg-mesh opacity-30"></div>
      
      <div className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white/90 backdrop-blur-3xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in duration-500">
        
        {/* Left Side: Form */}
        <div className="p-8 md:p-14 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs">
                <i className="fas fa-heart"></i>
              </div>
              <span className="font-black text-gray-900 uppercase tracking-widest text-xs">Step {step} of 3</span>
            </div>

            {step === 1 && (
              <div className="animate-in slide-in-from-left duration-300">
                <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Tell us your name.</h2>
                <p className="text-gray-500 mb-8 font-medium">We're built on real people and real plans.</p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Display Name</label>
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-100/50 border-0 rounded-2xl p-4 font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Your Age</label>
                    <input 
                      type="number" 
                      min="18"
                      max="100"
                      value={formData.age}
                      onChange={e => setFormData({...formData, age: parseInt(e.target.value)})}
                      className="w-full bg-gray-100/50 border-0 rounded-2xl p-4 font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in slide-in-from-left duration-300">
                <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Your Vibe.</h2>
                <p className="text-gray-500 mb-8 font-medium">Add a photo and a short bio so hosts know who's joining.</p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Photo URL</label>
                    <input 
                      type="url" 
                      placeholder="Paste an image link..."
                      value={formData.photo}
                      onChange={e => setFormData({...formData, photo: e.target.value})}
                      className="w-full bg-gray-100/50 border-0 rounded-2xl p-4 font-medium text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Bio</label>
                    <textarea 
                      placeholder="What kind of experiences do you love?"
                      value={formData.bio}
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                      className="w-full bg-gray-100/50 border-0 rounded-2xl p-4 font-medium text-sm h-32 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in slide-in-from-left duration-300">
                <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Location.</h2>
                <p className="text-gray-500 mb-8 font-medium">Find dates in your city or wherever you're traveling.</p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Current City</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Bandra, Mumbai"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-gray-100/50 border-0 rounded-2xl p-4 font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                      <i className="fas fa-shield-halved"></i>
                    </div>
                    <p className="text-xs text-indigo-900 font-bold leading-relaxed">Your exact location is never shared. We only use it to show you dates nearby.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-12">
            {step > 1 && (
              <button onClick={handleBack} className="flex-1 bg-gray-100 text-gray-500 font-black py-5 rounded-3xl active:scale-95 transition-all uppercase text-xs tracking-widest">Back</button>
            )}
            {step < 3 ? (
              <button 
                onClick={handleNext} 
                disabled={!formData.name}
                className="flex-[2] bg-indigo-600 text-white font-black py-5 rounded-3xl shadow-xl shadow-indigo-100 active:scale-95 transition-all uppercase text-xs tracking-widest disabled:opacity-50"
              >
                Continue
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="flex-[2] bg-green-600 text-white font-black py-5 rounded-3xl shadow-xl shadow-green-100 active:scale-95 transition-all uppercase text-xs tracking-widest"
              >
                Complete Profile
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="hidden md:flex bg-gray-900 items-center justify-center p-14 relative">
          <div className="absolute inset-0 bg-mesh opacity-20"></div>
          <div className="relative w-full max-w-sm bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-10 duration-700">
            <div className="h-64 relative">
              <img src={formData.photo} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-2xl font-black">{formData.name || 'Your Name'}, {formData.age}</p>
                <p className="text-white/60 text-xs font-bold flex items-center gap-1 uppercase tracking-widest">
                  <i className="fas fa-location-dot"></i> {formData.location}
                </p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">About You</p>
              <p className="text-gray-600 font-medium italic text-sm line-clamp-3">
                "{formData.bio || "Write something interesting about yourself..."}"
              </p>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-eye"></i> Profile Preview
          </div>
        </div>
      </div>
    </div>
  );
};
