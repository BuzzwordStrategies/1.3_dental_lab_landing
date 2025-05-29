import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceModal = ({ service, isOpen, onClose }) => {
  const tiers = ['Base', 'Standard', 'Premium'];
  
  const serviceDescriptions = {
    'Meta Ads Management': 'Target dentists on Facebook and Instagram with precision-crafted campaigns designed to generate high-quality leads for your dental lab.',
    'Google Ads Management': 'Capture dentists at the exact moment they\'re searching for lab services with strategic Google Ads campaigns.',
    'TikTok Ads Management': 'Connect with the next generation of dentists through engaging TikTok content and targeted advertising.',
    'SEO Optimization': 'Dominate search results when dentists look for dental labs in your area or specialty services.',
    'Google Business Profile': 'Optimize your Google Business Profile to appear prominently in local searches and Google Maps.',
    'Backlink Building': 'Build your lab\'s online authority with high-quality backlinks from reputable dental industry websites.',
    'Content Creation': 'Establish your lab as an industry thought leader with educational content that dentists value.',
    'Social Media Management': 'Maintain a consistent, professional presence across social platforms to stay top-of-mind with dentists.'
  };

  const pricing = {
    'Meta Ads Management': { Base: 770, Standard: 980, Premium: 1410 },
    'Google Ads Management': { Base: 770, Standard: 980, Premium: 1410 },
    'TikTok Ads Management': { Base: 770, Standard: 980, Premium: 1410 },
    'SEO Optimization': { Base: 790, Standard: 1000, Premium: 1450 },
    'Google Business Profile': { Base: 315, Standard: 420, Premium: 675 },
    'Backlink Building': { Base: 420, Standard: 630, Premium: 990 },
    'Content Creation': { Base: 210, Standard: 420, Premium: 760 },
    'Social Media Management': { Base: 315, Standard: 525, Premium: 895 }
  };

  const detailedFeatures = {
    'Meta Ads Management': {
      Base: {
        disclaimer: 'Management fee only. Ad spend billed separately.',
        budget: 'Recommended ad spend: $500-1,500/mo',
        features: [
          '1 campaign with 2-3 ad sets',
          'Basic audience targeting',
          'Monthly performance report',
          'Quarterly strategy review'
        ]
      },
      Standard: {
        disclaimer: 'Management fee only. Ad spend billed separately.',
        budget: 'Recommended ad spend: $1,500-3,000/mo',
        features: [
          '2-3 campaigns with multiple ad sets',
          'Advanced audience targeting & lookalikes',
          'Bi-weekly performance reports',
          'Monthly strategy calls'
        ]
      },
      Premium: {
        disclaimer: 'Management fee only. Ad spend billed separately.',
        budget: 'Recommended ad spend: $3,000+/mo',
        features: [
          'Unlimited campaigns & ad sets',
          'Custom audiences & retargeting',
          'Weekly performance reports',
          'Weekly strategy calls',
          'Dedicated account manager'
        ]
      }
    },
    'Google Ads Management': {
      Base: {
        disclaimer: 'Management fee only. Ad spend billed separately.',
        budget: 'Recommended ad spend: $1,000-2,000/mo',
        features: [
          'Search campaign setup',
          '20-30 targeted keywords',
          'Basic ad copy testing',
          'Monthly optimization'
        ]
      },
      Standard: {
        disclaimer: 'Management fee only. Ad spend billed separately.',
        budget: 'Recommended ad spend: $2,000-5,000/mo',
        features: [
          'Search & display campaigns',
          '50-75 targeted keywords',
          'Advanced ad copy testing',
          'Bi-weekly optimization',
          'Landing page recommendations'
        ]
      },
      Premium: {
        disclaimer: 'Management fee only. Ad spend billed separately.',
        budget: 'Recommended ad spend: $5,000+/mo',
        features: [
          'Full campaign suite (Search, Display, YouTube)',
          '100+ targeted keywords',
          'Continuous testing & optimization',
          'Weekly performance reviews',
          'Custom landing page creation'
        ]
      }
    },
    'SEO Optimization': {
      Base: {
        features: [
          '10 target keywords',
          'On-page optimization',
          'Basic technical SEO',
          'Monthly ranking reports'
        ]
      },
      Standard: {
        features: [
          '25 target keywords',
          'Advanced on-page optimization',
          'Technical SEO audit & fixes',
          'Competitor analysis',
          'Bi-weekly ranking reports'
        ]
      },
      Premium: {
        features: [
          '50+ target keywords',
          'Comprehensive SEO strategy',
          'Advanced technical optimization',
          'Content strategy development',
          'Weekly ranking reports',
          'Local SEO optimization'
        ]
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{service}</h2>
              <p className="text-gray-300">{serviceDescriptions[service]}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div key={tier} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-amber-500 mb-2">{tier}</h3>
                <p className="text-3xl font-bold text-white mb-4">
                  ${pricing[service]?.[tier]}<span className="text-sm text-gray-400">/mo</span>
                </p>
                
                {detailedFeatures[service]?.[tier]?.disclaimer && (
                  <p className="text-xs text-gray-400 mb-4 italic">
                    {detailedFeatures[service][tier].disclaimer}
                  </p>
                )}
                
                {detailedFeatures[service]?.[tier]?.budget && (
                  <p className="text-sm text-amber-400 mb-4">
                    {detailedFeatures[service][tier].budget}
                  </p>
                )}
                
                <ul className="space-y-2">
                  {detailedFeatures[service]?.[tier]?.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300">
                      <svg className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-600 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServiceModal;
