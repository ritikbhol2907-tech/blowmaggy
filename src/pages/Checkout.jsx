import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Truck, MapPin, Lock, CheckCircle, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '', lastName: '', address: '', city: '', state: '', zip: '', phone: '',
    cardNumber: '', expiry: '', cvv: '',
  });

  const shipping = totalPrice > 499 ? 0 : 49;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePlaceOrder = () => { setOrderPlaced(true); clearCart(); };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-onyx-950 flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <div className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-3">Order Confirmed! 🎉</h1>
          <p className="text-gray-500 mb-2">Thank you for shopping with Blowmaggy!</p>
          <p className="text-gray-500 mb-2">Order #BM-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
          <p className="text-2xl font-display font-black text-gold-400 mb-8">₹{grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          <div className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-6 mb-6">
            <h3 className="font-bold mb-3 text-white">What's Next?</h3>
            <ul className="text-sm text-gray-400 space-y-2 text-left">
              <li className="flex items-center gap-2">📧 Confirmation sent to {formData.email}</li>
              <li className="flex items-center gap-2">🚚 Estimated delivery: 3-5 business days</li>
              <li className="flex items-center gap-2">📦 Track your order in real-time</li>
            </ul>
          </div>
          <button onClick={() => navigate('/')} className="gold-gradient text-onyx-950 font-bold px-8 py-3 rounded-xl">Continue Shopping</button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-onyx-950 flex items-center justify-center">
        <div className="text-center px-4">
          <span className="text-8xl mb-6 block">🛒</span>
          <h1 className="text-3xl font-display font-bold text-white mb-3">Your cart is empty</h1>
          <button onClick={() => navigate('/shop')} className="gold-gradient text-onyx-950 font-bold px-8 py-3 rounded-xl">Start Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-onyx-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-gold-400 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="font-display font-bold text-white text-2xl mb-8">Checkout</h1>

        <div className="flex items-center gap-2 mb-8">
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= i + 1 ? 'bg-gold-500 text-onyx-950' : 'bg-onyx-800 text-gray-500 border border-onyx-700/50'
              }`}>{step > i + 1 ? '✓' : i + 1}</div>
              <span className={`text-sm font-medium hidden sm:inline ${step >= i + 1 ? 'text-white' : 'text-gray-500'}`}>{s}</span>
              {i < 2 && <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-gold-500' : 'bg-onyx-800'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Shipping */}
            {step === 1 && (
              <div className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-6 h-6 text-gold-400" />
                  <h2 className="font-display font-bold text-xl text-white">Shipping Information</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1 text-gray-400">Email</label>
                    <input name="email" value={formData.email} onChange={handleChange} className="input-dark w-full" /></div>
                  <div><label className="block text-sm font-medium mb-1 text-gray-400">Phone</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} className="input-dark w-full" /></div>
                  <div><label className="block text-sm font-medium mb-1 text-gray-400">First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} className="input-dark w-full" /></div>
                  <div><label className="block text-sm font-medium mb-1 text-gray-400">Last Name</label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} className="input-dark w-full" /></div>
                  <div className="col-span-2"><label className="block text-sm font-medium mb-1 text-gray-400">Address</label>
                    <input name="address" value={formData.address} onChange={handleChange} className="input-dark w-full" /></div>
                  <div><label className="block text-sm font-medium mb-1 text-gray-400">City</label>
                    <input name="city" value={formData.city} onChange={handleChange} className="input-dark w-full" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="input-dark w-full" />
                    <input name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP" className="input-dark w-full" />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="gold-gradient text-onyx-950 font-bold py-3 rounded-xl w-full mt-6 hover:shadow-lg hover:shadow-gold-500/20 transition-all">Continue to Payment</button>
              </div>
            )}
            {/* Payment */}
            {step === 2 && (
              <div className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-gold-400" />
                  <h2 className="font-display font-bold text-xl text-white">Payment Details</h2>
                </div>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium mb-1 text-gray-400">Card Number</label>
                    <input name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" className="input-dark w-full" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1 text-gray-400">Expiry Date</label>
                      <input name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YY" className="input-dark w-full" /></div>
                    <div><label className="block text-sm font-medium mb-1 text-gray-400">CVV</label>
                      <input name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" className="input-dark w-full" /></div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <Lock className="w-3 h-3" /> Your payment info is encrypted and secure
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="btn-outline flex-1">Back</button>
                  <button onClick={() => setStep(3)} className="gold-gradient text-onyx-950 font-bold flex-1 py-3 rounded-xl">Review Order</button>
                </div>
              </div>
            )}
            {/* Review */}
            {step === 3 && (
              <div className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-6 md:p-8">
                <h2 className="font-display font-bold text-xl text-white mb-6">Review Your Order</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-4 bg-onyx-800/50 rounded-xl">
                    <Truck className="w-5 h-5 text-gold-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-white">Shipping</h4>
                      <p className="text-sm text-gray-400">{formData.firstName} {formData.lastName}</p>
                      <p className="text-xs text-gray-500">{formData.address}, {formData.city}, {formData.state} {formData.zip}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-onyx-800/50 rounded-xl">
                    <CreditCard className="w-5 h-5 text-gold-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-white">Payment</h4>
                      <p className="text-sm text-gray-400">•••• •••• •••• {formData.cardNumber.slice(-4) || '4242'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-onyx-800/50 rounded-xl">
                      <span className="text-2xl">{item.image}</span>
                      <div className="flex-1 min-w-0"><p className="font-semibold text-sm text-white truncate">{item.name}</p><p className="text-xs text-gray-500">Qty: {item.quantity}</p></div>
                      <span className="font-bold text-sm text-white">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-outline flex-1">Back</button>
                  <button onClick={handlePlaceOrder} className="gold-gradient text-onyx-950 font-bold flex-1 py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold-500/20 transition-all">
                    <Lock className="w-4 h-4" /> Place Order — ₹{grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-6 sticky top-24">
              <h3 className="font-display font-bold text-white text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="text-xl">{item.image}</span>
                    <div className="flex-1 min-w-0"><p className="text-sm text-white truncate">{item.name}</p><p className="text-xs text-gray-500">x{item.quantity}</p></div>
                    <span className="text-sm font-semibold text-white">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-onyx-800/50 pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="text-white">₹{totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className={shipping === 0 ? 'text-green-400' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tax</span><span className="text-white">₹{tax.toFixed(0)}</span></div>
                <div className="flex justify-between items-center pt-2 border-t border-onyx-800/50">
                  <span className="font-bold text-white">Total</span>
                  <span className="font-display font-black text-xl text-gold-400">₹{grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
