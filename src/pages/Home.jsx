import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Gift, Sparkles } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import DepartmentGrid from '../components/DepartmentGrid';
import ProductGrid from '../components/ProductGrid';
import DealsBanner from '../components/DealsBanner';
import Testimonials from '../components/Testimonials';
import { products } from '../data/products';

export default function Home() {
  const trending = products.filter(p => p.tag === 'Trending' || p.tag === 'Hot' || p.badge === 'bestseller').slice(0, 8);
  const newArrivals = products.filter(p => p.badge === 'new').slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroBanner />

      {/* Why Blowmaggy */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-gray-900 mb-3">Why Choose Blowmaggy?</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-base">The smart way to shop everything — one place, endless choices</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🛒',
                gradient: 'from-[#e94560] to-[#f05a44]',
                title: 'One Cart, Everything',
                desc: 'Add items from 6 different departments and checkout once. No more fragmented shopping.',
              },
              {
                icon: '⚡',
                gradient: 'from-blue-500 to-cyan-500',
                title: 'Lightning Fast Delivery',
                desc: 'Same-day delivery in select cities. Standard delivery in 2-3 business days.',
              },
              {
                icon: '✨',
                gradient: 'from-purple-500 to-violet-500',
                title: 'Curated Quality',
                desc: 'Every product is quality-checked. 30-day hassle-free returns on all items.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform text-3xl`}>
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 text-gray-900">{item.title}</h3>
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

      {/* Trending Products */}
      <ProductGrid products={trending} title="Trending Now" subtitle="Most popular picks this week" />

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-[#1a1a2e] to-[#0f3460] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-black mb-3">Stay in the Loop</h2>
          <p className="text-gray-300 mb-8 text-base">Get exclusive deals, new arrivals, and style tips delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#e94560]/50 outline-none"
            />
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <ProductGrid products={newArrivals} title="New Arrivals" subtitle="Just landed — grab them before they're gone" />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#e94560] to-[#f05a44] rounded-3xl p-8 md:p-14 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-10 rotate-12">🛍️</div>
            <h2 className="text-3xl md:text-4xl font-heading font-black mb-4 relative z-10">Ready to Shop?</h2>
            <p className="text-white/85 mb-8 max-w-lg mx-auto text-base relative z-10">
              Explore 10,000+ products across 6 departments. One cart. One checkout. Infinite possibilities.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-[#e94560] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-lg shadow-lg relative z-10">
              Start Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
