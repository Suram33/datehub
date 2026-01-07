
import React from 'react';
import { DateMemory } from '../types';

interface MemoryGalleryProps {
  memories: DateMemory[];
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ memories }) => {
  if (memories.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-xl font-black text-gray-900">Past Memories</h3>
        <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Verified experiences</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {memories.map((memory) => (
          <div key={memory.id} className="group relative aspect-square rounded-[24px] overflow-hidden border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
            <img src={memory.photoUrl} className="w-full h-full object-cover" alt={memory.activityTitle} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <p className="text-white text-xs font-black">{memory.activityTitle}</p>
              <p className="text-white/70 text-[10px]">{memory.date}</p>
            </div>
            {/* Memory Badge */}
            <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white text-[8px]">
               <i className="fas fa-camera"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
