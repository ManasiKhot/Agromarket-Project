

import React, { useState, useEffect } from 'react';
import Navbar from '/src/components/Navbar.jsx';
import Footer from '/src/components/Footer.jsx';
import ProductCard from '/src/components/ProductCard.jsx';
import api from '/src/services/api.js'; // Import our new api service

const ProductsPage = () => {
  // Use state to hold the products from the API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use useEffect to fetch data when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Make the API call using our axios instance
        const response = await api.get('/products');
        setProducts(response.data); // Set the state with the API data
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Handle error, e.g., show a message to the user
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // The empty array [] means this effect runs once on load

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Our Fresh Produce</h1>

        <div className="mb-8 flex justify-center">
            <input 
                type="text" 
                placeholder="Search for products..."
                className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>

        {/* Show loading message or product grid */}
        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;