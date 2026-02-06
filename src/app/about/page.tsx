export const dynamic = "force-static";

export const metadata = {
  title: "About Us",
  description:
    "Learn about our aviation expertise, values, and commitment to excellence.",
};

export default function AboutPage() {
  return (
    <main className="py-24 text-center">
      <h1 className="text-4xl font-bold">About Us</h1>

      <p className="mt-6 max-w-2xl mx-auto">
        We are an aviation company delivering premium
        flight solutions with a focus on safety and service.
      </p>
    </main>
  );
}
