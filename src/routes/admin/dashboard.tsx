import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res: any = await adminAPI.getDashboard(token);
        const data = res.data;
        setStats(data.stats || []);
        setRecent(data.recentOrders || []);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your store overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat: any) => (
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

      <div className="glass-strong rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {recent.map((o: any) => (
            <div key={o.id} className="flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--glass)" }}>
              <div>
                <p className="font-medium">Order #{o.id}</p>
                <p className="text-sm text-muted-foreground">{o.user?.name || '—'}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${o.total?.toFixed(2)}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
