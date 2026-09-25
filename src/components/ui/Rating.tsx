import { Star } from "lucide-react";
import { cn } from "@/lib/format";

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}

export function Rating({ value, count, size = 14, className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex" aria-label={`Rated ${value} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = value >= i - 0.25;
          return (
            <Star
              key={i}
              size={size}
              className={cn(
                filled ? "fill-amber-400 text-amber-400" : "text-koala-200 dark:text-koala-700"
              )}
            />
          );
        })}
      </div>
      {count !== undefined && (
        <span className="text-xs text-koala-500 dark:text-sage/70">({count})</span>
      )}
    </div>
  );
}
