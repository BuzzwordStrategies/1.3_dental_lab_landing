import React from 'react';
import { motion } from 'framer-motion';

const PreBuiltBundles = () => {
  const bundles = [
    {
      name: 'Growth Starter',
      price: '$2,460',
      originalPrice: '$2,856',
      savings: '$396',
      popular: false,
      services: ['Google Ads', 'SEO', 'Social Posts'],
    },
    {
      name: 'Authority Builder',
      price: '$3,842',
      originalPrice: '$4,465',
      savings: '$623',
      popular: true,
      services: ['SEO', 'Content', 'Backlinks', 'GBP Ranker'],
    },
    {
      name: 'Revenue Maximizer',
      price: '$5,687',
      originalPrice: '$6,610',
      savings: '$923',
      popular: false,
      services: ['Meta Ads', 'Google Ads', 'SEO', 'Content'],
    },
  ];

  return (
    <section id="bundles" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-4"
        >
          Popular Marketing Bundles - Ready to Deploy
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto"
        >
          Choose a proven bundle or customize your own
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bundles.map((bundle, index) => (
            <motion.div
              key={bundle.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border ${
                bundle.popular ? 'border-amber-500 scale-105' : 'border-gray-700'
              }`}
            >
              {bundle.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{bundle.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{bundle.price}</span>
                <span className="text-gray-400">/mo</span>
              </div>
              <p className="text-gray-400 line-through mb-1">{bundle.originalPrice}/mo</p>
              <p className="text-green-500 mb-6">Save {bundle.savings}/month</p>
              
              <ul className="space-y-2 mb-8">
                {bundle.services.map((service) => (
                  <li key={service} className="flex items-center text-gray-300">
                    <span className="text-amber-500 mr-2">✓</span>
                    {service}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-full font-bold transition-all ${
                bundle.popular
                  ? 'bg-amber-500 text-black hover:bg-amber-400'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}>
                Select This Bundle
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreBuiltBundles;
