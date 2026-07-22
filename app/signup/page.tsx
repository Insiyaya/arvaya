"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (signInRes?.error) {
      router.push("/login");
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <section className="section-padding bg-[#FAF7F0] min-h-[70vh] flex items-center">
      <div className="container-max">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#2F5233] flex items-center justify-center mx-auto mb-4">
              <Leaf size={20} className="text-[#FAF7F0]" />
            </div>
            <h1 className="font-heading text-3xl font-light text-[#2F5233] mb-2">Create your account</h1>
            <p className="text-[#6B5D4F] text-sm">
              Save your Prakriti profile, quiz results, and orders in one place.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6 space-y-4">
            {error && (
              <p className="text-sm text-[#C97B63] bg-[#C97B63]/10 border border-[#C97B63]/25 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}

            <Input
              type="text"
              label="Name"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoComplete="name"
            />
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              type="password"
              label="Password"
              placeholder="At least 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />

            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? "Creating account…" : "Create Account"}
              {!loading && <ArrowRight size={16} />}
            </Button>
          </form>

          <p className="text-center text-sm text-[#6B5D4F] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#2F5233] font-medium underline underline-offset-2 hover:text-[#4A7C59]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
