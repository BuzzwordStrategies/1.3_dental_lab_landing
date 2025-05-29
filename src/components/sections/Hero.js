import React from 'react';
import { trackEvent } from '../../utils/tracking';

const Hero = ({ scrollY }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${50 + scrollY * 0.02}% ${50 + scrollY * 0.02}%, #D28C00 0%, transparent 50%)`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-500 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          <span className="block text-white">Your Dental Lab Deserves</span>
          <span className="block mt-2 bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
            Marketing That Actually Works
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
          Stop losing dentists to competitors. Get a proven marketing system that brings 
          predictable, high-quality leads every month.
        </p>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-8 mb-8 animate-fade-in-up animation-delay-400">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300">No Long-Term Contracts</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300">100% Transparent Pricing</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300">Proven Results</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
          <button 
            onClick={() => {
              trackEvent('hero_cta_click', { button: 'see_pricing' });
              document.getElementById('bundle-preview').scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-amber-500/50"
          >
            See Our Pricing & Packages
          </button>
          <button 
            onClick={() => {
              trackEvent('hero_cta_click', { button: 'get_audit' });
              document.getElementById('lead-capture').scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transform transition-all duration-300"
          >
            Get Free Marketing Audit
          </button>
        </div>

        {/* Urgency indicator */}
        <div className="mt-12 animate-pulse">
          <p className="text-amber-400 text-sm font-medium">
            ⚡ Limited spots available for Q2 2024 - Book your strategy call today
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
