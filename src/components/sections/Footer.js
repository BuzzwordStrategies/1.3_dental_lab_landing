import React from 'react';
import { trackEvent } from '../../utils/tracking';

const Footer = () => {
  return (
    <footer className="bg-black py-16 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
                Buzzword Strategies
              </span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Specialized digital marketing for dental laboratories. We help labs grow their 
              client base through proven strategies and transparent pricing.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => trackEvent('social_click', { platform: 'linkedin' })}
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              <button 
                onClick={() => trackEvent('social_click', { platform: 'twitter' })}
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                'Meta Ads Management',
                'Google Ads',
                'SEO Optimization',
                'Content Creation',
                'Social Media',
                'Backlink Building'
              ].map((service) => (
                <li key={service}>
                  <button 
                    onClick={() => {
                      trackEvent('footer_service_click', { service });
                      document.getElementById('bundle-preview').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <a 
                  href="mailto:hello@buzzwordstrategies.com"
                  onClick={() => trackEvent('contact_click', { method: 'email' })}
                  className="hover:text-amber-500 transition-colors"
                >
                  hello@buzzwordstrategies.com
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <a 
                  href="tel:+1-555-BUZZWORD"
                  onClick={() => trackEvent('contact_click', { method: 'phone' })}
                  className="hover:text-amber-500 transition-colors"
                >
                  (555) BUZZWORD
                </a>
              </div>
              <button 
                onClick={() => {
                  trackEvent('footer_cta_click', { button: 'schedule_call' });
                  document.getElementById('lead-capture').scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-amber-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-amber-400 transition-colors"
              >
                Schedule Free Call
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Buzzword Strategies. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <button 
                onClick={() => trackEvent('footer_link_click', { link: 'privacy' })}
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => trackEvent('footer_link_click', { link: 'terms' })}
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => trackEvent('footer_link_click', { link: 'disclaimer' })}
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                Disclaimer
              </button>
            </div>
          </div>
          
          {/* Legal Disclaimers */}
          <div className="mt-8 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong>Important Disclaimers:</strong> Results shown are not typical and represent best-case scenarios. 
              Individual results vary based on market conditions, competition, budget, implementation, and other factors. 
              Past performance does not guarantee future results. Ad spend requirements are separate from management fees 
              and paid directly to advertising platforms. All pricing subject to change. Buzzword Strategies makes no 
              earnings claims or return on investment guarantees. Marketing success depends on multiple variables beyond our control.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
