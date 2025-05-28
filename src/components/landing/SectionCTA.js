import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DiscoveryCallModal from './DiscoveryCallModal';

const SectionCTA = ({ variant = 'primary', source }) => {
  const [showModal, setShowModal] = useState(false);
  
  const variants = {
    primary: {
      text: "Get Your Custom Growth Strategy",
      subtext: "Free 15-minute consultation with our dental lab marketing experts",
      buttonText: "Schedule Your Call",
      bgClass: "bg-gradient-to-r from-amber-500 to-orange-600"
    },
    secondary: {
      text: "See How We Can Transform Your Lab",
      subtext: "Join 200+ dental labs growing with digital marketing",
      buttonText: "Book Strategy Session",
      bgClass: "bg-gradient-to-r from-purple-600 to-pink-600"
    },
    tertiary: {
      text: "Ready to Dominate Your Market?",
      subtext: "Get a personalized marketing roadmap for your dental lab",
      buttonText: "Claim Your Free Call",
      bgClass: "bg-gradient-to-r from-green-600 to-teal-600"
    }
  };
  
  const currentVariant = variants[variant];
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="py-12 text-center"
      >
        <div className="bg-gray-900/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-2">
            {currentVariant.text}
          </h3>
          <p className="text-gray-400 mb-6">
            {currentVariant.subtext}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className={`${currentVariant.bgClass} text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all animated-gradient`}
          >
            {currentVariant.buttonText} →
          </motion.button>
        </div>
      </motion.div>
      
      <DiscoveryCallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        source={`section-cta-${source}`}
      />
    </>
  );
};

export default SectionCTA;
