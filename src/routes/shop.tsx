import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { Loader } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Lumen" },
      { name: "description", content: "Browse the full Lumen collection: audio, wearables, beauty, home, footwear, and bags." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [active, setActive] = useState("All");
  const [sort, setSort] = useState("");
  
  const { products, loading, error } = useProducts({
    category: active === "All" ? undefined : active,
    sort: sort || undefined,
  });

  // Get unique categories
  const categories = useMemo(() => {
    if (products.length === 0) return ["All"];
    const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
    return cats;
  }, [products]);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold md:text-5xl"><span className="text-gradient">The collection</span></h1>
        <p className="mt-2 text-muted-foreground">{products.length} pieces, made to last.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        {/* Categories Filter */}
        <div className="glass mb-4 md:mb-0 flex flex-wrap gap-2 rounded-full p-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active === c ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              style={active === c ? { background: "var(--gradient-primary)" } : undefined}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="glass rounded-full px-4 py-2 text-sm outline-none"
        >
          <option value="">Default Sort</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {error && (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      )}
    </div>
  );
}
