import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, ShoppingBag, Check, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Lumen` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Lumen` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md p-12 text-center">
      <h1 className="font-display text-3xl">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-block text-primary hover:underline">Back to shop</Link>
    </div>
  ),
  errorComponent: () => <div className="p-12 text-center">Something went wrong.</div>,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    add(product);
    setAdded(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10">
      <Link to="/shop" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="glass-strong relative overflow-hidden rounded-[2rem] p-4">
          <img src={product.image} alt={product.name} width={896} height={896} className="aspect-square w-full rounded-3xl object-cover" />
          {product.badge && (
            <span className="glass-strong absolute left-7 top-7 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm uppercase tracking-widest text-muted-foreground">{product.category}</span>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-accent text-accent" /> {product.rating} · 184 reviews
          </div>
          <p className="mt-6 text-lg text-muted-foreground">{product.description}</p>
          <div className="mt-8 flex items-baseline gap-3">
            <span className="text-4xl font-bold">${product.price}</span>
            <span className="text-sm text-muted-foreground line-through">${Math.round(product.price * 1.25)}</span>
          </div>
          <button
            onClick={handleAdd}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] glow-primary"
            style={{ background: "var(--gradient-primary)" }}
          >
            {added ? <><Check className="h-4 w-4" /> Added to cart</> : <><ShoppingBag className="h-4 w-4" /> Add to cart</>}
          </button>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs">
            {["Free shipping", "30-day returns", "Lifetime support"].map((t) => (
              <div key={t} className="glass rounded-2xl p-3 text-muted-foreground">{t}</div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="mb-6 font-display text-2xl font-bold md:text-3xl">You might also love</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
