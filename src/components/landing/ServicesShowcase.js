import React from 'react';
import { motion } from 'framer-motion';

const ServicesShowcase = () => {
  const services = [
    {
      title: 'SEO Optimization',
      description: 'Dominate local search results and attract more dentists to your lab',
      icon: '🎯',
      features: ['Local SEO', 'Technical SEO', 'Content Strategy', 'Link Building']
    },
    {
      title: 'Google Ads Management',
      description: 'Targeted advertising campaigns that deliver qualified leads',
      icon: '📈',
      features: ['Campaign Setup', 'Keyword Research', 'Ad Optimization', 'ROI Tracking']
    },
    {
      title: 'Website Development',
      description: 'Professional websites that convert visitors into clients',
      icon: '💻',
      features: ['Responsive Design', 'Fast Loading', 'Lead Capture', 'Mobile Optimized']
    },
    {
      title: 'Social Media Marketing',
      description: 'Build your brand and engage with dental professionals',
      icon: '📱',
      features: ['Content Creation', 'Community Management', 'Paid Advertising', 'Analytics']
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Complete Marketing Solutions for 
            <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent"> Dental Labs</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to grow your dental lab business in one comprehensive package
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-dark rounded-2xl p-8 hover-lift"
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{service.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <svg className="w-4 h-4 text-amber-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="glass-amber rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Lab's Marketing?
            </h3>
            <p className="text-gray-300 mb-6">
              Get a custom marketing strategy designed specifically for your dental laboratory
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.a
                href="https://calendly.com/josh-buzzwordstrategies/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full shadow-lg hover:shadow-amber-500/25 transition-all"
              >
                Schedule Free Consultation
              </motion.a>
              <motion.a
                href="https://bundle.buzzwordstrategies.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all"
              >
                Build Custom Bundle
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
