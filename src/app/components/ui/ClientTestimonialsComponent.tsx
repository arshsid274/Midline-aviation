interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
  align: "left" | "right";
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Midline Aviation did not just fly us to London; they managed every detail of our executive summit logistics with precision.",
    author: "Arthur Kensington",
    role: "CEO, Global Tech Holdings",
    image: "/assets/images/charter/charter-corporate-travel.png",
    align: "left",
  },
  {
    quote:
      "From the moment we arrived at the private terminal, our vacation began. The crew treated our family like royalty.",
    author: "Isabella Rossi",
    role: "Luxury Travel Influencer",
    image: "/assets/images/charter/charter-leisure-journeys.png",
    align: "right",
  },
  {
    quote:
      "Our anniversary was unforgettable. Midline created a bespoke itinerary and personalized cabin details that surprised us both.",
    author: "The Henderson Family",
    role: "Private Wealth Clients",
    image: "/assets/images/charter/charter-special-occasions.png",
    align: "left",
  },
];

export default function ClientTestimonialsComponent() {
  return (
    <section className="space-y-2 py-24">
      <div className="mx-auto mb-16 w-full max-w-7xl px-6 text-center lg:px-10">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#00bcff]">Client Testimonials</h3>
        <h2 className="text-4xl font-bold text-[#111a5a] md:text-5xl">Stories &amp; Experiences</h2>
      </div>

      {testimonials.map((testimonial, index) => {
        const isRight = testimonial.align === "right";

        return (
          <article key={`${testimonial.author}-${index}`} className="relative flex h-[560px] items-center overflow-hidden md:h-[680px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${testimonial.image}")` }}
            />
            <div
              className={`absolute inset-0 ${
                isRight
                  ? "bg-gradient-to-l from-black/82 via-black/58 to-transparent"
                  : "bg-gradient-to-r from-black/82 via-black/58 to-transparent"
              }`}
            />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
              <div className={`max-w-2xl space-y-6 ${isRight ? "ml-auto text-right" : ""}`}>
                <div className={`text-6xl text-[#00bcff] ${isRight ? "flex justify-end" : ""}`} aria-hidden>
                  &ldquo;
                </div>
                <p className="text-3xl font-light italic leading-tight text-white md:text-4xl">{testimonial.quote}</p>
                <div className="border-t border-white/20 pt-6">
                  <h4 className="text-xl font-bold text-[#00bcff]">{testimonial.author}</h4>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-300">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
