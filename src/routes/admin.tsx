import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: Users, label: "Users", href: "/admin/users" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? "w-64" : "w-20"} glass-strong border-r border-[var(--glass-border)] transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-center gap-2 border-b border-[var(--glass-border)]">
          <div className="grid h-8 w-8 place-items-center rounded-full" style={{ background: "var(--gradient-primary)" }}>
            <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
          </div>
          {isSidebarOpen && <span className="font-display font-bold text-gradient">Admin</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition text-muted-foreground hover:text-foreground hover:bg-[var(--glass-strong)]"
              activeProps={{ className: "text-primary-foreground" }}
              style={({ isActive }) => isActive ? { background: "var(--gradient-primary)" } : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-[var(--glass-border)] p-4">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-muted-foreground hover:text-destructive transition hover:bg-[var(--glass-strong)]">
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="glass-strong sticky top-0 z-40 h-16 border-b border-[var(--glass-border)] flex items-center px-6 gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-[var(--glass)] rounded-lg transition"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold flex-1">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              View Store
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
