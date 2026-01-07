
import React, { useState, useEffect, useRef } from 'react';
import { User, Message, Chat } from '../types';

interface ChatWindowProps {
  chat: Chat;
  currentUser: User;
  onSendMessage: (text: string) => void;
  onBack: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chat, currentUser, onSendMessage, onBack }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const otherUser = chat.participants.find(p => p.id !== currentUser.id) || chat.participants[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full bg-white md:rounded-[40px] shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-100 flex items-center gap-4 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="md:hidden text-gray-400 hover:text-indigo-600 p-2">
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-indigo-50">
          <img src={otherUser.photos[0]} className="w-full h-full object-cover" alt={otherUser.name} />
        </div>
        <div>
          <h3 className="font-black text-gray-900 leading-tight">{otherUser.name}</h3>
          <p className="text-xs text-green-500 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Online
          </p>
        </div>
        <button className="ml-auto text-gray-300 hover:text-indigo-600 p-2">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-hide">
        {chat.messages.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm font-medium italic">Your date request was accepted! <br/> Start the conversation below.</p>
          </div>
        )}
        {chat.messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-5 py-3 rounded-[24px] text-sm font-medium shadow-sm ${
                isMe 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-700 rounded-bl-none'
              }`}>
                {msg.text}
                <p className={`text-[10px] mt-1 opacity-60 ${isMe ? 'text-right' : 'text-left'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 md:p-6 border-t border-gray-100 bg-white">
        <div className="relative flex items-center gap-3">
          <button type="button" className="text-gray-300 hover:text-indigo-600 transition-colors">
            <i className="fas fa-plus-circle text-xl"></i>
          </button>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
          />
          <button 
            type="submit" 
            disabled={!inputText.trim()}
            className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};
