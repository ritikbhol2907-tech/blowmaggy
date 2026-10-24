import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Search, User, Menu, X, Heart, LogOut,
  Settings, Package, ChevronDown, Star, Store, Users, ClipboardList,
  MessageCircle, LogIn
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { user, logout, loginWithGoogle, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-onyx-950/95 backdrop-blur-xl border-b border-onyx-800/50 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-onyx-900 text-gold-400 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">🚚 Free shipping on orders over ₹499</span>
            <span className="hidden sm:flex items-center gap-1"><span className="font-bold">Code:</span> BLOWMAGGY25</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="hidden md:flex items-center gap-1">📞 1-800-BLOW</span>
            <span>🌐 EN</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-onyx-950 font-heading font-black text-lg">B</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading font-black text-xl text-white leading-none">
                BLOW<span className="text-gold-400">MAGGY</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase -mt-0.5">Premium Marketplace</p>
            </div>
          </Link>

          {/* Department Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {['Fashion', 'Beauty', 'Electronics', 'Home', 'Grocery', 'Kids'].map((dept) => (
              <Link
                key={dept}
                to={`/shop?dept=${dept.toLowerCase()}`}
                className="px-3 py-2 text-sm text-gray-300 hover:text-gold-400 transition-colors font-medium"
              >
                {dept}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search fashion, beauty, electronics..."
                className="w-full pl-10 pr-4 py-2.5 bg-onyx-800/50 border border-onyx-700/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/50 outline-none transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>

          {/* Nav actions */}
          <div className="flex items-center gap-1">
            {/* Manager Quick Link */}
            {hasRole('manager') && (
              <Link to="/admin" className="hidden sm:flex items-center gap-1 px-3 py-2 text-sm text-gold-400 hover:text-gold-300 transition-colors">
                <Store className="w-4 h-4" /> Dashboard
              </Link>
            )}

            {/* Employee Quick Link */}
            {hasRole('employee') && (
              <Link to="/employee" className="hidden sm:flex items-center gap-1 px-3 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                <ClipboardList className="w-4 h-4" /> Tasks
              </Link>
            )}

            {/* Login / User menu */}
            {!user ? (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-onyx-800 hover:bg-onyx-700 text-gold-400 rounded-xl border border-onyx-700 transition-all hover:border-gold-500/30"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Sign In</span>
              </button>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-2 px-2 py-2 hover:bg-onyx-800 rounded-xl transition-all">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-gold-500/30" />
                  <span className="hidden sm:block text-sm font-medium text-white max-w-24 truncate">{user.name}</span>
                  {user.role === 'manager' && <span className="tag bg-red-500/20 text-red-400 text-[10px]">MGR</span>}
                  {user.role === 'employee' && <span className="tag bg-blue-500/20 text-blue-400 text-[10px]">EMP</span>}
                  {user.role === 'customer' && user.membership !== 'Standard' && <span className="tag bg-gold-500/20 text-gold-400 text-[10px]">{user.membership}</span>}
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-72 bg-onyx-900 rounded-2xl shadow-2xl border border-onyx-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  {/* User info header */}
                  <div className="p-4 border-b border-onyx-700/50">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-gold-500/30" />
                      <div>
                        <p className="font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    {user.membership && (
                      <div className="flex items-center gap-2">
                        {user.points > 0 && <span className="tag bg-gold-500/20 text-gold-400 text-[10px]">{user.points} pts</span>}
                        <span className={`tag text-[10px] ${user.membership === 'Manager' ? 'bg-red-500/20 text-red-400' : user.membership === 'Gold' ? 'bg-gold-500/20 text-gold-400' : user.membership === 'Silver' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          {user.membership}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Menu items based on role */}
                  {user.role === 'customer' && (
                    <>
                      <Link to="/my-orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-onyx-800 transition-colors">
                        <Package className="w-4 h-4" /> My Orders
                      </Link>
                      <Link to="/wishlist" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-onyx-800 transition-colors">
                        <Heart className="w-4 h-4" /> Wishlist
                      </Link>
                      <Link to="/my-addresses" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-onyx-800 transition-colors">
                        <Settings className="w-4 h-4" /> My Addresses
                      </Link>
                      <Link to="/my-reviews" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-onyx-800 transition-colors">
                        <Star className="w-4 h-4" /> My Reviews
                      </Link>
                      <Link to="/my-rewards" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gold-400 hover:text-gold-300 hover:bg-onyx-800 transition-colors">
                        <Star className="w-4 h-4" /> Rewards & Points
                      </Link>
                      <Link to="/returns" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-onyx-800 transition-colors">
                        <LogOut className="w-4 h-4" /> Returns & Refunds
                      </Link>
                    </>
                  )}

                  {user.role === 'manager' && (
                    <>
                      <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gold-400 hover:text-gold-300 hover:bg-onyx-800 transition-colors">
                        <Settings className="w-4 h-4" /> Admin Dashboard
                      </Link>
                      <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-onyx-800 transition-colors cursor-pointer">
                        <Users className="w-4 h-4" /> Employee Management
                      </div>
                      <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-onyx-800 transition-colors cursor-pointer">
                        <ClipboardList className="w-4 h-4" /> Flash Sale Management
                      </div>
                      <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-onyx-800 transition-colors cursor-pointer">
                        <Package className="w-4 h-4" /> Inventory Management
                      </div>
                      <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-onyx-800 transition-colors cursor-pointer">
                        <MessageCircle className="w-4 h-4" /> Customer Support
                      </div>
                    </>
                  )}

                  {user.role === 'employee' && (
                    <>
                      <Link to="/employee" className="flex items-center gap-3 px-4 py-2.5 text-sm text-blue-400 hover:text-blue-300 hover:bg-onyx-800 transition-colors">
                        <ClipboardList className="w-4 h-4" /> Employee Dashboard
                      </Link>
                      <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-onyx-800 transition-colors cursor-pointer">
                        <Package className="w-4 h-4" /> Process Orders
                      </div>
                      <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-onyx-800 transition-colors cursor-pointer">
                        <LogOut className="w-4 h-4" /> Handle Returns
                      </div>
                      <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-onyx-800 transition-colors cursor-pointer">
                        <Star className="w-4 h-4" /> Review Ratings
                      </div>
                    </>
                  )}

                  <div className="border-t border-onyx-700/50">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 w-full transition-colors">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist */}
            <button className="p-2 hover:bg-onyx-800 rounded-xl transition-all relative">
              <Heart className="w-5 h-5 text-gray-400 hover:text-gold-400 transition-colors" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="p-2 hover:bg-onyx-800 rounded-xl transition-all relative">
              <ShoppingBag className="w-5 h-5 text-gray-400 hover:text-gold-400 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 gold-gradient text-onyx-950 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 hover:bg-onyx-800 rounded-xl">
              {mobileOpen ? <X className="w-5 h-5 text-gray-400" /> : <Menu className="w-5 h-5 text-gray-400" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {mobileOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-onyx-800 pt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-onyx-800/50 border border-onyx-700/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-gold-500/30 outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
            {/* Mobile nav links */}
            <div className="mt-3 flex flex-col gap-1">
              {['Fashion', 'Beauty', 'Electronics', 'Home', 'Grocery', 'Kids'].map((dept) => (
                <Link
                  key={dept}
                  to={`/shop?dept=${dept.toLowerCase()}`}
                  className="px-3 py-2 text-sm text-gray-300 hover:text-gold-400 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {dept}
                </Link>
              ))}
              {hasRole('manager') && (
                <Link to="/admin" className="px-3 py-2 text-sm text-gold-400" onClick={() => setMobileOpen(false)}>
                  🎩 Admin Dashboard
                </Link>
              )}
              {hasRole('employee') && (
                <Link to="/employee" className="px-3 py-2 text-sm text-blue-400" onClick={() => setMobileOpen(false)}>
                  👤 Employee Tasks
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
