import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ProductsProvider } from './context/ProductsContext'
import Layout from './components/Layout'

import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import TrackOrder from './pages/TrackOrder'
import Login from './pages/Login'
import CheckoutGate from './pages/CheckoutGate'
import MyOrders from './pages/MyOrders'
import OrderDetail from './pages/OrderDetail'
import Account from './pages/Account'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'

const Protected = ({ children }) => {
  const user = localStorage.getItem('user')
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductsProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/account" element={<Protected><Account /></Protected>} />
                <Route path="/track" element={<TrackOrder />} />
                <Route path="/my-orders" element={<Protected><MyOrders /></Protected>} />
                <Route path="/order/:orderId" element={<Protected><OrderDetail /></Protected>} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckoutGate />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ProductsProvider>
      </CartProvider>
    </AuthProvider>
  )
}