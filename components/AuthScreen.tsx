
import React from 'react';

interface AuthScreenProps {
  onGoogleLogin: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onGoogleLogin }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
      {/* Visual Side */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-40"></div>
        <div className="relative z-10 text-white p-20">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8 border border-white/30">
            <i className="fas fa-heart text-2xl"></i>
          </div>
          <h1 className="text-7xl font-black tracking-tighter mb-6 leading-[0.9]">Experience <br/>Over Swipes.</h1>
          <p className="text-indigo-100 text-xl max-w-md font-medium leading-relaxed">
            The first dating app that prioritizes the activity. Join 50k+ people planning real dates tonight.
          </p>
          
          <div className="mt-12 flex -space-x-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-2 border-indigo-600 overflow-hidden">
                <img src={`https://picsum.sh/seed/p${i}/100/100`} alt="user" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-2 border-indigo-600 bg-white/20 backdrop-blur-md flex items-center justify-center text-xs font-bold text-white">
              +50k
            </div>
          </div>
        </div>
      </div>

      {/* Auth Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-20 relative">
        <div className="md:hidden absolute top-8 left-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <i className="fas fa-heart"></i>
            </div>
            <span className="font-black text-xl">DateHub</span>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-4xl font-black text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-500 mb-10 font-medium">Join the community and start planning your next great adventure.</p>

          <div className="space-y-4">
            <button 
              onClick={onGoogleLogin}
              className="w-full border-2 border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 flex items-center justify-center gap-4 py-4 rounded-3xl transition-all active:scale-[0.98] font-bold text-gray-700 shadow-sm"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
              Sign in with Google
            </button>
            
            <button className="w-full border-2 border-gray-100 hover:border-gray-200 flex items-center justify-center gap-4 py-4 rounded-3xl transition-all font-bold text-gray-700">
              <i className="fas fa-envelope text-gray-400"></i>
              Continue with Email
            </button>
          </div>

          <div className="mt-12 pt-12 border-t border-gray-50 text-center">
            <p className="text-sm text-gray-400 leading-relaxed">
              By continuing, you agree to DateHub's <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
