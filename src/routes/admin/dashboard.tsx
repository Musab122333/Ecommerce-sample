import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, ShoppingBag, Users, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const stats = [
    { label: "Total Revenue", value: "$12,458", change: "+12.5%", icon: TrendingUp, color: "text-green-500" },
    { label: "Orders", value: "248", change: "+8.2%", icon: ShoppingBag, color: "text-blue-500" },
    { label: "Customers", value: "1,234", change: "+5.1%", icon: Users, color: "text-purple-500" },
    { label: "Products", value: "56", change: "+2 new", icon: BarChart3, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your store overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-strong rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                <p className="text-xs text-green-500 mt-2">{stat.change}</p>
              </div>
              <div className="p-3 rounded-lg" style={{ background: "var(--glass)" }}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="glass-strong rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--glass)" }}>
              <div>
                <p className="font-medium">Order #{1000 + i}</p>
                <p className="text-sm text-muted-foreground">Customer Name</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$249.99</p>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">Delivered</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
