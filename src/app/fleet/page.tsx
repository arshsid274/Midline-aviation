export const dynamic = "force-static";

export const metadata = {
  title: "Our Fleet",
  description:
    "Explore our modern fleet of private jets designed for luxury and performance.",
};

export default function FleetPage() {
  return (
    <main className="py-24">
      <h1 className="text-4xl font-bold text-center">
        Our Fleet
      </h1>

      <p className="mt-6 text-center max-w-3xl mx-auto">
        Our fleet features state-of-the-art aircraft
        offering safety, comfort, and reliability.
      </p>
    </main>
  );
}
