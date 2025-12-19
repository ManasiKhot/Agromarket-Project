

import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-green-100 text-center py-20">
          <h1 className="text-5xl font-extrabold text-green-800">Our Mission</h1>
          <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
            To bridge the gap between hardworking farmers and discerning buyers, creating a transparent, fair, and sustainable agricultural marketplace for everyone.
          </p>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              AgroMarket was born from a simple yet powerful idea: what if farmers could sell their produce directly to the people who enjoy it, without the middlemen? We saw farmers struggling with unfair pricing and limited market access, while consumers sought fresher, higher-quality produce. We decided to build a digital bridge—a platform that empowers farmers, delivers freshness to buyers, and fosters a community built on trust and transparency.
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-4">
                <div className="text-4xl mb-3">👨‍🌾</div>
                <h3 className="text-xl font-semibold mb-2">1. Farmers List Produce</h3>
                <p className="text-gray-600">Farmers register and list their fresh harvest with pricing and quantity details.</p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-3">🛒</div>
                <h3 className="text-xl font-semibold mb-2">2. Buyers Place Orders</h3>
                <p className="text-gray-600">Buyers browse the marketplace, choose their desired products, and place orders directly.</p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-3">🚚</div>
                <h3 className="text-xl font-semibold mb-2">3. Freshness Delivered</h3>
                <p className="text-gray-600">The produce is prepared and delivered, ensuring it reaches the buyer fresh from the farm.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="bg-green-600 text-white text-center py-20">
          <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Whether you're a farmer looking to get a fair price for your hard work or a buyer searching for the freshest ingredients, AgroMarket is the place for you.
          </p>
          <div className="space-x-4">
            <a href="/register" className="bg-white text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors">
              Register as a Farmer
            </a>
            <a href="/products" className="bg-gray-800 text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-700 transition-colors">
              Start Shopping
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;

