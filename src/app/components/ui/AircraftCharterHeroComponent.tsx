import Link from "next/link";

export default function AircraftCharterHeroComponent() {
  return (
    <section className="relative flex min-h-[88svh] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/assets/images/charter/charter-hero-cabin.png")',
        }}
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
        <span className="mb-6 inline-block rounded-full border border-[#00bcff]/45 bg-[#00bcff]/12 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#00bcff] backdrop-blur-md">
          Premium Charter Experience
        </span>
        <h1 className="mb-6 text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">Aircraft Charter</h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-slate-200/90 md:text-2xl">
          We value your time and redefine the quality of travel with bespoke aviation solutions.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/fleet" className="midline-btn-primary w-full rounded-xl px-10 py-4 text-center text-sm sm:w-auto">
            Explore Our Fleet
          </Link>
          <Link href="/contact" className="midline-btn-secondary w-full rounded-xl px-10 py-4 text-center text-sm sm:w-auto">
            Virtual Tour
          </Link>
        </div>
      </div>
    </section>
  );
}
