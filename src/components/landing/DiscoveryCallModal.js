import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DiscoveryCallModal = ({ isOpen, onClose, source }) => {
  const [formData, setFormData] = useState({
    name: '',
    labName: '',
    email: '',
    phone: '',
    website: '',
    monthlyRevenue: '',
    biggestChallenge: '',
    readyToInvest: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.labName) newErrors.labName = 'Lab name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.biggestChallenge) newErrors.biggestChallenge = 'Please share your biggest challenge';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Send to N8N webhook
      await fetch(process.env.REACT_APP_DISCOVERY_CALL_WEBHOOK || 'https://webhook.site/your-webhook-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: `dental-lab-landing-${source}`,
          timestamp: new Date().toISOString()
        })
      });
      
      // Redirect to Calendly
      window.location.href = 'https://calendly.com/josh-buzzwordstrategies/discovery-call';
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 border border-amber-500/20 rounded-2xl max-w-lg w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Book Your Growth Strategy Call</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-400 mb-6">
              Get personalized marketing strategies for your dental lab in a free 15-minute call
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-4 py-3 bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <input
                    type="text"
                    placeholder="Lab Name *"
                    value={formData.labName}
                    onChange={(e) => setFormData({...formData, labName: e.target.value})}
                    className={`w-full px-4 py-3 bg-gray-800 border ${errors.labName ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors`}
                  />
                  {errors.labName && <p className="text-red-400 text-xs mt-1">{errors.labName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <input
                    type="tel"
                    placeholder="Phone *"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full px-4 py-3 bg-gray-800 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <input
                type="url"
                placeholder="Website (optional)"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
              />

              <select
                value={formData.monthlyRevenue}
                onChange={(e) => setFormData({...formData, monthlyRevenue: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none transition-colors"
              >
                <option value="">Monthly Revenue (optional)</option>
                <option value="0-50k">$0 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="100k-200k">$100,000 - $200,000</option>
                <option value="200k-500k">$200,000 - $500,000</option>
                <option value="500k+">$500,000+</option>
              </select>

              <textarea
                placeholder="What's your biggest marketing challenge? *"
                value={formData.biggestChallenge}
                onChange={(e) => setFormData({...formData, biggestChallenge: e.target.value})}
                rows={3}
                className={`w-full px-4 py-3 bg-gray-800 border ${errors.biggestChallenge ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors resize-none`}
              />
              {errors.biggestChallenge && <p className="text-red-400 text-xs mt-1">{errors.biggestChallenge}</p>}

              <select
                value={formData.readyToInvest}
                onChange={(e) => setFormData({...formData, readyToInvest: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none transition-colors"
              >
                <option value="">Ready to invest in marketing?</option>
                <option value="immediately">Immediately</option>
                <option value="1-3-months">1-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="6-months+">6+ months</option>
                <option value="just-exploring">Just exploring options</option>
              </select>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Continue to Schedule Call →'}
              </motion.button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Your information is secure and will never be shared. By submitting, you agree to our privacy policy.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DiscoveryCallModal;
