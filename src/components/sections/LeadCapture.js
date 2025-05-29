import React, { useState } from 'react';
import { trackEvent } from '../../utils/tracking';

const LeadCapture = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    labName: '',
    currentChallenges: '',
    monthlyRevenue: '',
    interestedServices: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Meta Ads', 'Google Ads', 'TikTok Ads', 'SEO Optimization',
    'Google Business Profile', 'Backlink Building', 'Content Creation', 'Social Media Management'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      interestedServices: prev.interestedServices.includes(service)
        ? prev.interestedServices.filter(s => s !== service)
        : [...prev.interestedServices, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      trackEvent('lead_form_submit', {
        services: formData.interestedServices,
        revenue_range: formData.monthlyRevenue
      });

      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="lead-capture" className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-12">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4">Thank You!</h2>
            <p className="text-xl text-gray-300 mb-6">
              We've received your information and will contact you within 24 hours to discuss 
              your dental lab's marketing strategy.
            </p>
            <p className="text-gray-400">
              Check your email for our comprehensive dental lab marketing guide.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-capture" className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Ready to</span>{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
              Transform Your Lab?
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get a free marketing audit and custom strategy session. 
            No obligations, just actionable insights for your dental lab.
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Lab Name *
                </label>
                <input
                  type="text"
                  name="labName"
                  value={formData.labName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="Your dental lab name"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Monthly Revenue Range
              </label>
              <select
                name="monthlyRevenue"
                value={formData.monthlyRevenue}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
              >
                <option value="">Select revenue range</option>
                <option value="under-50k">Under $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="100k-250k">$100,000 - $250,000</option>
                <option value="250k-500k">$250,000 - $500,000</option>
                <option value="500k-1m">$500,000 - $1,000,000</option>
                <option value="over-1m">Over $1,000,000</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Current Marketing Challenges
              </label>
              <textarea
                name="currentChallenges"
                value={formData.currentChallenges}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="Tell us about your biggest marketing challenges..."
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-4 font-medium">
                Services You're Interested In
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceToggle(service)}
                    className={`
                      p-3 rounded-lg border transition-all duration-300 text-sm
                      ${formData.interestedServices.includes(service)
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                      }
                    `}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold py-4 rounded-full hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Get My Free Marketing Audit'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to receive marketing communications from Buzzword Strategies. 
              You can unsubscribe at any time. We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
