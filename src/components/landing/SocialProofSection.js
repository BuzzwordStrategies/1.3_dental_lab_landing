import React from 'react';
import { motion } from 'framer-motion';

const SocialProofSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Trusted by 500+ Businesses
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-amber-500">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "Testimonial content will be added here. This is a placeholder for social proof."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-600 rounded-full mr-3" />
                <div>
                  <p className="font-semibold">Client Name</p>
                  <p className="text-sm text-gray-400">Company Name</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
