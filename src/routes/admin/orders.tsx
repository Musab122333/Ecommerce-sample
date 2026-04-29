import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { ordersAPI } from "@/lib/api/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { token } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res: any = await ordersAPI.getAllAdmin({ status: statusFilter === 'all' ? undefined : statusFilter }, token);
        setOrders(res.data.orders || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, statusFilter]);

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-500/20 text-yellow-500",
    CONFIRMED: "bg-blue-500/20 text-blue-500",
    PROCESSING: "bg-purple-500/20 text-purple-500",
    SHIPPED: "bg-orange-500/20 text-orange-500",
    DELIVERED: "bg-green-500/20 text-green-500",
    CANCELLED: "bg-red-500/20 text-red-500",
  };

  const filtered = orders.filter(o => {
    const matchSearch = (o.user?.name || '').toLowerCase().includes(search.toLowerCase()) || String(o.id).toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage and track all orders</p>
      </div>

      <div className="glass-strong rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 rounded-lg px-4 py-2" style={{ background: "var(--glass)" }}>
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg px-4 py-2 bg-[var(--glass)] outline-none text-sm"
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="glass-strong rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
              <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} style={{ borderBottom: "1px solid var(--glass-border)" }}>
                <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                <td className="px-6 py-4 text-sm">{order.user?.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm font-medium">${order.total}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || ""}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-primary hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
