import React from 'react';
import { BUNDLES } from '../../data/services';
import { trackEvent } from '../../utils/tracking';

const BundlePreview = () => {
  return (
    <section id="bundle-preview" className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="text-white">Smart Labs</span>{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
            Bundle & Save
          </span>
        </h2>
        
        <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Our most successful labs use multiple services for compound growth. 
          Save up to 20% with strategic bundles designed for dental laboratories.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.values(BUNDLES).map((bundle, index) => (
            <div
              key={bundle.id}
              className={`
                relative rounded-3xl p-8 border transition-all duration-300 hover:transform hover:scale-105
                ${bundle.popular 
                  ? 'bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-2 border-amber-500 scale-105' 
                  : 'bg-gray-900 border border-gray-800'
                }
              `}
            >
              {bundle.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-2">{bundle.name}</h3>
              <p className="text-gray-400 mb-6">{bundle.description}</p>
              
              <div className="text-4xl font-bold text-white mb-2">
                ${bundle.basePrice}
                <span className="text-lg font-normal text-gray-400">/mo</span>
              </div>
              
              <p className="text-sm text-gray-500 mb-6">{bundle.bestFor}</p>
              
              <ul className="space-y-3 mb-8">
                {bundle.services.map((service, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {service}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => {
                  trackEvent('bundle_interest', { 
                    bundle_name: bundle.name,
                    services: bundle.services,
                    value: bundle.basePrice 
                  });
                  document.getElementById('lead-capture').scrollIntoView({ behavior: 'smooth' });
                }}
                className={`
                  w-full py-3 rounded-full font-bold transition-all duration-300
                  ${bundle.popular 
                    ? 'bg-amber-500 text-black hover:bg-amber-400' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                  }
                `}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">All prices shown are management fees only. Ad spend billed separately.</p>
          <button 
            onClick={() => {
              trackEvent('custom_bundle_interest');
              document.getElementById('lead-capture').scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Build Custom Bundle
          </button>
        </div>
      </div>
    </section>
  );
};

export default BundlePreview;
