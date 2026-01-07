
import React, { useRef, useEffect, useState } from 'react';
import { DateProposal } from '../types';

interface ReelItemProps {
  proposal: DateProposal;
  isActive: boolean;
  onRequest: (id: string) => void;
  onChat: (id: string) => void;
  onViewHost: (id: string) => void;
}

const ReelItem: React.FC<ReelItemProps> = ({ proposal, isActive, onRequest, onChat, onViewHost }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && !videoError) {
        videoRef.current.play().catch(() => setVideoError(true));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive, videoError]);

  return (
    <div className="relative w-full h-full bg-neutral-950 snap-start overflow-hidden flex items-center justify-center">
      {proposal.videoUrl && !videoError ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 z-10">
              <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <video
            ref={videoRef}
            src={proposal.videoUrl}
            className="w-full h-full object-cover opacity-90"
            loop
            muted
            playsInline
            onLoadedData={() => setIsLoading(false)}
            onError={() => { setVideoError(true); setIsLoading(false); }}
          />
        </>
      ) : (
        <div className="w-full h-full relative">
          <img 
            src={proposal.host?.photos[0]} 
            className="w-full h-full object-cover opacity-40 blur-md scale-110" 
            alt="Host"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
             <div className="w-24 h-24 rounded-full border-4 border-white/20 overflow-hidden mb-6 shadow-2xl">
                <img src={proposal.host?.photos[0]} className="w-full h-full object-cover" />
             </div>
             <p className="text-white/40 text-sm font-black uppercase tracking-widest mb-2">Photo Experience</p>
             <h3 className="text-white text-3xl font-black tracking-tighter leading-tight">{proposal.title}</h3>
          </div>
        </div>
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/95 flex flex-col justify-end p-6 pb-32">
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4 group cursor-pointer" onClick={() => onViewHost(proposal.hostId)}>
              <div className="w-12 h-12 rounded-2xl border-2 border-white/50 overflow-hidden shadow-lg">
                <img src={proposal.host?.photos[0]} className="w-full h-full object-cover" />
              </div>
              <div className="text-white">
                <h4 className="font-black text-lg drop-shadow-md">{proposal.host?.name}, {proposal.host?.age}</h4>
                <p className="text-[10px] text-white/80 font-black uppercase tracking-widest flex items-center gap-1">
                  <i className="fas fa-location-dot text-indigo-400"></i> {proposal.location}
                </p>
              </div>
            </div>

            <h3 className="text-3xl font-black text-white mb-2 leading-tight tracking-tight drop-shadow-lg">{proposal.title}</h3>
            <p className="text-white/80 text-sm line-clamp-2 mb-6 italic font-medium leading-snug">"{proposal.description}"</p>

            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10">
                <p className="text-[9px] text-white/50 font-black uppercase tracking-widest mb-0.5">Price</p>
                <p className="text-lg font-black text-white">₹{proposal.price}</p>
              </div>
              <div className="bg-indigo-600/30 backdrop-blur-xl px-4 py-2 rounded-2xl border border-indigo-500/30">
                <p className="text-[9px] text-indigo-200/50 font-black uppercase tracking-widest mb-0.5">Plan</p>
                <p className="text-sm font-black text-indigo-100">{proposal.paymentPreference}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-center">
            <button className="flex flex-col items-center gap-1 group active-pop">
               <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 shadow-xl">
                  <i className="fas fa-heart text-2xl group-hover:text-red-500 transition-colors"></i>
               </div>
               <span className="text-white text-[10px] font-black uppercase tracking-tighter drop-shadow-md">Interested</span>
            </button>
            <button 
              onClick={() => onChat(proposal.id)}
              className="flex flex-col items-center gap-1 group active-pop"
            >
               <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 shadow-xl">
                  <i className="fas fa-comment-dots text-2xl group-hover:text-indigo-400 transition-colors"></i>
               </div>
               <span className="text-white text-[10px] font-black uppercase tracking-tighter drop-shadow-md">Free Chat</span>
            </button>
            <button 
              onClick={() => onRequest(proposal.id)}
              className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-indigo-600/50 border-2 border-indigo-400 animate-pulse hover:scale-110 active:scale-90 transition-all"
            >
               <i className="fas fa-bolt text-3xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReelsView: React.FC<{ proposals: DateProposal[], onRequest: (id: string) => void, onChat: (id: string) => void, onViewHost: (id: string) => void, onExit: () => void }> = ({ proposals, onRequest, onChat, onViewHost, onExit }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  // We show all proposals in Reels, even if they don't have video, using the new fallback
  const items = proposals;

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="fixed inset-0 bg-black z-[80] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
    >
      {/* Feed Header */}
      <div className="fixed top-0 left-0 right-0 z-[90] p-6 pt-12 flex items-center justify-between text-white bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center gap-3">
           <button onClick={onExit} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
              <i className="fas fa-arrow-left"></i>
           </button>
           <h2 className="font-black text-xl tracking-tighter uppercase">Experiences</h2>
        </div>
        <div className="flex items-center gap-4">
           <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
           <p className="text-[10px] font-black tracking-widest uppercase opacity-70">Live Feed</p>
        </div>
      </div>

      {items.length > 0 ? (
        items.map((proposal, i) => (
          <ReelItem 
            key={proposal.id} 
            proposal={proposal} 
            isActive={i === activeIndex} 
            onRequest={onRequest}
            onChat={onChat}
            onViewHost={onViewHost}
          />
        ))
      ) : (
        <div className="h-full flex items-center justify-center text-white p-10 text-center bg-neutral-900">
          <div className="max-w-xs">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
               <i className="fas fa-film text-4xl opacity-20"></i>
            </div>
            <h3 className="text-2xl font-black mb-4">The Feed is Quiet</h3>
            <p className="text-white/40 mb-8 font-medium">Be the first to post a video experience and get discovered by thousands.</p>
            <button onClick={onExit} className="bg-indigo-600 px-8 py-4 rounded-3xl font-black shadow-xl shadow-indigo-600/20 active-pop">Go Back</button>
          </div>
        </div>
      )}
    </div>
  );
};
