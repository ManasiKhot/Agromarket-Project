import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx'; // Import Auth to get User ID
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api.js'; // Import API helper

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();
  const { user } = useAuth(); // Get logged-in user details
  const navigate = useNavigate();

  // Function to handle the checkout process
  const handleCheckout = async () => {
    // 1. Check if user is logged in
    if (!user) {
      alert("Please login to place an order!");
      navigate('/login');
      return;
    }

    // 2. Prepare data for Backend (Matches OrderRequest.java DTO)
    const orderData = {
      userId: user.id,
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.cartQuantity,
        price: item.discountPrice || item.price // Use discount price if available
      }))
    };

    try {
      // 3. Send POST request to create the order
      const response = await api.post('/orders', orderData);
      
      if (response.status === 200) {
        alert("Order placed successfully! 🎉");
        clearCart(); // Empty the cart context
        navigate('/products'); // Redirect user back to shopping
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <h2 className="text-2xl text-gray-600 mb-4">Your cart is empty</h2>
            <Link to="/products" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-bold">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                      <p className="text-gray-500">
                        Price: ₹{item.discountPrice || item.price} / {item.unit}
                      </p>
                      <p className="text-sm text-green-600 font-medium">Quantity: {item.cartQuantity}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between mb-4 text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-xl text-gray-900">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
                
                {/* Checkout Button */}
                <button 
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md"
                >
                  Confirm Order
                </button>
              </div>
            </div>

          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;