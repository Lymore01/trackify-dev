import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CTAProps {
  user?: {
    id?: string;
    email?: string;
    name?: string | null;
  } | null;
}

export const CTA = ({ user: initialUser }: CTAProps) => {
  const { user: hookUser } = useAuth();
  const user = initialUser !== undefined ? initialUser : hookUser;
  const isAuthenticated = !!user?.id || !!user?.email || !!user?.name;
  return (
    <div className="flex flex-row gap-3 items-center group/cta">
      {isAuthenticated ? (
        <Button
          asChild
          className="group text-sm bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg shadow-blue-500/20 rounded-xl px-6 h-10 transition-all active:scale-95"
        >
          <Link href="/dashboard">
            Go to Dashboard
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      ) : (
        <Button
          asChild
          className="group text-sm bg-blue-600 cursor-pointer hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition-all rounded-xl px-6 h-10 active:scale-95"
        >
          <Link href="/login">
            Join For Free
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      )}
      <Button
        asChild
        variant="ghost"
        className="text-sm cursor-pointer text-muted-foreground hover:text-foreground h-10 px-6 rounded-xl transition-all active:scale-95 group-hover/cta:opacity-100"
      >
        <Link href="/docs">View Docs</Link>
      </Button>
    </div>
  );
};
