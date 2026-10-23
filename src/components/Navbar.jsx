import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Search, User, Menu, X, Heart, LogOut,
  Settings, Package, ChevronDown, Star
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { user, logout, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-blowmaggy-dark via-blowmaggy-mid to-blowmaggy-light text-white py-1.5 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>🚚</span>
            <span className="hidden sm:inline">Free shipping on orders over ₹499 | Code: <strong>BLOWMAGGY25</strong></span>
            <span className="sm:hidden">Free shipping over ₹499!</span>
          </div>
          <div className="flex items-center gap-4">
            <span>📞 1-800-BLOW</span>
            <span className="hidden md:inline">🌐 EN</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blowmaggy-accent to-primary-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-heading font-black text-lg">B</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading font-black text-xl text-blowmaggy-dark leading-none">
                BLOW<span className="text-blowmaggy-accent">MAGGY</span>
              </h1>
              <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase -mt-0.5">The Everything Issue</p>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search fashion, beauty, electronics..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blowmaggy-accent/30 focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              {searchQuery && (
                <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setSearchQuery('')}>
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Nav actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Google Login / User menu */}
            {!user ? (
              <button
                onClick={loginWithGoogle}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-white hover:bg-gray-50 rounded-xl border border-gray-200 transition-all hover:shadow-md"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="hidden sm:inline font-medium">Sign In</span>
              </button>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 rounded-xl transition-all">
                  <div className="w-8 h-8 bg-gradient-to-br from-blowmaggy-accent to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.[0]}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                </button>
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link to="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4 text-gray-400" /> Dashboard
                  </Link>
                  <div className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors cursor-pointer">
                    <Package className="w-4 h-4 text-gray-400" /> Orders
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors cursor-pointer">
                    <Heart className="w-4 h-4 text-gray-400" /> Wishlist
                  </div>
                  <div className="border-t border-gray-100">
                    <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition-colors">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist */}
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-all relative hidden sm:block">
              <Heart className="w-5 h-5 text-gray-600 hover:text-blowmaggy-accent transition-colors" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-xl transition-all relative">
              <ShoppingBag className="w-5 h-5 text-gray-600 hover:text-blowmaggy-accent transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-blowmaggy-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-xl">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {mobileOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-gray-100 pt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blowmaggy-accent/30"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        )}
      </div>

    </nav>
  );
}
