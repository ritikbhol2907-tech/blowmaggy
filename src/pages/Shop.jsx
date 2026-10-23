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
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedDept !== 'all') {
      result = result.filter(p => p.department === selectedDept);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q)
      );
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (ratingFilter > 0) {
      result = result.filter(p => p.rating >= ratingFilter);
    }

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-black text-blowmaggy-dark">
                {selectedDept === 'all' ? 'All Products' : departments.find(d => d.id === selectedDept)?.name || 'Shop'}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} products found</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-blowmaggy-accent/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2.5 rounded-xl border transition-all ${showFilters ? 'bg-blowmaggy-accent text-white border-blowmaggy-accent' : 'bg-white border-gray-200'}`}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Department tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedDept('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border-2 ${
                selectedDept === 'all'
                  ? 'bg-blowmaggy-accent text-white border-blowmaggy-accent shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blowmaggy-accent hover:text-blowmaggy-accent'
              }`}
            >
              All
            </button>
            {departments.map(dept => (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border-2 ${
                  selectedDept === dept.id
                    ? 'bg-blowmaggy-accent text-white border-blowmaggy-accent shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blowmaggy-accent hover:text-blowmaggy-accent'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0 hidden lg:block">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-40">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Filters</h3>
                  <button onClick={() => { setPriceRange([0, 5000]); setRatingFilter(0); }} className="text-xs text-blowmaggy-accent hover:underline">
                    Reset
                  </button>
                </div>

                {/* Price range */}
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3">Price Range</h4>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-blowmaggy-accent"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                {/* Rating filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3">Minimum Rating</h4>
                  {[0, 3, 3.5, 4, 4.5].map(r => (
                    <button
                      key={r}
                      onClick={() => setRatingFilter(r)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition-all ${
                        ratingFilter === r
                          ? 'bg-blowmaggy-accent/10 text-blowmaggy-accent font-semibold'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {r === 0 ? 'All Ratings' : `${r}+ ⭐`}
                    </button>
                  ))}
                </div>

                {/* Clearance */}
                <div>
                  <h4 className="font-semibold text-sm mb-3">On Sale</h4>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="rounded accent-blowmaggy-accent" />
                    Only show sale items
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Mobile filters modal */}
          {showFilters && (
            <div className="fixed inset-0 bg-black/50 z-50 lg:hidden flex items-end" onClick={() => setShowFilters(false)}>
              <div className="bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Price Range</h4>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-blowmaggy-accent"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Minimum Rating</h4>
                  <div className="flex flex-wrap gap-2">
                    {[0, 3, 3.5, 4, 4.5].map(r => (
                      <button
                        key={r}
                        onClick={() => setRatingFilter(r)}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                          ratingFilter === r ? 'bg-blowmaggy-accent text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {r === 0 ? 'All' : `${r}+⭐`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4 bg-white rounded-xl p-3 shadow-sm">
              <span className="text-sm text-gray-500">
                Showing {filteredProducts.length} results
              </span>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price ↑</option>
                  <option value="price-high">Price ↓</option>
                  <option value="rating">Top Rated</option>
                  <option value="reviews">Most Popular</option>
                </select>
                <div className="flex gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-blowmaggy-accent text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <span className="text-sm">⊞</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-blowmaggy-accent text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <span className="text-sm">☰</span>
                  </button>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className={`grid gap-4 ${
                viewMode === 'grid'
                  ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}>
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
