import { useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { departments, products } from '../data/products';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const deptParam = searchParams.get('dept');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState(deptParam || 'all');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedDept !== 'all') result = result.filter(p => p.department === selectedDept);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.department.toLowerCase().includes(q));
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (ratingFilter > 0) result = result.filter(p => p.rating >= ratingFilter);
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': result.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }
    return result;
  }, [selectedDept, searchQuery, priceRange, ratingFilter, sortBy]);

  return (
    <div className="min-h-screen bg-onyx-950">
      {/* Header */}
      <div className="bg-onyx-900/80 backdrop-blur-xl border-b border-onyx-800/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                {selectedDept === 'all' ? 'All Products' : departments.find(d => d.id === selectedDept)?.name || 'Shop'}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} products found</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 bg-onyx-800/50 border border-onyx-700/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/50 outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2.5 rounded-xl border transition-all ${showFilters ? 'bg-gold-500/10 text-gold-400 border-gold-500/30' : 'bg-onyx-800 border-onyx-700/50 text-gray-400'}`}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Department tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            <button onClick={() => setSelectedDept('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                selectedDept === 'all' ? 'bg-gold-500/10 text-gold-400 border-gold-500/30' : 'bg-onyx-800 text-gray-400 border-onyx-700/50 hover:text-gold-400 hover:border-gold-500/30'
              }`}>All</button>
            {departments.map(dept => (
              <button key={dept.id} onClick={() => setSelectedDept(dept.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                  selectedDept === dept.id ? 'bg-gold-500/10 text-gold-400 border-gold-500/30' : 'bg-onyx-800 text-gray-400 border-onyx-700/50 hover:text-gold-400 hover:border-gold-500/30'
                }`}>{dept.name}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0 hidden lg:block">
              <div className="bg-onyx-900 border border-onyx-800/50 rounded-2xl p-6 sticky top-40">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white">Filters</h3>
                  <button onClick={() => { setPriceRange([0, 15000]); setRatingFilter(0); }} className="text-xs text-gold-400 hover:underline">Reset</button>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3 text-gray-300">Price Range</h4>
                  <input type="range" min="0" max="15000" value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-gold-500" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3 text-gray-300">Minimum Rating</h4>
                  {[0, 3, 3.5, 4, 4.5].map(r => (
                    <button key={r} onClick={() => setRatingFilter(r)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition-all ${
                        ratingFilter === r ? 'bg-gold-500/10 text-gold-400 font-semibold' : 'hover:bg-onyx-800 text-gray-400'}`}>
                      {r === 0 ? 'All Ratings' : `${r}+ ⭐`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 bg-onyx-900 border border-onyx-800/50 rounded-xl p-3">
              <span className="text-sm text-gray-500">Showing {filteredProducts.length} results</span>
              <div className="flex items-center gap-3">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 bg-onyx-800 rounded-lg text-sm outline-none border border-onyx-700/50 text-white">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price ↑</option>
                  <option value="price-high">Price ↓</option>
                  <option value="rating">Top Rated</option>
                  <option value="reviews">Most Popular</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="text-xl font-bold mb-2 text-white">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
