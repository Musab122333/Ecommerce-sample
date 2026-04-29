import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — Lumen" }, { name: "description", content: "Sign in or create your Lumen account." }] }),
  component: Account,
});

function Account() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Connect Lovable Cloud to enable real authentication.");
  };

  return (
    <div className="mx-auto flex max-w-md px-4 pt-16">
      <div className="glass-strong w-full rounded-[2rem] p-8">
        <div className="glass mb-6 flex rounded-full p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${mode === m ? "text-primary-foreground" : "text-muted-foreground"}`}
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

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          {mode === "signup" && (
            <Field icon={User} type="text" placeholder="Full name" />
          )}
          <Field icon={Mail} type="email" placeholder="Email address" />
          <Field icon={Lock} type="password" placeholder="Password" />
          <button type="submit" className="mt-2 w-full rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-primary" style={{ background: "var(--gradient-primary)" }}>
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
      <input {...props} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
    </div>
  );
}
