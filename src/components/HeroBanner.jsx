import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { deals } from '../data/products';

const heroSlides = [
  {
    title: 'The Everything Issue',
    subtitle: 'Fashion • Beauty • Electronics • Home • Grocery • Kids',
    desc: 'One cart. One checkout. Everything you need, delivered to your door.',
    gradient: 'from-blowmaggy-dark via-blowmaggy-mid to-blowmaggy-light',
    accent: 'text-blowmaggy-accent',
    emoji: '🛍️',
    cta: 'Shop Now',
  },
  {
    title: 'Summer Fashion Sale',
    subtitle: 'Up to 60% off on trending styles',
    desc: 'Refresh your wardrobe with this season\'s hottest looks.',
    gradient: 'from-pink-900 via-rose-800 to-red-900',
    accent: 'text-yellow-300',
    emoji: '👗',
    cta: 'Explore Fashion',
    link: '/shop?dept=fashion',
  },
  {
    title: 'Tech Deals Inside',
    subtitle: 'Latest gadgets starting at $29.99',
    desc: 'Upgrade your tech game without breaking the bank.',
    gradient: 'from-blue-900 via-cyan-800 to-teal-900',
    accent: 'text-yellow-300',
    emoji: '💻',
    cta: 'Shop Electronics',
    link: '/shop?dept=electronics',
  },
  {
    title: 'Beauty Essentials',
    subtitle: 'Buy 2 Get 1 Free on selected items',
    desc: 'Premium beauty products at unbeatable prices.',
    gradient: 'from-purple-900 via-violet-800 to-indigo-900',
    accent: 'text-pink-300',
    emoji: '💄',
    cta: 'Shop Beauty',
    link: '/shop?dept=beauty',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className={`bg-gradient-to-br ${slide.gradient} transition-all duration-1000`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-9xl animate-float">{slide.emoji}</div>
          <div className="absolute bottom-20 right-10 text-8xl animate-float" style={{ animationDelay: '1s' }}>
            {heroSlides[(current + 1) % heroSlides.length].emoji}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-4">
                <span className="tag bg-white/20 text-white">{slide.subtitle}</span>
              </div>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-black ${slide.accent} mb-4 leading-tight`}>
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">{slide.desc}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={slide.link || '/shop'}
                  className="btn-primary inline-flex items-center gap-2 text-base"
                >
                  {slide.cta} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/shop" className="btn-secondary text-base">
                  Explore All
                </Link>
              </div>

              {/* Slide indicators */}
              <div className="flex gap-2 mt-8">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Stats card */}
            <div className="hidden md:grid grid-cols-2 gap-4">
              {[
                { emoji: '📦', label: '10K+ Products', value: '10,000+' },
                { emoji: '😊', label: 'Happy Customers', value: '2M+' },
                { emoji: '🏪', label: 'Departments', value: '6' },
                { emoji: '🌍', label: 'Cities Delivered', value: '150+' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all cursor-default">
                  <span className="text-3xl mb-2 block">{stat.emoji}</span>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                  <p className="text-white font-heading font-black text-2xl">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrent(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent(prev => (prev + 1) % heroSlides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}
