import React, { useState, useEffect } from 'react';
import Navbar from '/src/components/Navbar.jsx';
import Footer from '/src/components/Footer.jsx';
import api from '/src/services/api.js';

const FarmerDashboardPage = () => {
  const [products, setProducts] = useState([]);
  
  // State for ALL form inputs, including the new Farmer Details
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    discountPrice: '',
    unit: 'kg',
    quantity: '',
    imageUrl: '',
    farmerName: '',
    farmerLocation: '',
    farmerContact: '' 
  });

  // Fetch products when the page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
      alert("Please fill out required fields");
      return;
    }

    const productToAdd = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      discountPrice: newProduct.discountPrice ? parseFloat(newProduct.discountPrice) : null,
      quantity: parseInt(newProduct.quantity, 10)
    };

    try {
      const response = await api.post('/products', productToAdd);
      setProducts(prev => [response.data, ...prev]);
      // Clear form
      setNewProduct({ 
        name: '', price: '', discountPrice: '', unit: 'kg', quantity: '', 
        imageUrl: '', farmerName: '', farmerLocation: '', farmerContact: '' 
      });
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Error adding product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if(!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Farmer Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- Add Product Form --- */}
          <div className="lg:col-span-1">
            <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Produce</h2>
              
              {/* Product Basic Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name *</label>
                <input type="text" name="name" value={newProduct.name} onChange={handleFormChange} className="w-full border p-2 rounded" required />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Price (₹) *</label>
                  <input type="number" name="price" value={newProduct.price} onChange={handleFormChange} className="w-full border p-2 rounded" required />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Disc. Price</label>
                  <input type="number" name="discountPrice" value={newProduct.discountPrice} onChange={handleFormChange} className="w-full border p-2 rounded" />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Quantity *</label>
                  <input type="number" name="quantity" value={newProduct.quantity} onChange={handleFormChange} className="w-full border p-2 rounded" required />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Unit *</label>
                  <input type="text" name="unit" value={newProduct.unit} onChange={handleFormChange} className="w-full border p-2 rounded" placeholder="kg" required />
                </div>
              </div>

              {/* Farmer Contact Details */}
              <div className="pt-4 border-t">
                <h3 className="text-sm font-bold text-gray-500 mb-2">Farmer Details</h3>
                <div className="space-y-3">
                  <input type="text" name="farmerName" value={newProduct.farmerName} onChange={handleFormChange} className="w-full border p-2 rounded" placeholder="Farmer Name" />
                  <input type="text" name="farmerLocation" value={newProduct.farmerLocation} onChange={handleFormChange} className="w-full border p-2 rounded" placeholder="Location (City/Village)" />
                  <input type="text" name="farmerContact" value={newProduct.farmerContact} onChange={handleFormChange} className="w-full border p-2 rounded" placeholder="Contact Number (+91...)" />
                </div>
              </div>

              <div className="pt-2">
                 <input type="text" name="imageUrl" value={newProduct.imageUrl} onChange={handleFormChange} className="w-full border p-2 rounded" placeholder="Image URL (https://...)" />
              </div>

              <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded font-bold hover:bg-green-700">
                Add Product
              </button>
            </form>
          </div>

          {/* --- Product Table --- */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <h2 className="text-xl font-semibold text-gray-800 p-6 border-b">Your Inventory</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer Info</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-full object-cover" src={product.imageUrl || 'https://via.placeholder.com/100'} alt="" />
                            <div className="ml-4 font-medium text-gray-900">{product.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                           {product.discountPrice ? (
                             <span><span className="text-green-600 font-bold">₹{product.discountPrice}</span> <span className="line-through text-gray-400 text-xs">₹{product.price}</span></span>
                           ) : (
                             <span>₹{product.price}</span>
                           )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.quantity} {product.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="font-medium text-gray-900">{product.farmerName || "N/A"}</div>
                          <div>📍 {product.farmerLocation || "N/A"}</div>
                          <div className="text-blue-600">📞 {product.farmerContact || "N/A"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FarmerDashboardPage;