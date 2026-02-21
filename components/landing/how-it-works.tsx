"use client";

import Tag from "@/components/tag";
import { howItWorksSection } from "@/lib/constants";
import { motion } from "framer-motion";
import React from "react";

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-background py-32 relative">
      <div className="w-[95%] lg:w-[85%] max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Tag
              variant="info"
              className="bg-blue-500/5 text-blue-600 border-blue-500/10"
            >
              Architecture
            </Tag>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 leading-tight">
            The Trackify Workflow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            A streamlined approach to managing your infrastructure's event
            lifecycle.
          </p>
        </div>

        <div className="relative space-y-24 before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:-ml-px before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/50 before:to-transparent">
          {howItWorksSection.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Dot */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full border border-border bg-background shadow-xl z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-shadow group-hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                <span className="text-xl font-bold font-mono text-foreground/80">
                  {i + 1}
                </span>
              </div>

              {/* Content */}
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 md:p-10 rounded-3xl border border-transparent transition-all group-hover:border-border/50 group-hover:bg-zinc-500/5 group-hover:backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-foreground uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base font-light opacity-80">
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
