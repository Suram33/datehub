
import React from 'react';
import { DateProposal, ActivityType, PaymentPreference } from '../types';

interface DateCardProps {
  proposal: DateProposal;
  distance?: number | null;
  onView: (id: string) => void;
  onQuickChat: (id: string) => void;
  onShare: (proposal: DateProposal) => void;
}

const ActivityIcon = ({ type }: { type: ActivityType }) => {
  switch (type) {
    case ActivityType.DINING: return <i className="fas fa-utensils"></i>;
    case ActivityType.MOVIE: return <i className="fas fa-film"></i>;
    case ActivityType.OUTDOOR: return <i className="fas fa-mountain"></i>;
    case ActivityType.CONCERT: return <i className="fas fa-music"></i>;
    case ActivityType.COFFEE: return <i className="fas fa-coffee"></i>;
    case ActivityType.GAMING: return <i className="fas fa-gamepad"></i>;
    default: return <i className="fas fa-star"></i>;
  }
};

export const DateCard: React.FC<DateCardProps> = ({ proposal, distance, onView, onQuickChat, onShare }) => {
  return (
    <div className="group relative bg-white rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden active-pop">
      <div className="relative h-72 w-full overflow-hidden">
        <img 
          src={proposal.host?.photos[0] || `https://picsum.photos/seed/${proposal.id}/400/500`} 
          alt={proposal.host?.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[10px] font-black text-gray-800 flex items-center gap-2 shadow-xl uppercase tracking-widest">
              <ActivityIcon type={proposal.activityType} />
              {proposal.activityType}
            </span>
            {distance !== undefined && distance !== null && (
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg uppercase tracking-wider">
                {distance < 1 ? 'Nearby' : `${distance.toFixed(0)} km`}
              </span>
            )}
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onShare(proposal); }}
            className="w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-indigo-600 rounded-full flex items-center justify-center transition-all border border-white/30"
          >
            <i className="fas fa-share-nodes text-sm"></i>
          </button>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6">
          <p className="text-white text-xl font-black truncate drop-shadow-lg tracking-tight">{proposal.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <i className="fas fa-location-dot text-indigo-400 text-xs"></i>
            <p className="text-gray-300 text-xs truncate font-bold uppercase tracking-widest">{proposal.location}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-indigo-50 shadow-sm">
              <img src={proposal.host?.photos[0]} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">{proposal.host?.name}</p>
              <div className="flex items-center gap-1">
                <i className="fas fa-star text-yellow-400 text-[10px]"></i>
                <span className="text-[10px] font-black text-gray-400">{proposal.host?.rating}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Fixed Price</p>
            <p className="text-2xl font-black text-indigo-600 tracking-tighter">₹{proposal.price}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onQuickChat(proposal.id)}
            className="flex-1 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 font-black py-4 rounded-2xl transition-all border border-transparent hover:border-indigo-100 flex items-center justify-center gap-2 text-sm"
          >
            <i className="fas fa-comment-dots"></i>
            Chat
          </button>
          <button 
            onClick={() => onView(proposal.id)}
            className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 text-sm"
          >
            Details
            <i className="fas fa-arrow-right text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
