import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img 
              src="https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/ab4663d3-4840-47f0-88cf-a5b1144ed31a/Remove+background+project+%281%29.png?format=1000w"
              alt="Buzzword Strategies" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm">
              Revolutionizing dental lab marketing with data-driven strategies and cutting-edge technology.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-amber-500 transition-colors">SEO Optimization</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Google Ads Management</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Social Media Marketing</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Content Creation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Free Audit</a></li>
              <li><a href="https://calendly.com/josh-buzzwordstrategies/discovery-call" className="hover:text-amber-500 transition-colors">Book a Call</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/privacy-policy" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
              <li><a href="/disclaimer" className="hover:text-amber-500 transition-colors">Disclaimer</a></li>
              <li><a href="/refund-policy" className="hover:text-amber-500 transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-4">
              © 2024 Buzzword Strategies LLC. All rights reserved. | 
              1603 Capitol Ave Ste 415 #465784, Cheyenne, WY 82001
            </p>
            
            {/* FTC Compliance Disclaimer */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg text-xs">
              <p className="mb-2">
                <strong>MARKETING DISCLOSURE:</strong> This website contains marketing material. 
                The information is provided for educational and informational purposes only and is not 
                intended as a substitute for professional advice. Individual results may vary.
              </p>
              <p className="mb-2">
                <strong>TESTIMONIAL DISCLAIMER:</strong> The testimonials on this website are individual 
                experiences, reflecting real life experiences of those who have used our services. However, 
                they are individual results and results do vary. We do not claim that they are typical results.
              </p>
              <p>
                <strong>MATERIAL CONNECTION DISCLOSURE:</strong> Some of the links in the post above are 
                "affiliate links." This means if you click on the link and purchase the item, we will receive 
                an affiliate commission. Regardless, we only recommend products or services we believe will 
                add value to our readers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
