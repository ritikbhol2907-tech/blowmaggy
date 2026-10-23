export const departments = [
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', color: 'from-pink-500 to-rose-500', description: 'Trendsetting styles for every occasion' },
  { id: 'beauty', name: 'Beauty', icon: 'Sparkles', color: 'from-purple-500 to-violet-500', description: 'Premium beauty & skincare' },
  { id: 'electronics', name: 'Electronics', icon: 'Cpu', color: 'from-blue-500 to-cyan-500', description: 'Latest gadgets & tech' },
  { id: 'home', name: 'Home', icon: 'Home', color: 'from-amber-500 to-orange-500', description: 'Furnish your dream home' },
  { id: 'grocery', name: 'Grocery', icon: 'ShoppingBag', color: 'from-green-500 to-emerald-500', description: 'Fresh essentials daily' },
  { id: 'kids', name: 'Kids', icon: 'Smile', color: 'from-yellow-400 to-yellow-500', description: 'Fun & safe for little ones' },
];

export const products = [
  // Fashion
  { id: 1, name: 'Classic Denim Jacket', department: 'fashion', price: 1999, originalPrice: 3299, rating: 4.5, reviews: 234, image: '/products/fashion/jacket.jpg', tag: 'Trending', badge: 'sale' },
  { id: 2, name: 'Floral Summer Dress', department: 'fashion', price: 1299, originalPrice: 1999, rating: 4.7, reviews: 189, image: '/products/fashion/dress.jpg', tag: 'New', badge: 'new' },
  { id: 3, name: 'Slim Fit Chinos', department: 'fashion', price: 999, rating: 4.3, reviews: 156, image: '/products/fashion/chinos.jpg', badge: 'bestseller' },
  { id: 4, name: 'Leather Crossbody Bag', department: 'fashion', price: 2499, originalPrice: 4199, rating: 4.8, reviews: 312, image: '/products/fashion/bag.jpg', tag: 'Hot', badge: 'sale' },
  { id: 5, name: 'Silk Blouse', department: 'fashion', price: 1599, rating: 4.4, reviews: 98, image: '/products/fashion/blouse.jpg', badge: 'new' },
  { id: 6, name: 'Running Sneakers', department: 'fashion', price: 2799, originalPrice: 4099, rating: 4.6, reviews: 445, image: '/products/fashion/sneakers.jpg', tag: 'Bestseller', badge: 'sale' },
  { id: 7, name: 'Wool Blend Scarf', department: 'fashion', price: 699, rating: 4.2, reviews: 87, image: '/products/fashion/scarf.jpg', badge: '' },
  { id: 8, name: 'Aviator Sunglasses', department: 'fashion', price: 1299, rating: 4.5, reviews: 201, image: '/products/fashion/sunglasses.jpg', badge: '' },

  // Beauty
  { id: 9, name: 'Hydrating Face Serum', department: 'beauty', price: 899, originalPrice: 1399, rating: 4.9, reviews: 567, image: '/products/beauty/serum.jpg', tag: 'Bestseller', badge: 'sale' },
  { id: 10, name: 'Matte Lipstick Set', department: 'beauty', price: 699, rating: 4.6, reviews: 334, image: '/products/beauty/lipstick.jpg', badge: 'new' },
  { id: 11, name: 'Vitamin C Moisturizer', department: 'beauty', price: 799, originalPrice: 1199, rating: 4.7, reviews: 423, image: '/products/beauty/moisturizer.jpg', tag: 'Popular', badge: 'sale' },
  { id: 12, name: 'Hair Repair Mask', department: 'beauty', price: 499, rating: 4.4, reviews: 198, image: '/products/beauty/hair-mask.jpg', badge: '' },
  { id: 13, name: 'Perfume - Midnight Rose', department: 'beauty', price: 1899, originalPrice: 2599, rating: 4.8, reviews: 276, image: '/products/beauty/perfume.jpg', tag: 'Premium', badge: 'sale' },
  { id: 14, name: 'Eyeshadow Palette', department: 'beauty', price: 1299, rating: 4.5, reviews: 345, image: '/products/beauty/eyeshadow.jpg', badge: '' },
  { id: 15, name: 'Natural Sunscreen SPF 50', department: 'beauty', price: 599, rating: 4.7, reviews: 512, image: '/products/beauty/sunscreen.jpg', badge: 'bestseller' },
  { id: 16, name: 'Nail Art Kit', department: 'beauty', price: 399, rating: 4.3, reviews: 123, image: '/products/beauty/nail-kit.jpg', badge: 'new' },

  // Electronics
  { id: 17, name: 'Wireless Earbuds Pro', department: 'electronics', price: 2499, originalPrice: 4499, rating: 4.7, reviews: 1234, image: '/products/electronics/earbuds.jpg', tag: 'Hot Deal', badge: 'sale' },
  { id: 18, name: 'Smart Watch Series 5', department: 'electronics', price: 5999, originalPrice: 8999, rating: 4.8, reviews: 876, image: '/products/electronics/smartwatch.jpg', tag: 'Bestseller', badge: 'sale' },
  { id: 19, name: 'Portable Bluetooth Speaker', department: 'electronics', price: 1499, rating: 4.5, reviews: 543, image: '/products/electronics/speaker.jpg', badge: '' },
  { id: 20, name: '4K Webcam', department: 'electronics', price: 1799, originalPrice: 2799, rating: 4.4, reviews: 321, image: '/products/electronics/webcam.jpg', badge: 'new' },
  { id: 21, name: 'Mechanical Keyboard', department: 'electronics', price: 2999, rating: 4.6, reviews: 456, image: '/products/electronics/keyboard.jpg', badge: '' },
  { id: 22, name: 'USB-C Hub 7-in-1', department: 'electronics', price: 999, rating: 4.3, reviews: 234, image: '/products/electronics/usb-hub.jpg', badge: '' },
  { id: 23, name: 'Tablet Stand Adjustable', department: 'electronics', price: 699, rating: 4.5, reviews: 189, image: '/products/electronics/tablet-stand.jpg', badge: 'new' },
  { id: 24, name: 'LED Ring Light Kit', department: 'electronics', price: 1199, originalPrice: 1799, rating: 4.4, reviews: 378, image: '/products/electronics/ring-light.jpg', badge: 'sale' },

  // Home
  { id: 25, name: 'Scented Candle Set', department: 'home', price: 699, rating: 4.6, reviews: 234, image: '/products/home/candles.jpg', tag: 'Cozy', badge: '' },
  { id: 26, name: 'Throw Pillow Covers (Set of 4)', department: 'home', price: 899, originalPrice: 1399, rating: 4.5, reviews: 312, image: '/products/home/pillows.jpg', badge: 'sale' },
  { id: 27, name: 'Ceramic Plant Pot Set', department: 'home', price: 999, rating: 4.7, reviews: 189, image: '/products/home/plant-pots.jpg', tag: 'Trending', badge: 'new' },
  { id: 28, name: 'Kitchen Knife Set', department: 'home', price: 1999, originalPrice: 2999, rating: 4.8, reviews: 567, image: '/products/home/knife-set.jpg', tag: 'Bestseller', badge: 'sale' },
  { id: 29, name: 'Weighted Blanket', department: 'home', price: 1799, originalPrice: 2799, rating: 4.6, reviews: 445, image: '/products/home/blanket.jpg', badge: 'sale' },
  { id: 30, name: 'Wall Art Canvas Print', department: 'home', price: 1299, rating: 4.4, reviews: 198, image: '/products/home/wall-art.jpg', badge: '' },
  { id: 31, name: 'Memory Foam Pillow', department: 'home', price: 999, rating: 4.7, reviews: 623, image: '/products/home/pillow.jpg', badge: 'bestseller' },
  { id: 32, name: 'Smart LED Bulbs (Pack of 4)', department: 'home', price: 799, originalPrice: 1399, rating: 4.5, reviews: 345, image: '/products/home/led-bulbs.jpg', badge: 'sale' },

  // Grocery
  { id: 33, name: 'Organic Coffee Beans', department: 'grocery', price: 399, rating: 4.8, reviews: 876, image: '/products/grocery/coffee.jpg', tag: 'Fresh', badge: 'bestseller' },
  { id: 34, name: 'Mixed Nuts Premium (500g)', department: 'grocery', price: 349, rating: 4.6, reviews: 345, image: '/products/grocery/nuts.jpg', badge: '' },
  { id: 35, name: 'Extra Virgin Olive Oil', department: 'grocery', price: 499, originalPrice: 699, rating: 4.7, reviews: 234, image: '/products/grocery/olive-oil.jpg', badge: 'sale' },
  { id: 36, name: 'Dark Chocolate Assortment', department: 'grocery', price: 299, rating: 4.9, reviews: 567, image: '/products/grocery/chocolate.jpg', tag: 'Indulge', badge: '' },
  { id: 37, name: 'Green Tea Collection', department: 'grocery', price: 349, rating: 4.5, reviews: 198, image: '/products/grocery/tea.jpg', badge: 'new' },
  { id: 38, name: 'Organic Honey (500ml)', department: 'grocery', price: 449, rating: 4.8, reviews: 423, image: '/products/grocery/honey.jpg', badge: '' },
  { id: 39, name: 'Pasta Variety Pack', department: 'grocery', price: 249, rating: 4.4, reviews: 234, image: '/products/grocery/pasta.jpg', badge: '' },
  { id: 40, name: 'Dried Fruit Mix', department: 'grocery', price: 299, originalPrice: 399, rating: 4.6, reviews: 189, image: '/products/grocery/dried-fruits.jpg', badge: 'sale' },

  // Kids
  { id: 41, name: 'Educational Building Blocks', department: 'kids', price: 899, originalPrice: 1399, rating: 4.9, reviews: 678, image: '/products/kids/blocks.jpg', tag: 'STEM', badge: 'sale' },
  { id: 42, name: 'Kids Art Set (72 Pieces)', department: 'kids', price: 699, rating: 4.7, reviews: 345, image: '/products/kids/art-set.jpg', badge: 'bestseller' },
  { id: 43, name: 'Plush Teddy Bear', department: 'kids', price: 599, rating: 4.8, reviews: 234, image: '/products/kids/teddy.jpg', badge: '' },
  { id: 44, name: 'Kids Safety Helmet', department: 'kids', price: 699, rating: 4.5, reviews: 123, image: '/products/kids/helmet.jpg', tag: 'Safe', badge: 'new' },
  { id: 45, name: 'Remote Control Car', department: 'kids', price: 999, originalPrice: 1599, rating: 4.6, reviews: 456, image: '/products/kids/rc-car.jpg', badge: 'sale' },
  { id: 46, name: 'Kids Backpack', department: 'kids', price: 699, rating: 4.4, reviews: 189, image: '/products/kids/backpack.jpg', badge: '' },
  { id: 47, name: 'Baby Soft Toys Set', department: 'kids', price: 449, rating: 4.7, reviews: 312, image: '/products/kids/toys.jpg', badge: 'new' },
  { id: 48, name: 'Kids Board Game Collection', department: 'kids', price: 799, originalPrice: 1199, rating: 4.8, reviews: 267, image: '/products/kids/board-game.jpg', badge: 'sale' },
];

export const deals = [
  { id: 101, title: 'Flash Sale', subtitle: 'Up to 60% off Fashion', discount: '60%', color: 'from-pink-600 to-rose-400', department: 'fashion', emoji: '👗' },
  { id: 102, title: 'Tech Deals', subtitle: 'Smart gadgets from ₹299', discount: '₹299+', color: 'from-blue-600 to-cyan-400', department: 'electronics', emoji: '💻' },
  { id: 103, title: 'Beauty Box', subtitle: 'Buy 2 Get 1 Free', discount: 'BOGO', color: 'from-purple-600 to-violet-400', department: 'beauty', emoji: '💄' },
  { id: 104, title: 'Home Essentials', subtitle: 'Start from ₹99', discount: '₹99', color: 'from-amber-600 to-orange-400', department: 'home', emoji: '🏠' },
  { id: 105, title: 'Fresh Grocery', subtitle: 'Free delivery on ₹499+', discount: 'Free', color: 'from-green-600 to-emerald-400', department: 'grocery', emoji: '🥦' },
  { id: 106, title: 'Kids Paradise', subtitle: 'All toys under ₹999', discount: 'Under ₹999', color: 'from-yellow-500 to-amber-400', department: 'kids', emoji: '🧸' },
];

export const testimonials = [
  { id: 1, name: 'Priya Sharma', role: 'Fashion Lover', text: 'Blowmaggy has completely changed how I shop online. The variety is unmatched!', rating: 5, avatar: '👩' },
  { id: 2, name: 'Rahul Mehta', role: 'Tech Enthusiast', text: 'Best prices on electronics with lightning-fast delivery. Absolutely love it!', rating: 5, avatar: '👨' },
  { id: 3, name: 'Ananya Patel', role: 'Beauty Blogger', text: 'The beauty section has everything — from drugstore to luxury brands!', rating: 5, avatar: '👩‍🦱' },
  { id: 4, name: 'Vikram Singh', role: 'Home Decor Expert', text: 'Quality home products at amazing prices. My go-to for everything home.', rating: 4, avatar: '👴' },
];

export const stats = [
  { label: 'Products', value: '10K+', icon: '📦' },
  { label: 'Happy Customers', value: '2M+', icon: '😊' },
  { label: 'Departments', value: '6', icon: '🏪' },
  { label: 'Cities', value: '150+', icon: '🌍' },
];
