import React from 'react';
import { motion } from 'framer-motion';

const CaseStudiesSection = () => {
  const caseStudies = [
    {
      title: 'Premier Dental Lab',
      location: 'Austin, TX',
      challenge: 'Low online visibility, losing clients to competitors',
      solution: 'Complete SEO overhaul + Google Ads campaign',
      results: [
        '300% increase in website traffic',
        '150% more qualified leads',
        '$75K additional revenue in 6 months'
      ],
      image: '🏆'
    },
    {
      title: 'Precision Prosthetics',
      location: 'Denver, CO',
      challenge: 'Outdated website, no digital marketing strategy',
      solution: 'New website + social media marketing + content strategy',
      results: [
        '250% increase in online inquiries',
        '40% growth in new client acquisition',
        'Established as local market leader'
      ],
      image: '📈'
    },
    {
      title: 'Elite Dental Solutions',
      location: 'Phoenix, AZ',
      challenge: 'Struggling to compete with larger labs',
      solution: 'Targeted local SEO + reputation management',
      results: [
        'Ranked #1 for key local searches',
        '200% increase in phone calls',
        'Doubled monthly revenue'
      ],
      image: '🎯'
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
            Real Results for 
            <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent"> Real Labs</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how dental labs across the country have transformed their businesses with our proven strategies
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-dark rounded-2xl p-8 hover-lift"
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{study.image}</div>
                <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                <p className="text-amber-500 text-sm">{study.location}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Challenge:</h4>
                  <p className="text-gray-400 text-sm">{study.challenge}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Solution:</h4>
                  <p className="text-gray-400 text-sm">{study.solution}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Results:</h4>
                  <ul className="space-y-1">
                    {study.results.map((result, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-400">
                        <svg className="w-3 h-3 text-amber-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {result}
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass-amber rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Your Lab Could Be Next
            </h3>
            <p className="text-gray-300 mb-6">
              Join hundreds of dental labs that have transformed their business with our proven marketing strategies
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full shadow-lg hover:shadow-amber-500/25 transition-all"
              onClick={() => document.getElementById('lead-magnets').scrollIntoView({ behavior: 'smooth' })}
            >
              Get Your Free Marketing Audit
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
