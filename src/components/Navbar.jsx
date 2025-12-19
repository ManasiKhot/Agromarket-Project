

import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for faster navigation
import { useCart } from '../context/CartContext.jsx'; // Import cart hook

const Navbar = () => {
  const { cartItems } = useCart(); // Get cart items

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-green-600">
              AgroMarket 🌱
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-700 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/products" className="text-gray-700 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Products</Link>
              <Link to="/about" className="text-gray-700 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
            </div>
          </div>

          {/* Right Side: Cart & Login */}
          <div className="flex items-center space-x-4">
            
            {/* Cart Button */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-green-600">
              <span className="text-2xl">🛒</span>
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login" className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium">Login</Link>
              <Link to="/register" className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;