import React from 'react';
import { motion } from 'framer-motion';

const LeadMagnetSection = () => {
  return (
    <section id="resources" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-4"
        >
          Free Resources to Grow Your Business
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto"
        >
          Get instant access to our AI-powered tools
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI SEO Audit */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-amber-500/20"
          >
            <div className="w-16 h-16 bg-amber-500/20 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Get Your Free AI-Powered SEO Audit</h3>
            <p className="text-gray-300 mb-6">
              Discover exactly why you're not ranking and how to fix it
            </p>
            <button className="w-full bg-amber-500 text-black py-3 rounded-full font-bold hover:bg-amber-400 transition-all">
              Get My Free Audit Now
            </button>
          </motion.div>

          {/* AI Blog Post */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20"
          >
            <div className="w-16 h-16 bg-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Free Custom AI Blog Post for Your Business</h3>
            <p className="text-gray-300 mb-6">
              1,500 words of SEO-optimized content created just for you
            </p>
            <button className="w-full bg-purple-600 text-white py-3 rounded-full font-bold hover:bg-purple-700 transition-all">
              Create My Free Blog Post
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;
