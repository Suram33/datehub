
import React from 'react';

interface AgeVerificationProps {
  onResponse: (verified: boolean) => void;
}

export const AgeVerification: React.FC<AgeVerificationProps> = ({ onResponse }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500"></div>
      
      <div className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden p-10 text-center animate-in zoom-in slide-in-from-bottom duration-500">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transform -rotate-6">
          <i className="fas fa-user-shield text-3xl"></i>
        </div>
        
        <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
          Safety First
        </h2>
        
        <p className="text-gray-500 mb-10 font-medium text-lg leading-relaxed">
          DateHub is an adult-only community. To ensure a safe environment, please verify your age. 
          <br/><br/>
          <span className="text-gray-900 font-bold">Are you 18 or older?</span>
        </p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => onResponse(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-3xl shadow-xl shadow-indigo-100 transition-all transform active:scale-95"
          >
            Yes, I am 18+
          </button>
          
          <button 
            onClick={() => onResponse(false)}
            className="w-full bg-gray-50 hover:bg-gray-100 text-gray-400 font-bold py-5 rounded-3xl transition-all"
          >
            No, I am under 18
          </button>
        </div>
        
        <p className="mt-8 text-xs text-gray-400 font-medium">
          Age misrepresentation is a violation of our terms and may lead to permanent account suspension.
        </p>
      </div>
    </div>
  );
};
