import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ChevronDown, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { playfairDisplay } from "@/lib/fonts";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Midline Aviation",
  description:
    "Contact Midline Aviation customer service in Dubai for charter, management, sales, MRO, and cargo transportation support.",
  path: "/contact",
  keywords: ["contact midline aviation", "dubai aviation office", "private charter support"],
});

export default function ContactPage() {
  return (
    <main className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden md:min-h-[calc(100svh-84px)]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/assets/videos/contact.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/22" />
      <div className="absolute inset-0 bg-gradient-to-l from-black/72 via-black/40 to-black/18" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-7xl px-4 py-8 sm:px-6 md:min-h-[calc(100svh-84px)] md:py-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:px-8">
        <section className="flex flex-col justify-center text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#c5a059]">Midline Aviation</p>
          <h1 className={`${playfairDisplay.className} mt-4 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl`}>
            Let&apos;s Plan Your Next Journey
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/78 sm:text-base">
            Connect with our concierge team for private charter, aircraft management, and bespoke aviation support
            tailored to your itinerary.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-white/16 bg-white/6 px-4 py-3 backdrop-blur-xl">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c5a059]" />
              <p className="text-sm text-white/86">Office 213, Building A5, Business Park, Dubai South, UAE</p>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/16 bg-white/6 px-4 py-3 backdrop-blur-xl">
              <Mail className="h-4 w-4 shrink-0 text-[#c5a059]" />
              <a className="text-sm text-white/86 transition-colors hover:text-white" href="mailto:info@midlineaviation.com">
                info@midlineaviation.com
              </a>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/16 bg-white/6 px-4 py-3 backdrop-blur-xl">
              <Phone className="h-4 w-4 shrink-0 text-[#c5a059]" />
              <a className="text-sm text-white/86 transition-colors hover:text-white" href="tel:+97145533430">
                +971 455 334 30
              </a>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/16 bg-white/6 px-4 py-3 backdrop-blur-xl">
              <Clock3 className="h-4 w-4 shrink-0 text-[#c5a059]" />
              <p className="text-sm text-white/86">24/7 Client Support and Flight Coordination</p>
            </div>
          </div>
        </section>

        <section className="mt-8 flex items-center lg:mt-0">
          <div className="w-full rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_18px_46px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
            <div className="mb-8 text-center">
              <h2 className={`${playfairDisplay.className} text-3xl font-semibold text-white sm:text-4xl`}>
                Inquire About Your Journey
              </h2>
              <p className="mt-2 text-sm text-white/65">Confidential inquiry for private aviation services.</p>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="ml-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/28 backdrop-blur-xl focus:border-[#c5a059]/60 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="ml-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/28 backdrop-blur-xl focus:border-[#c5a059]/60 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="ml-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/28 backdrop-blur-xl focus:border-[#c5a059]/60 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="ml-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55" htmlFor="aircraftType">
                    Preferred Aircraft Type
                  </label>
                  <div className="relative">
                    <select
                      id="aircraftType"
                      name="aircraftType"
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-white/12 bg-white/6 px-4 py-3 pr-11 text-sm text-white backdrop-blur-xl focus:border-[#c5a059]/60 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40"
                    >
                      <option value="" disabled className="bg-[#101420]">
                        Select Preferred Aircraft Type
                      </option>
                      <option value="light-jet" className="bg-[#101420]">
                        Light Jet
                      </option>
                      <option value="mid-size-jet" className="bg-[#101420]">
                        Mid-Size Jet
                      </option>
                      <option value="super-mid-size-jet" className="bg-[#101420]">
                        Super Mid-Size Jet
                      </option>
                      <option value="heavy-jet" className="bg-[#101420]">
                        Heavy Jet
                      </option>
                      <option value="ultra-long-range" className="bg-[#101420]">
                        Ultra-Long Range
                      </option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c5a059]" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="ml-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55" htmlFor="destination">
                    Destination
                  </label>
                  <input
                    id="destination"
                    name="destination"
                    type="text"
                    placeholder="E.g. London, Teterboro..."
                    className="w-full rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/28 backdrop-blur-xl focus:border-[#c5a059]/60 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="ml-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55" htmlFor="departureDate">
                    Desired Departure Date
                  </label>
                  <input
                    id="departureDate"
                    name="departureDate"
                    type="date"
                    className="w-full rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white backdrop-blur-xl [color-scheme:dark] focus:border-[#c5a059]/60 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="ml-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55" htmlFor="passengers">
                  Number of Passengers
                </label>
                <div className="relative">
                  <select
                    id="passengers"
                    name="passengers"
                    defaultValue="1-4"
                    className="w-full appearance-none rounded-xl border border-white/12 bg-white/6 px-4 py-3 pr-11 text-sm text-white backdrop-blur-xl focus:border-[#c5a059]/60 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40"
                  >
                    <option value="1-4" className="bg-[#101420]">
                      1-4 Passengers
                    </option>
                    <option value="5-8" className="bg-[#101420]">
                      5-8 Passengers
                    </option>
                    <option value="9-14" className="bg-[#101420]">
                      9-14 Passengers
                    </option>
                    <option value="15+" className="bg-[#101420]">
                      15+ Passengers
                    </option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c5a059]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="ml-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55" htmlFor="message">
                  Additional Notes
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us your route, timing, and service preferences..."
                  className="w-full resize-none rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/28 backdrop-blur-xl focus:border-[#c5a059]/60 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#1A2151] py-4 shadow-[0_12px_28px_rgba(26,33,81,0.45)] transition-colors hover:bg-[#2D3775]"
                >
                  <span className="absolute left-0 top-0 h-full w-1 -translate-x-full bg-[#c5a059]/90 transition-transform duration-300 group-hover:translate-x-0" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Submit Inquiry</span>
                </button>
                <p className="mt-5 text-center text-[10px] uppercase tracking-[0.16em] text-white/34">
                  Confidential &amp; Secure Inquiry Process
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
