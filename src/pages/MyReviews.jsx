import { useState } from 'react';
import { Star, Edit, Trash2 } from 'lucide-react';

const myReviews = [
  { id: 1, product: 'Hyaluronic Acid Serum', rating: 5, text: 'Amazing serum! My skin feels so hydrated and glowing after just one week of use.', date: 'Oct 20, 2026', helpful: 23, verified: true },
  { id: 2, product: 'Smart Watch Ultra', rating: 4, text: 'Great watch overall. Battery could be better but the features are amazing.', date: 'Oct 15, 2026', helpful: 15, verified: true },
  { id: 3, product: 'Italian Leather Jacket', rating: 5, text: 'Premium quality leather. The stitching and finish is top notch. Worth every rupee!', date: 'Oct 10, 2026', helpful: 31, verified: true },
];

export default function MyReviews() {
  const [reviews, setReviews] = useState(myReviews);
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(5);

  const handleEdit = (review) => {
    setEditing(review.id);
    setEditText(review.text);
    setEditRating(review.rating);
  };

  const handleSaveEdit = () => {
    setReviews(prev => prev.map(r => r.id === editing ? { ...r, text: editText, rating: editRating } : r));
    setEditing(null);
  };

  const handleDelete = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-onyx-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-white text-2xl">My Reviews</h1>
            <p className="text-sm text-gray-500">{reviews.length} reviews written</p>
          </div>
          <span className="tag bg-gold-500/10 text-gold-400">{reviews.reduce((s, r) => s + r.rating, 0) / reviews.length} avg rating</span>
        </div>

        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-5 hover:border-gold-500/20 transition-all">
              {editing === review.id ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-400">{review.product}</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} onClick={() => setEditRating(star)}>
                        <Star className={`w-5 h-5 ${star <= editRating ? 'text-gold-400 fill-gold-400' : 'text-gray-600'}`} />
                      </button>
                    ))}
                  </div>
                  <textarea value={editText} onChange={(e) => setEditText(e.target.value)} className="input-dark w-full h-20 resize-none" />
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(null)} className="btn-outline py-2 px-4 text-sm">Cancel</button>
                    <button onClick={handleSaveEdit} className="btn-primary py-2 px-4 text-sm">Save</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white">{review.product}</span>
                      {review.verified && <span className="tag bg-green-500/10 text-green-400 text-[10px]">Verified</span>}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-gold-400 fill-gold-400' : 'text-gray-700'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{review.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{review.date} · {review.helpful} found this helpful</span>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(review)} className="p-1.5 hover:bg-onyx-800 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-500 hover:text-gold-400" />
                      </button>
                      <button onClick={() => handleDelete(review.id)} className="p-1.5 hover:bg-onyx-800 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-400" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
