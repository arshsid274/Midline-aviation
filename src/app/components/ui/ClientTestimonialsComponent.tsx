"use client";

import React from "react";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "Midline Aviation handled every detail of our executive summit logistics with precision. The crew anticipated every need before we even asked.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Arthur Kensington",
    role: "CEO, Global Tech Holdings",
  },
  {
    text: "From the moment we arrived at the private terminal, our vacation began. The crew treated our family like royalty the entire flight.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Isabella Rossi",
    role: "Luxury Travel Influencer",
  },
  {
    text: "Our anniversary was unforgettable. Midline created a bespoke itinerary with personalized cabin details that surprised us both completely.",
    image: "https://randomuser.me/api/portraits/men/58.jpg",
    name: "James Henderson",
    role: "Private Wealth Client",
  },
  {
    text: "The aircraft was immaculate, the routing optimal, and the ground handling flawless. Midline raised the bar for what private aviation can be.",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    name: "Sophie Laurent",
    role: "Managing Director, Apex Capital",
  },
  {
    text: "Chartering with Midline was seamless from the first call. Our team flew across three continents in 48 hours without a single hiccup.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Tariq Al-Rashid",
    role: "VP Operations, NovaTrade",
  },
  {
    text: "I've flown private for fifteen years. Midline's attention to detail and genuine warmth sets them apart from every other operator.",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    name: "Caroline West",
    role: "Film Producer",
  },
  {
    text: "We relocated our entire leadership team across the Gulf in one coordinated charter. Midline made an enormous logistical challenge feel effortless.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    name: "David Okafor",
    role: "COO, Sterling Ventures",
  },
  {
    text: "The cabin was configured exactly as requested, catering was exceptional, and the pilot kept us informed throughout. Perfect in every way.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Nadia Kowalski",
    role: "Event Director",
  },
  {
    text: "Midline's cargo team delivered our time-sensitive medical equipment overnight with zero damage. Their reliability is simply unmatched.",
    image: "https://randomuser.me/api/portraits/men/90.jpg",
    name: "Dr. Marcus Lee",
    role: "Chief Medical Officer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => (
  <div className={props.className}>
    <motion.div
      animate={{ translateY: "-50%" }}
      transition={{
        duration: props.duration ?? 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...Array(2)].map((_, index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(({ text, image, name, role }, i) => (
            <div
              key={i}
              className="w-full max-w-sm rounded-3xl border border-[#111a5a]/10 bg-white p-10 shadow-lg shadow-[#111a5a]/6"
            >
              <p className="text-base leading-relaxed text-[#111a5a]/80">{text}</p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  width={48}
                  height={48}
                  src={image}
                  alt={name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-base font-semibold leading-5 tracking-tight text-[#111a5a]">
                    {name}
                  </span>
                  <span className="mt-1 text-sm leading-5 tracking-tight text-[#111a5a]/55">
                    {role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export default function ClientTestimonialsComponent() {
  return (
    <section className="relative bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto mb-14 flex max-w-[540px] flex-col items-center text-center"
        >
          <div className="mb-4 inline-flex rounded-full border border-[#111a5a]/20 bg-[#111a5a]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#111a5a]">
            Client Testimonials
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#111a5a] sm:text-4xl md:text-5xl">
            Stories &amp; Experiences
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#111a5a]/60 sm:text-base">
            Hear directly from those who've experienced the Midline difference.
          </p>
        </motion.div>

        {/* Scrolling columns */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
