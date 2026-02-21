"use client";

import { useAuth } from "@/hooks/use-auth";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Logo } from "@/components/custom-sidebar";

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

interface NavBarProps {
  user?: {
    id?: string;
    email?: string;
    name?: string | null;
  } | null;
}

export const NavBar = ({ user: initialUser }: NavBarProps) => {
  const [open, setIsOpen] = useState(false);
  const { user: hookUser } = useAuth();
  const user = initialUser !== undefined ? initialUser : hookUser;

  const handleMenuOpen = () => {
    setIsOpen((pv: any) => !pv);
  };
  const isAuthenticated = !!user?.id || !!user?.email || !!user?.name;

  return (
    <header
      className="fixed top-4 left-1/2 -translate-x-1/2 flex w-[95%] lg:w-[85%] max-w-7xl items-center justify-between py-2.5 px-6 z-50
        bg-white/70 dark:bg-zinc-950/80
        backdrop-blur-xl
        border border-white/20 dark:border-zinc-800/50
        rounded-2xl shadow-2xl shadow-blue-500/5"
    >
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <Logo />
          <h1 className="text-lg font-bold tracking-tight text-foreground">
            Trackify
          </h1>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <li
              className="cursor-pointer hover:text-foreground transition-colors"
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Product
            </li>
            <li
              className="cursor-pointer hover:text-foreground transition-colors"
              onClick={() =>
                document
                  .getElementById("use-cases")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Developers
            </li>
            <Link
              href="/docs"
              className="hover:text-foreground transition-colors"
            >
              Documentation
            </Link>
            <li
              className="cursor-pointer hover:text-foreground transition-colors"
              onClick={() =>
                toast.info("Pricing plans are coming soon!", {
                  description:
                    "We're currently in beta. All features are free for early adopters.",
                })
              }
            >
              Pricing
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex gap-3 items-center">
        <Link
          href="https://github.com/Lymore01/trackify-dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github size={19} />
        </Link>

        <div className="hidden lg:flex gap-2 items-center ml-2 border-l border-border/50 pl-4">
          {isAuthenticated ? (
            <Button
              asChild
              className="text-sm bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg shadow-blue-500/20"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="text-sm cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                asChild
                className="text-sm bg-blue-600 cursor-pointer hover:bg-blue-500 hover:border-blue-800 text-white shadow-lg shadow-blue-500/20 transition-all"
              >
                <Link href="/login">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <div
          className="lg:hidden flex items-center justify-center p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 cursor-pointer text-foreground"
          onClick={handleMenuOpen}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </div>
      </div>
      <AnimatePresence>
        {open && <MobileMenu user={initialUser} />}
      </AnimatePresence>
    </header>
  );
};

const MobileMenu = ({ user: initialUser }: { user?: any }) => {
  const { user: hookUser } = useAuth();
  const user = initialUser !== undefined ? initialUser : hookUser;
  const isAuthenticated = !!user?.id || !!user?.email || !!user?.name;
  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full z-30 fixed top-14 left-0 h-auto px-2 block lg:hidden"
    >
      <div className="flex h-full w-full bg-background rounded-b-2xl shadow-lg px-2 py-4 flex-col justify-between">
        <ul className="flex flex-col gap-4 text-sm font-medium">
          <li
            className="cursor-pointer hover:text-foreground transition-colors"
            onClick={() => {
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" });
              // Close menu would be handled here if we passed the setter down
            }}
          >
            Product
          </li>
          <li
            className="cursor-pointer hover:text-foreground transition-colors"
            onClick={() => {
              document
                .getElementById("use-cases")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Developers
          </li>
          <Link
            href="/docs"
            className="hover:text-foreground transition-colors"
          >
            Documentation
          </Link>
          <li
            className="cursor-pointer hover:text-foreground transition-colors"
            onClick={() =>
              toast.info("Pricing plans are coming soon!", {
                description:
                  "We're currently in beta. All features are free for early adopters.",
              })
            }
          >
            Pricing
          </li>
        </ul>
        {/* CTA */}
        <div className="mt-4 justify-between flex items-center">
          {isAuthenticated ? (
            <Button
              asChild
              className="w-full cursor-pointer bg-blue-600 text-white"
            >
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button
              asChild
              className="w-full cursor-pointer bg-blue-600 text-white"
            >
              <Link href="/login">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
