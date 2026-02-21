"use client";

import { motion } from "framer-motion";
import { Webhook } from "lucide-react";
import Image from "next/image";
import React from "react";
import { CTA } from "./cta";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const HeroSection = ({ user }: { user?: any }) => {
  return (
    <div className="w-full pt-44 pb-20 relative flex flex-col items-center overflow-visible">
      {/* Background Ambient Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none delay-700" />

      {/* Architectural Heading Area */}
      <div className="w-[95%] lg:w-[85%] max-w-7xl px-6 mb-20 relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 lg:gap-24"
        >
          <div className="space-y-8">
            <h1 className="text-7xl md:text-9xl lg:text-[130px] font-bold tracking-[-0.06em] text-slate-950 dark:text-white leading-[0.85] mb-6 select-none">
              {["Track.", "Connect.", "Power."].map((word, i) => (
                <motion.span
                  key={i}
                  className="block cursor-default transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.div
              className="flex flex-row sm:items-center gap-3 sm:gap-4 text-muted-foreground text-xl md:text-2xl font-light tracking-tight opacity-70"
              whileHover={{ opacity: 1 }}
            >
              <span className="cursor-default hover:text-foreground transition-colors">
                App Containers.
              </span>
              <span className="inline text-muted-foreground sm:text-border">
                /
              </span>
              <span className="cursor-default hover:text-foreground transition-colors">
                Link Infrastructure.
              </span>
            </motion.div>
          </div>

          <div className="flex flex-col items-start gap-10 max-w-md pt-10 lg:pt-0">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-normal opacity-90">
              Build faster with our developer-friendly SDKs and APIs. Organize
              your projects into App containers to track, manage, and monitor
              link events in real-time.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <CTA user={user} />
              <motion.div
                className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 text-[13px] font-medium text-blue-600/80 dark:text-blue-400/80 backdrop-blur-sm cursor-help"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                New: Webhook Replay V2.0
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Visual Mockup - Cinematic Perspective with subtle float */}
      <motion.div
        className="relative w-[95%] lg:w-[85%] max-w-7xl mx-auto group"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        animate={{
          y: [0, -10, 0],
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <div className="absolute -inset-10 bg-gradient-to-b from-blue-600/10 to-transparent blur-[120px] opacity-40 pointer-events-none"></div>
        <motion.div
          className="relative rounded-[2rem] border border-zinc-200 dark:border-zinc-800/80 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] transition-shadow duration-1000 group-hover:shadow-[0_50px_100px_-10px_rgba(37,99,235,0.2)]"
          whileHover="hover"
          initial="initial"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1200px",
            transform: "translateZ(0)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {/* Static Background layer to prevent blur inheritance during motion */}
          <div className="absolute inset-0 rounded-[2rem] bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl -z-10 pointer-events-none" />

          <div className="p-2 lg:p-3 relative">
            <div className="rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-900 shadow-2xl relative aspect-[14/9] lg:aspect-[16/10]">
              <motion.div
                className="w-full absolute top-0 left-0"
                variants={{
                  initial: { y: 0, rotateX: 0, rotateY: 0 },
                  hover: { y: "-50%", rotateX: 2, rotateY: -1 },
                }}
                transition={{ duration: 6, ease: "linear" }}
              >
                <Image
                  src="/images/trackify-endpoint.webp"
                  alt="Trackify Dashboard"
                  width={2400}
                  height={4000}
                  className="w-full h-auto"
                  style={{
                    imageRendering: "-webkit-optimize-contrast",
                    transform: "translateZ(0)",
                  }}
                  priority
                />
              </motion.div>

              {/* Premium Scroll Indicator */}
              <div className="absolute right-2 top-0 bottom-0 w-1 bg-white/5 dark:bg-zinc-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full my-4 overflow-hidden">
                <motion.div
                  className="w-full bg-blue-500/40 rounded-full"
                  variants={{
                    initial: { height: "20%", y: "0%" },
                    hover: { height: "20%", y: "400%" },
                  }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              </div>
            </div>

            <motion.div
              className="absolute -top-12 -right-8 p-4 rounded-xl bg-white/10 dark:bg-zinc-900/50 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-none hidden lg:block"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ translateZ: "50px" }}
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-emerald-500/20 grid place-content-center text-emerald-400">
                  <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                    Status
                  </p>
                  <p className="text-sm font-bold text-white">200 OK</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-10 -left-6 p-4 rounded-xl bg-white/10 dark:bg-zinc-900/50 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-none hidden lg:block"
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              style={{ translateZ: "80px" }}
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-blue-500/20 grid place-content-center text-blue-400">
                  <Webhook size={18} />
                </div>
                <p className="text-sm font-bold text-white">link_created</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Hotspot = ({
  x,
  y,
  label,
  icon,
  color,
  delay = 0,
}: {
  x: string;
  y: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}) => {
  const colors: any = {
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    indigo: "bg-indigo-500",
  };

  return (
    <motion.div
      className="absolute z-20 group/hotspot"
      style={{ left: x, top: y }}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ delay: 0.5 + delay, type: "spring" }}
    >
      <div className="relative">
        <span
          className={`absolute inset-0 rounded-full ${colors[color]} animate-ping opacity-75`}
        ></span>
        <div
          className={`relative size-3 rounded-full ${colors[color]} shadow-[0_0_15px_${colors[color]}80]`}
        ></div>

        {/* Tooltip */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/hotspot:opacity-100 transition-all duration-300 translate-y-2 group-hover/hotspot:translate-y-0 pointer-events-none">
          <div className="px-3 py-1.5 rounded-lg bg-black/90 text-white text-[11px] font-medium whitespace-nowrap border border-white/10 flex items-center gap-2 shadow-2xl shadow-blue-500/20">
            {icon}
            {label}
          </div>
          <div className="w-2 h-2 bg-black/90 rotate-45 mx-auto -mt-1 border-r border-b border-white/10"></div>
        </div>
      </div>
    </motion.div>
  );
};
