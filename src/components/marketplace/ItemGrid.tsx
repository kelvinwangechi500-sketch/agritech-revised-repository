import ItemCard from "./ItemCard";
import type { Item } from "@/types";

interface Props {
  items: Item[];
  loading?: boolean;
  emptyMessage?: string;
}

function Skeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton aspect-[4/3] w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-24 rounded-full" />
        <div className="skeleton h-4 w-full rounded-lg" />
        <div className="skeleton h-4 w-3/4 rounded-lg" />
        <div className="skeleton h-4 w-1/2 rounded-lg" />
        <div className="skeleton h-6 w-28 rounded-lg mt-2" />
      </div>
    </div>
  );
}

export default function ItemGrid({ items, loading = false, emptyMessage }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center py-16 px-4">
        <p className="text-5xl mb-4">🌾</p>
        <p className="font-display font-semibold text-gray-700 text-lg mb-2">
          {emptyMessage ?? "No listings found"}
        </p>
        <p className="text-gray-400 text-sm">
          Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
