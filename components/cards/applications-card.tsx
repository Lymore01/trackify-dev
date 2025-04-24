"use client";

import { ArrowRight } from "lucide-react";
import Tag from "../tag";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { AppType } from "@/app/(user)/dashboard/page";
import { getDaysDifference } from "@/lib/utils";

export default function ApplicationCard({ app }: { app: AppType }) {
  const router = useRouter();
  const addQueryParameters = (appName: string) => {
    router.push(`/dashboard/links?app=${appName}`);
  };
  return (
    <div className="rounded-lg border">
      <div className="bg-slate-200 p-2 rounded-tr-lg rounded-tl-lg text-sm text-gray-600 flex justify-between items-center">
        <h1>{app.name}</h1>
        <Tag variant={app.plan === "Free Plan" ? "warning" : "default"}>
          {app.plan}
        </Tag>
      </div>
      <Separator />
      <div className="flex items-center justify-between p-4">
        <p className="text-gray-600 text-xs">
          Updated {""}
          <span className="font-semibold">
            {getDaysDifference(app.updatedAt.toLocaleString())}
          </span>{" "}
          days ago
        </p>
        <div
          className="flex gap-1 group items-center text-xs text-zinc-700 cursor-pointer"
          onClick={() => addQueryParameters(app.name)}
        >
          <span>Go to app</span>
          <ArrowRight
            size={16}
            className="group-hover:scale-150 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
