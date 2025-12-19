
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '/src/components/Navbar.jsx';
import Footer from '/src/components/Footer.jsx';
import api from '/src/services/api.js';

const RegisterPage = () => {
  const navigate = useNavigate();
  
  // State to hold all form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'FARMER', // Default role is Farmer
    phone: '',
    address: ''
  });

  // Handle typing in input boxes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Send data to the Backend API
      // This sends a POST request to http://localhost:8080/api/auth/register
      await api.post('/auth/register', formData);
      
      // 2. Show success message
      alert('Registration successful! Please login.');
      
      // 3. Redirect to Login Page
      navigate('/login');
      
    } catch (error) {
      console.error('Registration failed:', error);
      // Show error message from backend if available (e.g., "Email already in use")
      alert(error.response?.data || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input 
                type="text" 
                name="name" 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-300 p-2 rounded focus:ring-green-500 focus:border-green-500" 
                placeholder="e.g. Ramesh Patil"
              />
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                name="email" 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-300 p-2 rounded focus:ring-green-500 focus:border-green-500" 
                placeholder="e.g. ramesh@gmail.com"
              />
            </div>

            {/* Password */}
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

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input 
                type="text" 
                name="phone" 
                onChange={handleChange} 
                className="w-full border border-gray-300 p-2 rounded focus:ring-green-500 focus:border-green-500" 
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input 
                type="text" 
                name="address" 
                onChange={handleChange} 
                className="w-full border border-gray-300 p-2 rounded focus:ring-green-500 focus:border-green-500" 
                placeholder="Village/City Name"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer p-2 border rounded hover:bg-green-50 w-1/2 justify-center">
                  <input 
                    type="radio" 
                    name="role" 
                    value="FARMER" 
                    checked={formData.role === 'FARMER'} 
                    onChange={handleChange} 
                    className="h-4 w-4 text-green-600 focus:ring-green-500" 
                  />
                  <span className="text-gray-900 font-medium">Farmer 👨‍🌾</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer p-2 border rounded hover:bg-green-50 w-1/2 justify-center">
                  <input 
                    type="radio" 
                    name="role" 
                    value="BUYER" 
                    checked={formData.role === 'BUYER'} 
                    onChange={handleChange} 
                    className="h-4 w-4 text-green-600 focus:ring-green-500" 
                  />
                  <span className="text-gray-900 font-medium">Buyer 🛒</span>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition font-bold shadow-md mt-4"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-green-600 font-bold hover:underline">Login</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;