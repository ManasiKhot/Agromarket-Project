

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '/src/components/Navbar.jsx';
import Footer from '/src/components/Footer.jsx';
import api from '/src/services/api.js';
import { useAuth } from '/src/context/AuthContext.jsx'; // Import Auth Hook to save user session

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the global login function from context
  
  // State for login form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Handle typing in input boxes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Send credentials to backend API (POST /auth/login)
      const response = await api.post('/auth/login', formData);
      const user = response.data;

      // 2. Save user to global context (so Navbar updates)
      login(user);

      // 3. Intelligent Redirect based on Role
      if (user.role === 'FARMER') {
        // If user is a Farmer, go to Dashboard
        navigate('/dashboard/farmer');
      } else {
        // If user is a Buyer, go to Products page
        navigate('/products');
      }

    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input 
                type="email" 
                name="email" 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-300 p-2 rounded focus:ring-green-500 focus:border-green-500" 
                placeholder="you@example.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                name="password" 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-300 p-2 rounded focus:ring-green-500 focus:border-green-500" 
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-bold shadow-md"
            >
              Sign In
            </button>
          </form>

          {/* Link to Register */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account? <a href="/register" className="text-green-600 font-bold hover:underline">Sign up</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;