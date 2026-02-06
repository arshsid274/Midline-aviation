export const dynamic = "force-static";

export const metadata = {
  title: "Private Jet Charter",
  description:
    "Flexible private jet charter services with worldwide coverage.",
};

export default function CharterPage() {
  return (
    <main className="py-24">
      <h1 className="text-4xl font-bold text-center">
        Private Jet Charter
      </h1>

      <p className="mt-6 max-w-3xl mx-auto text-center">
        On-demand private jet charter services tailored
        to business and leisure travelers.
      </p>
    </main>
  );
}
