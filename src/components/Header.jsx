// src/components/Header.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCartIcon,
  MapPinIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [showAuthDropdown, setShowAuthDropdown] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setShowAuthDropdown(false)
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/track', label: 'Track Order' },
    { 
      to: '/cart', 
      label: (
        <div className="flex items-center">
          <ShoppingCartIcon className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="ml-1 text-sm bg-white text-indigo-600 rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
      ) 
    },
  ]

  const authLinks = user
    ? [
        { to: '/my-orders', label: 'My Orders' },
        { to: '/account', label: 'My Account' },
        { to: '#', label: 'Logout', onClick: handleLogout },
      ]
    : [
        { to: '/login', label: 'Login' },
        { to: '/register', label: 'Register' }
      ]

  const allLinks = [...navLinks, ...authLinks]

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
         <Link to="/" className="flex items-center space-x-2">
           <img 
             src="/logo.svg" 
             alt="ShopFast Logo" 
             className="h-10 w-10"
           />
            <span className="text-2xl font-bold">ShopFast</span>
         </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                onClick={link.onClick}
                className="hover:text-indigo-200 transition"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Auth dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                className="flex items-center hover:text-indigo-200"
              >
                <UserIcon className="w-5 h-5 mr-1" />
                {user ? user.email : 'Account'}
              </button>
              
              {showAuthDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {authLinks.map(link => (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => {
                        if (link.onClick) link.onClick()
                        setShowAuthDropdown(false)
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? (
                <XMarkIcon className="h-7 w-7" />
              ) : (
                <Bars3Icon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4">
            {allLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => {
                  if (link.onClick) link.onClick()
                  setOpen(false)
                }}
                className="block py-2 hover:text-indigo-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}