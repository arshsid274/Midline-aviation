import Image from "next/image";
import Link from "next/link";
import { playfairDisplay } from "@/lib/fonts";

const sustainabilityPoints = [
  "Carbon-neutral flight operations roadmap",
  "Next-gen SAF adoption partnerships",
];

export default function ContactSustainabilityInnovationSection() {
  return (
    <section className="mt-12 bg-white pb-2 pt-5 sm:mt-14 sm:pt-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="inline-flex items-center gap-2 text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-[#b1914b]">
          <span aria-hidden className="h-px w-8 bg-[#c8a85d]" />
          Future Forward
          <span aria-hidden className="h-px w-8 bg-[#c8a85d]" />
        </p>
        <h2 className={`${playfairDisplay.className} mt-3 text-[2rem] font-medium tracking-[-0.025em] text-[#1f2f67] sm:text-[2.2rem]`}>
          Sustainability &amp; Innovation
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-[0.7rem] leading-[1.7] text-[#111a5a]/60 sm:text-[0.72rem]">
          Pioneering a cleaner sky with next-generation technology and our conscious commitments.
        </p>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-lg border border-[#12235d]/15 shadow-[0_10px_24px_rgba(17,26,90,0.16)] sm:mt-7">
        <div className="relative aspect-[16/7.6] min-h-[245px] sm:min-h-[310px]">
          <Image
            src="/assets/images/charter/charter-runway-jet.png"
            alt="Private jet with a clear blue sky"
            fill
            sizes="(max-width: 1024px) 100vw, 85vw"
            className="object-cover object-[center_62%]"
          />

          <article className="absolute left-4 right-4 top-4 z-10 rounded-md border border-white/28 bg-[#192f67]/54 p-4 text-white shadow-[0_14px_30px_rgba(17,26,90,0.24)] backdrop-blur-xl sm:left-10 sm:right-auto sm:top-8 sm:max-w-[20.5rem] sm:p-5">
            <h3 className="text-lg font-medium tracking-tight text-white">Eco-Conscious Travel</h3>
            <p className="mt-2 text-[0.66rem] leading-[1.65] text-white/86">
              We are committed to reducing our environmental footprint through disciplined Carbon Offsetting and
              measured adoption of Sustainable Aviation Fuel (SAF).
            </p>
            <ul className="mt-3 space-y-1.5">
              {sustainabilityPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-[0.58rem] leading-[1.6] uppercase tracking-[0.04em] text-white/88">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px] bg-[#f2be2e]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-2 text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:text-[#ffdf8a]"
            >
              Learn About Our Green Initiative
              <span aria-hidden>&rarr;</span>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
