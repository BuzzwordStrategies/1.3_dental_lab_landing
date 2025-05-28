import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import DataVisualization from '../three/DataVisualization';

const DentalLabStats = () => {
  const stats = [
    {
      number: '73%',
      label: 'of dental labs struggle with online visibility',
      description: 'Most labs rely on word-of-mouth and miss digital opportunities'
    },
    {
      number: '2.5x',
      label: 'more leads with proper SEO',
      description: 'Labs with optimized websites generate significantly more inquiries'
    },
    {
      number: '89%',
      label: 'of dentists research labs online',
      description: 'Your online presence directly impacts new client acquisition'
    },
    {
      number: '$50K+',
      label: 'average revenue increase',
      description: 'Labs see substantial growth with strategic digital marketing'
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            The Reality of 
            <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent"> Dental Lab Marketing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Industry data reveals the challenges and opportunities facing dental laboratories today
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-dark rounded-2xl p-8 text-center hover-lift"
            >
              <div className="text-4xl font-bold text-amber-500 mb-4">
                {stat.number}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {stat.label}
              </h3>
              <p className="text-gray-400 text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 3D Data Visualization Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Real Results for Real Labs
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Interactive data showing the impact of strategic marketing on dental lab growth
            </p>
          </div>
          
          <div className="h-96 rounded-2xl overflow-hidden glass-panel">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
              <Suspense fallback={null}>
                <DataVisualization interactive={true} showStats={true} />
              </Suspense>
            </Canvas>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 italic">
              * Results may vary and are not guaranteed. Data compiled from industry studies and client case studies.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="glass-amber rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Don't Let Your Lab Fall Behind
            </h3>
            <p className="text-gray-300 mb-6">
              While your competitors struggle with outdated marketing methods, you can leverage 
              data-driven strategies to dominate your local market and attract premium clients.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full shadow-lg hover:shadow-amber-500/25 transition-all"
              onClick={() => document.getElementById('lead-magnets').scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Transformation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DentalLabStats;
