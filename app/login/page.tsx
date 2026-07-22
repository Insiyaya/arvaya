"use client";

import { Suspense, useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Incorrect email or password. Please try again.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6 space-y-4">
        {error && (
          <p className="text-sm text-[#C97B63] bg-[#C97B63]/10 border border-[#C97B63]/25 rounded-xl px-4 py-2.5">
            {error}
          </p>
        )}

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
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <Button type="submit" disabled={loading} className="w-full mt-2">
          {loading ? "Signing in…" : "Sign In"}
          {!loading && <ArrowRight size={16} />}
        </Button>
      </form>

      <p className="text-center text-sm text-[#6B5D4F] mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-[#2F5233] font-medium underline underline-offset-2 hover:text-[#4A7C59]">
          Create one
        </Link>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <section className="section-padding bg-[#FAF7F0] min-h-[70vh] flex items-center">
      <div className="container-max">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#2F5233] flex items-center justify-center mx-auto mb-4">
              <Leaf size={20} className="text-[#FAF7F0]" />
            </div>
            <h1 className="font-heading text-3xl font-light text-[#2F5233] mb-2">Welcome back</h1>
            <p className="text-[#6B5D4F] text-sm">
              Sign in to see your Prakriti profile and personalised routine.
            </p>
          </div>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
