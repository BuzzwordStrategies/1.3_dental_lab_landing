import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { submitFormToN8N } from '../../utils/webhookService';

const BlogPostForm = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const topicChoice = watch('topicChoice');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await submitFormToN8N('blogPost', data);
      setShowSuccess(true);
      
      // Track conversion
      if (window.gtag) {
        window.gtag('event', 'generate_lead', {
          currency: 'USD',
          value: 297,
          lead_type: 'blog_post'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                      className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4"
                    >
                      <span className="text-3xl">✍️</span>
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-2">Free 1,500-Word Blog Post</h2>
                    <p className="text-gray-400">Custom content for your dental lab</p>
                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                        $297 Value - Free for a Limited Time
                      </span>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Contact Information */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
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
                    </motion.div>

                    {/* Blog Preferences */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">Blog Preferences</h3>
                      
                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2">Topic Choice</label>
                        <select
                          {...register("topicChoice", { required: "Please select a topic" })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        >
                          <option value="">Select a topic</option>
                          <option value="digital-dentistry">Digital Dentistry Trends</option>
                          <option value="case-study">Case Study Showcase</option>
                          <option value="lab-technology">Lab Technology Updates</option>
                          <option value="materials-guide">Dental Materials Guide</option>
                          <option value="custom">Custom Topic</option>
                        </select>
                        {errors.topicChoice && (
                          <p className="text-red-400 text-sm mt-1">{errors.topicChoice.message}</p>
                        )}
                      </div>

                      {topicChoice === 'custom' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-6"
                        >
                          <FormField
                            label="Custom Topic"
                            name="customTopic"
                            register={register}
                            errors={errors}
                            rules={{ required: topicChoice === 'custom' ? "Please describe your topic" : false }}
                            placeholder="Describe your custom topic..."
                            watch={watch}
                          />
                        </motion.div>
                      )}

                      <div className="mb-6">
                        <label className="block text-gray-300 mb-3">Target Audience</label>
                        <div className="space-y-3">
                          {[
                            { value: "dentists", label: "Dentists" },
                            { value: "patients", label: "Patients" },
                            { value: "industry", label: "Industry Professionals" }
                          ].map((option) => (
                            <label key={option.value} className="flex items-center">
                              <input
                                type="radio"
                                value={option.value}
                                {...register("targetAudience", { required: "Please select a target audience" })}
                                className="w-4 h-4 text-purple-500 bg-white/5 border-white/20 focus:ring-purple-500"
                              />
                              <span className="ml-3 text-gray-300">{option.label}</span>
                            </label>
                          ))}
                        </div>
                        {errors.targetAudience && (
                          <p className="text-red-400 text-sm mt-1">{errors.targetAudience.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2">
                          Keywords to Include
                          <span className="text-gray-500 text-sm ml-2">(optional)</span>
                        </label>
                        <input
                          type="text"
                          {...register("keywords")}
                          placeholder="e.g., digital impressions, CAD/CAM, zirconia crowns"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="pt-6"
                    >
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-semibold hover:from-purple-400 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                      >
                        {isSubmitting ? "Submitting..." : "Claim My Free Article"}
                      </button>
                    </motion.div>
                  </form>
                </>
              ) : (
                <SuccessAnimation formType="blogPost" onClose={onClose} />
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
          ${isFocused || fieldValue ? 'top-0 -translate-y-full text-xs text-purple-400' : 'top-1/2 -translate-y-1/2 text-gray-400'}
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
          ${errors[name] ? 'border-red-500' : isFocused ? 'border-purple-400' : 'border-white/10'}
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

// Success Animation Component
const SuccessAnimation = ({ formType, onClose }) => {
  const messages = {
    blogPost: {
      title: "Your Custom Blog Post is in Production! ✍️",
      subtitle: "Our AI is crafting a unique, SEO-optimized article for your dental lab.",
      benefits: [
        "1,500+ words of unique content",
        "SEO keyword optimization",
        "Ready to publish format",
        "Delivered within 48 hours"
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
        className="px-8 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-400 transition-colors"
      >
        Close
      </button>
    </motion.div>
  );
};

export default BlogPostForm;
