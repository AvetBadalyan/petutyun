import { Stethoscope } from "lucide-react";

// TODO: Implement symptom checker wizard
export function SymptomCheckerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
          <Stethoscope size={32} />
        </div>
        <h1 className="mt-4 font-serif text-4xl text-neutral-900 dark:text-white">
          Symptom Checker
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Coming soon - A simple wizard to help identify what might be bothering your pet.
        </p>
      </div>
    </div>
  );
}
