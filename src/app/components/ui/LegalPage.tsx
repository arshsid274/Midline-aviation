import type { ReactNode } from "react";

/**
 * Shared shell for legal pages (Privacy / Terms / Cookies).
 * Content styling is handled here so the three documents stay consistent.
 */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="midline-page bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#0a6ea4]">
          Midline Aviation
        </p>
        <h1 className="font-display mt-3 text-3xl font-medium tracking-[-0.02em] text-[#111a5a] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-[#111a5a]/60">Last updated: {updated}</p>

        <div className="mt-10 space-y-8 text-[0.95rem] leading-relaxed text-[#1f2937] [&_a]:font-semibold [&_a]:text-[#0a6ea4] [&_h2]:font-display [&_h2]:mt-2 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-[#111a5a] [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#111a5a] [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_table]:w-full [&_table]:text-sm [&_td]:border-b [&_td]:border-[#111a5a]/10 [&_td]:px-3 [&_td]:py-2 [&_th]:border-b [&_th]:border-[#111a5a]/20 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-[#111a5a]">
          {children}
        </div>
      </div>
    </main>
  );
}
