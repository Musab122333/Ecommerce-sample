import { Link } from "@tanstack/react-router";
import { ShoppingBag, Sparkles, LogOut, User } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

export function Navbar() {
  const { count } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-4 z-50 mx-4">
      <nav className="glass-strong mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-full" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="text-gradient">LUMEN</span>
        </Link>
        <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <Link to="/" className="transition hover:text-foreground" activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }}>Home</Link>
          <Link to="/shop" className="transition hover:text-foreground" activeProps={{ className: "text-foreground" }}>Shop</Link>
          <Link to="/about" className="transition hover:text-foreground" activeProps={{ className: "text-foreground" }}>About</Link>
          {!isAuthenticated && (
            <Link to="/account" className="transition hover:text-foreground" activeProps={{ className: "text-foreground" }}>Account</Link>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isAuthenticated && user && (
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full" style={{ background: "var(--glass)" }}>
              <User className="h-4 w-4" />
              <span className="text-xs font-medium truncate">{user.name}</span>
              <button
                onClick={logout}
                className="p-1 hover:bg-[var(--glass-strong)] rounded transition"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
          <Link to="/cart" className="glass relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition hover:scale-[1.03]">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                {count}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
