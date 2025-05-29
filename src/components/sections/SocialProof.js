import React from 'react';

const SocialProof = () => {
  const caseStudies = [
    {
      metric: "250%",
      title: "Increase in Appointment Requests",
      description: "DentalWorks achieved massive growth through Google Ads restructuring with geo-fencing and improved their cost-per-click by 19%.",
      source: "Source: Cardinal Digital Marketing Case Study, 2023"
    },
    {
      metric: "472%",
      title: "ROI in First 56 Days",
      description: "Viva Dental's integrated direct mail and digital campaign generated exceptional returns with a 53% close ratio from calls.",
      source: "Source: 123 Postcards Case Study"
    },
    {
      metric: "125%",
      title: "Monthly Profit Increase",
      description: "UK dental practice achieved 1100% ROI through comprehensive digital strategy, advancing from Bronze to Platinum Invisalign status.",
      source: "Source: The Creative Composite Case Study"
    }
  ];

  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="text-white">Proven Strategies That Work for</span>{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
            Dental Businesses
          </span>
        </h2>
        
        <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          While we're just launching our dental lab specialization, these documented results 
          show what strategic digital marketing can achieve in the dental industry.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div 
              key={index}
              className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-amber-500/50 transition-all duration-300"
            >
              <div className="text-amber-500 text-6xl font-bold mb-4">{study.metric}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{study.title}</h3>
              <p className="text-gray-400 mb-4">{study.description}</p>
              <p className="text-sm text-gray-500">{study.source}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-8">
            These results demonstrate the power of strategic digital marketing in the dental industry. 
            <br />
            As specialists in dental lab marketing, we apply these proven strategies specifically for labs.
          </p>
          
          {/* Results Disclaimer */}
          <div className="mt-8 mb-8 p-3 bg-gray-800/50 rounded-lg border border-gray-700 max-w-4xl mx-auto">
            <p className="text-xs text-gray-400 italic">
              * These results are not typical and represent best-case scenarios from specific client campaigns. 
              Individual results vary based on market conditions, competition, budget, implementation, and other factors. 
              Past performance does not guarantee future results. Buzzword Strategies makes no earnings claims or return on investment guarantees.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
