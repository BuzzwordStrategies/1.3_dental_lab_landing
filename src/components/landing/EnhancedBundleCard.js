import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EnhancedBundleCard = ({ bundle, index }) => {
  const [subscriptionLength, setSubscriptionLength] = useState(3);
  
  // Calculate discounts
  const serviceCount = bundle.services.length;
  const serviceDiscount = 
    serviceCount === 2 ? 1 :
    serviceCount === 3 ? 2.5 :
    serviceCount === 4 ? 4 :
    serviceCount === 5 ? 5.5 :
    serviceCount === 6 ? 7 :
    serviceCount === 7 ? 8.5 :
    serviceCount === 8 ? 10 : 0;
  
  const subscriptionDiscount = 
    subscriptionLength === 3 ? 0 :
    subscriptionLength === 6 ? 2 :
    subscriptionLength === 9 ? 3.5 :
    subscriptionLength === 12 ? 5 :
    subscriptionLength === 15 ? 7.5 :
    subscriptionLength === 18 ? 8 :
    subscriptionLength === 21 ? 9 :
    subscriptionLength === 24 ? 10 : 0;
  
  const totalDiscount = serviceDiscount + subscriptionDiscount;
  const basePrice = bundle.basePrice;
  const finalPrice = basePrice * (1 - totalDiscount / 100);
  const savings = basePrice - finalPrice;
  
  return (
    <motion.div 
      className="bg-gray-800 rounded-2xl p-8 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {bundle.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-sm font-bold">
          MOST POPULAR
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-white mb-2">{bundle.name}</h3>
      <p className="text-gray-400 mb-6">{bundle.description}</p>
      
      {/* Services list */}
      <ul className="space-y-2 mb-6">
        {bundle.services.map((service, idx) => (
          <li key={idx} className="flex items-center text-gray-300">
            <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {service}
          </li>
        ))}
      </ul>
      
      {/* Subscription slider */}
      <div className="mb-6">
        <label className="text-sm text-gray-400 mb-2 block">
          Subscription Length: {subscriptionLength} months
        </label>
        <input
          type="range"
          min="3"
          max="24"
          step="3"
          value={subscriptionLength}
          onChange={(e) => setSubscriptionLength(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #D97706 0%, #D97706 ${((subscriptionLength - 3) / 21) * 100}%, #374151 ${((subscriptionLength - 3) / 21) * 100}%, #374151 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>3mo</span>
          <span>6mo</span>
          <span>9mo</span>
          <span>12mo</span>
          <span>18mo</span>
          <span>24mo</span>
        </div>
      </div>
      
      {/* Pricing display */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Base Price:</span>
          <span>${basePrice}/mo</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Bundle Discount ({serviceCount} services):</span>
          <span className="text-green-400">-{serviceDiscount}%</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Subscription Discount:</span>
          <span className="text-green-400">-{subscriptionDiscount}%</span>
        </div>
        <div className="border-t border-gray-700 pt-2">
          <div className="flex justify-between text-lg font-bold">
            <span className="text-white">Final Price:</span>
            <span className="text-amber-500">${Math.round(finalPrice)}/mo</span>
          </div>
          {savings > 0 && (
            <p className="text-sm text-green-400 text-right">Save ${Math.round(savings)}/mo</p>
          )}
        </div>
      </div>
      
      <button
        onClick={() => {
          // Redirect to bundle builder with pre-filled data
          const params = new URLSearchParams({
            preset: bundle.id,
            services: bundle.services.join(','),
            length: subscriptionLength
          });
          window.location.href = `https://bundle.buzzwordstrategies.com?${params}`;
        }}
        className="w-full py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-600 transition-colors"
      >
        Start with {bundle.name}
      </button>
    </motion.div>
  );
};

export default EnhancedBundleCard;
