"use client";

import { ArrowRight } from "lucide-react";
import Tag from "../tag";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { getDaysDifference } from "@/lib/utils";
import { AppType } from "@/types/types";

export default function ApplicationCard({
  app,
  href,
}: {
  app: AppType;
  href?: string;
}) {
  const router = useRouter();
  const addQueryParameters = (appId: string) => {
    if (href) {
      router.push(href);
    } else {
      router.push(`/dashboard/links?app=${appId}&name=${app.name}`);
    }
  };
  return (
    <div className="rounded-lg border">
      <div className="bg-slate-200 dark:bg-accent p-2 rounded-tr-lg rounded-tl-lg text-sm text-gray-600 dark:text-accent-foreground flex justify-between items-center">
        <h1>{app.name}</h1>
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
        <div
          className="flex gap-1 group items-center text-xs text-zinc-700 dark:text-accent-foreground cursor-pointer"
          onClick={() => addQueryParameters(app.id)}
        >
          <span>View</span>
          <ArrowRight
            size={16}
            className="group-hover:scale-150 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
