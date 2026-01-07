
import React from 'react';
import { AppNotification } from '../types';

interface NotificationCenterProps {
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  notifications, 
  onMarkAsRead, 
  onClearAll,
  onClose 
}) => {
  return (
    <div className="absolute top-20 right-4 w-full max-w-[360px] bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-in slide-in-from-top-4 duration-300">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <h3 className="text-lg font-black text-gray-900 tracking-tight">Activity</h3>
        <button 
          onClick={onClearAll}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
        >
          Clear All
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
        {notifications.length === 0 ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <i className="fas fa-bell-slash text-xl"></i>
            </div>
            <p className="text-sm font-bold text-gray-400">Nothing here yet!</p>
            <p className="text-xs text-gray-300 mt-1">We'll notify you when dates are confirmed.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-5 hover:bg-gray-50 transition-colors cursor-pointer relative group ${!notif.isRead ? 'bg-indigo-50/30' : ''}`}
                onClick={() => onMarkAsRead(notif.id)}
              >
                {!notif.isRead && (
                  <div className="absolute top-6 left-2 w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                )}
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-sm ${
                    notif.type === 'reminder' ? 'bg-orange-100 text-orange-600' : 
                    notif.type === 'message' ? 'bg-indigo-100 text-indigo-600' : 
                    'bg-green-100 text-green-600'
                  }`}>
                    <i className={`fas ${
                      notif.type === 'reminder' ? 'fa-calendar-check' : 
                      notif.type === 'message' ? 'fa-comment-alt' : 
                      'fa-check-circle'
                    }`}></i>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 mb-0.5 truncate">{notif.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed mb-2 line-clamp-2">{notif.message}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                      {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-50 text-center">
        <button onClick={onClose} className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600">
          Close Panel
        </button>
      </div>
    </div>
  );
};
