import React, { useState } from 'react';
import { SERVICES } from '../../data/services';
import ServiceIcon from '../ui/ServiceIcon';
import { trackEvent } from '../../utils/tracking';

const ServicesShowcase = () => {
  const [activeService, setActiveService] = useState('Meta Ads');
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="text-white">Everything You Need to</span>{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
            Dominate Your Market
          </span>
        </h2>

        <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          A complete marketing ecosystem designed specifically for dental labs. 
          No more piecing together random tactics that don't work.
        </p>

        {/* Service grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {Object.keys(SERVICES).map((service) => (
            <button
              key={service}
              onClick={() => {
                setActiveService(service);
                trackEvent('service_selected', { service });
              }}
              onMouseEnter={() => setHoveredService(service)}
              onMouseLeave={() => setHoveredService(null)}
              className={`
                relative p-6 rounded-xl border-2 transition-all duration-300 overflow-hidden
                ${activeService === service 
                  ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-amber-500' 
                  : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                }
              `}
            >
              {/* Hover effect background */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10 transition-opacity duration-300 ${
                  hoveredService === service ? 'opacity-100' : 'opacity-0'
                }`}
              />
              
              <div className="relative z-10">
                <div className="mb-3 transform transition-transform duration-300 group-hover:scale-110">
                  <ServiceIcon service={service} className="w-8 h-8 mx-auto text-amber-500" />
                </div>
                <h3 className="font-bold text-white">{service}</h3>
                <p className="text-xs text-gray-400 mt-1">
                  From ${Math.min(...Object.values(SERVICES[service].pricing))}/mo
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Active service details */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">{activeService}</h3>
              <p className="text-gray-300 mb-6">{SERVICES[activeService].description}</p>
              
              {/* Success story */}
              <div className="bg-amber-500/10 rounded-xl p-4 mb-6">
                <p className="text-amber-400 font-medium mb-2">Success Story:</p>
                <p className="text-gray-300 text-sm italic">
                  "{SERVICES[activeService].successStory}"
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  * Individual results may vary. Performance depends on multiple factors.
                </p>
              </div>

              {/* Budget requirements for ad services */}
              {SERVICES[activeService].budgetRequirements && (
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-2">Media Spend Requirements:</p>
                  {Object.entries(SERVICES[activeService].budgetRequirements).map(([tier, budget]) => (
                    <p key={tier} className="text-gray-300 text-sm">
                      <span className="font-medium">{tier}:</span> {budget}
                    </p>
                  ))}
                  <p className="text-xs text-gray-500 mt-2 italic">
                    * Ad spend is paid directly to platforms and is separate from management fees
                  </p>
                </div>
              )}
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-4">Choose Your Level:</h4>
              <div className="space-y-4">
                {['Base', 'Standard', 'Premium'].map((tier) => (
                  <div key={tier} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-bold text-white">{tier}</h5>
                      <span className="text-2xl font-bold text-amber-500">
                        ${SERVICES[activeService].pricing[tier]}
                        <span className="text-sm text-gray-400 font-normal">/mo</span>
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {SERVICES[activeService].features[tier].map((feature, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
