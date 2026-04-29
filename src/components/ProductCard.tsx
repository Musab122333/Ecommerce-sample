import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="glass group relative flex flex-col overflow-hidden rounded-3xl p-3 transition duration-500 hover:-translate-y-1"
      style={{ transitionTimingFunction: "var(--transition-smooth)" }}
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--glass)]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={896}
          height={896}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="glass-strong absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 pt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{product.category}</span>
          <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" />{product.rating}</span>
        </div>
        <h3 className="font-display text-lg font-semibold leading-tight">{product.name}</h3>
        <div className="mt-auto flex items-end justify-between">
          <span className="text-xl font-bold">${product.price}</span>
          <span className="text-xs font-medium text-primary opacity-0 transition group-hover:opacity-100">View →</span>
        </div>
      </div>
    </Link>
  );
}
