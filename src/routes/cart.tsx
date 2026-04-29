import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, Lock } from "lucide-react";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Lumen" }, { name: "description", content: "Review your selected pieces and check out securely." }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, clear, count } = useCart();
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 18;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 pt-16">
        <div className="glass-strong rounded-[2rem] p-12 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl" style={{ background: "var(--gradient-primary)" }}>
            <ShoppingBag className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold">Your cart is quiet</h1>
          <p className="mt-2 text-muted-foreground">Find something that catches the light.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full px-7 py-3 text-sm font-semibold text-primary-foreground glow-primary" style={{ background: "var(--gradient-primary)" }}>
            Browse the collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12">
      <h1 className="mb-8 font-display text-4xl font-bold md:text-5xl"><span className="text-gradient">Your bag</span> <span className="text-muted-foreground text-2xl font-normal">({count})</span></h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="glass flex gap-4 rounded-2xl p-3">
              <img src={product.image} alt={product.name} width={120} height={120} className="h-28 w-28 flex-shrink-0 rounded-xl object-cover" loading="lazy" />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs text-muted-foreground">{product.category}</div>
                    <h3 className="font-display text-lg font-semibold">{product.name}</h3>
                  </div>
                  <button onClick={() => remove(product.id)} className="text-muted-foreground transition hover:text-destructive" aria-label="Remove">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="glass flex items-center gap-1 rounded-full p-1">
                    <button onClick={() => setQty(product.id, qty - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-[var(--glass-strong)]"><Minus className="h-3 w-3" /></button>
                    <span className="w-6 text-center text-sm font-medium">{qty}</span>
                    <button onClick={() => setQty(product.id, qty + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-[var(--glass-strong)]"><Plus className="h-3 w-3" /></button>
                  </div>
                  <div className="text-lg font-bold">${product.price * qty}</div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground">Clear cart</button>
        </div>

        <aside className="glass-strong sticky top-28 h-fit rounded-3xl p-6">
          <h2 className="font-display text-xl font-bold">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-medium">{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
            <div className="border-t border-[var(--glass-border)] pt-3 flex justify-between text-base"><span className="font-semibold">Total</span><span className="text-xl font-bold">${total.toFixed(2)}</span></div>
          </div>
          <button
            onClick={() => toast.success("Demo checkout — connect Shopify or Stripe to process real payments.")}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-primary transition hover:scale-[1.02]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Lock className="h-4 w-4" /> Secure checkout
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">256-bit SSL · Apple Pay · Cards</p>
        </aside>
      </div>
    </div>
  );
}
