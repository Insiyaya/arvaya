"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="inline-flex items-center gap-2 text-sm font-medium text-[#6B5D4F] hover:text-[#2F5233] transition-colors"
    >
      <LogOut size={15} />
      Sign Out
    </button>
  );
}
