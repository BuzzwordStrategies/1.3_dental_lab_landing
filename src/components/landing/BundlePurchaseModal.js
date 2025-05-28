import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserInfoForm from '../UserInfoForm';
import ContractAgreementForm from '../ContractAgreementForm';

const BundlePurchaseModal = ({ bundle, bundleKey, subscriptionLength, finalPrice, onClose }) => {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Generate bundle ID
  const bundleID = `dental-lab-${bundleKey}-${Date.now()}`;

  const handleUserInfoSubmit = async (formData) => {
    setUserInfo(formData);
    
    // Save to Supabase via existing save-bundle-data function
    try {
      const response = await fetch('/.netlify/functions/save-bundle-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bundleID,
          bundleName: bundle.name,
          selectedTiers: bundle.services,
          subLength: subscriptionLength,
          finalMonthly: finalPrice,
          userInfo: formData,
          formStep: 1,
          source: 'dental-lab-landing'
        })
      });
      
      if (response.ok) {
        setStep(2);
      }
    } catch (error) {
      console.error('Error saving user info:', error);
    }
  };

  const handleAgreementSubmit = async (agreementData) => {
    setIsProcessing(true);
    
    try {
      // Update bundle with agreement data
      await fetch('/.netlify/functions/save-bundle-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bundleID,
          agreementInfo: agreementData,
          formStep: 2
        })
      });

      // Prepare selected services string
      const selectedServices = Object.entries(bundle.services)
        .map(([service, tier]) => `${service}: ${tier}`)
        .join(', ');

      // Redirect to Stripe checkout
      const params = new URLSearchParams({
        bundleID,
        bundleName: bundle.name,
        finalMonthly: finalPrice,
        subLength: subscriptionLength,
        selectedServices
      });

      window.location.href = `/.netlify/functions/create-stripe-checkout?${params.toString()}`;
    } catch (error) {
      console.error('Error processing agreement:', error);
      setIsProcessing(false);
    }
  };

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
          className="bg-gray-900 border border-amber-500/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-amber-500 text-black' : 'bg-gray-700 text-gray-400'
                }`}>
                  1
                </div>
                <div className={`w-20 h-1 ${step >= 2 ? 'bg-amber-500' : 'bg-gray-700'}`} />
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-amber-500 text-black' : 'bg-gray-700 text-gray-400'
                }`}>
                  2
                </div>
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

            {/* Step Content */}
            {step === 1 ? (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Complete Your {bundle.name} Purchase</h2>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-amber-500 mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-300">
                      <span>{bundle.name}</span>
                      <span>${finalPrice}/month</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>{subscriptionLength}-month commitment</span>
                      <span>{Object.keys(bundle.services).length} services</span>
                    </div>
                  </div>
                </div>
                <UserInfoForm
                  onSubmit={handleUserInfoSubmit}
                  onCancel={onClose}
                  theme={{
                    bg: 'bg-gray-900',
                    cardBg: 'bg-gray-800',
                    text: 'text-white',
                    textSecondary: 'text-gray-400',
                    accent: 'bg-amber-500',
                    accentHover: 'hover:bg-amber-600',
                    accentText: 'text-amber-500',
                    border: 'border-gray-700',
                    borderAccent: 'border-amber-500'
                  }}
                  isDarkMode={true}
                />
              </div>
            ) : (
              <ContractAgreementForm
                onSubmit={handleAgreementSubmit}
                onCancel={() => setStep(1)}
                bundleName={bundle.name}
                selectedServices={Object.entries(bundle.services)
                  .map(([service, tier]) => `${service}: ${tier}`)
                  .join(', ')}
                clientName={userInfo?.clientName || ''}
                subLength={subscriptionLength}
                finalMonthly={finalPrice}
                bundleID={bundleID}
                theme={{
                  bg: 'bg-gray-900',
                  cardBg: 'bg-gray-800',
                  text: 'text-white',
                  textSecondary: 'text-gray-400',
                  accent: 'bg-amber-500',
                  accentHover: 'hover:bg-amber-600',
                  accentText: 'text-amber-500',
                  border: 'border-gray-700',
                  borderAccent: 'border-amber-500'
                }}
                isDarkMode={true}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BundlePurchaseModal;
