import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOAuditForm from '../forms/SEOAuditForm';

const LeadMagnets = () => {
  const [activeForm, setActiveForm] = useState(null);

  const leadMagnets = [
    {
      id: 'seo-audit',
      title: 'Free SEO Audit',
      description: 'Get a comprehensive analysis of your dental lab\'s online presence',
      icon: '🔍',
      benefits: [
        'Website performance analysis',
        'Keyword ranking report',
        'Competitor comparison',
        'Actionable recommendations'
      ],
      cta: 'Get My Free Audit',
      deliveryTime: '24 hours'
    },
    {
      id: 'competitor-analysis',
      title: 'Competitor Analysis Report',
      description: 'See how your lab stacks up against local competitors',
      icon: '📊',
      benefits: [
        'Top 5 competitor analysis',
        'Pricing comparison',
        'Marketing strategy insights',
        'Opportunity identification'
      ],
      cta: 'Get Competitor Report',
      deliveryTime: '48 hours'
    },
    {
      id: 'blog-content',
      title: 'Custom Blog Content',
      description: 'Get 3 SEO-optimized blog posts written for your lab',
      icon: '✍️',
      benefits: [
        '3 custom blog posts',
        'SEO optimized content',
        'Industry-specific topics',
        'Ready to publish'
      ],
      cta: 'Get Blog Content',
      deliveryTime: '5-7 days'
    },
    {
      id: 'social-creatives',
      title: 'Social Media Pack',
      description: 'Professional social media graphics and content calendar',
      icon: '📱',
      benefits: [
        '10 custom graphics',
        '30-day content calendar',
        'Platform-specific sizing',
        'Editable templates'
      ],
      cta: 'Get Social Pack',
      deliveryTime: '3-5 days'
    }
  ];

  return (
    <section id="lead-magnets" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Free Resources for 
            <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent"> Dental Labs</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get instant access to professional marketing resources designed specifically for dental laboratories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadMagnets.map((magnet, index) => (
            <motion.div
              key={magnet.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-amber rounded-2xl p-6 hover-lift cursor-pointer"
              onClick={() => setActiveForm(magnet.id)}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{magnet.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{magnet.title}</h3>
                <p className="text-gray-300 text-sm">{magnet.description}</p>
              </div>

              <ul className="space-y-2 mb-6">
                {magnet.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-300">
                    <svg className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <div className="text-xs text-amber-400 mb-3">
                  Delivered in {magnet.deliveryTime}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all"
                >
                  {magnet.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass-dark rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-amber-500 mb-2">500+</div>
                <div className="text-gray-300">Dental Labs Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-500 mb-2">24hr</div>
                <div className="text-gray-300">Average Delivery</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-500 mb-2">98%</div>
                <div className="text-gray-300">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Form Modals */}
      <AnimatePresence>
        {activeForm === 'seo-audit' && (
          <SEOAuditForm onClose={() => setActiveForm(null)} />
        )}
        {/* Add other form components here when created */}
      </AnimatePresence>
    </section>
  );
};

export default LeadMagnets;
