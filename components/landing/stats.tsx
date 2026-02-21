"use client";

import { STATS } from "@/lib/constants";
import { motion } from "framer-motion";
import React from "react";

export const StatsBar = () => {
  return (
    <section className="w-full py-24 bg-background relative overflow-hidden">
      <div className="w-[95%] lg:w-[85%] max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border border-border/50 rounded-[2rem] p-12 bg-zinc-500/5 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          {STATS.map(({ stat, value }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center space-y-2 relative"
            >
              <h2 className="text-5xl font-bold tracking-tighter text-foreground">
                {stat}
              </h2>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest opacity-60">
                {value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
