import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, HeartOff } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);
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

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(prev => !prev);
  };

  const deptEmojis = {
    fashion: '👕', beauty: '✨', electronics: '💻', home: '🏠', grocery: '🛍️', kids: '😊'
  };

  return (
    <div className="card group relative overflow-hidden">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {discount > 0 && (
          <span className="tag bg-red-500 text-white">-{discount}%</span>
        )}
        {product.badge === 'new' && (
          <span className="tag bg-green-500 text-white">New</span>
        )}
        {product.badge === 'bestseller' && (
          <span className="tag bg-amber-500 text-white">Bestseller</span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={handleWishlist}
        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all ${
          liked
            ? 'bg-red-500 text-white shadow-red-200'
            : 'bg-white text-gray-400 hover:text-red-500'
        }`}
        aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {liked ? (
          <Heart className="w-4 h-4 fill-red-500" />
        ) : (
          <HeartOff className="w-4 h-4" />
        )}
      </button>

      {/* Image */}
      <Link to={`/shop?dept=${product.department}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-gray-100 overflow-hidden">
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {deptEmojis[product.department] || '🛍️'}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/shop?dept=${product.department}`} className="block mb-1">
          <h3 className="font-semibold text-sm text-gray-800 group-hover:text-[#e94560] transition-colors line-clamp-2 leading-snug">
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
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-[#e94560] hover:bg-[#d63550] text-white shadow-md hover:shadow-lg'
          }`}
        >
          {added ? (
            <>✓ Added to Cart</>
          ) : (
            <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
          )}
        </button>
      </div>
    </div>
  );
}
