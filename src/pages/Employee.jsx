import { useState } from 'react';
import {
  ClipboardList, Package, LogOut, Star, TrendingUp,
  Clock, CheckCircle, XCircle, Bell, Truck
} from 'lucide-react';

const pendingOrders = [
  { id: 'BM-2850', customer: 'Rahul M.', items: 2, total: 2499, priority: 'high', time: '5 min ago', status: 'pending' },
  { id: 'BM-2849', customer: 'Priya S.', items: 1, total: 1299, priority: 'medium', time: '15 min ago', status: 'pending' },
  { id: 'BM-2848', customer: 'Ananya P.', items: 3, total: 3597, priority: 'low', time: '1 hr ago', status: 'pending' },
];

const returns = [
  { id: 'RET-001', customer: 'Vikram S.', reason: 'Wrong size', status: 'pending', amount: 1999, time: '2 hr ago' },
  { id: 'RET-002', customer: 'Sneha G.', reason: 'Damaged item', status: 'reviewing', amount: 899, time: '1 day ago' },
];

const tasks = [
  { id: 1, type: 'ship', order: 'BM-2847', status: 'completed', time: 'done 30m ago' },
  { id: 2, type: 'review', order: 'BM-2845', status: 'in-progress', time: 'started 1 hr ago' },
];

const statusColors = {
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  low: 'bg-green-500/10 text-green-400 border-green-500/20',
  pending: 'bg-amber-500/10 text-amber-400',
  'in-progress': 'bg-blue-500/10 text-blue-400',
  completed: 'bg-green-500/10 text-green-400',
  reviewing: 'bg-purple-500/10 text-purple-400',
};

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [shipNotes, setShipNotes] = useState('');
  const [notification, setNotification] = useState('');

  const handleShipOrder = () => {
    setNotification(`Order ${selectedOrder?.id} marked as shipped!`);
    setSelectedOrder(null);
    setShipNotes('');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleProcessReturn = (returnId) => {
    setNotification(`Return ${returnId} approved for refund!`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="min-h-screen bg-onyx-950">
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl animate-slide-in flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {notification}
        </div>
      )}

      {/* Header */}
      <div className="bg-onyx-900/80 backdrop-blur-xl border-b border-onyx-800/50 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
              👤
            </div>
            <div>
              <h1 className="font-display font-bold text-white">Employee Dashboard</h1>
              <p className="text-sm text-gray-500">Hi Sneha! You have {pendingOrders.length} pending orders</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-onyx-800 rounded-xl relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4 max-w-7xl mx-auto overflow-x-auto">
          {[
            { id: 'orders', label: 'Orders', icon: ClipboardList },
            { id: 'returns', label: 'Returns', icon: LogOut },
            { id: 'inventory', label: 'Inventory', icon: Package },
            { id: 'reviews', label: 'Reviews', icon: Star },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-onyx-800/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Orders Processed', value: '156', icon: Package, color: 'from-blue-500 to-cyan-500', change: '+12 today' },
            { label: 'Pending Orders', value: String(pendingOrders.length), icon: Clock, color: 'from-amber-500 to-yellow-500', change: 'Needs action' },
            { label: 'Returns Today', value: '3', icon: LogOut, color: 'from-purple-500 to-violet-500', change: '2 approved' },
            { label: 'Reviews Reviewed', value: '42', icon: Star, color: 'from-green-500 to-emerald-500', change: '+8 today' },
          ].map((stat, i) => (
            <div key={i} className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-gray-500">{stat.change}</span>
              </div>
              <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-white">Pending Orders to Ship</h3>
              <span className="tag bg-blue-500/10 text-blue-400">{pendingOrders.length} pending</span>
            </div>
            {pendingOrders.map(order => (
              <div key={order.id} className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-5 hover:border-blue-500/20 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Truck className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gold-400">{order.id}</span>
                        <span className={`tag text-[10px] border ${statusColors[order.priority]}`}>
                          {order.priority} priority
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{order.customer} · {order.items} items · ${order.total}</p>
                      <p className="text-xs text-gray-600">{order.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <Truck className="w-4 h-4" /> Ship Order
                    </button>
                    <button className="px-4 py-2 bg-onyx-800 hover:bg-onyx-700 text-gray-300 rounded-xl text-sm transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Tasks */}
            <h3 className="font-display font-bold text-white mt-6">Today's Tasks</h3>
            <div className="space-y-2">
              {tasks.map(task => (
                <div key={task.id} className="bg-onyx-900 border border-onyx-800/50 rounded-xl p-3 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${task.status === 'completed' ? 'bg-green-400' : 'bg-blue-400'}`} />
                  <span className="text-sm text-gray-300">{task.type === 'ship' ? '📦 Ship' : '⭐ Review'} order {task.order}</span>
                  <span className={`tag text-[10px] ${statusColors[task.status]}`}>{task.status}</span>
                  <span className="text-xs text-gray-600 ml-auto">{task.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Returns Tab */}
        {activeTab === 'returns' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-white">Return Requests</h3>
              <span className="tag bg-amber-500/10 text-amber-400">{returns.length} pending</span>
            </div>
            {returns.map(ret => (
              <div key={ret.id} className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-gold-400">{ret.id}</span>
                      <span className={`tag text-[10px] ${statusColors[ret.status]}`}>{ret.status}</span>
                    </div>
                    <p className="text-sm text-gray-400">{ret.customer} · {ret.reason}</p>
                    <p className="text-xs text-gray-600">Refund: ₹{ret.amount} · {ret.time}</p>
                  </div>
                  <div className="flex gap-2">
                    {ret.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleProcessReturn(ret.id)}
                          className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-xl text-sm font-medium transition-colors"
                        >
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm transition-colors">
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-white">Inventory Updates</h3>
              <button className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-sm hover:bg-blue-500/20 transition-colors flex items-center gap-1">
                <ClipboardList className="w-4 h-4" /> Update Stock
              </button>
            </div>
            {[
              { name: 'Italian Leather Jacket', sku: 'FASH-001', stock: 23, status: 'in-stock' },
              { name: 'Hyaluronic Acid Serum', sku: 'BEAU-001', stock: 5, status: 'low-stock' },
              { name: 'Smart Watch Ultra', sku: 'ELEC-001', stock: 0, status: 'out-of-stock' },
              { name: 'Colombian Coffee Beans', sku: 'GROC-001', stock: 156, status: 'in-stock' },
            ].map((item, i) => (
              <div key={i} className="bg-onyx-900 border border-onyx-800/50 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-white">{item.name}</p>
                  <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`tag text-[10px] ${
                    item.status === 'in-stock' ? 'bg-green-500/10 text-green-400' :
                    item.status === 'low-stock' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {item.stock === 0 ? 'Out of Stock' : item.stock < 10 ? 'Low Stock' : 'In Stock'} ({item.stock})
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h3 className="font-display font-bold text-white">Reviews to Moderate</h3>
            {[
              { product: 'Hyaluronic Acid Serum', rating: 5, text: 'Amazing product! Skin feels so hydrated.', flagged: false, time: '2 hr ago' },
              { product: 'Smart Watch Ultra', rating: 2, text: 'Battery dies too fast. Not worth the price.', flagged: true, time: '5 hr ago' },
              { product: 'Italian Leather Jacket', rating: 4, text: 'Great quality leather, but sizing is off.', flagged: false, time: '1 day ago' },
            ].map((review, i) => (
              <div key={i} className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gold-400 font-medium">{review.product}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <span key={j} className={`text-xs ${j < review.rating ? 'text-gold-400' : 'text-gray-700'}`}>★</span>
                        ))}
                      </div>
                      {review.flagged && <span className="tag bg-red-500/10 text-red-400 text-[10px]">Flagged</span>}
                    </div>
                    <p className="text-sm text-gray-400">{review.text}</p>
                    <p className="text-xs text-gray-600 mt-1">{review.time}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg text-xs hover:bg-green-500/20 transition-colors">Approve</button>
                    <button className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition-colors">Hide</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ship Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-onyx-900 border border-onyx-700/50 rounded-2xl p-6 w-full max-w-md animate-scale-in" onClick={e => e.stopPropagation()}>
            <h3 className="font-display font-bold text-white text-lg mb-4">Ship Order {selectedOrder.id}</h3>
            <div className="space-y-4">
              <div className="bg-onyx-800/50 rounded-xl p-4">
                <p className="text-sm text-gray-400">{selectedOrder.customer}</p>
                <p className="text-lg font-bold text-white mt-1">₹{selectedOrder.total}</p>
                <p className="text-xs text-gray-500 mt-1">{selectedOrder.items} items · {selectedOrder.priority} priority</p>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Tracking Number</label>
                <input type="text" placeholder="Enter tracking number" className="input-dark w-full" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Notes</label>
                <textarea value={shipNotes} onChange={(e) => setShipNotes(e.target.value)} placeholder="Optional shipping notes" className="input-dark w-full h-20 resize-none" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setSelectedOrder(null)} className="btn-outline flex-1">Cancel</button>
                <button onClick={handleShipOrder} className="btn-primary flex-1">Confirm Shipment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
