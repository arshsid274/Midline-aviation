import Image from "next/image";
import type { Jet } from "@/lib/fleet";
import Reveal from "@/app/components/motion/Reveal";
import SplitHeading from "@/app/components/motion/SplitHeading";
import Parallax from "@/app/components/motion/Parallax";
import JetGalleryLightbox from "./JetGalleryLightbox";

const spanClasses = (span?: "wide" | "tall" | "standard") => {
  if (span === "wide") return "sm:col-span-2";
  if (span === "tall") return "row-span-2";
  return "";
};

export default function JetEditorialGallery({ jet }: { jet: Jet }) {
  return (
    <section aria-label={`${jet.name} gallery`} className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl sm:mb-12">
          <Reveal as="p" variant="fade-up" className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#111a5a]/64">
            On Board {jet.tail}
          </Reveal>
          <SplitHeading
            as="h2"
            className="font-display mt-3 text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-[#111a5a] sm:text-4xl lg:text-[2.8rem]"
          >
            Every detail, photographed as flown
          </SplitHeading>
          {jet.description.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 24)} as="p" variant="fade-up" className="mt-4 max-w-2xl text-base leading-relaxed text-[#111a5a]/72">
              {paragraph}
            </Reveal>
          ))}
        </div>

        <div className="grid auto-rows-[210px] grid-cols-2 gap-4 sm:auto-rows-[250px] lg:grid-cols-4">
          {jet.gallery.map((image) => (
            <Reveal
              key={image.src}
              as="div"
              variant="clip-wipe"
              duration={0.85}
              className={`group relative overflow-hidden rounded-2xl ${spanClasses(image.span)}`}
            >
              <a
                href={image.src}
                className="glightbox-jet absolute inset-0 block"
                data-gallery={`jet-${jet.slug}`}
                data-description={image.alt}
                data-type="image"
                aria-label={`View larger: ${image.alt}`}
              >
                <Parallax amount={26} className="absolute inset-0">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </Parallax>
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111a5a]/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      <JetGalleryLightbox />
    </section>
  );
}
