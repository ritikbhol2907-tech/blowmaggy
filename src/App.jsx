import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Employee from './pages/Employee';
import MyOrders from './pages/MyOrders';
import Wishlist from './pages/Wishlist';
import Returns from './pages/Returns';
import MyRewards from './pages/MyRewards';
import MyReviews from './pages/MyReviews';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/my-rewards" element={<MyRewards />} />
                <Route path="/my-reviews" element={<MyReviews />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
