import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { deals } from '../data/products';

export default function DealsBanner() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="tag bg-blowmaggy-accent/10 text-blowmaggy-accent mb-2">🔥 Hot Deals</span>
          <h2 className="section-title">Today's Best Deals</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {deals.map((deal) => (
            <Link
              key={deal.id}
              to={`/shop?dept=${deal.department}`}
              className={`group bg-gradient-to-br ${deal.color} rounded-2xl p-5 text-white relative overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg`}
            >
              <div className="absolute -bottom-2 -right-2 text-6xl opacity-20 group-hover:opacity-30 transition-opacity rotate-12">
                {deal.emoji}
              </div>
              <div className="relative z-10">
                <span className="text-3xl mb-2 block">{deal.emoji}</span>
                <h3 className="font-heading font-bold text-lg">{deal.title}</h3>
                <p className="text-white/80 text-sm mb-2">{deal.subtitle}</p>
                <div className="inline-flex items-center gap-1 text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">
                  {deal.discount} <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
