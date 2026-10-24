import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, XCircle, ArrowLeft, Clock, ChevronRight } from 'lucide-react';

const orders = [
  { id: 'BM-2847', date: 'Today, 2:30 PM', items: 3, total: 4497, status: 'delivered', tracking: 'BM-TRK-2847', items_detail: ['Hydra Serum', 'Lipstick Set', 'Sunscreen'] },
  { id: 'BM-2845', date: 'Yesterday, 11:00 AM', items: 2, total: 5498, status: 'shipped', tracking: 'BM-TRK-2845', items_detail: ['Leather Jacket', 'Running Sneakers'] },
  { id: 'BM-2840', date: 'Oct 20, 2026', items: 1, total: 7999, status: 'processing', tracking: null, items_detail: ['Smart Watch Ultra'] },
  { id: 'BM-2835', date: 'Oct 15, 2026', items: 4, total: 1796, status: 'cancelled', tracking: null, items_detail: ['Coffee Beans', 'Dark Chocolate', 'Green Tea', 'Dried Fruits'] },
];

const statusConfig = {
  delivered: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10', label: 'Delivered' },
  shipped: { icon: Truck, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Shipped' },
  processing: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Processing' },
  cancelled: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10', label: 'Cancelled' },
};

export default function MyOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="min-h-screen bg-onyx-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => window.history.back()} className="p-2 hover:bg-onyx-800 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <h1 className="font-display font-bold text-white text-2xl">My Orders</h1>
            <p className="text-sm text-gray-500">{orders.length} orders total</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {['Delivered', 'Shipped', 'Processing', 'Cancelled'].map(status => {
            const count = orders.filter(o => o.status === status.toLowerCase()).length;
            return (
              <div key={status} className="bg-onyx-900 border border-onyx-800/50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-gold-400">{count}</p>
                <p className="text-xs text-gray-500">{status}</p>
              </div>
            );
          })}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map(order => {
            const config = statusConfig[order.status];
            return (
              <div key={order.id} className="bg-onyx-900 border border-onyx-800/50 rounded-2xl overflow-hidden hover:border-gold-500/20 transition-all">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${config.bg} rounded-xl flex items-center justify-center`}>
                        <config.icon className={`w-5 h-5 ${config.color}`} />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-gold-400">{order.id}</span>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`tag ${config.bg} ${config.color}`}>{config.label}</span>
                      <span className="font-bold text-white">₹{order.total}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {order.items_detail.slice(0, 3).map((item, i) => (
                        <div key={i} className="w-10 h-10 bg-onyx-800 rounded-lg flex items-center justify-center text-xs text-gray-500 border border-onyx-700/50">
                          {item[0]}
                        </div>
                      ))}
                      {order.items > 3 && (
                        <div className="w-10 h-10 bg-onyx-800 rounded-lg flex items-center justify-center text-xs text-gold-400 border border-onyx-700/50">
                          +{order.items - 3}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-1 text-sm text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      View Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-onyx-900 border border-onyx-700/50 rounded-2xl p-6 w-full max-w-md animate-scale-in" onClick={e => e.stopPropagation()}>
            <h3 className="font-display font-bold text-white text-lg mb-4">Order Details</h3>
            <div className="bg-onyx-800/50 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-400">Order #{selectedOrder.id}</p>
              <p className="text-lg font-bold text-gold-400">₹{selectedOrder.total}</p>
              {selectedOrder.tracking && (
                <p className="text-xs text-blue-400 mt-1">Tracking: {selectedOrder.tracking}</p>
              )}
            </div>
            <div className="space-y-2 mb-4">
              {selectedOrder.items_detail.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <Package className="w-4 h-4 text-gray-500" /> {item}
                </div>
              ))}
            </div>
            <button onClick={() => setSelectedOrder(null)} className="btn-primary w-full">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
