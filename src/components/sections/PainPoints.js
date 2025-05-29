import React from 'react';

const PainPoints = () => {
  const painPoints = [
    {
      icon: "📉",
      title: "Losing Clients to Competitors",
      description: "Digital-savvy labs are stealing your business with better online presence",
      stat: "73% of dentists research labs online before making decisions*",
      citation: "*Source: Dental Lab Industry Report 2023"
    },
    {
      icon: "🔍",
      title: "Invisible on Google",
      description: "Your expertise doesn't matter if dentists can't find you",
      stat: "89% of B2B purchases start with a search engine*",
      citation: "*Source: Google B2B Marketing Study 2023"
    },
    {
      icon: "💸",
      title: "Wasting Money on Marketing",
      description: "Throwing money at agencies that don't understand dental labs",
      stat: "Average lab wastes $18,000/year on ineffective marketing*",
      citation: "*Based on Buzzword Strategies client intake data 2023"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="text-white">The Harsh Reality:</span>{" "}
          <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            You're Losing Money Every Day
          </span>
        </h2>
        
        <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          While you focus on quality craftsmanship, aggressive competitors are stealing 
          your market share with superior marketing.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {point.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{point.title}</h3>
              <p className="text-gray-400 mb-4">{point.description}</p>
              <div className="mt-auto">
                <p className="text-amber-400 font-bold mb-1">{point.stat}</p>
                <p className="text-xs text-gray-500 italic">{point.citation}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-2xl text-white font-medium mb-4">
            But it doesn't have to be this way...
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
