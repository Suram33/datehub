
import React, { useState, useEffect } from 'react';

export const TopBannerAd: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 py-2 overflow-hidden relative group cursor-pointer">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <span className="bg-white/20 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-white/30">Ad</span>
          <p className="text-xs md:text-sm font-bold truncate">Premium Membership: 50% Off Today! <span className="font-normal opacity-80 hidden sm:inline">Unlock unlimited date requests.</span></p>
        </div>
        <button className="text-[10px] font-black bg-white text-indigo-600 px-3 py-1 rounded-full whitespace-nowrap hover:bg-indigo-50 transition-colors uppercase">
          Claim Offer
        </button>
      </div>
      <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>
  );
};

export const BottomBannerAd: React.FC = () => {
  return (
    <div className="w-full bg-white border-t border-gray-100 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-4xl mx-auto px-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center text-gray-400">
          <i className="fas fa-image text-lg"></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="bg-gray-200 text-gray-500 text-[8px] font-bold px-1.5 py-0.5 rounded">SPONSORED</span>
            <p className="text-sm font-bold text-gray-900 truncate">Looking for the perfect gift?</p>
          </div>
          <p className="text-xs text-gray-500 truncate">Special curated flower boxes for your first date. Order now!</p>
        </div>
        <button className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl">Shop</button>
      </div>
    </div>
  );
};

interface InterstitialAdProps {
  onClose: () => void;
}

export const InterstitialAd: React.FC<InterstitialAdProps> = ({ onClose }) => {
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>
      
      <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="h-64 bg-indigo-600 relative overflow-hidden">
          <img src="https://picsum.photos/seed/ad/600/400" className="w-full h-full object-cover opacity-60" alt="Promoted" />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent"></div>
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest border border-white/20">Sponsored</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-2xl font-black text-white mb-1">DineOut Premium</h3>
            <p className="text-indigo-100 text-sm font-medium">Get 1+1 on Buffet at top restaurants.</p>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 text-2xl flex-shrink-0">
              <i className="fas fa-ticket-alt"></i>
            </div>
            <div>
              <p className="text-gray-900 font-bold text-lg leading-tight mb-1">Unlock Exclusive Date Discounts</p>
              <p className="text-gray-500 text-sm">Join over 1 Million foodies saving ₹20,000 yearly on date nights.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-3xl shadow-xl shadow-indigo-100 transition-all transform active:scale-95">
              Subscribe Now
            </button>
            <button 
              disabled={timer > 0}
              onClick={onClose}
              className={`w-full py-4 rounded-3xl font-bold transition-all ${timer > 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              {timer > 0 ? `Continue to DateHub in ${timer}s...` : 'Close Ad'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
