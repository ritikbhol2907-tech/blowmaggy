import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, HeartOff, Eye, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const deptEmojis = {
    fashion: '👕', beauty: '✨', electronics: '💻', home: '🏠', grocery: '🛍️', kids: '😊'
  };

  return (
    <>
      <div className="card group relative overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {discount > 0 && (
            <span className="tag bg-red-500/90 text-white">{discount}% OFF</span>
          )}
          {product.badge === 'new' && (
            <span className="tag bg-emerald-500/90 text-white">NEW</span>
          )}
          {product.badge === 'bestseller' && (
            <span className="tag bg-gold-500/90 text-onyx-950">Bestseller</span>
          )}
          {product.tag && (
            <span className="tag bg-onyx-900/80 backdrop-blur-sm text-gold-400">{product.tag}</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
            liked ? 'bg-red-500 text-white' : 'bg-onyx-900/80 backdrop-blur-sm text-gray-400 hover:text-red-400'
          }`}
        >
          {liked ? <Heart className="w-4 h-4 fill-red-500" /> : <HeartOff className="w-4 h-4" />}
        </button>

        {/* Image */}
        <div className="relative aspect-square bg-onyx-800 overflow-hidden cursor-pointer" onClick={() => setShowQuickView(true)}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
          <div className="w-full h-full hidden items-center justify-center text-5xl bg-onyx-800">
            {deptEmojis[product.department] || '🛍️'}
          </div>
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-onyx-900/0 group-hover:bg-onyx-900/40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <div className="bg-onyx-900/80 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                <Eye className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Quick View</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <Link to={`/shop?dept=${product.department}`} className="block mb-1">
            <h3 className="font-semibold text-sm text-gray-200 group-hover:text-gold-400 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'text-gold-400 fill-gold-400'
                      : 'text-gray-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-white">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 ${
                added
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'gold-gradient text-onyx-950 hover:shadow-lg hover:shadow-gold-500/20'
              }`}
            >
              {added ? (
                <>✓ Added</>
              ) : (
                <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>
              )}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setShowQuickView(true); }}
              className="p-2.5 bg-onyx-800 hover:bg-onyx-700 rounded-xl text-gray-400 hover:text-gold-400 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowQuickView(false)}>
          <div className="bg-onyx-900 border border-onyx-700/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex justify-end p-4">
              <button onClick={() => setShowQuickView(false)} className="p-2 hover:bg-onyx-800 rounded-xl transition-colors">
                <HeartOff className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 p-4">
              <div className="aspect-square bg-onyx-800 rounded-xl overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-display font-bold text-xl text-white mb-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-gold-400 fill-gold-400' : 'text-gray-700'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-gold-400">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                  {discount > 0 && <span className="tag bg-red-500/20 text-red-400 text-xs">-{discount}%</span>}
                </div>
                <p className="text-sm text-gray-400 mb-4">Premium quality product from our curated collection. Free shipping on orders over ₹499.</p>
                <button
                  onClick={() => { addToCart(product); setShowQuickView(false); }}
                  className="gold-gradient text-onyx-950 font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-gold-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart — ₹{product.price.toLocaleString()}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
