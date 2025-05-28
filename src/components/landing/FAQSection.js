import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How is this different from generic marketing agencies?",
      answer: "We specialize exclusively in data-driven digital marketing with a focus on measurable ROI. Our team uses advanced analytics, AI-powered tools, and proven strategies that have generated over $2M in revenue for our clients."
    },
    {
      question: "How quickly will I see results?",
      answer: "Most clients see initial results within 30 days: increased website traffic, more leads, and improved engagement. Substantial revenue increases typically occur within 60-90 days. SEO and content marketing build momentum over 3-6 months for long-term growth."
    },
    {
      question: "What's included in the management fees?",
      answer: "Our fees cover strategy development, campaign creation and management, optimization, reporting, and ongoing consultation. Ad spend is billed separately - you pay Google, Meta, etc. directly, maintaining full transparency and control over your budget."
    },
    {
      question: "Do I need a big advertising budget?",
      answer: "No! We recommend starting with $1,000-2,500/month in ad spend, but we've helped businesses grow significantly with just $500/month through smart targeting. Our management ensures every dollar works harder than competitors spending 5x more."
    },
    {
      question: "What if I'm not tech-savvy?",
      answer: "Perfect - that's why we're here! We handle all technical aspects while keeping you informed with clear, jargon-free reports. You focus on running your business; we'll ensure customers find you online."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Frequently Asked Questions
        </motion.h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors"
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-300">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
