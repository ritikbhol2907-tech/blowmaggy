import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, Users, TrendingUp, DollarSign, Package,
  BarChart3, Settings, Eye, Edit, Trash2, ArrowUpRight, ArrowDownRight,
  Search, Bell, Download, Plus, Filter, Calendar
} from 'lucide-react';
import { products } from '../data/products';

const deptStats = [
  { name: 'Fashion', orders: 1234, revenue: 98450, growth: 12.5, color: 'from-pink-500 to-rose-500', icon: '👕' },
  { name: 'Beauty', orders: 987, revenue: 67230, growth: 8.3, color: 'from-purple-500 to-violet-500', icon: '✨' },
  { name: 'Electronics', orders: 756, revenue: 145600, growth: 15.7, color: 'from-blue-500 to-cyan-500', icon: '💻' },
  { name: 'Home', orders: 654, revenue: 54320, growth: 6.2, color: 'from-amber-500 to-orange-500', icon: '🏠' },
  { name: 'Grocery', orders: 2345, revenue: 32100, growth: 22.1, color: 'from-green-500 to-emerald-500', icon: '🛍️' },
  { name: 'Kids', orders: 543, revenue: 41200, growth: 18.4, color: 'from-yellow-400 to-yellow-500', icon: '😊' },
];

const recentOrders = [
  { id: 'BM-2847', customer: 'Priya Sharma', items: 3, total: 149.97, status: 'Delivered', date: '2 min ago' },
  { id: 'BM-2846', customer: 'Rahul Mehta', items: 1, total: 199.99, status: 'Processing', date: '15 min ago' },
  { id: 'BM-2845', customer: 'Ananya Patel', items: 5, total: 89.95, status: 'Shipping', date: '1 hr ago' },
  { id: 'BM-2847', customer: 'Vikram Singh', items: 2, total: 119.98, status: 'Delivered', date: '3 hr ago' },
  { id: 'BM-2844', customer: 'Sneha Gupta', items: 4, total: 234.96, status: 'Delivered', date: '5 hr ago' },
  { id: 'BM-2843', customer: 'Arjun Kapoor', items: 1, total: 79.99, status: 'Cancelled', date: '1 day ago' },
];

const topProducts = products.sort((a, b) => b.reviews - a.reviews).slice(0, 5);

const statusColors = {
  Delivered: 'bg-green-100 text-green-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipping: 'bg-amber-100 text-amber-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const totalRevenue = deptStats.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = deptStats.reduce((s, d) => s + d.orders, 0);

  // Mini sparkline data (simulated)
  const weeklyData = [32, 45, 38, 52, 48, 61, 55];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-blowmaggy-dark text-white p-6 z-40 hidden lg:block">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blowmaggy-accent to-primary-500 rounded-xl flex items-center justify-center">
            <span className="font-heading font-black text-lg">B</span>
          </div>
          <div>
            <h2 className="font-heading font-black text-lg">BLOW</h2>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">Admin Panel</p>
          </div>
        </Link>

        <nav className="space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-blowmaggy-accent/20 text-blowmaggy-accent'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <Eye className="w-4 h-4" />
            View Store
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-heading font-black text-blowmaggy-dark capitalize">
              {activeTab} Dashboard
            </h1>
            <p className="text-sm text-gray-400">Welcome back! Here's your overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm w-40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Revenue', value: `$${(totalRevenue / 1000).toFixed(0)}K`, change: '+12.5%', up: true, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50' },
              { label: 'Total Orders', value: totalOrders.toLocaleString(), change: '+8.2%', up: true, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Total Customers', value: '12,458', change: '+15.3%', up: true, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
              { label: 'Avg. Order Value', value: '$87.50', change: '-2.1%', up: false, icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className={`text-xs font-bold flex items-center gap-1 ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-heading font-black text-blowmaggy-dark">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue chart (simulated bar chart) */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-heading font-bold">Revenue Overview</h3>
                  <p className="text-sm text-gray-400">Weekly performance</p>
                </div>
                <select className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm outline-none">
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
                        className={`w-full rounded-t-lg bg-gradient-to-t from-blowmaggy-accent to-primary-500 transition-all hover:opacity-80 cursor-pointer`}
                        style={{ height: `${(val / Math.max(...weeklyData)) * 100}%` }}
                      />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blowmaggy-dark text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${val}00
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Department breakdown */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-heading font-bold mb-4">By Department</h3>
              <div className="space-y-3">
                {deptStats.map(dept => (
                  <div key={dept.name} className="flex items-center gap-3">
                    <span className="text-lg">{dept.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium truncate">{dept.name}</span>
                        <span className="text-xs text-gray-400">${(dept.revenue / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full bg-gradient-to-r ${dept.color}`}
                          style={{ width: `${(dept.revenue / 145600) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department cards */}
          <h3 className="font-heading font-bold text-lg mb-4">Department Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {deptStats.map(dept => (
              <div key={dept.name} className={`bg-gradient-to-br ${dept.color} rounded-2xl p-4 text-white`}>
                <span className="text-2xl block mb-2">{dept.icon}</span>
                <h4 className="font-bold text-sm mb-1">{dept.name}</h4>
                <p className="text-white/70 text-xs">{dept.orders.toLocaleString()} orders</p>
                <p className="font-heading font-black text-lg">${(dept.revenue / 1000).toFixed(1)}K</p>
                <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-lg inline-block mt-2">
                  +{dept.growth}%
                </span>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-heading font-bold">Recent Orders</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                  <Filter className="w-4 h-4" /> Filter
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                  <Download className="w-4 h-4" /> Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Order ID</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Customer</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Items</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Total</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase">Date</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-sm font-semibold">{order.id}</td>
                      <td className="px-6 py-4 text-sm">{order.customer}</td>
                      <td className="px-6 py-4 text-sm">{order.items}</td>
                      <td className="px-6 py-4 font-semibold text-sm">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">{order.date}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top products & activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-heading font-bold mb-4">🔥 Top Products</h3>
              <div className="space-y-3">
                {topProducts.map((product, i) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <span className="text-2xl">{product.image}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.reviews} reviews · {product.department}</p>
                    </div>
                    <span className="font-bold text-sm">${product.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-heading font-bold mb-4">⚡ Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Add Product', icon: Plus, color: 'from-blue-500 to-cyan-500' },
                  { label: 'Create Offer', icon: Calendar, color: 'from-green-500 to-emerald-500' },
                  { label: 'View Reports', icon: BarChart3, color: 'from-purple-500 to-violet-500' },
                  { label: 'Manage Stock', icon: Package, color: 'from-amber-500 to-orange-500' },
                ].map((action, i) => (
                  <button key={i} className={`bg-gradient-to-br ${action.color} text-white p-4 rounded-xl hover:opacity-90 transition-opacity flex flex-col items-center gap-2 shadow-sm`}>
                    <action.icon className="w-6 h-6" />
                    <span className="text-sm font-semibold">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
