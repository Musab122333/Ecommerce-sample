import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { productsAPI } from "@/lib/api/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res: any = await productsAPI.getAll();
        setProducts(res.data.products || []);
      } catch (err: any) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog</p>
        </div>
        <Link to="/admin/products/new" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground glow-primary" style={{ background: "var(--gradient-primary)" }}>
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center gap-2 rounded-lg px-4 py-2" style={{ background: "var(--glass)" }}>
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
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
              <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} style={{ borderBottom: "1px solid var(--glass-border)" }}>
                <td className="px-6 py-4 text-sm">{product.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{product.category}</td>
                <td className="px-6 py-4 text-sm font-medium">${product.price}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    product.quantity > 20 ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                  }`}>
                    {product.quantity} in stock
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-[var(--glass)] rounded transition">
                      <Edit className="h-4 w-4 text-blue-500" />
                    </button>
                    <button className="p-2 hover:bg-[var(--glass)] rounded transition">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
