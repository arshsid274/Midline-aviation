import Image from "next/image";

export default function OurPhilosophyComponent() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#00bcff]">Our Philosophy</h3>
            <h2 className="text-4xl font-bold leading-tight text-[#111a5a]">
              The Art of Elegance &amp;
              <br />
              <span className="text-[#016291]">Unmatched Comfort</span>
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-[#111a5a]/72">
            Midline Aviation combines global flexibility with absolute privacy to provide a seamless travel experience
            tailored to your specific needs. Every flight is a masterpiece of precision and luxury.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#111a5a]">15+</span>
              <span className="text-sm text-[#111a5a]/62">Years Experience</span>
            </div>
            <div className="h-12 w-px bg-[linear-gradient(90deg,rgba(17,26,90,0.15)_0%,rgba(10,110,164,0.15)_100%)]" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#111a5a]">1200+</span>
              <span className="text-sm text-[#111a5a]/62">Global Destinations</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#111a5a]/14 bg-[#f5f8ff]">
            <Image
              src="/assets/images/charter/charter-runway-jet.png"
              alt="Private jet exterior on runway"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 max-w-xs rounded-xl border border-[#111a5a]/18 bg-white p-6 shadow-[0_10px_28px_rgba(17,26,90,0.13)]">
            <p className="text-sm italic text-[#111a5a]/82">
              &ldquo;Privacy is not a luxury, it is our foundational commitment to every client.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
