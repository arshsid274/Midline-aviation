"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Plane, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const TICKETS = [
  {
    id: "762151",
    from: "Argentina",
    fromShort: "ARG",
    to: "Bolivia",
    toShort: "BOL",
    timeStart: "06:00",
    timeEnd: "14:00",
    flight: "BK165",
    gate: "A11",
    seat: "21C",
  },
  {
    id: "882190",
    from: "France",
    fromShort: "FRA",
    to: "Monaco",
    toShort: "MCO",
    timeStart: "09:00",
    timeEnd: "10:15",
    flight: "JT992",
    gate: "C02",
    seat: "01A",
  },
  {
    id: "112044",
    from: "United Kingdom",
    fromShort: "GBR",
    to: "Switzerland",
    toShort: "CHE",
    timeStart: "12:30",
    timeEnd: "15:45",
    flight: "LX441",
    gate: "B19",
    seat: "04D",
  },
  {
    id: "554012",
    from: "Italy",
    fromShort: "ITA",
    to: "Spain",
    toShort: "ESP",
    timeStart: "18:00",
    timeEnd: "20:30",
    flight: "IB321",
    gate: "D05",
    seat: "12F",
  },
];

export default function TicketCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  return (
    <section className="overflow-hidden bg-zinc-950 px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="inline-block border-l-4 border-teal-500 bg-teal-950/50 px-3 py-1 text-xs font-mono uppercase tracking-widest text-teal-400">
              Live Marketplace
            </div>
            <h2 className="text-2xl font-light text-white sm:text-3xl">
              Recent <span className="font-bold">Bookings</span>
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              aria-label="Previous ticket"
              onClick={() => emblaApi?.scrollPrev()}
              className="rounded-full border border-zinc-800 bg-zinc-900/50 p-2.5 text-zinc-500 transition-all hover:border-teal-400 hover:text-teal-400 sm:p-3"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="Next ticket"
              onClick={() => emblaApi?.scrollNext()}
              className="rounded-full border border-zinc-800 bg-zinc-900/50 p-2.5 text-zinc-500 transition-all hover:border-teal-400 hover:text-teal-400 sm:p-3"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="cursor-grab overflow-visible active:cursor-grabbing" ref={emblaRef}>
          <div className="-ml-3 flex sm:-ml-4">
            {TICKETS.map((ticket) => (
              <div
                key={ticket.id}
                className="perspective-1000 flex-[0_0_100%] pl-3 sm:flex-[0_0_50%] sm:pl-4 lg:flex-[0_0_33.33%]"
              >
                <div className="group relative flex h-[172px] w-full max-w-[360px] overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-x-6 sm:h-[180px]">
                  <div className="flex w-12 flex-shrink-0 flex-col items-center justify-around border-r border-dashed border-zinc-200 bg-white py-4 opacity-80 sm:w-14">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className={`w-8 bg-black ${i % 3 === 0 ? "h-[4px]" : "h-[1px]"}`} />
                    ))}
                  </div>

                  <div className="absolute left-[44px] top-[-8px] z-20 h-4 w-4 rounded-full bg-zinc-950 sm:left-[52px]" />
                  <div className="absolute bottom-[-8px] left-[44px] z-20 h-4 w-4 rounded-full bg-zinc-950 sm:left-[52px]" />

                  <div className="relative flex flex-1 flex-col justify-between p-3.5 sm:p-4">
                    <div className="pointer-events-none absolute inset-0 -translate-x-40 -rotate-12 bg-gradient-to-r from-transparent via-white/80 to-transparent group-hover:animate-sweep" />

                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-[10px] font-medium uppercase text-zinc-400">{ticket.from}</p>
                        <p className="text-xl font-black leading-none text-zinc-900">{ticket.fromShort}</p>
                        <p className="mt-1 text-[10px] text-zinc-500">Dep {ticket.timeStart}</p>
                      </div>

                      <ArrowRight size={18} className="text-teal-500" />

                      <div className="text-right">
                        <p className="text-[10px] font-medium uppercase text-zinc-400">{ticket.to}</p>
                        <p className="text-xl font-black leading-none text-zinc-900">{ticket.toShort}</p>
                        <p className="mt-1 text-[10px] text-zinc-500">{ticket.timeEnd}</p>
                      </div>
                    </div>

                    <div className="my-2 border-t border-zinc-100" />

                    <div className="grid grid-cols-2 gap-y-2">
                      <div>
                        <p className="text-[9px] uppercase text-zinc-400">Flight ID</p>
                        <p className="text-xs font-bold text-zinc-800">{ticket.id}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase text-zinc-400">Flight</p>
                        <p className="text-xs font-bold text-zinc-800">{ticket.flight}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase text-zinc-400">Gate</p>
                        <p className="text-xs font-bold text-zinc-800">{ticket.gate}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase text-zinc-400">Seat</p>
                        <p className="text-xs font-bold text-zinc-800">{ticket.seat}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-11 flex-col items-center justify-between bg-teal-500 py-5 text-white transition-colors duration-700 group-hover:bg-orange-500 sm:w-14 sm:py-6">
                    <Plane size={22} className="rotate-90" />
                    <span className="rotate-90 text-[8px] font-bold tracking-tighter opacity-50">JETCLASS</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes sweep {
          0% {
            transform: translateX(-150%) rotate(-12deg);
          }
          100% {
            transform: translateX(300%) rotate(-12deg);
          }
        }
        .animate-sweep {
          animation: sweep 1.6s ease-in-out forwards;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
