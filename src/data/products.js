export const departments = [
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', color: 'from-rose-600 to-pink-600', description: 'Luxury & contemporary fashion' },
  { id: 'beauty', name: 'Beauty', icon: 'Sparkles', color: 'from-fuchsia-600 to-purple-600', description: 'Premium beauty & skincare' },
  { id: 'electronics', name: 'Electronics', icon: 'Cpu', color: 'from-blue-600 to-indigo-600', description: 'Cutting-edge technology' },
  { id: 'home', name: 'Home', icon: 'Home', color: 'from-amber-600 to-orange-600', description: 'Designer home essentials' },
  { id: 'grocery', name: 'Grocery', icon: 'ShoppingBag', color: 'from-emerald-600 to-green-600', description: 'Organic & gourmet picks' },
  { id: 'kids', name: 'Kids', icon: 'Smile', color: 'from-violet-500 to-purple-500', description: 'Safe & creative for kids' },
];

const IMG = (id, w=600, h=750) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

export const products = [
  { id:1, name:'Italian Leather Jacket', department:'fashion', price:2999, originalPrice:4999, rating:4.7, reviews:342, image:IMG('1551028719-00167b16eac5'), images:[IMG('1551028719-00167b16eac5','600','600'),IMG('1520975954732-35dd22299614','600','600')], tag:'Premium', badge:'sale' },
  { id:2, name:'Floral Maxi Dress', department:'fashion', price:1899, originalPrice:2899, rating:4.8, reviews:256, image:IMG('1572804013309-59a88b7e92f1'), images:[IMG('1572804013309-59a88b7e92f1','600','600'),IMG('1595777457583-95e059d581b8','600','600')], tag:'Trending', badge:'new' },
  { id:3, name:'Slim Fit Chinos Premium', department:'fashion', price:1299, rating:4.4, reviews:189, image:IMG('1473966968600-fa801b869a1a'), badge:'bestseller' },
  { id:4, name:'Designer Leather Handbag', department:'fashion', price:3999, originalPrice:6499, rating:4.9, reviews:478, image:IMG('1548036328-c9fa89d128fa'), images:[IMG('1548036328-c9fa89d128fa','600','600'),IMG('1584917865442-de89df76afd3','600','600')], tag:'Luxury', badge:'sale' },
  { id:5, name:'Silk Blouse Collection', department:'fashion', price:2199, rating:4.5, reviews:123, image:IMG('1564257631407-4deb1f99d992'), badge:'new' },
  { id:6, name:'Premium Running Sneakers', department:'fashion', price:3499, originalPrice:5299, rating:4.8, reviews:567, image:IMG('1542291026-7eec264c27ff'), images:[IMG('1542291026-7eec264c27ff','600','600'),IMG('1606107557195-0e29a4b5b4aa','600','600')], tag:'Hot', badge:'sale' },
  { id:7, name:'Cashmere Wool Scarf', department:'fashion', price:999, rating:4.6, reviews:98, image:IMG('1520903920243-00d872a2d1c9') },
  { id:8, name:'Aviator Sunglasses Gold', department:'fashion', price:1899, rating:4.7, reviews:334, image:IMG('1572635196237-14b3f281503f'), badge:'bestseller' },
  { id:9, name:'Hyaluronic Acid Serum', department:'beauty', price:1299, originalPrice:1999, rating:4.9, reviews:789, image:IMG('1620916566398-39f1143ab7be'), images:[IMG('1620916566398-39f1143ab7be','600','600'),IMG('1611930022073-b7a4ba5fcccd','600','600')], tag:'Bestseller', badge:'sale' },
  { id:10, name:'Matte Lipstick Collection', department:'beauty', price:899, rating:4.7, reviews:445, image:IMG('1586495777744-4413f21062fa'), badge:'new' },
  { id:11, name:'Vitamin C Brightening Cream', department:'beauty', price:1099, originalPrice:1599, rating:4.8, reviews:556, image:IMG('1611930022073-b7a4ba5fcccd'), tag:'Popular', badge:'sale' },
  { id:12, name:'Keratin Hair Repair Mask', department:'beauty', price:799, rating:4.5, reviews:267, image:IMG('1535585209827-a15fcdbc4c2d') },
  { id:13, name:'Midnight Rose Eau de Parfum', department:'beauty', price:2899, originalPrice:4199, rating:4.9, reviews:389, image:IMG('1541643600914-78b084683601'), images:[IMG('1541643600914-78b084683601','600','600'),IMG('1592945403244-b3fbafd7f539','600','600')], tag:'Premium', badge:'sale' },
  { id:14, name:'Pro Palette Eyeshadow Set', department:'beauty', price:1599, rating:4.6, reviews:412, image:IMG('1512496015851-a90fb38ba796') },
  { id:15, name:'SPF 50 Mineral Sunscreen', department:'beauty', price:699, rating:4.8, reviews:634, image:IMG('1556228578-0d85b1a4d571'), badge:'bestseller' },
  { id:16, name:'Nail Art Studio Kit', department:'beauty', price:599, rating:4.4, reviews:178, image:IMG('1604654894610-df63bc536371'), badge:'new' },
  { id:17, name:'AirPods Pro Max', department:'electronics', price:3499, originalPrice:5999, rating:4.8, reviews:1567, image:IMG('1606220588913-b3aacb4d2f46'), images:[IMG('1606220588913-b3aacb4d2f46','600','600'),IMG('1590658268037-6bf12f032f55','600','600')], tag:'Hot Deal', badge:'sale' },
  { id:18, name:'Smart Watch Ultra', department:'electronics', price:7999, originalPrice:12999, rating:4.9, reviews:1023, image:IMG('1546868871-9dd8609ff250'), images:[IMG('1546868871-9dd8609ff250','600','600'),IMG('1434493789847-2f02dc6ca35d','600','600')], tag:'Bestseller', badge:'sale' },
  { id:19, name:'JBL Flip 6 Speaker', department:'electronics', price:2199, rating:4.6, reviews:678, image:IMG('1608043152269-423dbba4e7e1') },
  { id:20, name:'4K Ultra Webcam Pro', department:'electronics', price:2499, originalPrice:3799, rating:4.5, reviews:345, image:IMG('1587826080692-f439cd0b70da'), badge:'new' },
  { id:21, name:'Mechanical Keyboard RGB', department:'electronics', price:3999, rating:4.7, reviews:589, image:IMG('1618384887929-16ec33fab9ef') },
  { id:22, name:'USB-C Docking Station', department:'electronics', price:1499, rating:4.4, reviews:267, image:IMG('1625842268584-8f3296236761') },
  { id:23, name:'iPad Pro Stand Premium', department:'electronics', price:1299, rating:4.6, reviews:234, image:IMG('1544244015-0df4b3ffc6b0'), badge:'new' },
  { id:24, name:'Pro Ring Light Studio', department:'electronics', price:1899, originalPrice:2799, rating:4.5, reviews:456, image:IMG('1598439210625-5067c578f3f6'), badge:'sale' },
  { id:25, name:'Luxury Scented Candle Set', department:'home', price:899, rating:4.7, reviews:312, image:IMG('1602028915047-372696176d86'), tag:'Cozy' },
  { id:26, name:'Velvet Throw Pillows Set', department:'home', price:1199, originalPrice:1799, rating:4.5, reviews:234, image:IMG('1584100936595-c0654b55a2e2'), badge:'sale' },
  { id:27, name:'Ceramic Plant Pot Collection', department:'home', price:1299, rating:4.8, reviews:198, image:IMG('1485955900006-10f4d324d411'), tag:'Trending', badge:'new' },
  { id:28, name:'Damascus Chef Knife Set', department:'home', price:2999, originalPrice:4499, rating:4.9, reviews:678, image:IMG('1593618998160-e34014e67546'), images:[IMG('1593618998160-e34014e67546','600','600'),IMG('1590794056226-79ef3a8147e1','600','600')], tag:'Bestseller', badge:'sale' },
  { id:29, name:'Weighted Blanket Deluxe', department:'home', price:2499, originalPrice:3799, rating:4.7, reviews:534, image:IMG('1555041469-a586c61ea9bc'), badge:'sale' },
  { id:30, name:'Abstract Wall Art Print', department:'home', price:1599, rating:4.5, reviews:167, image:IMG('1582555172866-f73bb12da254') },
  { id:31, name:'Memory Foam Pillow Elite', department:'home', price:1299, rating:4.8, reviews:756, image:IMG('1590239024541-6d8e8fef66c8'), badge:'bestseller' },
  { id:32, name:'Smart LED Bulbs Philips', department:'home', price:999, originalPrice:1599, rating:4.6, reviews:423, image:IMG('1507003211169-0a1dd7228f2d'), badge:'sale' },
  { id:33, name:'Colombian Coffee Beans', department:'grocery', price:599, rating:4.9, reviews:1023, image:IMG('1559056199-641a0ac8b55e'), images:[IMG('1559056199-641a0ac8b55e','600','600'),IMG('1514432324607-a09d9b4aefda','600','600')], tag:'Fresh', badge:'bestseller' },
  { id:34, name:'Roasted Nuts Premium Mix', department:'grocery', price:499, rating:4.6, reviews:423, image:IMG('1599599810769-bcde5a160d32') },
  { id:35, name:'Extra Virgin Olive Oil', department:'grocery', price:699, originalPrice:999, rating:4.8, reviews:312, image:IMG('1474979266404-7ea1bcd152c8'), images:[IMG('1474979266404-7ea1bcd152c8','600','600'),IMG('1518977676601-b53f82b92e78','600','600')], badge:'sale' },
  { id:36, name:'Belgian Dark Chocolate Box', department:'grocery', price:399, rating:4.9, reviews:678, image:IMG('1587132137056-bfbf016283b9'), tag:'Indulge' },
  { id:37, name:'Japanese Green Tea Collection', department:'grocery', price:449, rating:4.7, reviews:267, image:IMG('1556679343-c7306c1976bc'), badge:'new' },
  { id:38, name:'Wildflower Honey Organic', department:'grocery', price:549, rating:4.8, reviews:456, image:IMG('1587049352846-8a44f300543b') },
  { id:39, name:'Italian Pasta Collection', department:'grocery', price:349, rating:4.5, reviews:289, image:IMG('1551462147-ff29058bfc6') },
  { id:40, name:'Organic Dried Fruit Medley', department:'grocery', price:399, originalPrice:549, rating:4.7, reviews:234, image:IMG('1596591606975-97ee5cef3a1e'), badge:'sale' },
  { id:41, name:'STEM Building Blocks Pro', department:'kids', price:1199, originalPrice:1899, rating:4.9, reviews:789, image:IMG('1596461404969-9ae70f2830c1'), images:[IMG('1596461404969-9ae70f2830c1','600','600'),IMG('1587654780291-39c9404d7dd0','600','600')], tag:'STEM', badge:'sale' },
  { id:42, name:'Kids Art Studio Set', department:'kids', price:899, rating:4.8, reviews:456, image:IMG('1513364776144-60967b0f800f'), badge:'bestseller' },
  { id:43, name:'Luxury Plush Teddy Bear', department:'kids', price:799, rating:4.7, reviews:312, image:IMG('1563330232-57114d542f91') },
  { id:44, name:'Kids Adventure Helmet', department:'kids', price:899, rating:4.6, reviews:156, image:IMG('1558502845-040502758002'), tag:'Safe', badge:'new' },
  { id:45, name:'RC Racing Car Pro', department:'kids', price:1499, originalPrice:2299, rating:4.7, reviews:534, image:IMG('1581235707960-3551510719b7'), badge:'sale' },
  { id:46, name:'Kids Premium Backpack', department:'kids', price:899, rating:4.5, reviews:234, image:IMG('1553062407-98eeb64c6a62') },
  { id:47, name:'Baby Soft Toy Collection', department:'kids', price:599, rating:4.8, reviews:423, image:IMG('1566576912321-d58ddd7a6088'), badge:'new' },
  { id:48, name:'Family Board Game Set', department:'kids', price:999, originalPrice:1599, rating:4.9, reviews:345, image:IMG('1611371805429-8b5c1b2c34ba'), badge:'sale' },
];

export const deals = [
  { id:101, title:'Flash Sale', subtitle:'Up to 60% off Fashion', discount:'60%', color:'from-rose-600 to-pink-600', department:'fashion', emoji:'👗' },
  { id:102, title:'Tech Deals', subtitle:'Smart gadgets from ₹999', discount:'₹999+', color:'from-blue-600 to-indigo-600', department:'electronics', emoji:'💻' },
  { id:103, title:'Beauty Box', subtitle:'Buy 2 Get 1 Free', discount:'BOGO', color:'from-fuchsia-600 to-purple-600', department:'beauty', emoji:'💄' },
  { id:104, title:'Home Essentials', subtitle:'Start from ₹299', discount:'₹299', color:'from-amber-600 to-orange-600', department:'home', emoji:'🏠' },
  { id:105, title:'Fresh Grocery', subtitle:'Free delivery on ₹499+', discount:'Free', color:'from-emerald-600 to-green-600', department:'grocery', emoji:'🥦' },
  { id:106, title:'Kids Paradise', subtitle:'All toys under ₹999', discount:'Under ₹999', color:'from-violet-500 to-purple-500', department:'kids', emoji:'🧸' },
];

export const testimonials = [
  { id:1, name:'Priya Sharma', role:'Fashion Lover', text:'Blowmaggy has completely changed how I shop online. The variety is unmatched!', rating:5, avatar:'👩' },
  { id:2, name:'Rahul Mehta', role:'Tech Enthusiast', text:'Best prices on electronics with lightning-fast delivery. Absolutely love it!', rating:5, avatar:'👨' },
  { id:3, name:'Ananya Patel', role:'Beauty Blogger', text:'The beauty section has everything - from drugstore to luxury brands!', rating:5, avatar:'👩‍🦱' },
  { id:4, name:'Vikram Singh', role:'Home Decor Expert', text:'Quality home products at amazing prices. My go-to for everything home.', rating:4, avatar:'👴' },
];

export const stats = [
  { label:'Products', value:'10K+', icon:'📦' },
  { label:'Happy Customers', value:'2M+', icon:'😊' },
  { label:'Departments', value:'6', icon:'🏪' },
  { label:'Cities', value:'150+', icon:'🌍' },
];
