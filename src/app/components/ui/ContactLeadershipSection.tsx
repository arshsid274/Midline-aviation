import Image from "next/image";
import { playfairDisplay } from "@/lib/fonts";

interface LeadershipMember {
  name: string;
  title: string;
  bio: string;
  imageSrc: string;
  objectPosition: string;
}

const leadershipMembers: LeadershipMember[] = [
  {
    name: "James Sterling",
    title: "Chief Executive Officer",
    bio: "With over 20 years in global air transport, James leads Midline with a focus on operational clarity and exceptional client experience.",
    imageSrc: "/assets/images/contact/james-sterling.jpg", // TODO: replace with James Sterling's actual portrait image
    objectPosition: "center 20%",
  },
  {
    name: "Eleanor Vance",
    title: "Head of Partnerships",
    bio: "A finance and commercial strategy lead, Eleanor ensures that every collaboration advances mission-ready aviation and long-term growth.",
    imageSrc: "/assets/images/contact/eleanor-vance.jpg", // TODO: replace with Eleanor Vance's actual portrait image
    objectPosition: "center 20%",
  },
  {
    name: "Arthur Morgan",
    title: "Director of Flight Operations",
    bio: "Arthur brings leadership from elite flight teams to elevate our scheduling, safety oversight, and precision-driven service delivery.",
    imageSrc: "/assets/images/contact/arthur-morgan.jpg", // TODO: replace with Arthur Morgan's actual portrait image
    objectPosition: "center 20%",
  },
];

export default function ContactLeadershipSection() {
  return (
    <section className="mt-12 bg-white pb-2 pt-5 sm:mt-14 sm:pt-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="inline-flex items-center gap-2 text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-[#b1914b]">
          <span aria-hidden className="h-px w-8 bg-[#c8a85d]" />
          Our Leadership
          <span aria-hidden className="h-px w-8 bg-[#c8a85d]" />
        </p>
        <h2 className={`${playfairDisplay.className} mt-3 text-[2rem] font-medium tracking-[-0.025em] text-[#1f2f67] sm:text-[2.2rem]`}>
          The Minds Behind the Excellence
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-[0.7rem] leading-[1.7] text-[#111a5a]/60 sm:text-[0.72rem]">
          Guiding Midline Aviation with decades of experience and a shared commitment to precision.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {leadershipMembers.map((member) => (
          <article
            key={member.name}
            className="rounded-lg border border-[#12235d]/14 bg-white p-2 shadow-[0_8px_20px_rgba(17,26,90,0.08)]"
          >
            <div className="relative aspect-[5/6] overflow-hidden rounded-md bg-[#0f1f4f]">
              <Image
                src={member.imageSrc}
                alt={`${member.name} portrait`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 31vw"
                className="object-cover"
                style={{ objectPosition: member.objectPosition }}
              />
            </div>

            <div className="px-1 pb-2 pt-3 text-center">
              <h3 className="text-[0.9rem] font-medium tracking-[-0.01em] text-[#253970]">{member.name}</h3>
              <p className="mt-1 text-[0.53rem] font-semibold uppercase tracking-[0.18em] text-[#b1914b]">{member.title}</p>
              <p className="mt-2 text-[0.64rem] leading-[1.65] text-[#111a5a]/68">{member.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
