
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Corrected import paths to be absolute from the project root
import HomePage from '/src/pages/HomePage.jsx';
import ProductsPage from '/src/pages/ProductsPage.jsx';
import LoginPage from '/src/pages/LoginPage.jsx';
import RegisterPage from '/src/pages/RegisterPage.jsx';
import AboutUsPage from './pages/AboutUsPage';
import FarmerDashboardPage from './pages/FarmerDashboardPage';
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage.jsx';

// This can remain a placeholder
const AboutPage = () => <div className="text-center text-3xl p-10">About Us Page - Coming Soon!</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        
       
        {/* Updated routes for Login and Register */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/dashboard/farmer" element={<FarmerDashboardPage />} />

      </Routes>
    </Router>
  );
}

export default App;

