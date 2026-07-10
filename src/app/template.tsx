/**
 * Remounts on every navigation, replaying the .page-enter fade (CSS-only,
 * opacity-only — see globals.css for why a transform is deliberately avoided:
 * it would re-anchor the home loader's fixed overlay and the hero's sticky
 * canvas). Navbar/footer live in layout.tsx outside this boundary and never
 * re-animate. No JS ships for this.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
