import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, Users, TrendingUp, DollarSign, Package,
  BarChart3, Settings, Eye, Edit, Trash2, ArrowUpRight, ArrowDownRight,
  Search, Bell, Download, Plus, Filter, Calendar, Store, MessageCircle,
  Zap, CreditCard, ShieldCheck
} from 'lucide-react';
import { products } from '../data/products';

const deptStats = [
  { name: 'Fashion', orders: 1234, revenue: 98450, growth: 12.5, color: 'from-rose-500 to-pink-500', icon: '👕' },
  { name: 'Beauty', orders: 987, revenue: 67230, growth: 8.3, color: 'from-fuchsia-500 to-purple-500', icon: '✨' },
  { name: 'Electronics', orders: 756, revenue: 145600, growth: 15.7, color: 'from-blue-500 to-indigo-500', icon: '💻' },
  { name: 'Home', orders: 654, revenue: 54320, growth: 6.2, color: 'from-amber-500 to-orange-500', icon: '🏠' },
  { name: 'Grocery', orders: 2345, revenue: 32100, growth: 22.1, color: 'from-emerald-500 to-green-500', icon: '🛍️' },
  { name: 'Kids', orders: 543, revenue: 41200, growth: 18.4, color: 'from-violet-500 to-purple-500', icon: '😊' },
];

const recentOrders = [
  { id: 'BM-2847', customer: 'Priya Sharma', items: 3, total: 149.97, status: 'Delivered', date: '2 min ago' },
  { id: 'BM-2846', customer: 'Rahul Mehta', items: 1, total: 199.99, status: 'Processing', date: '15 min ago' },
  { id: 'BM-2845', customer: 'Ananya Patel', items: 5, total: 89.95, status: 'Shipping', date: '1 hr ago' },
  { id: 'BM-2844', customer: 'Vikram Singh', items: 2, total: 119.98, status: 'Delivered', date: '3 hr ago' },
  { id: 'BM-2843', customer: 'Sneha Gupta', items: 4, total: 234.96, status: 'Delivered', date: '5 hr ago' },
  { id: 'BM-2842', customer: 'Arjun Kapoor', items: 1, total: 79.99, status: 'Cancelled', date: '1 day ago' },
];

const topProducts = products.sort((a, b) => b.reviews - a.reviews).slice(0, 5);

const statusColors = {
  Delivered: 'bg-green-500/10 text-green-400',
  Processing: 'bg-blue-500/10 text-blue-400',
  Shipping: 'bg-amber-500/10 text-amber-400',
  Cancelled: 'bg-red-500/10 text-red-400',
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [flashSaleOpen, setFlashSaleOpen] = useState(false);
  const [flashSaleData, setFlashSaleData] = useState({ title: '', discount: '', endTime: '' });

  const totalRevenue = deptStats.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = deptStats.reduce((s, d) => s + d.orders, 0);
  const weeklyData = [32, 45, 38, 52, 48, 61, 55];

  const handleCreateFlashSale = () => {
    if (flashSaleData.title && flashSaleData.discount) {
      setFlashSaleOpen(false);
      setFlashSaleData({ title: '', discount: '', endTime: '' });
    }
  };

  return (
    <div className="min-h-screen bg-onyx-950">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-onyx-900 border-r border-onyx-800/50 p-6 z-40 hidden lg:block">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center">
            <span className="text-onyx-950 font-heading font-black text-lg">B</span>
          </div>
          <div>
            <h2 className="font-heading font-black text-lg text-white">BLOW</h2>
            <p className="text-[10px] text-gray-500 tracking-widest uppercase">Manager Panel</p>
          </div>
        </Link>

        <nav className="space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'flash-sales', label: 'Flash Sales', icon: Zap },
            { id: 'employees', label: 'Employees', icon: Users },
            { id: 'support', label: 'Support', icon: MessageCircle },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-onyx-800/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gold-400 transition-colors">
            <Eye className="w-4 h-4" />
            View Store
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-onyx-900/80 backdrop-blur-xl border-b border-onyx-800/50 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-display font-bold text-white capitalize">
              {activeTab} Dashboard
            </h1>
            <p className="text-sm text-gray-500">Welcome back, Arjun! Here's your overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-onyx-800/50 rounded-xl px-3 py-2 border border-onyx-700/50">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm w-40 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2 hover:bg-onyx-800 rounded-xl relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-xs">
              AK
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Revenue', value: `$${(totalRevenue / 1000).toFixed(0)}K`, change: '+12.5%', up: true, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10' },
              { label: 'Total Orders', value: totalOrders.toLocaleString(), change: '+8.2%', up: true, icon: ShoppingBag, color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { label: 'Total Customers', value: '12,458', change: '+15.3%', up: true, icon: Users, color: 'text-gold-400', bg: 'bg-gold-500/10' },
              { label: 'Avg. Order Value', value: '$87.50', change: '-2.1%', up: false, icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            ].map((stat, i) => (
              <div key={i} className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-5 hover:border-gold-500/20 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className={`text-xs font-bold flex items-center gap-1 ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Revenue chart */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-onyx-900 border border-onyx-800/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-white">Revenue Overview</h3>
                  <p className="text-sm text-gray-500">Weekly performance</p>
                </div>
                <select className="px-3 py-1.5 bg-onyx-800 rounded-lg text-sm outline-none border border-onyx-700/50 text-white">
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>This Month</option>
                </select>
              </div>
              <div className="flex items-end gap-3 h-40">
                {weeklyData.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative group">
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-gold-500 to-gold-400 transition-all hover:opacity-80 cursor-pointer"
                        style={{ height: `${(val / Math.max(...weeklyData)) * 100}%` }}
                      />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-onyx-800 text-gold-400 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-onyx-700">
                        ${val}00
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Department breakdown */}
            <div className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-6">
              <h3 className="font-display font-bold text-white mb-4">By Department</h3>
              <div className="space-y-3">
                {deptStats.map(dept => (
                  <div key={dept.name} className="flex items-center gap-3">
                    <span className="text-lg">{dept.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium truncate text-white">{dept.name}</span>
                        <span className="text-xs text-gray-500">${(dept.revenue / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="w-full bg-onyx-800 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full bg-gradient-to-r ${dept.color}`} style={{ width: `${(dept.revenue / 145600) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Flash Sale + Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Flash Sale CTA */}
            <div className="bg-gradient-to-br from-rose-900/50 to-red-900/50 border border-rose-700/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h3 className="font-display font-bold text-white">Flash Sale Manager</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">Create time-limited deals to boost sales and engagement.</p>
              <button
                onClick={() => setFlashSaleOpen(true)}
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-400 hover:to-red-400 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" /> Create Flash Sale
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-6">
              <h3 className="font-display font-bold text-white mb-4">⚡ Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Add Product', icon: Plus, color: 'from-blue-500 to-cyan-500' },
                  { label: 'Create Offer', icon: Calendar, color: 'from-green-500 to-emerald-500' },
                  { label: 'View Reports', icon: BarChart3, color: 'from-gold-500 to-yellow-500' },
                  { label: 'Manage Stock', icon: Package, color: 'from-purple-500 to-violet-500' },
                ].map((action, i) => (
                  <button key={i} className={`bg-gradient-to-br ${action.color} text-white p-4 rounded-xl hover:opacity-90 transition-opacity flex flex-col items-center gap-2 shadow-sm`}>
                    <action.icon className="w-6 h-6" />
                    <span className="text-sm font-semibold">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Department cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {deptStats.slice(0, 6).map(dept => (
                <div key={dept.name} className={`bg-gradient-to-br ${dept.color} rounded-2xl p-3 text-white`}>
                  <span className="text-xl block mb-1">{dept.icon}</span>
                  <h4 className="font-bold text-xs">{dept.name}</h4>
                  <p className="text-white/70 text-[10px]">{dept.orders} orders</p>
                  <p className="font-display font-black text-sm">${(dept.revenue / 1000).toFixed(1)}K</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-onyx-900 border border-onyx-800/50 rounded-2xl overflow-hidden mb-8">
            <div className="flex items-center justify-between p-6 border-b border-onyx-800/50">
              <h3 className="font-display font-bold text-white">Recent Orders</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-onyx-800 rounded-lg text-sm hover:bg-onyx-700 transition-colors text-gray-300">
                  <Filter className="w-4 h-4" /> Filter
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-onyx-800 rounded-lg text-sm hover:bg-onyx-700 transition-colors text-gray-300">
                  <Download className="w-4 h-4" /> Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-onyx-800/50">
                  <tr>
                    {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date', 'Actions'].map(h => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-800/30">
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="hover:bg-onyx-800/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-sm font-semibold text-gold-400">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-white">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{order.items}</td>
                      <td className="px-6 py-4 font-semibold text-sm text-white">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 hover:bg-onyx-800 rounded-lg transition-colors"><Eye className="w-4 h-4 text-gray-500" /></button>
                          <button className="p-1.5 hover:bg-onyx-800 rounded-lg transition-colors"><Edit className="w-4 h-4 text-gray-500" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Employee Management */}
          <div className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-white">👥 Employee Management</h3>
              <button className="px-3 py-1.5 bg-gold-500/10 text-gold-400 rounded-lg text-sm hover:bg-gold-500/20 transition-colors flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Employee
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: 'Sneha Gupta', role: 'Sales Associate', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=5', orders: 45 },
                { name: 'Rohit Sharma', role: 'Customer Support', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=8', orders: 32 },
                { name: 'Kavita Joshi', role: 'Inventory Manager', status: 'On Leave', avatar: 'https://i.pravatar.cc/150?img=9', orders: 28 },
              ].map((emp, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-onyx-800/50 rounded-xl border border-onyx-700/50">
                  <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white">{emp.name}</p>
                    <p className="text-xs text-gray-500">{emp.role}</p>
                  </div>
                  <span className={`tag text-[10px] ${emp.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {emp.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Flash Sale Modal */}
        {flashSaleOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setFlashSaleOpen(false)}>
            <div className="bg-onyx-900 border border-onyx-700/50 rounded-2xl p-6 w-full max-w-md animate-scale-in" onClick={e => e.stopPropagation()}>
              <h3 className="font-display font-bold text-white text-lg mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" /> Create Flash Sale
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Sale Title</label>
                  <input
                    type="text"
                    value={flashSaleData.title}
                    onChange={(e) => setFlashSaleData({ ...flashSaleData, title: e.target.value })}
                    placeholder="e.g., Midnight Madness Sale"
                    className="input-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Discount %</label>
                  <input
                    type="number"
                    value={flashSaleData.discount}
                    onChange={(e) => setFlashSaleData({ ...flashSaleData, discount: e.target.value })}
                    placeholder="25"
                    className="input-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">End Time</label>
                  <input type="datetime-local" className="input-dark w-full" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setFlashSaleOpen(false)} className="btn-outline flex-1">Cancel</button>
                  <button onClick={handleCreateFlashSale} className="btn-primary flex-1">Create Sale</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
