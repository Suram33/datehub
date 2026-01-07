
import React, { useState } from 'react';
import { ActivityType, PaymentPreference, DateProposal } from '../types';
import { geminiService } from '../services/geminiService';

interface CreateDateModalProps {
  onClose: () => void;
  onSubmit: (proposal: Partial<DateProposal>) => void;
}

export const CreateDateModal: React.FC<CreateDateModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    activityType: ActivityType.DINING,
    description: '',
    price: 1500,
    paymentPreference: PaymentPreference.I_PAY,
    location: '',
    date: '',
    time: '',
    videoUrl: '' // Added field
  });
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = async () => {
    if (!formData.description) return;
    setIsEnhancing(true);
    const enhanced = await geminiService.enhanceDescription(formData.activityType, formData.description);
    setFormData(prev => ({ ...prev, description: enhanced || prev.description }));
    setIsEnhancing(false);
  };

  const handleSuggest = async () => {
    setIsEnhancing(true);
    const suggestion = await geminiService.suggestDateIdea("adventurous and unique");
    setFormData(prev => ({ ...prev, title: suggestion.title, description: suggestion.description }));
    setIsEnhancing(false);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        <div className="bg-indigo-600 p-8 text-white flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-3xl font-black">Post a Date</h2>
            <p className="text-indigo-100 text-sm font-bold uppercase tracking-widest">Experiences Start Here</p>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 w-12 h-12 flex items-center justify-center rounded-full transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}>
          <div className="col-span-2">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Experience Title</label>
            <div className="relative">
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Sunset Movie & Cocktails"
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-bold text-gray-800"
              />
              <button 
                type="button"
                onClick={handleSuggest}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-800 p-2 rounded-xl text-xs font-black flex items-center gap-1 bg-white shadow-sm"
              >
                <i className="fas fa-wand-magic-sparkles"></i>
                AI Help
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
            <select 
              value={formData.activityType}
              onChange={e => setFormData({...formData, activityType: e.target.value as ActivityType})}
              className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-bold text-gray-700"
            >
              {Object.values(ActivityType).map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Fixed Price (₹)</label>
            <input 
              required
              type="number" 
              value={formData.price}
              onChange={e => setFormData({...formData, price: parseInt(e.target.value)})}
              className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-black text-indigo-600"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex justify-between">
              Experience Description
              <button 
                type="button"
                onClick={handleEnhance}
                disabled={isEnhancing || !formData.description}
                className="text-[10px] text-indigo-600 font-black hover:underline disabled:opacity-50"
              >
                {isEnhancing ? 'Writing...' : '✨ Enhance with AI'}
              </button>
            </label>
            <textarea 
              required
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Tell them more about the plan..."
              className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 h-28 resize-none transition-all outline-none text-gray-600 italic"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Experience Video URL (MP4)</label>
            <div className="relative">
              <input 
                type="url" 
                value={formData.videoUrl}
                onChange={e => setFormData({...formData, videoUrl: e.target.value})}
                placeholder="Paste an MP4 link to show in the Reels feed"
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium text-gray-600 text-sm"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                 <i className="fas fa-film"></i>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 font-bold px-2">💡 Tips: Dates with videos get 5x more requests!</p>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Location</label>
            <input 
              required
              type="text" 
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
              placeholder="e.g. Bandra, Mumbai"
              className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Plan</label>
            <select 
              value={formData.paymentPreference}
              onChange={e => setFormData({...formData, paymentPreference: e.target.value as PaymentPreference})}
              className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
            >
              {Object.values(PaymentPreference).map(pref => <option key={pref} value={pref}>{pref}</option>)}
            </select>
          </div>

          <div className="col-span-2 flex flex-col sm:flex-row gap-4 pt-6">
            <button 
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-3xl shadow-xl shadow-indigo-100 transition-all transform active:scale-95"
            >
              Go Live with Activity
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="sm:w-32 bg-gray-100 hover:bg-gray-200 text-gray-500 font-black py-5 rounded-3xl transition-all"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
