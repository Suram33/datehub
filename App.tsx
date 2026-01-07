
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { DateProposal, User, ActivityType, PaymentPreference, Chat, Message } from './types';
import { INITIAL_PROPOSALS } from './constants';

/** --- GEMINI SERVICE --- **/
// Correct initialization: Always use a named parameter and direct reference to process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const enhanceWithAI = async (text: string) => {
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Refine this date description to be cool and punchy (under 100 chars): "${text}"`
    });
    return res.text || text;
  } catch { return text; }
};

/** --- MAIN APP COMPONENT --- **/
const App: React.FC = () => {
  const [proposals, setProposals] = useState<DateProposal[]>(INITIAL_PROPOSALS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<'Discover' | 'Inbox' | 'Reels' | 'Profile'>('Discover');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<DateProposal | null>(null);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('datehub_data');
    if (saved) {
      const { user, chatList, propList } = JSON.parse(saved);
      if (user) setCurrentUser(user);
      if (chatList) setChats(chatList);
      if (propList) setProposals(propList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('datehub_data', JSON.stringify({ user: currentUser, chatList: chats, propList: proposals }));
  }, [currentUser, chats, proposals]);

  const handleQuickChat = (proposalId: string) => {
    const p = proposals.find(item => item.id === proposalId);
    if (!p || !currentUser) return;
    const existing = chats.find(c => c.proposalId === p.id);
    if (existing) { setActiveChatId(existing.id); setView('Inbox'); setSelectedProposal(null); return; }
    const newChat: Chat = {
      id: `c${Date.now()}`, proposalId: p.id, participants: [currentUser, p.host!],
      messages: [], lastMessage: 'Chat started!'
    };
    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
    setView('Inbox');
    setSelectedProposal(null);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-6 text-white text-center">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20">
          <h1 className="text-4xl font-black mb-4">DateHub</h1>
          <p className="mb-8 opacity-80">Experience dating for real people.</p>
          <button 
            onClick={() => setCurrentUser({ id: 'me', name: 'User', age: 24, bio: 'Ready to date!', photos: ['https://picsum.photos/seed/me/400/400'], location: 'Mumbai', rating: 5, reviewCount: 0 })}
            className="w-full bg-white text-indigo-600 font-black py-4 rounded-2xl shadow-xl"
          >
            Enter App
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pb-20 md:pb-0">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col p-6 sticky top-0 h-screen">
        <div className="text-2xl font-black mb-10 text-indigo-600">DateHub</div>
        <nav className="space-y-4 flex-1">
          {['Discover', 'Reels', 'Inbox', 'Profile'].map((v: any) => (
            <button 
              key={v} onClick={() => setView(v)}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${view === v ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              {v}
            </button>
          ))}
        </nav>
        <button onClick={() => setIsCreateOpen(true)} className="bg-indigo-600 text-white py-4 rounded-xl font-black">Post Activity</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
        {view === 'Discover' && (
          <div>
            <h2 className="text-4xl font-black mb-8">Discover Experiences</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {proposals.map(p => (
                <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-4">
                  <img src={p.host?.photos[0]} className="h-48 w-full object-cover rounded-2xl mb-4" />
                  <h3 className="font-black text-xl">{p.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{p.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-black text-indigo-600 text-lg">₹{p.price}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase">{p.location}</span>
                  </div>
                  <button onClick={() => setSelectedProposal(p)} className="w-full bg-indigo-50 text-indigo-600 py-3 rounded-xl font-black text-sm">View Details</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'Inbox' && (
          <div className="max-w-4xl mx-auto h-[70vh] bg-white rounded-3xl shadow-sm border border-gray-100 flex">
            <div className="w-1/3 border-r border-gray-50 p-4 space-y-2">
              {chats.map(c => (
                <button key={c.id} onClick={() => setActiveChatId(c.id)} className={`w-full p-4 rounded-2xl text-left ${activeChatId === c.id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-50'}`}>
                  <p className="font-black truncate">{c.participants.find(p => p.id !== currentUser.id)?.name}</p>
                </button>
              ))}
            </div>
            <div className="flex-1 p-6 flex flex-col items-center justify-center opacity-40">
              <i className="fas fa-paper-plane text-4xl mb-4"></i>
              <p className="font-bold">Select a chat to begin planning</p>
            </div>
          </div>
        )}

        {view === 'Profile' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 text-center">
              <img src={currentUser.photos[0]} className="w-32 h-32 rounded-[2rem] mx-auto mb-6 object-cover border-4 border-indigo-50" />
              <h2 className="text-3xl font-black mb-2">{currentUser.name}, {currentUser.age}</h2>
              <p className="text-gray-400 font-bold mb-8">{currentUser.location}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-6 rounded-3xl">
                  <p className="text-2xl font-black">0</p>
                  <p className="text-[10px] uppercase font-black text-gray-400">Date Requests</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl">
                  <p className="text-2xl font-black">{currentUser.rating}</p>
                  <p className="text-[10px] uppercase font-black text-gray-400">Host Rating</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 h-20 flex justify-around items-center px-4">
        {['Discover', 'Reels', 'Inbox', 'Profile'].map((v: any) => (
          <button key={v} onClick={() => setView(v)} className={`flex-1 text-xs font-black ${view === v ? 'text-indigo-600' : 'text-gray-300'}`}>{v}</button>
        ))}
      </nav>

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8">
            <h2 className="text-2xl font-black mb-6">Post an Experience</h2>
            <form onSubmit={(e) => { e.preventDefault(); setIsCreateOpen(false); }} className="space-y-4">
              <input required placeholder="Activity Title" className="w-full bg-gray-50 p-4 rounded-xl outline-none border-0 font-bold" />
              <textarea required placeholder="What's the plan?" className="w-full bg-gray-50 p-4 rounded-xl h-24 outline-none border-0" />
              <div className="flex gap-4">
                <input required type="number" placeholder="Budget (₹)" className="flex-1 bg-gray-50 p-4 rounded-xl outline-none" />
                <input required type="text" placeholder="Location" className="flex-1 bg-gray-50 p-4 rounded-xl outline-none" />
              </div>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black shadow-xl shadow-indigo-100">Publish Now</button>
              <button type="button" onClick={() => setIsCreateOpen(false)} className="w-full text-gray-400 font-bold">Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row h-[80vh]">
            <img src={selectedProposal.host?.photos[0]} className="w-full md:w-1/2 object-cover" />
            <div className="p-10 flex flex-col flex-1">
              <h2 className="text-4xl font-black mb-4">{selectedProposal.title}</h2>
              <p className="text-gray-500 mb-8 flex-1 italic">"{selectedProposal.description}"</p>
              <div className="bg-gray-50 p-6 rounded-2xl mb-8 flex justify-between">
                <div><p className="text-xs font-bold text-gray-400">Budget</p><p className="font-black text-xl">₹{selectedProposal.price}</p></div>
                <div><p className="text-xs font-bold text-gray-400">Where</p><p className="font-black text-xl">{selectedProposal.location}</p></div>
              </div>
              <button onClick={() => handleQuickChat(selectedProposal.id)} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-2xl">Send Date Request</button>
              <button onClick={() => setSelectedProposal(null)} className="mt-4 text-gray-400 font-bold">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
