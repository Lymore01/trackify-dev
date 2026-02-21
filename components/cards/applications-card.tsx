"use client";

import { ArrowRight } from "lucide-react";
import Tag from "../tag";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { getDaysDifference } from "@/lib/utils";
import { AppType } from "@/types/types";
import { motion } from "framer-motion";

export default function ApplicationCard({
  app,
  href,
}: {
  app: AppType;
  href?: string;
}) {
  const router = useRouter();
  const handleNavigate = () => {
    if (href) {
      router.push(href);
    } else {
      router.push(`/dashboard/links?app=${app.id}&name=${app.name}`);
    }
  };
  return (
    <motion.div
      whileHover={{
        y: -5,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleNavigate}
      className="rounded-lg border bg-card cursor-pointer transition-colors hover:border-primary/50 overflow-hidden"
    >
      <div className="bg-slate-200 dark:bg-accent p-2 text-sm text-gray-600 dark:text-accent-foreground flex justify-between items-center">
        <h1 className="font-bold">{app.name}</h1>
        <Tag variant={app.plan === "Free Plan" ? "warning" : "default"}>
          {app.plan}
        </Tag>
      </div>
      <Separator />
      <div className="flex items-center justify-between p-4">
        <p className="text-gray-600 dark:text-accent-foreground text-xs">
          Created {""}
          <span className="font-semibold">
            {getDaysDifference(app.updatedAt.toLocaleString())}
          </span>{" "}
          days ago
        </p>
        <div className="flex gap-1 group items-center text-xs text-zinc-700 dark:text-accent-foreground font-bold">
          <span>View</span>
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </motion.div>
  );
}
