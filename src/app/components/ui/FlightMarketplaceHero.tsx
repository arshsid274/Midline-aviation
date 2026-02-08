"use client";

import React, { useCallback, useState, useEffect, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Plane, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const WorldMap = dynamic(() => import('./WorldMap').then(mod => ({ default: mod.WorldMap })), {
  ssr: false,
  loading: () => <div className="w-full h-[300px] bg-zinc-900 rounded-lg animate-pulse" />
});

export const JET_DATA = [
  { id: 1, jet: "Embraer Legacy 650", capacity: 14, fromICAO: "OMDB", toICAO: "KJFK", fromCity: "Dubai", toCity: "New York", price: "€165,000", operator: "EXECUJET", lat1: 25.2532, lng1: 55.3657, lat2: 40.6413, lng2: -73.7781 },
  { id: 2, jet: "Gulfstream G450", capacity: 16, fromICAO: "OMDW", toICAO: "EGLL", fromCity: "Dubai", toCity: "London", price: "€145,000", operator: "JET AVIATION", lat1: 24.8964, lng1: 55.1614, lat2: 51.4700, lng2: -0.4543 },
  { id: 3, jet: "Gulfstream G200", capacity: 10, fromICAO: "OMSJ", toICAO: "VIDP", fromCity: "Sharjah", toCity: "New Delhi", price: "€78,000", operator: "ABU DHABI AVIATION", lat1: 25.3286, lng1: 55.5172, lat2: 28.5562, lng2: 77.1000 },
  { id: 4, jet: "Bombardier Global 6000", capacity: 13, fromICAO: "OMDB", toICAO: "LSZH", fromCity: "Dubai", toCity: "Zurich", price: "€95,000", operator: "VISTA JET", lat1: 25.2532, lng1: 55.3657, lat2: 47.4582, lng2: 8.5555 },
  { id: 5, jet: "Dassault Falcon 7X", capacity: 12, fromICAO: "OMDB", toICAO: "LFPG", fromCity: "Dubai", toCity: "Paris", price: "€110,000", operator: "FALCON OPS", lat1: 25.2532, lng1: 55.3657, lat2: 49.0097, lng2: 2.5479 },
  { id: 6, jet: "Cessna Citation Latitude", capacity: 9, fromICAO: "OMDB", toICAO: "VABB", fromCity: "Dubai", toCity: "Mumbai", price: "€45,000", operator: "EMPIRE AVIATION", lat1: 25.2532, lng1: 55.3657, lat2: 19.0896, lng2: 72.8656 },
  { id: 7, jet: "Airbus ACJ319", capacity: 19, fromICAO: "OMDB", toICAO: "WSSS", fromCity: "Dubai", toCity: "Singapore", price: "€195,000", operator: "GLOBAL JET", lat1: 25.2532, lng1: 55.3657, lat2: 1.3644, lng2: 103.9915 },
  { id: 8, jet: "Learjet 75", capacity: 8, fromICAO: "OMDB", toICAO: "HECA", fromCity: "Dubai", toCity: "Cairo", price: "€38,000", operator: "EGYPTAIR", lat1: 25.2532, lng1: 55.3657, lat2: 30.1219, lng2: 31.4056 }
];

const FlightCard = React.memo(({ deal, isActive }: { deal: typeof JET_DATA[0], isActive: boolean }) => (
  <article className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-3 transition-all duration-1000">
    <div className={`
      bg-[#121212] rounded-xl transition-all duration-700 border-4
      ${isActive 
        ? 'border-[#41b3b5] shadow-[0_0_25px_rgba(65,179,181,0.2)] scale-105 z-10' 
        : 'border-transparent shadow-none scale-95 opacity-50 sm:opacity-80'}
    `}>
      <div className="flex gap-1 p-2">
        <div className="flex-1 h-24 bg-zinc-800/50 rounded-lg flex items-center justify-center text-[10px] text-zinc-500">Exterior</div>
        <div className="flex-1 h-24 bg-zinc-800/50 rounded-lg flex items-center justify-center text-[10px] text-zinc-500">Interior</div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-bold text-sm truncate">{deal.jet}</h3>
          <div className="flex items-center text-zinc-400 text-[10px] bg-zinc-800 px-2 py-0.5 rounded-full">
            <Users size={12} className="mr-1" /> 
            <span>{deal.capacity}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 relative">
          <div className="z-10 bg-[#121212] pr-2">
            <p className="text-[#41b3b5] font-mono text-xs font-bold">{deal.fromICAO}</p>
            <p className="text-zinc-500 text-[10px]">{deal.fromCity}</p>
          </div>
          <div className="absolute left-0 right-0 h-[1px] border-t border-dashed border-zinc-700 top-2 z-0"></div>
          <div className="z-10 bg-[#121212] px-2">
            <Plane size={14} className={`rotate-90 transition-colors duration-700 ${isActive ? 'text-[#41b3b5]' : 'text-zinc-700'}`} />
          </div>
          <div className="z-10 bg-[#121212] pl-2 text-right">
            <p className="text-[#41b3b5] font-mono text-xs font-bold">{deal.toICAO}</p>
            <p className="text-zinc-500 text-[10px]">{deal.toCity}</p>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-zinc-800 pt-4">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Operator</p>
            <p className="text-zinc-200 text-xs font-bold">{deal.operator}</p>
          </div>
          <span className="text-white text-lg font-bold">{deal.price}</span>
        </div>
      </div>
    </div>
  </article>
));

FlightCard.displayName = 'FlightCard';

export default function FlightMarketplaceHero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    containScroll: false, // Essential for seamless looping
    duration: 60
  }, [
    Autoplay({ delay: 6000, stopOnInteraction: false })
  ]);
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    // Maps the actual scroll position to the data array index
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const currentRoute = useMemo(() => [{
    start: { lat: JET_DATA[selectedIndex].lat1, lng: JET_DATA[selectedIndex].lng1 },
    end: { lat: JET_DATA[selectedIndex].lat2, lng: JET_DATA[selectedIndex].lng2 }
  }], [selectedIndex]);

  return (
    <section className="bg-[#111838] py-16 px-16 overflow-hidden">
      <div className="bg-white">
 <div className="max-w-[1600px] mx-auto my-20 py-20">
        <div className="w-full h-[300px] sm:h-[450px] rounded-2xl overflow-hidden border-2 border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] mb-12 ">
          <WorldMap 
            key={`map-route-${selectedIndex}`} 
            dots={currentRoute} 
          />
        </div>

        {/* <header className="mb-12 text-center">
          <h2 className="inline-block bg-[#163a3a] border-l-4 border-[#41b3b5] px-6 py-2 text-white text-lg sm:text-xl font-medium shadow-lg">
            Midline Airlines Marketplace
          </h2>
        </header> */}

        <div className="relative mb-16">
          <div className="overflow-hidden px-4" ref={emblaRef}>
            <div className="flex cursor-grab active:cursor-grabbing">
              {/* No duplication needed if JET_DATA.length > 3 and align is center */}
              {JET_DATA.map((deal, index) => (
                <FlightCard 
                  key={`${deal.id}-${index}`} 
                  deal={deal} 
                  isActive={index === selectedIndex} 
                />
              ))}
            </div>
          </div>

          <button onClick={() => emblaApi?.scrollPrev()} className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 text-zinc-400 hover:text-[#41b3b5] bg-white border border-zinc-200 rounded-full shadow-xl transition-all hover:scale-110">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => emblaApi?.scrollNext()} className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 text-zinc-400 hover:text-[#41b3b5] bg-white border border-zinc-200 rounded-full shadow-xl transition-all hover:scale-110">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      </div>
     
    </section>
  );
}