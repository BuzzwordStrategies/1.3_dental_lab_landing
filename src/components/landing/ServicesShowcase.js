import React from 'react';
import { motion } from 'framer-motion';

const ServicesShowcase = () => {
  // Services based on actual offerings from pricing.csv and product-tile.csv
  const services = [
    {
      title: 'Social Media Marketing',
      description: 'Professional social media content creation and management for consistent brand presence across platforms',
      icon: '📱',
      features: ['1-5 posts per week', 'Multi-platform posting', 'Engaging content creation', 'Brand consistency'],
      color: 'service-social',
      tiers: ['Base: 1 post/week', 'Standard: 3 posts/week', 'Premium: 5 posts/week']
    },
    {
      title: 'SEO-Optimized Content',
      description: 'High-quality blog posts and website content that improves search rankings and establishes thought leadership',
      icon: '✍️',
      features: ['SEO optimized writing', 'Industry expertise', 'Thought leadership', 'Patient education'],
      color: 'service-content',
      tiers: ['Base: 2 blogs/month', 'Standard: 4 blogs/month', 'Premium: 6 blogs/month']
    },
    {
      title: 'Premium Backlink Building',
      description: 'High-quality backlink acquisition from dental industry sites to increase domain authority and search rankings',
      icon: '🔗',
      features: ['DR 30-70+ sites', 'Industry credibility', 'Advanced outreach', 'Domain authority boost'],
      color: 'service-backlinks',
      tiers: ['Base: 10 links/month', 'Standard: 20 links/month', 'Premium: 30 links/month']
    },
    {
      title: 'Local SEO & GBP Optimization',
      description: 'Google Business Profile optimization and local SEO to dominate local search results and attract nearby dentists',
      icon: '📍',
      features: ['Local search visibility', 'GMB optimization', 'Review management', 'Citation building'],
      color: 'service-gbp',
      tiers: ['Base: Local SEO', 'Standard: Multi-location', 'Premium: Reputation management']
    },
    {
      title: 'Technical SEO Services',
      description: 'Comprehensive search engine optimization including technical improvements, keyword research, and competitor analysis',
      icon: '🔍',
      features: ['Technical SEO audits', 'Keyword research', 'Competitor analysis', 'Monthly reporting'],
      color: 'service-seo',
      tiers: ['Base: Monthly reports', 'Standard: Bi-weekly reports', 'Premium: Weekly reports']
    },
    {
      title: 'Paid Advertising Management',
      description: 'Strategic advertising campaigns across Google, Meta, and TikTok platforms for immediate visibility and targeted traffic',
      icon: '🎯',
      features: ['Multi-platform campaigns', 'Advanced targeting', 'Creative testing', 'ROI optimization'],
      color: 'service-google',
      tiers: ['Google Ads', 'Meta Ads', 'TikTok Ads']
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Organic Background */}
      <div className="organic-background"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-6">
            Complete Marketing Solutions for 
            <span className="text-accent"> Dental Labs</span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Everything you need to grow your dental lab business with proven marketing strategies designed specifically for the dental industry
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`frosted-glass-card p-6 hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300 ${service.color}`}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-secondary">
                    <svg className="w-4 h-4 text-accent mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10 pt-4">
                <h4 className="text-sm font-semibold text-accent mb-2">Available Tiers:</h4>
                <ul className="space-y-1">
                  {service.tiers.map((tier, i) => (
                    <li key={i} className="text-xs text-secondary">
                      • {tier}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="frosted-glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Transform Your Lab's Marketing?
            </h3>
            <p className="text-secondary mb-6">
              Get a custom marketing strategy designed specifically for your dental laboratory with our proven bundle builder system
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.a
                href="https://calendly.com/josh-buzzwordstrategies/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary px-8 py-4 text-lg"
                aria-label="Schedule a free consultation call"
              >
                Schedule Free Consultation
              </motion.a>
              <motion.a
                href="https://bundle.buzzwordstrategies.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary px-8 py-4 text-lg"
                aria-label="Build a custom marketing bundle"
              >
                Build Custom Bundle
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="frosted-glass-card p-4">
              <div className="text-2xl font-bold text-accent mb-1">8</div>
              <div className="text-sm text-secondary">Service Categories</div>
            </div>
            <div className="frosted-glass-card p-4">
              <div className="text-2xl font-bold text-accent mb-1">24</div>
              <div className="text-sm text-secondary">Service Tiers</div>
            </div>
            <div className="frosted-glass-card p-4">
              <div className="text-2xl font-bold text-accent mb-1">3-Month</div>
              <div className="text-sm text-secondary">Minimum Commitment</div>
            </div>
            <div className="frosted-glass-card p-4">
              <div className="text-2xl font-bold text-accent mb-1">5%</div>
              <div className="text-sm text-secondary">Subscription Discount</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
