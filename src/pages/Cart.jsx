import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { useState } from 'react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const discount = promoApplied ? totalPrice * 0.15 : 0;
  const shipping = totalPrice > 499 ? 0 : 49;
  const tax = (totalPrice - discount) * 0.08;
  const grandTotal = totalPrice - discount + shipping + tax;

  const deptEmojis = { fashion: '👕', beauty: '✨', electronics: '💻', home: '🏠', grocery: '🛍️', kids: '😊' };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-onyx-950 flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag className="w-24 h-24 text-gray-700 mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold text-white mb-3">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything yet</p>
          <Link to="/shop" className="gold-gradient text-onyx-950 font-bold px-8 py-3 rounded-xl inline-flex items-center gap-2">
            Start Shopping <ShoppingBag className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-onyx-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-display font-bold text-white text-2xl mb-8">
          Shopping Cart <span className="text-gray-500 font-normal">({cart.length} items)</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-4 md:p-6 flex gap-4 hover:border-gold-500/20 transition-all">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-onyx-800 rounded-xl overflow-hidden flex items-center justify-center text-3xl flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                  <span className="hidden text-4xl">{deptEmojis[item.department] || '🛍️'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/shop?dept=${item.department}`} className="font-semibold hover:text-gold-400 transition-colors text-white">{item.name}</Link>
                      <p className="text-sm text-gray-500 capitalize">{item.department}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0">
                      <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-400" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 bg-onyx-800 hover:bg-onyx-700 rounded-lg flex items-center justify-center transition-colors">
                        <Minus className="w-3 h-3 text-gray-400" />
                      </button>
                      <span className="w-8 text-center font-semibold text-sm text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 bg-onyx-800 hover:bg-onyx-700 rounded-lg flex items-center justify-center transition-colors">
                        <Plus className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                    <span className="font-bold text-lg text-white">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-6 sticky top-24">
              <h3 className="font-display font-bold text-white text-lg mb-4">Order Summary</h3>
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <input type="text" placeholder="Promo code" className="w-full pl-9 pr-3 py-2.5 bg-onyx-800/50 border border-onyx-700/50 rounded-xl text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-gold-500/30 outline-none"
                    value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
                <button onClick={() => { if (promoCode.toUpperCase() === 'BLOWMAGGY25') setPromoApplied(true); }}
                  className="px-4 py-2.5 bg-gold-500 text-onyx-950 rounded-xl text-sm font-semibold hover:bg-gold-400 transition-colors">Apply</button>
              </div>
              {promoApplied && <p className="text-xs text-green-400 font-semibold mb-3 flex items-center gap-1">✓ BLOWMAGGY25 applied — 15% off!</p>}
              <div className="space-y-3 text-sm border-b border-onyx-800/50 pb-4 mb-4">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="text-white">₹{totalPrice.toLocaleString()}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-400"><span>Discount (15%)</span><span>-₹{discount.toLocaleString()}</span></div>}
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className={shipping === 0 ? 'text-green-400' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>₹{tax.toFixed(0)}</span></div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-lg text-white">Total</span>
                <span className="font-display font-black text-2xl text-gold-400">₹{grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              {shipping > 0 && <p className="text-xs text-center text-gray-500 mb-4">Add ₹{(499 - totalPrice).toFixed(0)} more for free shipping</p>}
              <button onClick={() => navigate('/checkout')} className="w-full gold-gradient text-onyx-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-base hover:shadow-lg hover:shadow-gold-500/20 transition-all">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>
              <Link to="/shop" className="block text-center text-sm text-gold-400 mt-3 hover:text-gold-300 transition-colors">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
