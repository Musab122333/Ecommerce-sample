import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Shield, Truck } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import aurora from "@/assets/aurora-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — Objects of Light" },
      { name: "description", content: "A curated glassmorphism boutique. Audio, wearables, beauty, home — shipped worldwide." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem]">
        <img src={aurora} alt="" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, oklch(0.16 0.04 290 / 60%) 100%)" }} />
        <div className="relative grid items-center gap-10 p-8 md:grid-cols-2 md:p-16">
          <div>
            <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
              <Sparkles className="h-3 w-3 text-accent" /> New Spring Drop · 2026
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-7xl">
              <span className="text-gradient">Objects of light,</span>
              <br /> built to be loved.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              A small, obsessive collection of audio, wearables, beauty, and home — each piece chosen for how it makes a room feel.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:scale-[1.03] glow-primary" style={{ background: "var(--gradient-primary)" }}>
                Shop the collection <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link to="/about" className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition hover:scale-[1.03]">
                Our story
              </Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="glass-strong animate-float aspect-square rounded-3xl p-4">
              <img src={featured[0].image} alt={featured[0].name} width={896} height={896} className="h-full w-full rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { icon: Truck, title: "Free worldwide shipping", desc: "On orders over $200" },
          { icon: Shield, title: "Secure payments", desc: "256-bit encrypted checkout" },
          { icon: Sparkles, title: "Lifetime support", desc: "We answer in under 12h" },
        ].map((f) => (
          <div key={f.title} className="glass flex items-center gap-4 rounded-2xl p-5">
            <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: "var(--gradient-primary)" }}>
              <f.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold">{f.title}</div>
              <div className="text-xs text-muted-foreground">{f.desc}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Featured */}
      <section className="mt-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Featured pieces</h2>
            <p className="mt-1 text-muted-foreground">Hand-picked for this week.</p>
          </div>
          <Link to="/shop" className="text-sm font-medium text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20">
        <div className="glass-strong relative overflow-hidden rounded-[2rem] p-10 text-center md:p-16">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-50 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
          <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full opacity-40 blur-3xl" style={{ background: "var(--gradient-aurora)" }} />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold md:text-5xl"><span className="text-gradient">Designed with intention.</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Sustainable materials, fair makers, packaging you'll want to keep.</p>
            <Link to="/shop" className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-primary" style={{ background: "var(--gradient-primary)" }}>
              Start shopping <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
