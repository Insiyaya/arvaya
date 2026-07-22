import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ArrowRight, Leaf, Sparkles, ShoppingBag, Mail, Calendar } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/account/SignOutButton";
import type { DoshaResult } from "@/lib/quiz-engine";

export const metadata: Metadata = { title: "Your Account" };

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      quizResponses: { orderBy: { createdAt: "desc" }, take: 5 },
      orders: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });

  if (!user) {
    redirect("/login?callbackUrl=/account");
  }

  const latestQuiz = user.quizResponses[0];
  const latestDosha = latestQuiz?.doshaResult as unknown as DoshaResult | undefined;

  return (
    <section className="section-padding bg-[#FAF7F0] min-h-[70vh]">
      <div className="container-max max-w-4xl">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-2">Your Account</p>
            <h1 className="font-heading text-4xl font-light text-[#2F5233]">
              Hello, {user.name?.split(" ")[0] || "there"}.
            </h1>
          </div>
          <SignOutButton />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Prakriti / personalisation card */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#2F5233] via-[#274530] to-[#1A3A1F] rounded-2xl p-8 text-[#FAF7F0]">
            {latestDosha ? (
              <>
                <p className="text-xs font-medium uppercase tracking-widest text-[#A8C09A] mb-3 flex items-center gap-2">
                  <Sparkles size={14} /> Your Prakriti
                </p>
                <h2 className="font-heading text-3xl mb-3">{latestDosha.label}</h2>
                <p className="text-[#FAF7F0]/75 text-sm leading-relaxed mb-6 max-w-xl">
                  {latestDosha.description}
                </p>
                <Link
                  href="/quiz/start"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#D4A24C] hover:text-[#E8C07A] transition-colors"
                >
                  Retake the quiz
                  <ArrowRight size={15} />
                </Link>
              </>
            ) : (
              <>
                <p className="text-xs font-medium uppercase tracking-widest text-[#A8C09A] mb-3 flex items-center gap-2">
                  <Leaf size={14} /> Personalise your routine
                </p>
                <h2 className="font-heading text-2xl mb-3">You haven&apos;t taken the quiz yet.</h2>
                <p className="text-[#FAF7F0]/75 text-sm leading-relaxed mb-6 max-w-xl">
                  Take the 3-minute Prakriti quiz to discover your Ayurvedic constitution and get a
                  personalised product routine saved right here.
                </p>
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 bg-[#D4A24C] text-[#1A3A1F] px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-[#E8C07A] transition-colors"
                >
                  Take the Prakriti Quiz
                  <ArrowRight size={15} />
                </Link>
              </>
            )}
          </div>

          {/* Account details card */}
          <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6">
            <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-4">Details</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail size={15} className="text-[#4A7C59] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#2C2C2C] break-all">{user.email}</p>
              </div>
              <div className="flex items-start gap-2">
                <Calendar size={15} className="text-[#4A7C59] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#2C2C2C]">
                  Member since{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz history */}
        {user.quizResponses.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6 mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-4">Quiz History</p>
            <div className="space-y-3">
              {user.quizResponses.map(q => {
                const result = q.doshaResult as unknown as DoshaResult;
                return (
                  <div
                    key={q.id}
                    className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-[#F5EFE0]/60 border border-[#A8C09A]/15"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#A8C09A]/20 flex items-center justify-center text-[#4A7C59] flex-shrink-0">
                        <Sparkles size={14} />
                      </div>
                      <p className="text-sm font-medium text-[#2C2C2C]">{result?.label}</p>
                    </div>
                    <p className="text-xs text-[#6B5D4F]">
                      {new Date(q.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Orders */}
        <div className="bg-white rounded-2xl border border-[#A8C09A]/25 p-6">
          <p className="text-xs font-medium uppercase tracking-widest text-[#4A7C59] mb-4">Orders</p>
          {user.orders.length === 0 ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-3 text-[#A8C09A]">
                <ShoppingBag size={32} strokeWidth={1.25} />
              </div>
              <p className="text-sm text-[#6B5D4F] mb-4">You haven&apos;t placed any orders yet.</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#2F5233] underline underline-offset-2 hover:text-[#4A7C59]"
              >
                Browse Products
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {user.orders.map(order => (
                <div
                  key={order.id}
                  className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-[#F5EFE0]/60 border border-[#A8C09A]/15"
                >
                  <div>
                    <p className="text-sm font-medium text-[#2C2C2C]">Order #{order.id.slice(-8)}</p>
                    <p className="text-xs text-[#6B5D4F] capitalize">{order.status}</p>
                  </div>
                  <p className="text-sm font-medium text-[#2F5233]">
                    {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(order.total)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
