import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

function AdminUsers() {
  const [search, setSearch] = useState("");

  const users = [
    { id: "1", name: "John Doe", email: "john@example.com", orders: 5, spent: "$1,249.99", joined: "2024-01-01" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", orders: 3, spent: "$759.99", joined: "2024-01-05" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", orders: 1, spent: "$129.99", joined: "2024-01-10" },
  ];

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground mt-1">Manage customer accounts</p>
      </div>

      {/* Search */}
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

      {/* Users Table */}
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
                <td className="px-6 py-4 text-sm">{user.orders}</td>
                <td className="px-6 py-4 text-sm font-medium">{user.spent}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{user.joined}</td>
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
