"use client";

import Tag from "@/components/tag";
import { TESTIMONIALS } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export const TestimonialsSection = () => {
  return (
    <section className="bg-background py-32">
      <div className="w-[95%] lg:w-[85%] max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <Tag variant="info" className="mb-6">
            Global Scale
          </Tag>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Engineering Love
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
            See why the world's most ambitious developers build on Trackify.
          </p>
        </div>
        <Testimonials />
      </div>
    </section>
  );
};

const Testimonials = () => (
  <div className="grid lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto mt-8">
    {TESTIMONIALS.map((t, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
        className="rounded-[2.5rem] p-10 bg-zinc-500/5 backdrop-blur-sm border border-border/50 text-start space-y-8 group hover:border-blue-500/30 transition-colors relative h-full"
      >
        {/* Quote Mark */}
        <div className="absolute top-8 right-10 text-8xl font-serif text-blue-500/10 select-none group-hover:text-blue-500/20 transition-colors">
          “
        </div>

        <p className="text-xl text-foreground font-light leading-relaxed italic relative z-10">
          {t.text}
        </p>

        <div className="flex items-center gap-5 pt-4">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-full border-2 border-border/40 group-hover:border-blue-500/40 transition-colors">
            <Image src={t.image} alt={t.name} layout="fill" objectFit="cover" />
          </div>
          <div>
            <p className="font-bold text-lg text-foreground tracking-tight">
              {t.name}
            </p>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest opacity-60">
              {t.company}
            </p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);
