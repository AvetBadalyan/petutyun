import { Heart } from "lucide-react";

// TODO: Implement adoption browser
export function AdoptPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-coral-100 text-coral-600 dark:bg-coral-950 dark:text-coral-400">
          <Heart size={32} />
        </div>
        <h1 className="mt-4 font-serif text-4xl text-neutral-900 dark:text-white">
          Adopt a Pet
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Coming soon - Browse adoptable pets from local shelters.
        </p>
      </div>
    </div>
  );
}
