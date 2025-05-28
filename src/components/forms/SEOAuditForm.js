import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { submitToWebhook } from '../../utils/webhookManager';
import { uploadToGoogleDrive } from '../../utils/fileUploadHandler';

const SEOAuditForm = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 3,
    maxSize: 10485760, // 10MB
    onDrop: acceptedFiles => setFiles(acceptedFiles)
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Upload files to Google Drive first
      let uploadedFiles = [];
      if (files.length > 0) {
        uploadedFiles = await uploadToGoogleDrive(files, {
          folderName: `${data.companyName}_${data.name}_SEO_Audit`,
          webhookUrl: process.env.REACT_APP_GOOGLE_DRIVE_WEBHOOK
        });
      }

      // Submit form data with file URLs
      const webhookData = {
        formType: 'seo_audit',
        ...data,
        files: uploadedFiles,
        timestamp: new Date().toISOString(),
        source: 'dental_lab_landing'
      };

      await submitToWebhook(process.env.REACT_APP_SEO_AUDIT_WEBHOOK, webhookData);
      
      toast.success('Your SEO audit request has been submitted! We\'ll deliver it within 24 hours.');
      reset();
      setFiles([]);
      setTimeout(onClose, 2000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-amber-500/20 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Free SEO Audit for Dental Labs</h2>
        <p className="text-gray-400 mb-6">Get a comprehensive analysis of your lab's online presence in under 24 hours</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="John Smith"
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Lab Name *</label>
              <input
                {...register('companyName', { required: 'Lab name is required' })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="Premier Dental Lab"
              />
              {errors.companyName && <p className="mt-1 text-sm text-red-400">{errors.companyName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="john@dentallab.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
              <input
                type="tel"
                {...register('phone', { required: 'Phone is required' })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="(555) 123-4567"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Website URL *</label>
            <input
              type="url"
              {...register('website', { 
                required: 'Website is required',
                pattern: {
                  value: /^https?:\/\/.+\..+/,
                  message: 'Please enter a valid URL'
                }
              })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
              placeholder="https://yourdentallab.com"
            />
            {errors.website && <p className="mt-1 text-sm text-red-400">{errors.website.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Marketing Challenges</label>
            <textarea
              {...register('challenges')}
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
              placeholder="What are your biggest marketing pain points?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Upload Screenshots (Optional)</label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-amber-500 bg-amber-500/10' : 'border-white/20 hover:border-amber-500/50'
              }`}
            >
              <input {...getInputProps()} />
              {files.length > 0 ? (
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <p key={index} className="text-sm text-gray-300">{file.name}</p>
                  ))}
                  <p className="text-xs text-gray-400">Click to add more files</p>
                </div>
              ) : (
                <div>
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-300">Drop files here or click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Legal Compliance */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <label className="flex items-start">
              <input
                type="checkbox"
                {...register('consent', { required: 'You must agree to continue' })}
                className="mt-1 mr-3"
              />
              <span className="text-sm text-gray-300">
                I agree to receive my free SEO audit via email and understand that Buzzword Strategies will store my information 
                securely in accordance with their <a href="#" className="text-amber-500 underline">Privacy Policy</a>. I may receive 
                follow-up communications about dental lab marketing services, which I can opt out of at any time.
              </span>
            </label>
            {errors.consent && <p className="mt-1 text-sm text-red-400">{errors.consent.message}</p>}
          </div>

          <div className="flex gap-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Get My Free SEO Audit'}
            </motion.button>
            
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-4 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SEOAuditForm;
