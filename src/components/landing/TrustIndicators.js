import React from 'react';
import { motion } from 'framer-motion';

const TrustIndicators = () => {
  const indicators = [
    { icon: '👥', text: '500+ Clients Served' },
    { icon: '⭐', text: '4.9★ Average Rating' },
    { icon: '💰', text: '$2M+ Revenue Generated' },
    { icon: '🕐', text: '24/7 Support' },
    { icon: '✅', text: '100% Satisfaction Guarantee' }
  ];

  // Duplicate for seamless loop
  const duplicatedIndicators = [...indicators, ...indicators];

  return (
    <section className="relative py-8 overflow-hidden bg-black/50 backdrop-blur-sm border-y border-amber-500/10">
      <div className="relative">
        <motion.div
          animate={{
            x: [0, -50 * indicators.length + '%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
          className="flex"
        >
          {duplicatedIndicators.map((indicator, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 px-8 whitespace-nowrap"
            >
              <span className="text-2xl">{indicator.icon}</span>
              <span className="text-gray-300 font-medium">{indicator.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
    </section>
  );
};

export default TrustIndicators;
