import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DiscoveryCallModal from './DiscoveryCallModal';

const FloatingCTA = () => {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show floating CTA after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed right-6 bottom-20 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold px-6 py-4 rounded-full shadow-lg hover:shadow-amber-500/25 transition-all flex items-center gap-2 pulse-glow"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Talk to an Expert
        </motion.button>
      </motion.div>
      
      <DiscoveryCallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        source="floating-cta"
      />
    </>
  );
};

export default FloatingCTA;
