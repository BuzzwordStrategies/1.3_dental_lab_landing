import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BundlePurchaseModal from './BundlePurchaseModal';

const BundleCard = ({ bundle, bundleKey }) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedLength, setSelectedLength] = useState(6);

  // Calculate price with subscription discount
  const subscriptionDiscounts = {
    3: 0, 6: 5, 9: 7, 12: 10, 18: 15, 24: 20
  };
  
  const discount = subscriptionDiscounts[selectedLength];
  const finalPrice = Math.round(bundle.monthlyPrice * (1 - discount / 100));
  const savings = bundle.monthlyPrice - finalPrice;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gray-900/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-8 hover:border-amber-500/40 transition-all"
      >
        {/* Popular badge for Growth bundle */}
        {bundleKey === 'growth' && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-black text-sm font-bold px-4 py-1 rounded-full">
              MOST POPULAR
            </span>
          </div>
        )}

        <h3 className="text-2xl font-bold text-white mb-2">{bundle.name}</h3>
        <p className="text-gray-400 mb-6">{bundle.tagline}</p>

        {/* Subscription Length Slider */}
        <div className="mb-6">
          <label className="text-sm text-gray-400 block mb-2">
            Subscription Length: {selectedLength} months
            {discount > 0 && (
              <span className="text-green-400 ml-2">Save {discount}%</span>
            )}
          </label>
          <input
            type="range"
            min="3"
            max="24"
            step="3"
            value={selectedLength}
            onChange={(e) => setSelectedLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-amber"
          />
          <style jsx>{`
            .slider-amber::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              background: linear-gradient(135deg, #f59e0b, #d97706);
              cursor: pointer;
              border-radius: 50%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
          `}</style>
        </div>

        {/* Pricing Display */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">${finalPrice}</span>
            <span className="text-gray-400">/month</span>
          </div>
          {savings > 0 && (
            <p className="text-sm text-green-400 mt-1">
              Save ${savings}/month with {selectedLength}-month commitment
            </p>
          )}
        </div>

        {/* Features List */}
        <ul className="space-y-3 mb-8">
          {bundle.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-300">
              <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Ideal For */}
        <p className="text-sm text-gray-400 italic mb-6 border-t border-gray-800 pt-4">
          {bundle.idealFor}
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowPurchaseModal(true)}
          className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all"
        >
          Start My {bundle.name}
        </motion.button>
      </motion.div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <BundlePurchaseModal
          bundle={bundle}
          bundleKey={bundleKey}
          subscriptionLength={selectedLength}
          finalPrice={finalPrice}
          onClose={() => setShowPurchaseModal(false)}
        />
      )}
    </>
  );
};

export default BundleCard;
