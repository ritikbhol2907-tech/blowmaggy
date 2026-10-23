import { Star } from 'lucide-react';
import { testimonials } from '../data/products';

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="tag bg-amber-100 text-amber-700 mb-2">⭐ Reviews</span>
          <h2 className="section-title">What Our Customers Say</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blowmaggy-accent/20 to-primary-200 rounded-full flex items-center justify-center text-2xl">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
