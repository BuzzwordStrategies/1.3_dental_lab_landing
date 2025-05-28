import React from 'react';
import { motion } from 'framer-motion';

const PerformanceGuarantee = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="py-16 bg-gradient-to-r from-amber-500/10 to-orange-600/10 border-y border-amber-500/20"
  >
    <div className="max-w-4xl mx-auto text-center px-6">
      <h2 className="text-3xl font-bold text-white mb-6">
        Our 90-Day Performance Promise
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
          <div className="text-4xl font-bold text-amber-500 mb-2">20+</div>
          <p className="text-white font-semibold mb-2">Qualified Leads</p>
          <p className="text-gray-400 text-sm">
            We guarantee at least 20 qualified dental professional inquiries within your first 90 days
          </p>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
          <div className="text-4xl font-bold text-amber-500 mb-2">50%</div>
          <p className="text-white font-semibold mb-2">Traffic Increase</p>
          <p className="text-gray-400 text-sm">
            Your website traffic will increase by at least 50% compared to your starting baseline
          </p>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm italic">
        * Guarantee requires minimum 6-month commitment and client cooperation with strategy implementation. 
        Results vary based on market conditions, competition, and ad spend. Refund available if targets not met.
      </p>
    </div>
  </motion.section>
);

export default PerformanceGuarantee;
