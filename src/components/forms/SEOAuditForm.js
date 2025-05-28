import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { submitFormToN8N } from '../../utils/webhookService';

const SEOAuditForm = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const totalSteps = 3;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await submitFormToN8N('seoAudit', data);
      setShowSuccess(true);
      
      // Track conversion
      if (window.gtag) {
        window.gtag('event', 'generate_lead', {
          currency: 'USD',
          value: 497,
          lead_type: 'seo_audit'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              {!showSuccess ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-full mb-4"
                    >
                      <span className="text-3xl">🔍</span>
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-2">Free AI-Powered SEO Audit</h2>
                    <p className="text-gray-400">Discover where you're winning & losing online</p>
                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                        $497 Value - Free for a Limited Time
                      </span>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <FormProgress currentStep={currentStep} totalSteps={totalSteps} />

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {currentStep === 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
                        
                        <FormField
                          label="Full Name"
                          name="fullName"
                          register={register}
                          errors={errors}
                          rules={{ required: "Full name is required" }}
                          placeholder="Dr. John Smith"
                          watch={watch}
                        />
                        
                        <FormField
                          label="Lab Name"
                          name="labName"
                          register={register}
                          errors={errors}
                          rules={{ required: "Lab name is required" }}
                          placeholder="Premier Dental Lab"
                          watch={watch}
                        />
                        
                        <FormField
                          label="Email"
                          name="email"
                          type="email"
                          register={register}
                          errors={errors}
                          rules={{
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Please enter a valid email"
                            }
                          }}
                          placeholder="john@dentallab.com"
                          watch={watch}
                        />
                        
                        <FormField
                          label="Phone"
                          name="phone"
                          type="tel"
                          register={register}
                          errors={errors}
                          rules={{ required: "Phone number is required" }}
                          placeholder="(555) 123-4567"
                          watch={watch}
                        />
                      </motion.div>
                    )}

                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <h3 className="text-xl font-semibold text-white mb-4">Lab Details</h3>
                        
                        <FormField
                          label="Website (optional)"
                          name="website"
                          register={register}
                          errors={errors}
                          placeholder="www.yourdentallab.com"
                          watch={watch}
                        />
                        
                        <div className="mb-6">
                          <label className="block text-gray-300 mb-2">Lab Type</label>
                          <select
                            {...register("labType", { required: "Please select a lab type" })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                          >
                            <option value="">Select lab type</option>
                            <option value="crown-bridge">Crown & Bridge</option>
                            <option value="digital">Digital Lab</option>
                            <option value="full-service">Full Service</option>
                            <option value="orthodontic">Orthodontic</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.labType && (
                            <p className="text-red-400 text-sm mt-1">{errors.labType.message}</p>
                          )}
                        </div>
                        
                        <div className="mb-6">
                          <label className="block text-gray-300 mb-2">Monthly Revenue (optional)</label>
                          <select
                            {...register("monthlyRevenue")}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                          >
                            <option value="">Select range</option>
                            <option value="<50k">Less than $50k</option>
                            <option value="50k-100k">$50k - $100k</option>
                            <option value="100k-250k">$100k - $250k</option>
                            <option value="250k-500k">$250k - $500k</option>
                            <option value="500k+">$500k+</option>
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <h3 className="text-xl font-semibold text-white mb-4">Current Marketing</h3>
                        
                        <div className="mb-6">
                          <label className="block text-gray-300 mb-3">What marketing are you currently doing?</label>
                          <div className="space-y-3">
                            {["Website", "Google Ads", "Social Media", "Email Marketing", "None"].map((option) => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  value={option}
                                  {...register("currentMarketing")}
                                  className="w-4 h-4 text-amber-500 bg-white/5 border-white/20 rounded focus:ring-amber-500"
                                />
                                <span className="ml-3 text-gray-300">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 mb-2">What's your biggest marketing challenge?</label>
                          <textarea
                            {...register("biggestChallenge")}
                            rows={4}
                            maxLength={500}
                            placeholder="Tell us about your marketing challenges..."
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 focus:outline-none resize-none"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6">
                      {currentStep > 0 && (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
                        >
                          Previous
                        </button>
                      )}
                      
                      {currentStep < totalSteps - 1 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="ml-auto px-6 py-3 bg-amber-500 text-black rounded-full font-semibold hover:bg-amber-400 transition-colors"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="ml-auto px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black rounded-full font-semibold hover:from-amber-400 hover:to-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Submitting..." : "Get My Free Audit"}
                        </button>
                      )}
                    </div>
                  </form>
                </>
              ) : (
                <SuccessAnimation formType="seoAudit" onClose={onClose} />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

// Form Field Component
const FormField = ({ label, name, type = "text", register, errors, rules, placeholder, watch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const fieldValue = watch?.(name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-6"
    >
      <label
        className={`
          absolute left-4 transition-all duration-300 pointer-events-none
          ${isFocused || fieldValue ? 'top-0 -translate-y-full text-xs text-amber-400' : 'top-1/2 -translate-y-1/2 text-gray-400'}
        `}
      >
        {label}
      </label>
      
      <input
        type={type}
        {...register(name, rules)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? placeholder : ""}
        className={`
          w-full px-4 py-4 bg-white/5 border rounded-lg
          transition-all duration-300
          ${errors[name] ? 'border-red-500' : isFocused ? 'border-amber-400' : 'border-white/10'}
          text-white placeholder-gray-500
          focus:outline-none focus:bg-white/10
        `}
      />
      
      {errors[name] && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-1"
        >
          {errors[name].message}
        </motion.p>
      )}
    </motion.div>
  );
};

// Progress Indicator Component
const FormProgress = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <motion.div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${index <= currentStep ? 'bg-amber-500' : 'bg-gray-700'}
              transition-all duration-300
            `}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {index < currentStep ? (
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span className="text-sm font-medium">{index + 1}</span>
            )}
          </motion.div>
          {index < totalSteps - 1 && (
            <div className={`
              flex-1 h-1 mx-2 transition-all duration-500
              ${index < currentStep ? 'bg-amber-500' : 'bg-gray-700'}
            `} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Success Animation Component
const SuccessAnimation = ({ formType, onClose }) => {
  const messages = {
    seoAudit: {
      title: "Your SEO Audit is Being Prepared! 🎉",
      subtitle: "We'll analyze your lab's online presence and send a comprehensive report within 24 hours.",
      benefits: [
        "Complete website analysis",
        "Competitor comparison",
        "Keyword opportunities",
        "Actionable recommendations"
      ]
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.6 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
      >
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </svg>
      </motion.div>

      <h3 className="text-2xl font-bold text-white mb-2">{messages[formType].title}</h3>
      <p className="text-gray-300 mb-6">{messages[formType].subtitle}</p>

      <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
        {messages[formType].benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center text-left"
          >
            <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-300">{benefit}</span>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="px-8 py-3 bg-amber-500 text-black rounded-full font-semibold hover:bg-amber-400 transition-colors"
      >
        Close
      </button>
    </motion.div>
  );
};

export default SEOAuditForm;
