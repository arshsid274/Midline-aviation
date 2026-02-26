import Image from "next/image";
import Link from "next/link";
import { playfairDisplay } from "@/lib/fonts";

export default function ContactLegacyStorySection() {
  return (
    <section className="bg-white py-2 sm:py-4">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_27rem] lg:gap-6">
        <div className="max-w-[34rem] pt-2 lg:pt-4">
          <p className="inline-flex items-center gap-2 text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-[#b1914b]">
            <span aria-hidden className="h-px w-8 bg-[#c8a85d]" />
            Our History
          </p>

          <h2
            className={`${playfairDisplay.className} mt-3 text-[2rem] font-medium leading-[1.06] tracking-[-0.025em] text-[#1f2f67] sm:text-[2.25rem]`}
          >
            A Legacy of <span className="italic font-medium">Timeless</span> Luxury
          </h2>

          <p className="mt-5 max-w-[31rem] text-[0.71rem] leading-[1.7] text-[#0d1451]/70 sm:text-[0.73rem]">
            Founded in 1985, Midline Aviation began with a singular commitment: delivering private aviation with
            uncompromising standards of safety, service, and discretion.
          </p>
          <p className="mt-3 max-w-[31rem] text-[0.71rem] leading-[1.7] text-[#0d1451]/70 sm:text-[0.73rem]">
            Today, our legacy spans charter, management, and mission-critical support worldwide. Every journey reflects
            the same principle that shaped our beginnings, seamless excellence at every altitude.
          </p>

          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 text-[0.52rem] font-semibold uppercase tracking-[0.19em] text-[#1f3f91] transition-colors hover:text-[#0d1451]"
          >
            Read Our Full Story
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <figure className="relative mx-auto w-full max-w-[27rem] overflow-hidden rounded-xl border border-[#12235d]/14 shadow-[0_14px_28px_rgba(13,20,81,0.18)]">
          <Image
            src="/assets/images/contact/contact-hero.jpg"
            alt="Private jet cabin interior"
            width={1050}
            height={1400}
            sizes="(max-width: 1024px) 100vw, 376px"
            className="h-auto w-full object-cover grayscale brightness-[0.58] contrast-[1.16]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/62 via-black/18 to-black/30" />
          <figcaption className="absolute bottom-3 left-3 text-[0.56rem] font-medium tracking-[0.08em] text-white/92">
            Est. 1985
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
