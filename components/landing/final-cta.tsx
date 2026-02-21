"use client";

import React from "react";
import { CTA } from "./cta";

export const FinalCTA = ({ user }: { user?: any }) => {
  return (
    <section className="py-24 bg-background">
      <div className="w-[95%] lg:w-[85%] max-w-7xl mx-auto px-6 text-center space-y-6">
        <div className="space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Ready to track, connect and power your apps?
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <CTA user={user} />
        </div>
      </div>
    </section>
  );
};
