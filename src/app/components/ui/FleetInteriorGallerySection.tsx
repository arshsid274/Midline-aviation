import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/app/components/motion/Reveal";

export default function FleetInteriorGallerySection() {
  return (
    <section className="mt-12 pb-12 sm:mt-14 sm:pb-14">
      <Reveal as="div" variant="fade-up" className="mb-6 flex items-end justify-between gap-3">
        <h2 className="font-display text-[2rem] font-bold tracking-tight text-slate-900 sm:text-[2.15rem]">
          Interior Gallery
        </h2>
        <Link
          href="/fleet"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#144bb8] transition-colors hover:text-[#0d3280]"
        >
          View Full Fleet Gallery
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>

      <Reveal
        as="div"
        variant="stagger"
        stagger={0.1}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[11.5rem_11.5rem]"
      >
        <article data-reveal-item className="group relative overflow-hidden rounded-xl md:col-span-2 lg:row-span-2">
          <Image
            src="/assets/images/aircraft/g200-cabin.webp"
            alt="Gulfstream G200 bespoke cabin interior with hand-stitched seating"
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/18 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-4 left-4 translate-y-2 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-lg font-bold">Gulfstream G200 · Cabin</p>
            <p className="text-xs text-slate-200">Bespoke, hand-finished interior</p>
          </div>
        </article>

        <article data-reveal-item className="group relative h-56 overflow-hidden rounded-xl md:h-[11.5rem]">
          <Image
            src="/assets/images/aircraft/g450-dining.webp"
            alt="In-flight fine dining aboard the Gulfstream G450"
            fill
            sizes="(max-width: 1024px) 50vw, 24vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/0" />
        </article>

        <article data-reveal-item className="group relative h-56 overflow-hidden rounded-xl md:h-[11.5rem]">
          <Image
            src="/assets/images/aircraft/g450-exterior.webp"
            alt="Gulfstream G450 on the tarmac at golden hour"
            fill
            sizes="(max-width: 1024px) 50vw, 24vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/0" />
        </article>

        <article data-reveal-item className="group relative h-56 overflow-hidden rounded-xl md:col-span-2 md:h-[11.5rem]">
          <Image
            src="/assets/images/aircraft/legacy650-exterior.webp"
            alt="Embraer Legacy 650 on the tarmac under a clear sky"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 rounded bg-white/90 px-2 py-1 text-xs font-bold text-slate-900 backdrop-blur-sm">
            Embraer Legacy 650
          </div>
        </article>
      </Reveal>
    </section>
  );
}
