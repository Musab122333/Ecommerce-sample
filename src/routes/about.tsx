import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Lumen" }, { name: "description", content: "The story behind Lumen — a small studio making objects of light." }] }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-16">
      <div className="glass-strong rounded-[2rem] p-10 md:p-16">
        <span className="text-sm uppercase tracking-widest text-muted-foreground">Our story</span>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl"><span className="text-gradient">Designed slowly. Lived with daily.</span></h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Lumen is a small studio in Copenhagen working with independent makers across Europe and Japan. We release one drop per season — never more — and only when each piece earns its place.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: "Materials", d: "Recycled aluminium, FSC leather, plant-dyed textiles. Always traceable." },
            { n: "02", t: "Makers", d: "Family-run workshops paid above market, named on every product." },
            { n: "03", t: "Forever", d: "Free repairs for life. Take-back program when you're truly done." },
          ].map((b) => (
            <div key={b.n} className="glass rounded-2xl p-5">
              <div className="text-gradient font-display text-3xl font-bold">{b.n}</div>
              <div className="mt-2 font-semibold">{b.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
