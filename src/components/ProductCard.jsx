
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col h-full border border-gray-100 group">
      
      {/* Make Image Clickable */}
      <Link to={`/product/${product.id}`} className="relative h-48 overflow-hidden block cursor-pointer">
        <img 
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" 
          src={product.imageUrl || 'https://via.placeholder.com/300?text=Fresh+Produce'} 
          alt={product.name} 
        />
        {product.discountPrice && product.discountPrice < product.price && (
          <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 m-2 rounded shadow-sm">
            SALE
          </div>
        )}
      </Link>

      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          {/* Make Title Clickable */}
          <Link to={`/product/${product.id}`} className="hover:text-green-600 transition-colors">
            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
          </Link>
          
          <div className="mt-2 flex items-baseline space-x-2">
            {product.discountPrice && product.discountPrice > 0 ? (
              <>
                <span className="text-2xl font-bold text-green-700">₹{product.discountPrice}</span>
                <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                <span className="text-sm text-gray-500">/ {product.unit}</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-green-700">₹{product.price} <span className="text-sm text-gray-500">/ {product.unit}</span></span>
            )}
          </div>
          
          <div className="mt-2">
            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-medium border border-green-100">
              In Stock: {product.quantity} {product.unit}
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-800">{product.farmerName || "Local Farmer"}</p>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <span>📍 {product.farmerLocation || "Nearby"}</span>
            </p>
          </div>
        </div>

        {/* View Details Button */}
        <Link to={`/product/${product.id}`} className="mt-4 w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors font-bold shadow-sm text-center block">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

