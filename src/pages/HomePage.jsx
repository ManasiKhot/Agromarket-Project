
import React from 'react';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      
      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-green-50 text-center py-20">
          <h1 className="text-5xl font-extrabold text-green-800">Welcome to AgroMarket</h1>
          <p className="mt-4 text-xl text-gray-600">Fresh Produce Directly From the Farm to Your Table.</p>
          <a href="/products" className="mt-8 inline-block bg-green-600 text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-green-700 transition-colors">
            Browse Products
          </a>
          
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">🤝 Direct Connection</h3>
                <p className="text-gray-600">No middlemen. Farmers get fair prices, and you get the freshest produce.</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">✅ Quality Assured</h3>
                <p className="text-gray-600">Trace the source of your food and be assured of its quality and freshness.</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">🚚 Transparent & Fast</h3>
                <p className="text-gray-600">Digital tracking and clear communication for a seamless experience.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer/>
    </div>
  );
};

export default HomePage;