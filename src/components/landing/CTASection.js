import React from 'react';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="glass-amber rounded-3xl p-12 max-w-5xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Transform Your 
              <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent"> Dental Lab?</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Stop losing clients to competitors. Start attracting premium dentists who value quality work 
              and are willing to pay for it. Your transformation begins with a single conversation.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-white mb-3">Free Strategy Session</h3>
                <p className="text-gray-300 text-sm">
                  Get a custom marketing roadmap for your lab in a 30-minute call with our dental marketing experts
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-white mb-3">Free Marketing Audit</h3>
                <p className="text-gray-300 text-sm">
                  Discover exactly what's holding your lab back and get actionable recommendations to fix it
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <motion.a
                href="https://calendly.com/josh-buzzwordstrategies/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all text-lg"
              >
                Book Your Free Strategy Session
              </motion.a>
              
              <div className="text-gray-400 text-sm">or</div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all text-lg"
                onClick={() => document.getElementById('lead-magnets').scrollIntoView({ behavior: 'smooth' })}
              >
                Get Your Free Marketing Audit
              </motion.button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                ✅ No obligation • ✅ 100% confidential • ✅ Immediate value
              </p>
            </div>
          </div>
        </motion.div>

        {/* Urgency Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="glass-dark rounded-2xl p-8 max-w-4xl mx-auto border border-red-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              ⚠️ Don't Wait - Your Competitors Aren't
            </h3>
            <p className="text-gray-300 mb-6">
              Every day you delay is another day your competitors gain market share. 
              The dental labs that act now will dominate their markets for years to come.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-red-400 font-bold text-lg">Today</div>
                <div className="text-gray-400 text-sm">You're losing potential clients</div>
              </div>
              <div>
                <div className="text-yellow-400 font-bold text-lg">Next Month</div>
                <div className="text-gray-400 text-sm">Competitors gain more visibility</div>
              </div>
              <div>
                <div className="text-green-400 font-bold text-lg">Next Year</div>
                <div className="text-gray-400 text-sm">Market leaders are established</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://calendly.com/josh-buzzwordstrategies/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-6 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all text-xl pulse-amber"
          >
            Secure Your Spot - Book Now
          </motion.a>
          <p className="text-gray-400 text-sm mt-4">
            Limited spots available this month
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
