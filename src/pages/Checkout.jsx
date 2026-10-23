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
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const shipping = totalPrice > 49 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-heading font-black text-blowmaggy-dark mb-3">Order Confirmed! 🎉</h1>
          <p className="text-gray-500 mb-2">Thank you for shopping with Blowmaggy!</p>
          <p className="text-gray-500 mb-2">Order #BM-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
          <p className="text-2xl font-black text-blowmaggy-accent mb-8">Total: ${grandTotal.toFixed(2)}</p>
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h3 className="font-bold mb-3">What's Next?</h3>
            <ul className="text-sm text-gray-600 space-y-2 text-left">
              <li className="flex items-center gap-2">📧 Order confirmation sent to {formData.email}</li>
              <li className="flex items-center gap-2">🚚 Estimated delivery: 3-5 business days</li>
              <li className="flex items-center gap-2">📦 Track your order in real-time</li>
            </ul>
          </div>
          <button onClick={() => navigate('/')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <span className="text-8xl mb-6 block">🛒</span>
          <h1 className="text-3xl font-heading font-black text-blowmaggy-dark mb-3">Your cart is empty</h1>
          <button onClick={() => navigate('/shop')} className="btn-primary">Start Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blowmaggy-accent mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-3xl font-heading font-black text-blowmaggy-dark mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step > i ? 'bg-blowmaggy-accent text-white' :
                step === i + 1 ? 'bg-blowmaggy-accent text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${
                step >= i + 1 ? 'text-blowmaggy-dark' : 'text-gray-400'
              }`}>
                {s}
              </span>
              {i < 2 && <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-blowmaggy-accent' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Shipping */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-6 h-6 text-blowmaggy-accent" />
                  <h2 className="font-heading font-bold text-xl">Shipping Information</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input name="email" value={formData.email} onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blowmaggy-accent/30 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blowmaggy-accent/30 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blowmaggy-accent/30 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blowmaggy-accent/30 outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input name="address" value={formData.address} onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blowmaggy-accent/30 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input name="city" value={formData.city} onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blowmaggy-accent/30 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="state" value={formData.state} onChange={handleChange} placeholder="State"
                      className="w-full px-4 py-2.5 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blowmaggy-accent/30 outline-none" />
                    <input name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP"
                      className="w-full px-4 py-2.5 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blowmaggy-accent/30 outline-none" />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="btn-primary mt-6 w-full">
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Payment */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-blowmaggy-accent" />
                  <h2 className="font-heading font-bold text-xl">Payment Details</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input name="cardNumber" value={formData.cardNumber} onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2.5 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blowmaggy-accent/30 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry Date</label>
                      <input name="expiry" value={formData.expiry} onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2.5 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blowmaggy-accent/30 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <input name="cvv" value={formData.cvv} onChange={handleChange}
                        placeholder="123"
                        className="w-full px-4 py-2.5 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blowmaggy-accent/30 outline-none" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                    <Lock className="w-3 h-3" /> Your payment info is encrypted and secure
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="btn-secondary flex-1">Back</button>
                  <button onClick={() => setStep(3)} className="btn-primary flex-1">
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Review */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="font-heading font-bold text-xl mb-6">Review Your Order</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <Truck className="w-5 h-5 text-blowmaggy-accent mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Shipping</h4>
                      <p className="text-sm text-gray-600">
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p className="text-sm text-gray-400">{formData.address}, {formData.city}, {formData.state} {formData.zip}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <CreditCard className="w-5 h-5 text-blowmaggy-accent mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Payment</h4>
                      <p className="text-sm text-gray-600">
                        •••• •••• •••• {formData.cardNumber.slice(-4) || '4242'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <span className="text-2xl">{item.image}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-secondary flex-1">Back</button>
                  <button onClick={handlePlaceOrder} className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Place Order — ${grandTotal.toFixed(2)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-heading font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="text-xl">{item.image}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">x{item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-500' : ''}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="font-bold">Total</span>
                  <span className="font-heading font-black text-xl text-blowmaggy-dark">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
