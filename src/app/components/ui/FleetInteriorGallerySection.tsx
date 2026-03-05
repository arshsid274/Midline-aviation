import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { playfairDisplay } from "@/lib/fonts";

export default function FleetInteriorGallerySection() {
  return (
    <section className="mt-12 pb-12 sm:mt-14 sm:pb-14">
      <div className="mb-6 flex items-end justify-between gap-3">
        <h2 className={`${playfairDisplay.className} text-[2rem] font-bold tracking-tight text-slate-900 sm:text-[2.15rem]`}>
          Interior Gallery
        </h2>
        <Link
          href="/fleet"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#144bb8] transition-colors hover:text-[#0d3280]"
        >
          View Full Fleet Gallery
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[11.5rem_11.5rem]">
        <article className="group relative overflow-hidden rounded-xl md:col-span-2 lg:row-span-2">
          <Image
            src="/assets/images/Embrar_Legasy_Interior_Final.png"
            alt="Embraer Legacy 650 luxury cabin interior"
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/18 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-4 left-4 translate-y-2 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-lg font-bold">Legacy 650 Cabin</p>
            <p className="text-xs text-slate-200">Ultimate comfort for 13 passengers</p>
          </div>
        </article>

        <article className="group relative h-56 overflow-hidden rounded-xl md:h-[11.5rem]">
          <Image
            src="/assets/images/gallery/Embrara_Legasy_Exterior_Final.png"
            alt="Embraer Legacy 650 exterior"
            fill
            sizes="(max-width: 1024px) 50vw, 24vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/0" />
        </article>

        <article className="group relative h-56 overflow-hidden rounded-xl md:h-[11.5rem]">
          <Image
            src="/assets/images/gallery/g450_Exterior_Final.png"
            alt="Gulfstream G450 exterior"
            fill
            sizes="(max-width: 1024px) 50vw, 24vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/0" />
        </article>

        <article className="group relative h-56 overflow-hidden rounded-xl md:col-span-2 md:h-[11.5rem]">
          <Image
            src="/assets/images/gallery/g450_Exterior_Final.png"
            alt="Gulfstream G450 exterior view"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 rounded bg-white/90 px-2 py-1 text-xs font-bold text-slate-900 backdrop-blur-sm">
            Cockpit View
          </div>
        </article>
      </div>
    </section>
  );
}
