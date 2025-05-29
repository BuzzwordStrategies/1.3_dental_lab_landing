import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DiscoveryCallModal from './DiscoveryCallModal';

const DiscoveryCallCTA = ({ variant = 'default' }) => {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <>
      <motion.div 
        className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-white mb-4">
          Ready to Grow Your Dental Lab?
        </h3>
        <p className="text-gray-300 mb-6">
          Get a custom marketing strategy in a free 15-minute discovery call
        </p>
        <motion.button
          onClick={() => setShowForm(true)}
          className="px-8 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Schedule Your Free Call
        </motion.button>
      </motion.div>
      
      {showForm && (
        <DiscoveryCallModal 
          isOpen={showForm}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
};

export default DiscoveryCallCTA;
