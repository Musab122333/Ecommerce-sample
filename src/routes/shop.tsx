import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

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
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], []);
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold md:text-5xl"><span className="text-gradient">The collection</span></h1>
        <p className="mt-2 text-muted-foreground">{filtered.length} pieces, made to last.</p>
      </div>

      <div className="glass mb-8 flex flex-wrap gap-2 rounded-full p-2">
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
