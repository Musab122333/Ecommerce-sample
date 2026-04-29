import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { adminAPI } from "@/lib/api/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

function AdminUsers() {
  const [search, setSearch] = useState("");
  const { token } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res: any = await adminAPI.getUsers(token);
        setUsers(res.data.users || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const filtered = users.filter(u =>
    (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground mt-1">Manage customer accounts</p>
      </div>

      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center gap-2 rounded-lg px-4 py-2" style={{ background: "var(--glass)" }}>
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      <div className="glass-strong rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Orders</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Spent</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid var(--glass-border)" }}>
                <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                <td className="px-6 py-4 text-sm">{user._count?.orders || 0}</td>
                <td className="px-6 py-4 text-sm font-medium">${user.totalSpent || 0}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</td>
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
