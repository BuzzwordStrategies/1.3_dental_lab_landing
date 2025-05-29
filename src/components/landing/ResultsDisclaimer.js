import React from 'react';
import { motion } from 'framer-motion';

const ResultsDisclaimer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50"
    >
      <p className="text-xs text-gray-500 italic text-center">
        * Individual results may vary. Performance depends on factors including market conditions, 
        competition, budget, and implementation. Past results do not guarantee future performance.
      </p>
    </motion.div>
  );
};

export default ResultsDisclaimer;
