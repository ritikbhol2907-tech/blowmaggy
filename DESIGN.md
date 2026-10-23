# 🏗️ Design Document: Blowmaggy Architecture

## System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │  Home    │  │   Shop   │  │  Cart    │  │  Checkout  │  │
│  │  Page    │  │   Page   │  │  Page    │  │   Page     │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │  Admin   │  │  Login   │  │ Footer   │                   │
│  │ Dashboard│  │  Page    │  │  Component│                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
├──────────────────────────────────────────────────────────────┤
│                      Context Layer                           │
│  ┌──────────────────┐  ┌──────────────────┐                  │
│  │  CartContext     │  │  AuthContext     │                  │
│  │  (Cart state,    │  │  (User session,  │                  │
│  │   CRUD operations)│  │   Google Auth)   │                  │
│  └──────────────────┘  └──────────────────┘                  │
├──────────────────────────────────────────────────────────────┤
│                       Data Layer                             │
│  ┌──────────────────────────────────────┐                    │
│  │  localStorage (Cart, User Session)   │                    │
│  └──────────────────────────────────────┘                    │
├──────────────────────────────────────────────────────────────┤
│                     External APIs                            │
│  ┌──────────────┐  ┌───────────────┐  ┌─────────────────┐  │
│  │ Google OAuth │  │ Payment Gate. │  │  Shipping API   │  │
│  │ (Auth)       │  │  (Stripe/Razor)│  │  (Tracking)     │  │
│  └──────────────┘  └───────────────┘  └─────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## Data Model

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'email' | 'phone';
  loginAt: string;
  addresses: Address[];
  orders: OrderRef[];
  wishlist: ProductRef[];
}
```

### Product
```typescript
interface Product {
  id: number;
  name: string;
  department: 'fashion' | 'beauty' | 'electronics' | 'home' | 'grocery' | 'kids';
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string; // emoji for MVP, URL for production
  tag?: string;
  badge?: 'sale' | 'new' | 'bestseller';
  stock: number;
  sku: string;
  description: string;
  images: string[];
  attributes: Record<string, string>; // size, color, weight, etc.
}
```

### Cart
```typescript
interface CartItem {
  id: number;
  name: string;
  department: string;
  price: number;
  quantity: number;
  image: string;
}
```

### Order
```typescript
interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}
```

### Address
```typescript
interface Address {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
```

### Admin Dashboard Data
```typescript
interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  avgOrderValue: number;
  departmentBreakdown: DepartmentStats[];
  recentOrders: Order[];
  topProducts: Product[];
  weeklyRevenue: number[];
}
```

## File Structure
```
blowmaggy/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroBanner.jsx
│   │   ├── DepartmentGrid.jsx
│   │   ├── DealsBanner.jsx
│   │   ├── Testimonials.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProductGrid.jsx
│   ├── pages/               # Page-level components
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── Admin.jsx
│   ├── context/             # React context providers
│   │   ├── CartContext.jsx
│   │   └── AuthContext.jsx
│   ├── data/                # Static data (MVP)
│   │   └── products.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── PRD.md
├── DESIGN.md
├── PHASE.md
├── SECURITY.md
├── BUGS.md
└── BUSINESS.md
```

## Technology Stack
- **Framework**: React 18 with Vite (fast HMR, optimized build)
- **Styling**: Tailwind CSS 3 (utility-first, responsive by design)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **State Management**: React Context API (Cart + Auth)
- **Persistence**: localStorage (MVP) → PostgreSQL + Redis (production)
- **Auth**: Google OAuth (simulated) → Firebase Auth / Auth0 (production)
- **Payments**: Stripe/Razorpay integration (production)
- **Hosting**: Vercel / Netlify (frontend), AWS (backend)
