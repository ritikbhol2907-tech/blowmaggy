import { useState } from 'react';
import { Package, Truck, CheckCircle, XCircle, ArrowLeft, Clock, Tag, RefreshCw } from 'lucide-react';

const orders = [
  { id: 'BM-2847', date: 'Today, 2:30 PM', items: 3, total: 4497, status: 'delivered' },
  { id: 'BM-2845', date: 'Yesterday, 11:00 AM', items: 2, total: 5498, status: 'shipped' },
  { id: 'BM-2840', date: 'Oct 20, 2026', items: 1, total: 7999, status: 'processing' },
];

export default function Returns() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [myReturns, setMyReturns] = useState([
    { id: 'RET-003', order: 'BM-2830', status: 'approved', refund: 1999, date: 'Oct 18' },
  ]);

  const handleSubmit = () => {
    if (reason) {
      const retId = `RET-${(myReturns.length + 4).toString().padStart(3, '0')}`;
      setMyReturns(prev => [...prev, { id: retId, order: selectedOrder?.id, status: 'reviewing', refund: selectedOrder?.total || 0, date: 'Today' }]);
      setSubmitted(true);
      setTimeout(() => {
        setSelectedOrder(null);
        setReason('');
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-onyx-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => window.history.back()} className="p-2 hover:bg-onyx-800 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <h1 className="font-display font-bold text-white text-2xl">Returns & Refunds</h1>
            <p className="text-sm text-gray-500">30-day hassle-free returns</p>
          </div>
        </div>

        {/* Return Policy Banner */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/30 rounded-2xl p-6 mb-8">
          <h3 className="font-display font-bold text-white mb-3">Easy Return Policy</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Package className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300 font-medium">Free Pickup</p>
              <p className="text-xs text-gray-500">We come to you</p>
            </div>
            <div>
              <RefreshCw className="w-8 h-8 text-gold-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300 font-medium">Quick Refund</p>
              <p className="text-xs text-gray-500">Within 5-7 days</p>
            </div>
            <div>
              <Tag className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300 font-medium">No Questions</p>
              <p className="text-xs text-gray-500">30-day window</p>
            </div>
          </div>
        </div>

        {/* My Returns */}
        <h3 className="font-display font-bold text-white text-lg mb-4">My Returns</h3>
        {myReturns.map(ret => (
          <div key={ret.id} className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-5 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-gold-400">{ret.id}</span>
                <p className="text-sm text-gray-400">Order #{ret.order} · ₹{ret.refund} refund</p>
              </div>
              <span className={`tag ${ret.status === 'approved' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                {ret.status}
              </span>
            </div>
          </div>
        ))}

        {/* Start Return */}
        <h3 className="font-display font-bold text-white text-lg mb-4">Start a New Return</h3>
        <div className="space-y-3 mb-6">
          {orders.filter(o => o.status === 'delivered').map(order => (
            <div key={order.id} className="bg-onyx-900 border border-onyx-800/50 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-white">{order.id}</span>
                <p className="text-xs text-gray-500">₹{order.total} · {order.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(order)}
                className="px-4 py-2 bg-gold-500/10 text-gold-400 rounded-xl text-sm hover:bg-gold-500/20 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-4 h-4" /> Return
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Return Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-onyx-900 border border-onyx-700/50 rounded-2xl p-6 w-full max-w-md animate-scale-in" onClick={e => e.stopPropagation()}>
            <h3 className="font-display font-bold text-white text-lg mb-4">Return Order #{selectedOrder.id}</h3>
            <p className="text-sm text-gray-400 mb-4">Refund amount: <span className="text-gold-400 font-bold">₹{selectedOrder.total}</span></p>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-white font-semibold">Return Request Submitted!</p>
                <p className="text-sm text-gray-500 mt-1">We will process your refund within 5-7 business days</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Return Reason</label>
                  <select value={reason} onChange={(e) => setReason(e.target.value)} className="input-dark w-full">
                    <option value="">Select a reason</option>
                    <option value="wrong-size">Wrong Size</option>
                    <option value="damaged">Damaged Item</option>
                    <option value="not-as-described">Not as Described</option>
                    <option value="changed-mind">Changed Mind</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Additional Notes (optional)</label>
                  <textarea placeholder="Describe the issue..." className="input-dark w-full h-20 resize-none" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setSelectedOrder(null)} className="btn-outline flex-1">Cancel</button>
                  <button onClick={handleSubmit} className="btn-primary flex-1">Submit Return</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
