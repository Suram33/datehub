
import React, { useState } from 'react';
import { User, Review } from '../types';

interface ReviewSectionProps {
  user: User;
  onAddReview: (rating: number, comment: string) => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ user, onAddReview }) => {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddReview(newRating, newComment);
    setNewComment('');
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-gray-900">Ratings & Reviews</h3>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="text-indigo-600 font-bold text-sm hover:underline"
        >
          {isFormOpen ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-indigo-50/50 border border-indigo-100 p-6 rounded-[32px] animate-in slide-in-from-top duration-300">
          <p className="font-bold text-gray-800 mb-4">How was your date with {user.name}?</p>
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewRating(star)}
                className={`text-2xl transition-all ${star <= newRating ? 'text-yellow-400 scale-110' : 'text-gray-300'}`}
              >
                <i className="fas fa-star"></i>
              </button>
            ))}
          </div>
          <textarea
            required
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your experience..."
            className="w-full bg-white border-0 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 h-24 resize-none transition-all outline-none text-sm mb-4 shadow-sm"
          />
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
          >
            Submit Feedback
          </button>
        </form>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-gray-50/50 p-6 rounded-[32px] border border-gray-100">
        <div className="text-center">
          <p className="text-5xl font-black text-gray-900 mb-1">{user.rating || 'N/A'}</p>
          <div className="text-yellow-400 text-sm mb-1">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{user.reviewCount || 0} Reviews</p>
        </div>
        <div className="md:col-span-2 space-y-2">
          {[5, 4, 3, 2, 1].map((num) => (
            <div key={num} className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-500 w-2">{num}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full" 
                  style={{ width: `${num === 5 ? 85 : num === 4 ? 10 : 5}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {user.reviews?.length ? (
          user.reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-50 pb-6 last:border-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src={review.reviewerPhoto} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{review.reviewerName}</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{review.timestamp}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 text-[10px] gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className={`fas fa-star ${i >= review.rating ? 'text-gray-200' : ''}`}></i>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                "{review.comment}"
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-10 opacity-40">
            <i className="fas fa-comments text-3xl mb-3"></i>
            <p className="text-sm font-medium">No reviews yet for this host.</p>
          </div>
        )}
      </div>
    </div>
  );
};
