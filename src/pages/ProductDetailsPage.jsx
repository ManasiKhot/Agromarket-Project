import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import api from '../services/api.js';
import { useCart } from '../context/CartContext.jsx'; // Import the Cart Logic

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to change pages
  const { addToCart } = useCart(); // Hook to add items to cart
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product data when page loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Logic for "Add to Cart" button
  const handleAddToCart = () => {
    addToCart(product);
  };

  // Logic for "Buy Now" button
  const handleBuyNow = () => {
    addToCart(product); // Add item
    navigate('/cart');  // Go to cart page immediately
  };

  if (loading) return <div className="text-center py-20">Loading details...</div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <Link to="/products" className="text-green-600 hover:text-green-800 mb-6 inline-block font-medium">
          &larr; Back to Products
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            
            {/* Left: Product Image */}
            <div className="md:w-1/2 flex items-center justify-center bg-gray-50 p-6">
              <img 
                className="w-full h-64 md:h-96 object-contain" 
                src={product.imageUrl || 'https://via.placeholder.com/600'} 
                alt={product.name} 
              />
            </div>

            {/* Right: Product Details */}
            <div className="p-8 md:w-1/2 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                
                {/* Price Display */}
                <div className="mt-4">
                    {product.discountPrice ? (
                      <div className="flex items-end space-x-3">
                        <span className="text-4xl font-bold text-green-600">₹{product.discountPrice}</span>
                        <span className="text-xl text-gray-400 line-through">₹{product.price}</span>
                        <span className="text-gray-600 font-medium">per {product.unit}</span>
                      </div>
                    ) : (
                      <div className="text-4xl font-bold text-green-600">
                        ₹{product.price} <span className="text-xl text-gray-500 font-normal">/ {product.unit}</span>
                      </div>
                    )}
                </div>

                {/* Stock Status */}
                <div className="mt-6">
                  <p className="text-gray-600 bg-green-50 inline-block px-4 py-2 rounded-lg border border-green-100">
                    ✅ <strong>{product.quantity} {product.unit}</strong> currently in stock
                  </p>
                </div>

                {/* Farmer Info */}
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Farmer Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-gray-800 font-medium text-lg">👨‍🌾 {product.farmerName || "Local Farmer"}</p>
                    <p className="text-gray-600 mt-1">📍 {product.farmerLocation || "Unknown Location"}</p>
                    
                    {product.farmerContact && (
                      <div className="mt-4">
                        <a 
                          href={`tel:${product.farmerContact}`}
                          className="flex items-center justify-center w-full bg-white border border-green-500 text-green-700 font-bold py-2 rounded-lg hover:bg-green-50 transition-colors shadow-sm"
                        >
                          📞 Call Farmer: {product.farmerContact}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex space-x-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 text-white text-lg font-bold py-3 rounded-lg hover:bg-green-700 transition-shadow shadow-md"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-800 text-white text-lg font-bold py-3 rounded-lg hover:bg-gray-900 transition-shadow shadow-md"
                >
                  Buy Now
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;