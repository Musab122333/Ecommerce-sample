import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User, Loader } from "lucide-react";
import { toast } from "sonner";
import { useAuth, useAuthForm } from "@/lib/auth";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — Lumen" }, { name: "description", content: "Sign in or create your Lumen account." }] }),
  component: Account,
});

function Account() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login, register, loading, error } = useAuthForm();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate({ to: "/" });
    return null;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === "login") {
        if (!email || !password) {
          toast.error("Please fill in all fields");
          return;
        }
        await login(email, password);
        toast.success("Login successful!");
      } else {
        if (!email || !name || !password) {
          toast.error("Please fill in all fields");
          return;
        }
        if (password.length < 6) {
          toast.error("Password must be at least 6 characters");
          return;
        }
        await register(email, name, password);
        toast.success("Account created successfully!");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    }
  };

  return (
    <div className="mx-auto flex max-w-md px-4 pt-16 pb-12">
      <div className="glass-strong w-full rounded-[2rem] p-8">
        <div className="glass mb-6 flex rounded-full p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              disabled={loading}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition disabled:opacity-50 ${mode === m ? "text-primary-foreground" : "text-muted-foreground"}`}
              style={mode === m ? { background: "var(--gradient-primary)" } : undefined}
            >
              {m === "login" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        <h1 className="font-display text-3xl font-bold">{mode === "login" ? "Welcome back" : "Join Lumen"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "login" ? "Sign in to track orders and saved pieces." : "Create an account in seconds."}
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/10 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          {mode === "signup" && (
            <Field 
              icon={User} 
              type="text" 
              placeholder="Full name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          )}
          <Field 
            icon={Mail} 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <Field 
            icon={Lock} 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 w-full rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
            style={{ background: "var(--gradient-primary)" }}
          >
            {loading && <Loader className="h-4 w-4 animate-spin" />}
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">By continuing you agree to our Terms & Privacy.</p>
      </div>
    </div>
  );
}

function Field({ icon: Icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ElementType }) {
  return (
    <div className="glass flex items-center gap-3 rounded-full px-4 py-3">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <input {...props} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50" />
    </div>
  );
}
