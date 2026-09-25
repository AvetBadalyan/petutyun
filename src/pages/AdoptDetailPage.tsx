import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// TODO: Implement adoption detail page
export function AdoptDetailPage() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/adopt" className="btn-ghost mb-6 -ml-2">
        <ArrowLeft size={16} /> Back to adoption
      </Link>
      <div className="text-center">
        <h1 className="font-serif text-4xl text-neutral-900 dark:text-white">
          Pet Details
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Details for pet ID: {id}
        </p>
      </div>
    </div>
  );
}
