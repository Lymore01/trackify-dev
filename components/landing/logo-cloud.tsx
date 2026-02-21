"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  GitHubLogo,
  LinearLogo,
  StripeLogo,
  SupabaseLogo,
  VercelLogo,
} from "./logos";

export const LogoCloud = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-[95%] lg:w-[85%] max-w-7xl mx-auto px-6 py-20 border-y border-border/40 bg-zinc-500/5 backdrop-blur-3xl"
    >
      <p className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-12 opacity-50">
        Trusted by the next generation of engineers
      </p>
      <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-20 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
        <LogoPlaceholder
          icon={<StripeLogo className="h-6 w-auto" />}
          text="Stripe"
        />
        <LogoPlaceholder
          icon={<GitHubLogo className="h-6 w-auto" />}
          text="GitHub"
        />
        <LogoPlaceholder
          icon={<VercelLogo className="h-6 w-auto" />}
          text="Vercel"
        />
        <LogoPlaceholder
          icon={<LinearLogo className="h-5 w-auto" />}
          text="Linear"
        />
        <LogoPlaceholder
          icon={<SupabaseLogo className="h-5 w-auto" />}
          text="Supabase"
        />
      </div>
    </motion.div>
  );
};

const LogoPlaceholder = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-center gap-2.5 text-muted-foreground transition-all hover:text-foreground">
    <div className="h-6 flex items-center justify-center">{icon}</div>
    <span className="text-lg font-bold tracking-tighter opacity-80">
      {text}
    </span>
  </div>
);
