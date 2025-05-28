import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOAuditForm from '../forms/SEOAuditForm';

const LeadMagnets = () => {
  const [activeForm, setActiveForm] = useState(null);

  const leadMagnets = [
    {
      id: 'seo-audit',
      title: 'Get Your Free SEO Audit',
      description: 'Discover exactly where your dental lab stands online and what\'s holding you back from attracting more dentists.',
      icon: '🔍',
      benefits: [
        'Complete website analysis',
        'Technical SEO assessment',
        'Keyword opportunity report',
        'Actionable improvement plan'
      ],
      cta: 'Get My Free SEO Audit',
      deliveryTime: '24 hours'
    },
    {
      id: 'competitor-analysis',
      title: 'Get Your Free Competitor Analysis',
      description: 'See how your lab stacks up against local competitors and uncover opportunities they\'re missing.',
      icon: '📊',
      benefits: [
        'Local competitor benchmarking',
        'Market positioning insights',
        'Pricing strategy analysis',
        'Growth opportunity identification'
      ],
      cta: 'Get My Free Competitor Analysis',
      deliveryTime: '48 hours'
    },
    {
      id: 'custom-blog-post',
      title: 'Get Your Free Custom Blog Post',
      description: 'Receive a professionally written, SEO-optimized blog post tailored specifically for your dental laboratory.',
      icon: '✍️',
      benefits: [
        'Custom written content',
        'SEO optimized for your market',
        'Industry-specific expertise',
        'Ready to publish immediately'
      ],
      cta: 'Get My Free Custom Blog Post',
      deliveryTime: '3-5 days'
    }
  ];

  return (
    <section id="lead-magnets" className="relative py-20 overflow-hidden">
      {/* Organic Background */}
      <div className="organic-background"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-primary mb-6">
            Free Resources for 
            <span className="text-accent"> Dental Labs</span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Get instant access to professional marketing resources designed specifically for dental laboratories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {leadMagnets.map((magnet, index) => (
            <motion.div
              key={magnet.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="frosted-glass-card p-6 hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setActiveForm(magnet.id)}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{magnet.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{magnet.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{magnet.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {magnet.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-sm text-secondary">
                    <svg className="w-4 h-4 text-accent mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <div className="text-xs text-accent mb-3 font-medium">
                  Delivered in {magnet.deliveryTime}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full"
                  aria-label={magnet.cta}
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
          <div className="frosted-glass-card p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-accent mb-2">500+</div>
                <div className="text-secondary">Dental Labs Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">24hr</div>
                <div className="text-secondary">Average Delivery</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">98%</div>
                <div className="text-secondary">Client Satisfaction</div>
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
        {activeForm === 'competitor-analysis' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="frosted-glass-card p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-primary mb-4">Competitor Analysis Form</h3>
              <p className="text-secondary mb-4">Form coming soon! This will collect your lab information for competitor analysis.</p>
              <button
                onClick={() => setActiveForm(null)}
                className="btn-secondary w-full"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
        {activeForm === 'custom-blog-post' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="frosted-glass-card p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-primary mb-4">Custom Blog Post Form</h3>
              <p className="text-secondary mb-4">Form coming soon! This will collect your requirements for a custom blog post.</p>
              <button
                onClick={() => setActiveForm(null)}
                className="btn-secondary w-full"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LeadMagnets;
