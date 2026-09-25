import { Package } from "lucide-react";

// TODO: Implement wellness box quiz
export function WellnessBoxPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
          <Package size={32} />
        </div>
        <h1 className="mt-4 font-serif text-4xl text-neutral-900 dark:text-white">
          Wellness Box
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Coming soon - Build a personalized wellness box for your pet.
        </p>
      </div>
    </div>
  );
}
