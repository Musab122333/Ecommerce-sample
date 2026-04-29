export function Footer() {
  return (
    <footer className="mx-4 mt-24 mb-6">
      <div className="glass mx-auto max-w-7xl rounded-3xl px-8 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-gradient font-display text-xl font-bold">LUMEN</h3>
            <p className="mt-2 text-sm text-muted-foreground">Objects of light. Shipped worldwide.</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>New arrivals</li><li>Bestsellers</li><li>Limited drops</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Shipping</li><li>Returns</li><li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Stay in the glow</h4>
            <div className="glass flex items-center gap-2 rounded-full p-1">
              <input placeholder="Email" className="flex-1 bg-transparent px-3 py-1.5 text-sm outline-none placeholder:text-muted-foreground" />
              <button className="rounded-full px-4 py-1.5 text-xs font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>Join</button>
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-[var(--glass-border)] pt-6 text-center text-xs text-muted-foreground">© 2026 Lumen. Crafted with light.</p>
      </div>
    </footer>
  );
}
