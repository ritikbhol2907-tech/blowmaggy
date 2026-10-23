import { Link } from 'react-router-dom';
import { departments } from '../data/products';

// Simple icon mapping
const iconMap = {
  Shirt: '👕',
  Sparkles: '✨',
  Cpu: '💻',
  Home: '🏠',
  ShoppingBag: '🛍️',
  Smile: '😊',
};

export default function DepartmentGrid() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title mb-3">Shop by Department</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            From fashion to groceries — explore 6 departments under one roof
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {departments.map((dept, i) => (
            <Link
              key={dept.id}
              to={`/shop?dept=${dept.id}`}
              className={`group relative bg-gradient-to-br ${dept.color} rounded-2xl p-6 text-white text-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl mb-3">{iconMap[dept.icon] || '🏪'}</div>
              <h3 className="font-heading font-bold text-lg mb-1">{dept.name}</h3>
              <p className="text-white/70 text-xs">{dept.description}</p>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xl">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
