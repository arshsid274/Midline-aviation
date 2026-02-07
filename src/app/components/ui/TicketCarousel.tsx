"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Plane, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const TICKETS = [
  { id: "762151", from: "Argentina", fromShort: "ARG", to: "Bolivia", toShort: "BOL", timeStart: "06:00", timeEnd: "14:00", flight: "BK165", gate: "A11", seat: "21C" },
  { id: "882190", from: "France", fromShort: "FRA", to: "Monaco", toShort: "MCO", timeStart: "09:00", timeEnd: "10:15", flight: "JT992", gate: "C02", seat: "01A" },
  { id: "112044", from: "United Kingdom", fromShort: "GBR", to: "Switzerland", toShort: "CHE", timeStart: "12:30", timeEnd: "15:45", flight: "LX441", gate: "B19", seat: "04D" },
  { id: "554012", from: "Italy", fromShort: "ITA", to: "Spain", toShort: "ESP", timeStart: "18:00", timeEnd: "20:30", flight: "IB321", gate: "D05", seat: "12F" },
];

export default function TicketCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 4000, stopOnInteraction: false })
  ]);

  return (
    <section className="bg-zinc-950 py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <div className="inline-block bg-teal-950/50 border-l-4 border-teal-500 px-3 py-1 text-teal-400 text-xs font-mono tracking-widest uppercase">
              Live Marketplace
            </div>
            <h2 className="text-3xl text-white font-light">Recent <span className="font-bold">Bookings</span></h2>
          </div>
          <div className="flex gap-3">
            <button onClick={() => emblaApi?.scrollPrev()} className="p-3 border border-zinc-800 text-zinc-500 hover:text-teal-400 hover:border-teal-400 transition-all rounded-full bg-zinc-900/50">
              <ChevronLeft size={20}/>
            </button>
            <button onClick={() => emblaApi?.scrollNext()} className="p-3 border border-zinc-800 text-zinc-500 hover:text-teal-400 hover:border-teal-400 transition-all rounded-full bg-zinc-900/50">
              <ChevronRight size={20}/>
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-visible cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-4">
            {TICKETS.map((t) => (
              <div key={t.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 perspective-1000">
                
                {/* The Ticket Card */}
                <div className="group relative h-[180px] w-full max-w-[360px] flex bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:rotate-x-6 shadow-2xl animate-sway">
                  
                  {/* Left Barcode Area */}
                  <div className="w-14 flex-shrink-0 bg-white border-r border-dashed border-zinc-200 flex flex-col items-center justify-around py-4 opacity-80">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className={`w-8 h-[2px] bg-black ${i % 3 === 0 ? 'h-[4px]' : 'h-[1px]'}`} />
                    ))}
                  </div>

                  {/* Punch Holes (Visual Decoration) */}
                  <div className="absolute left-[52px] top-[-8px] w-4 h-4 rounded-full bg-zinc-950 z-20"></div>
                  <div className="absolute left-[52px] bottom-[-8px] w-4 h-4 rounded-full bg-zinc-950 z-20"></div>

                  {/* Main Content Area */}
                  <div className="flex-1 flex flex-col justify-between p-4 relative group">
                    
                    {/* Light Sweep Effect (Tailwind Animation) */}
                    <div className="absolute inset-0 w-20 bg-gradient-to-r from-transparent via-white/80 to-transparent -rotate-12 -translate-x-40 group-hover:animate-sweep pointer-events-none"></div>

                    {/* Destination Row */}
                    <div className="flex justify-between items-center">
                      <div className="text-left">
                        <p className="text-[10px] uppercase text-zinc-400 font-medium">{t.from}</p>
                        <p className="text-xl font-black text-zinc-900 leading-none">{t.fromShort}</p>
                        <p className="text-[10px] text-zinc-500 mt-1">🕒 {t.timeStart}</p>
                      </div>
                      <ArrowRight size={18} className="text-teal-500" />
                      <div className="text-right">
                        <p className="text-[10px] uppercase text-zinc-400 font-medium">{t.to}</p>
                        <p className="text-xl font-black text-zinc-900 leading-none">{t.toShort}</p>
                        <p className="text-[10px] text-zinc-500 mt-1">{t.timeEnd}</p>
                      </div>
                    </div>

                    <div className="border-t border-zinc-100 my-2"></div>

                    {/* Flight Data Grid */}
                    <div className="grid grid-cols-2 gap-y-2">
                      <div>
                        <p className="text-[9px] uppercase text-zinc-400">Flight ID</p>
                        <p className="text-xs font-bold text-zinc-800">{t.id}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase text-zinc-400">Flight</p>
                        <p className="text-xs font-bold text-zinc-800">{t.flight}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase text-zinc-400">Gate</p>
                        <p className="text-xs font-bold text-zinc-800">{t.gate}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase text-zinc-400">Seat</p>
                        <p className="text-xs font-bold text-zinc-800">{t.seat}</p>
                      </div>
                    </div>
                  </div>

                  {/* Colorful Right Tab */}
                  <div className="w-14 bg-teal-500 flex flex-col items-center justify-between py-6 text-white group-hover:bg-orange-500 transition-colors duration-700">
                    <Plane size={24} className="rotate-90" />
                    <span className="text-[8px] font-bold rotate-90 tracking-tighter opacity-50">JETCLASS</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Required Tailwind Custom Animations */}
      <style jsx global>{`
        @keyframes sway {
          0%, 100% { transform: rotateY(0deg); }
          25% { transform: rotateY(-6deg) translateX(-5px); }
          75% { transform: rotateY(6deg) translateX(5px); }
        }
        @keyframes sweep {
          0% { transform: translateX(-150%) rotate(-12deg); }
          100% { transform: translateX(300%) rotate(-12deg); }
        }
        .animate-sway { animation: sway 8s ease-in-out infinite; }
        .animate-sweep { animation: sweep 2s ease-in-out forwards; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
}