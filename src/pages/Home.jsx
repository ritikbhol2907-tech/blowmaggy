import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Gift, Sparkles, ShieldCheck, Truck, Star, Heart, MessageCircle, Users } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import DepartmentGrid from '../components/DepartmentGrid';
import ProductGrid from '../components/ProductGrid';
import DealsBanner from '../components/DealsBanner';
import Testimonials from '../components/Testimonials';
import FlashSaleCountdown from '../components/FlashSaleCountdown';
import { products } from '../data/products';
import { useState } from 'react';

export default function Home() {
  const trending = products.filter(p => p.tag === 'Trending' || p.tag === 'Hot' || p.badge === 'bestseller').slice(0, 8);
  const newArrivals = products.filter(p => p.badge === 'new').slice(0, 8);
  const bestSellers = products.sort((a, b) => b.reviews - a.reviews).slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Flash Sale Banner */}
      <FlashSaleCountdown />

      {/* Hero */}
      <HeroBanner />

      {/* Why Blowmaggy */}
      <section className="py-12 md:py-16 bg-onyx-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Why Choose Blowmaggy?</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-base">The smart way to shop everything — one place, endless choices</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🛒', gradient: 'from-gold-500 to-gold-400', title: 'One Cart, Everything', desc: 'Add items from 6 different departments and checkout once. No more fragmented shopping.', color: 'text-onyx-950' },
              { icon: '⚡', gradient: 'from-blue-500 to-cyan-500', title: 'Lightning Fast Delivery', desc: 'Same-day delivery in select cities. Standard delivery in 2-3 business days.', color: 'text-white' },
              { icon: '✨', gradient: 'from-purple-500 to-violet-500', title: 'Curated Quality', desc: 'Every product is quality-checked. 30-day hassle-free returns on all items.', color: 'text-white' },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-3xl`}>
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-xl mb-2 text-white">{item.title}</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <DepartmentGrid />

      {/* Deals */}
      <DealsBanner />

      {/* Trending */}
      <ProductGrid products={trending} title="Trending Now" subtitle="Most popular picks this week" />

      {/* Loyalty Banner */}
      <section className="py-12 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="gold-gradient rounded-2xl p-8 md:p-12 text-onyx-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-8xl opacity-10 rotate-12">⭐</div>
            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-black mb-3">Join Blowmaggy Rewards</h2>
                <p className="text-onyx-900/70 mb-6 text-base">Earn points on every purchase. Redeem for discounts, free shipping, and exclusive gifts. Go Gold for more benefits!</p>
                <Link to="/my-rewards" className="inline-flex items-center gap-2 bg-onyx-950 text-gold-400 font-bold px-6 py-3 rounded-xl hover:bg-onyx-900 transition-colors">
                  <Star className="w-5 h-5" /> View Rewards
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🎁', label: 'Earn Points', desc: '1 pt per ₹100' },
                  { icon: '🚚', label: 'Free Shipping', desc: 'Gold members' },
                  { icon: '🏷️', label: 'Exclusive Deals', desc: 'Members only' },
                  { icon: '🎂', label: 'Birthday Bonus', desc: '500 extra points' },
                ].map((item, i) => (
                  <div key={i} className="bg-onyx-950/10 rounded-xl p-3">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="font-bold text-sm mt-1">{item.label}</p>
                    <p className="text-xs text-onyx-900/60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <ProductGrid products={bestSellers} title="Best Sellers" subtitle="Our customers' all-time favorites" />

      {/* New Arrivals */}
      <ProductGrid products={newArrivals} title="New Arrivals" subtitle="Just landed — grab them before they're gone" />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <section className="py-16 bg-onyx-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Stay in the Loop</h2>
          <p className="text-gray-400 mb-8 text-base">Get exclusive deals, new arrivals, and style tips delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl bg-onyx-800 border border-onyx-700/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-gold-500/30 outline-none"
            />
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-12 bg-onyx-950 border-t border-onyx-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, label: 'Secure Payment', desc: '256-bit SSL encryption' },
              { icon: Truck, label: 'Free Shipping', desc: 'On orders ₹499+' },
              { icon: Gift, label: 'Gift Wrapping', desc: 'Complimentary on request' },
              { icon: MessageCircle, label: '24/7 Support', desc: 'Live chat & email' },
            ].map((feat, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <feat.icon className="w-6 h-6 text-gold-400" />
                </div>
                <p className="font-semibold text-sm text-white">{feat.label}</p>
                <p className="text-xs text-gray-500">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-onyx-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="gold-gradient rounded-3xl p-8 md:p-14 text-center text-onyx-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-10 rotate-12">🛍️</div>
            <h2 className="text-3xl md:text-4xl font-display font-black mb-4 relative z-10">Ready to Shop?</h2>
            <p className="text-onyx-900/80 mb-8 max-w-lg mx-auto text-base relative z-10">
              Explore 10,000+ products across 6 departments. One cart. One checkout. Infinite possibilities.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-onyx-950 text-gold-400 font-bold px-8 py-4 rounded-xl hover:bg-onyx-900 transition-colors text-lg shadow-lg relative z-10">
              Start Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
