import React from 'react';
import { Plane, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const MarketplaceSection = () => {
  const deals = [
    {
      jet: "Citation Mustang",
      capacity: 4,
      fromCity: "Nice",
      fromICAO: "LFMN (NCE)",
      toCity: "Milan",
      toICAO: "LIML (LIN)",
      price: "€6,000",
      operator: "AEROPARTNER",
      image: "/jet1.jpg", // Replace with your actual assets
      interior: "/interior1.jpg"
    },
    // Add more objects for CJ3, CJ2, etc.
  ];

  return (
    <section className="bg-black text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-light mb-2">
            <span className="bg-[#41b3b5]/20 px-1 border-l-4 border-[#41b3b5]">
              Recently Offered on our Marketplace
            </span>
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl">
            Discover unparalleled access to leading operators across EMEA and beyond. 
            Our extensive global network brings every charterable jet directly to you.
          </p>
        </div>

        {/* Card Grid */}
        <div className="relative flex items-center group">
          <button className="absolute -left-4 z-10 p-2 bg-black/50 hover:text-[#41b3b5]">
            <ChevronLeft size={32} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {deals.map((deal, idx) => (
              <div key={idx} className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-[#41b3b5] transition-colors">
                {/* Images */}
                <div className="grid grid-cols-2 gap-1 p-3">
                  <img src={deal.image} alt="Exterior" className="rounded h-24 w-full object-cover" />
                  <img src={deal.interior} alt="Interior" className="rounded h-24 w-full object-cover" />
                </div>

                {/* Info */}
                <div className="px-4 pb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">{deal.jet}</h3>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Users size={14} className="mr-1" /> {deal.capacity} Passengers
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex justify-between items-center text-xs mb-6">
                    <div className="text-left">
                      <p className="text-[#41b3b5] font-mono">{deal.fromICAO}</p>
                      <p className="text-gray-500">{deal.fromCity}</p>
                    </div>
                    <Plane size={16} className="text-[#41b3b5] rotate-90" />
                    <div className="text-right">
                      <p className="text-[#41b3b5] font-mono">{deal.toICAO}</p>
                      <p className="text-gray-500">{deal.toCity}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-end border-t border-gray-800 pt-4">
                    <div className="text-[10px] text-gray-500">
                      OPERATED BY
                      <p className="text-white text-xs font-bold uppercase">{deal.operator}</p>
                    </div>
                    <div className="text-xl font-semibold">{deal.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="absolute -right-4 z-10 p-2 bg-black/50 hover:text-[#41b3b5]">
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;