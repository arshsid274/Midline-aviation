import MidlineAirlinesLoader from "@/app/components/ui/MidlineAirlinesLoader";

export default function AboutPage() {
  return (
    <MidlineAirlinesLoader>
      <main className="py-24 text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-6 max-w-2xl mx-auto">
          We are an aviation company delivering premium
          flight solutions with a focus on safety and service.
        </p>
      </main>
    </MidlineAirlinesLoader>
  );
}
