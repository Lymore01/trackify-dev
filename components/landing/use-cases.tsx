"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Database,
  Handshake,
  Mail,
  Map,
  ShoppingBag,
  Zap,
} from "lucide-react";
import React from "react";

export const UseCasesSection = () => {
  return (
    <section
      id="use-cases"
      className="bg-zinc-950/20 py-32 border-y border-border/20"
    >
      <div className="w-[95%] lg:w-[85%] max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold tracking-tight text-foreground">
              Versatile Use Cases
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              Powerful primitives for every engineering challenge.
            </p>
          </div>
        </div>
        <UseCases />
      </div>
    </section>
  );
};

const UseCases = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12">
      {[
        {
          title: "Marketing Attribution",
          desc: "Track UTMs and conversion rates across all your marketing channels in one unified view.",
          icon: <BarChart3 size={24} />,
          color: "from-blue-500/10 to-transparent",
        },
        {
          title: "Ecommerce Automation",
          desc: "Trigger post-purchase workflows the moment customers interact with your shipping or review links.",
          icon: <ShoppingBag size={24} />,
          color: "from-indigo-500/10 to-transparent",
        },
        {
          title: "SaaS User Journeys",
          desc: "Monitor how users engage with your feature guides and documentation to optimize retention.",
          icon: <Zap size={24} />,
          color: "from-emerald-500/10 to-transparent",
        },
        {
          title: "Affiliate Tracking",
          desc: "Manage partner networks with unique tracking links and real-time conversion webhooks.",
          icon: <Handshake size={24} />,
          color: "from-violet-500/10 to-transparent",
        },
        {
          title: "Transactional Analytics",
          desc: "Measure engagement on system-generated emails like password resets and digital receipts.",
          icon: <Mail size={24} />,
          color: "from-rose-500/10 to-transparent",
        },
        {
          title: "Granular Geo-Intelligence",
          desc: "Capture precise geographic data, device types, and network info for every interaction to tailor local experiences.",
          icon: <Map size={24} />,
          color: "from-amber-500/10 to-transparent",
        },
      ].map((useCase, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -8 }}
          className={`p-10 rounded-[2.5rem] bg-zinc-500/5 backdrop-blur-xl border border-border/40 text-start space-y-6 relative overflow-hidden group`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
          />
          <div className="size-14 rounded-2xl bg-background border border-border/50 flex items-center justify-center text-foreground group-hover:text-blue-500 group-hover:border-blue-500/30 transition-all shadow-xl">
            {useCase.icon}
          </div>
          <div className="space-y-4 relative">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              {useCase.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light text-base">
              {useCase.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
