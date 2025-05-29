import React from 'react';
import { motion } from 'framer-motion';

const FreeResources = () => {
  const resources = [
    {
      icon: '📊',
      title: 'Marketing Budget Calculator',
      description: 'Calculate your optimal marketing spend based on revenue goals',
      link: '#calculator',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: '📈',
      title: 'Growth Strategy Guide',
      description: 'Step-by-step guide to scaling your dental lab',
      link: '#guide',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: '🎯',
      title: 'Competitor Analysis Template',
      description: 'Analyze your competition and find market opportunities',
      link: '#template',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: '📝',
      title: 'Marketing Checklist',
      description: 'Essential marketing tasks every dental lab should complete',
      link: '#checklist',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white text-center mb-6">
            Free Resources for Dental Labs
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Get instant access to tools and guides designed specifically for dental laboratory growth
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                     style={{ background: `linear-gradient(to right, ${resource.color})` }} />
                
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300">
                  <div className="text-4xl mb-4">{resource.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-amber-500 font-semibold text-sm hover:text-amber-400 transition-colors"
                  >
                    Download Free →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 mb-6">
              Want all resources in one package?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-500 text-black px-8 py-3 rounded-full font-bold hover:bg-amber-400 transition-colors"
            >
              Get Complete Resource Bundle
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeResources;
