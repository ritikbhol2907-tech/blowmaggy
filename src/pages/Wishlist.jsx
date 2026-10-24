import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Heart, X, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';

// Demo wishlist products
const wishlistProducts = [
  { id: 1, name: 'Italian Leather Jacket', department: 'fashion', price: 2999, originalPrice: 4999, rating: 4.7, reviews: 342, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop', badge: 'sale' },
  { id: 13, name: 'Midnight Rose Eau de Parfum', department: 'beauty', price: 2899, originalPrice: 4199, rating: 4.9, reviews: 389, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=750&fit=crop', badge: 'sale' },
  { id: 18, name: 'Smart Watch Ultra', department: 'electronics', price: 7999, originalPrice: 12999, rating: 4.9, reviews: 1023, image: 'https://images.unsplash.com/photo-1546868871-9dd8609ff250?w=600&h=750&fit=crop', badge: 'sale' },
  { id: 41, name: 'STEM Building Blocks Pro', department: 'kids', price: 1199, originalPrice: 1899, rating: 4.9, reviews: 789, image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=750&fit=crop', badge: 'sale' },
  { id: 28, name: 'Damascus Chef Knife Set', department: 'home', price: 2999, originalPrice: 4499, rating: 4.9, reviews: 678, image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&h=750&fit=crop', badge: 'sale' },
  { id: 33, name: 'Colombian Coffee Beans', department: 'grocery', price: 599, rating: 4.9, reviews: 1023, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=750&fit=crop', badge: 'bestseller' },
];

export default function Wishlist() {
  const { user } = useAuth();
  const [items, setItems] = useState(wishlistProducts);

  const removeFromWishlist = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-onyx-950 flex items-center justify-center">
        <div className="text-center px-4">
          <Heart className="w-20 h-20 text-gray-700 mx-auto mb-6" />
          <h1 className="text-2xl font-display font-bold text-white mb-3">Sign in to view Wishlist</h1>
          <p className="text-gray-500 mb-6">Save your favorite products and come back to them anytime</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-onyx-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-white text-2xl">My Wishlist</h1>
            <p className="text-sm text-gray-500">{items.length} saved items</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-gray-700 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Browse products and click the heart icon to save them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(product => (
              <div key={product.id} className="card group relative overflow-hidden">
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-onyx-900/80 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                <div className="aspect-square bg-onyx-800 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-white truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-gold-400">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <button className="w-full mt-2 py-2 bg-gold-500 hover:bg-gold-400 text-onyx-950 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1">
                    <ShoppingBag className="w-3 h-3" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
