import React from 'react';
import { motion } from 'framer-motion';

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'Owner, Premier Dental Lab',
      location: 'Austin, TX',
      quote: 'Buzzword Strategies completely transformed our online presence. We went from struggling to find new clients to having a waiting list. Their SEO work alone brought us 300% more website traffic.',
      rating: 5,
      avatar: '👩‍⚕️'
    },
    {
      name: 'Mike Rodriguez',
      title: 'Lab Manager, Precision Prosthetics',
      location: 'Denver, CO',
      quote: 'The team at Buzzword understands the dental lab industry like no other marketing agency. Their targeted approach helped us double our revenue in just 8 months.',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: 'Lisa Chen',
      title: 'CEO, Elite Dental Solutions',
      location: 'Phoenix, AZ',
      quote: 'Working with Buzzword was the best business decision we made. They don\'t just do marketing - they become a strategic partner invested in your success.',
      rating: 5,
      avatar: '👩‍💼'
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            What Dental Lab Owners 
            <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent"> Are Saying</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it - hear from lab owners who have transformed their businesses
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-dark rounded-2xl p-8 hover-lift"
            >
              {/* Rating Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-300 text-center mb-8 italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="text-center">
                <div className="text-3xl mb-3">{testimonial.avatar}</div>
                <div className="text-white font-semibold">{testimonial.name}</div>
                <div className="text-amber-500 text-sm">{testimonial.title}</div>
                <div className="text-gray-400 text-sm">{testimonial.location}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass-amber rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how we can help your dental lab achieve similar results
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.a
                href="https://calendly.com/josh-buzzwordstrategies/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full shadow-lg hover:shadow-amber-500/25 transition-all"
              >
                Book Your Strategy Call
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all"
                onClick={() => document.getElementById('lead-magnets').scrollIntoView({ behavior: 'smooth' })}
              >
                Get Free Resources
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
