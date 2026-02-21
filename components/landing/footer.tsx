"use client";

import { Logo } from "@/components/custom-sidebar";
import { Github } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";
import { XLogo } from "./logos";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/40 py-20">
      <div className="w-[95%] lg:w-[85%] max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
          <div className="col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <Logo />
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Trackify.
              </h2>
            </div>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-sm">
              Event infrastructure for modern developers. Unified, real-time,
              and scalable.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://x.com/@_kelly_limo"
                target="_blank"
                className="p-3 rounded-xl bg-zinc-500/5 hover:bg-zinc-950 hover:text-white/80 text-muted-foreground transition-all border border-transparent hover:border-border"
              >
                <XLogo className="size-4" />
              </Link>
              <Link
                href="https://github.com/Lymore01/trackify-dev/"
                target="_blank"
                className="p-3 rounded-xl bg-zinc-500/5 hover:bg-zinc-950 hover:text-white transition-all border border-transparent hover:border-border"
              >
                <Github size={18} />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
              Resources
            </h3>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              <li>
                <Link
                  href="/docs"
                  className="hover:text-blue-500 transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-500 transition-colors"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <button
                  onClick={() =>
                    toast.info("Changelog coming soon!", {
                      description:
                        "We're shipping daily. Stay tuned for our public log.",
                    })
                  }
                  className="hover:text-blue-500 transition-colors text-left"
                >
                  Changelog
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("use-cases")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="hover:text-blue-500 transition-colors text-left"
                >
                  SDKs
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
              Company
            </h3>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              <li>
                <Link
                  href="/login"
                  className="hover:text-blue-500 transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-blue-500 transition-colors"
                >
                  Sign up
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-500 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-light">
            © 2026 Trackify Labs Inc. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground font-light">
            Made with ❤️ by{" "}
            <Link
              href="https://github.com/Lymore01"
              target="_blank"
              className="hover:text-blue-500 transition-colors underline"
            >
              Kelly Limo
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
