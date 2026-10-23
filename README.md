# 🛍️ Blowmaggy — The Everything Issue

> **One cart. One checkout. Everything you need.**

A fully functional multi-department e-commerce platform built with React + Vite + Tailwind CSS.

## 🚀 Features

- **6 Departments**: Fashion, Beauty, Electronics, Home, Grocery, Kids
- **48 Products** across all departments
- **Smart Shopping Cart** with quantity controls and promo codes
- **Multi-step Checkout** — Shipping → Payment → Review → Confirmation
- **Google Sign-In** authentication
- **Admin Dashboard** — Analytics, orders, department performance
- **Fully Responsive** — Works on mobile, tablet, and desktop
- **Product Filtering** — Search, sort by price/rating, department tabs
- **Promo Code System** — Use `BLOWMAGGY25` for 15% off

## 📁 Project Structure

```
blowmaggy/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── context/         # State management (Cart, Auth)
│   ├── data/            # Product catalog
│   └── App.jsx          # Main app with routing
├── PRD.md               # Product Requirements
├── DESIGN.md            # Architecture & Data Model
├── PHASE.md             # 6 phases to launch
├── SECURITY.md          # Security measures
├── BUSINESS.md          # Business model
├── OPTIMIZATION.md      # Performance optimization
└── BUGS.md              # Known issues
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS 3 |
| Routing | React Router DOM v6 |
| Icons | Lucide React |
| State | React Context API |
| Persistence | localStorage |

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📋 Contest Deliverables

| Document | File |
|----------|------|
| PRD (Problem, Personas, Scope, Metrics) | `PRD.md` |
| Design Doc (Architecture, Data Model) | `DESIGN.md` |
| Wireframes (Shopper + Admin screens) | `Home.jsx`, `Shop.jsx`, `Cart.jsx`, `Checkout.jsx`, `Admin.jsx` |
| Tech Stack | `DESIGN.md` |
| Phase.md (6 phases) | `PHASE.md` |
| Security | `SECURITY.md` |
| Bugs | `BUGS.md` |
| Optimization | `OPTIMIZATION.md` |
| Business Model | `BUSINESS.md` |

## 🎯 Promo Code

Use **`BLOWMAGGY25`** in cart for 15% discount!

## 📱 User Screens

1. **Home** — Hero banner, departments, deals, trending products, testimonials
2. **Shop** — Product catalog with filters, search, sort, department tabs
3. **Cart** — Item management, promo codes, order summary
4. **Checkout** — 3-step checkout with shipping, payment, review
5. **Admin** — Dashboard with analytics, orders table, department stats

## 📄 Admin Screens

1. **Dashboard** — Revenue, orders, customers, avg order value
2. **Revenue Chart** — Weekly bar chart visualization
3. **Department Cards** — Performance by department
4. **Orders Table** — Recent orders with status badges
5. **Top Products** — Best-selling products
6. **Quick Actions** — Add product, create offer, manage stock

---

Built with ❤️ for the Vibe Coding Contest
