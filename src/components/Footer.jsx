import { Link } from 'react-router-dom';
import {
  ShoppingBag, Truck, ShieldCheck, Headphones, CreditCard, RefreshCw
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-onyx-900 border-t border-onyx-800/50">
      {/* CTA Banner */}
      <div className="gold-gradient">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-onyx-950 font-display font-black text-2xl">Get 25% OFF</h3>
            <p className="text-onyx-900/70">Your first order with code <strong>BLOWMAGGY25</strong></p>
          </div>
          <Link to="/shop" className="bg-onyx-950 text-gold-400 font-bold px-8 py-3 rounded-xl hover:bg-onyx-900 transition-colors shadow-lg">
            Shop Now →
          </Link>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center">
                <span className="text-onyx-950 font-heading font-black text-lg">B</span>
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-white">
                  BLOW<span className="text-gold-400">MAGGY</span>
                </h3>
                <p className="text-[10px] text-gray-500 tracking-widest uppercase">Premium Marketplace</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">Your one-stop destination for everything you need and love.</p>
            <div className="flex gap-3">
              {['📘', '🐦', '📸', '📺'].map((icon, i) => (
                <button key={i} className="w-9 h-9 bg-onyx-800 hover:bg-gold-500/20 rounded-lg flex items-center justify-center transition-colors">
                  {icon}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              {['Fashion', 'Beauty', 'Electronics', 'Home', 'Grocery', 'Kids'].map(item => (
                <li key={item}><Link to={`/shop?dept=${item.toLowerCase()}`} className="text-gray-400 hover:text-gold-400 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Careers', 'Press', 'Blog', 'Partners'].map(item => (
                <li key={item}><span className="text-gray-400 hover:text-gold-400 transition-colors cursor-pointer">{item}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              {['Help Center', 'Shipping', 'Returns', 'Size Guide', 'Contact'].map(item => (
                <li key={item}><span className="text-gray-400 hover:text-gold-400 transition-colors cursor-pointer">{item}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'].map(item => (
                <li key={item}><span className="text-gray-400 hover:text-gold-400 transition-colors cursor-pointer">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="border-t border-onyx-800/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: 'Free Shipping', desc: 'On orders ₹499+' },
              { icon: ShieldCheck, label: 'Secure Payment', desc: '256-bit SSL' },
              { icon: Headphones, label: '24/7 Support', desc: 'Always here' },
              { icon: RefreshCw, label: 'Easy Returns', desc: '30-day policy' },
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <feat.icon className="w-6 h-6 text-gold-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">{feat.label}</p>
                  <p className="text-xs text-gray-500">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-onyx-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© 2026 Blowmaggy. All rights reserved. Made with ❤️</p>
          <div className="flex items-center gap-3">
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💳 PayPal</span>
            <span>💳 UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
