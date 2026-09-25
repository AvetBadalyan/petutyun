import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { useFavorites } from "@/store/favorites";

// TODO: Implement favorites page with actual pet data
export function FavoritesPage() {
  const { ids, clear } = useFavorites();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/adopt" className="btn-ghost mb-6 -ml-2">
        <ArrowLeft size={16} /> Back to adoption
      </Link>

      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-4xl text-neutral-900 dark:text-white">
            Saved Pets
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            {ids.length} pet{ids.length !== 1 && "s"} saved
          </p>
        </div>
        {ids.length > 0 && (
          <button onClick={clear} className="btn-ghost text-red-500">
            Clear all
          </button>
        )}
      </div>

      {ids.length === 0 ? (
        <div className="mt-10 rounded-2xl border-2 border-dashed border-neutral-200 py-16 text-center dark:border-neutral-700">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-coral-100 text-coral-600 dark:bg-coral-950 dark:text-coral-400">
            <Heart size={32} />
          </div>
          <h2 className="mt-4 font-serif text-2xl text-neutral-900 dark:text-white">
            No saved pets
          </h2>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            Browse adoptable pets and save your favorites.
          </p>
          <Link to="/adopt" className="btn-primary mt-6">
            Browse Pets
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-neutral-500">
            Saved pet IDs: {ids.join(", ")}
          </p>
          <p className="mt-2 text-sm text-neutral-400">
            (Full implementation coming soon)
          </p>
        </div>
      )}
    </div>
  );
}
