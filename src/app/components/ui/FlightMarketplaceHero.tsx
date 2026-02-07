"use client";

import React, { useCallback, useState, useEffect, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Plane, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const WorldMap = dynamic(() => import('./WorldMap').then(mod => ({ default: mod.WorldMap })), {
  ssr: false,
  loading: () => <div className="w-full aspect-[2/1] bg-zinc-900 rounded-2xl animate-pulse" />
});

export const JET_DATA = [
  { id: 1, jet: "Embraer Legacy 650", capacity: 14, fromICAO: "DXB", toICAO: "JFK", fromCity: "Dubai", toCity: "New York", price: "€165,000", operator: "EXECUJET", lat1: 25.2532, lng1: 55.3657, lat2: 40.6413, lng2: -73.7781 },
  { id: 2, jet: "Gulfstream G450", capacity: 16, fromICAO: "DWC", toICAO: "LHR", fromCity: "Dubai", toCity: "London", price: "€145,000", operator: "JET AVIATION", lat1: 24.8964, lng1: 55.1614, lat2: 51.4700, lng2: -0.4543 },
  { id: 3, jet: "Cessna Citation CJ3", capacity: 7, fromICAO: "NCE", toICAO: "LBG", fromCity: "Nice", toCity: "Paris", price: "€8,500", operator: "VALAIR PRIVATE JETS", lat1: 43.6653, lng1: 7.2150, lat2: 48.9615, lng2: 2.4414 }
];

const FlightCard = React.memo(({ deal }: { deal: typeof JET_DATA[0] }) => (
  <article className="flex-[0_0_100%] min-w-0 px-4">
    <div className="bg-[#121212]/80 backdrop-blur-md rounded-2xl border border-white/10 p-1 group transition-all hover:border-[#41b3b5]/40 shadow-xl">
      <div className="flex gap-2 p-2">
        <div className="flex-1 h-36 bg-zinc-800 rounded-xl flex items-center justify-center text-[10px] text-zinc-500 uppercase tracking-widest font-bold border border-white/5">Exterior</div>
        <div className="flex-1 h-36 bg-zinc-800 rounded-xl flex items-center justify-center text-[10px] text-zinc-500 uppercase tracking-widest font-bold border border-white/5">Interior</div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-white font-semibold text-xl tracking-tight">{deal.jet}</h3>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Operated by {deal.operator}</p>
          </div>
          <div className="flex items-center bg-zinc-900 border border-white/5 px-2.5 py-1 rounded-lg text-zinc-400 text-[11px] font-bold">
            <Users size={12} className="mr-1.5 text-[#41b3b5]" /> 
            <span>{deal.capacity} PAX</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 relative">
          <div className="z-10 bg-[#121212] pr-3">
            <p className="text-[#41b3b5] font-mono text-xl font-bold leading-none">{deal.fromICAO}</p>
            <p className="text-zinc-500 text-[10px] mt-1 uppercase font-medium">{deal.fromCity}</p>
          </div>
          
          <div className="flex-1 flex items-center justify-center relative">
            <div className="w-full h-[1px] border-t border-dashed border-zinc-800"></div>
            <Plane size={16} className="text-[#41b3b5] absolute bg-[#121212] px-1" />
          </div>
          
          <div className="z-10 bg-[#121212] pl-3 text-right">
            <p className="text-[#41b3b5] font-mono text-xl font-bold leading-none">{deal.toICAO}</p>
            <p className="text-zinc-500 text-[10px] mt-1 uppercase font-medium">{deal.toCity}</p>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-white/5 pt-4">
          <button className="text-[10px] font-bold text-[#41b3b5] uppercase tracking-widest border border-[#41b3b5]/20 px-3 py-1.5 rounded-md hover:bg-[#41b3b5]/10 transition-colors">Details</button>
          <div className="text-right">
            <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-tighter">Est. Price</p>
            <p className="text-2xl text-white font-bold tracking-tighter">{deal.price}</p>
          </div>
        </div>
      </div>
    </div>
  </article>
));

export default function FlightMarketplaceHero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  const currentRoute = useMemo(() => [{
    start: { lat: JET_DATA[currentIndex].lat1, lng: JET_DATA[currentIndex].lng1 },
    end: { lat: JET_DATA[currentIndex].lat2, lng: JET_DATA[currentIndex].lng2 }
  }], [currentIndex]);

  return (
    <section className="bg-black py-20 px-6 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="inline-flex items-center gap-3 bg-[#163a3a]/40 border-l-4 border-[#41b3b5] px-5 py-2 rounded-r-lg">
             <span className="text-[#41b3b5] font-bold text-sm tracking-widest uppercase">Marketplace</span>
             <h2 className="text-white text-lg font-medium">Recently Offered</h2>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            {/* Nav Buttons */}
            <button onClick={scrollPrev} className="absolute -left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 text-white/50 hover:text-[#41b3b5] bg-zinc-900/90 backdrop-blur rounded-full border border-white/10 transition-all shadow-xl">
              <ChevronLeft size={20} />
            </button>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {JET_DATA.map((deal) => (
                  <FlightCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>

            <button onClick={scrollNext} className="absolute -right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 text-white/50 hover:text-[#41b3b5] bg-zinc-900/90 backdrop-blur rounded-full border border-white/10 transition-all shadow-xl">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="relative">
            <WorldMap key={currentIndex} dots={currentRoute} lineColor="#41b3b5" />
            {/* Visual Depth Decoration */}
            <div className="absolute -inset-4 bg-[#41b3b5]/5 blur-3xl rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}