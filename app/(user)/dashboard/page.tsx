"use client";

import ApplicationCard from "@/components/cards/applications-card";
import CreateApplication from "@/components/forms/create-application";
import Tag from "@/components/tag";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { delay } from "@/lib/utils";
import { ArrowRight, Info, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const apps = [
  {
    id: 1,
    appName: "Docx",
    plan: "Free Plan",
    lastUpdated: "1 day ago",
    link: "/dashboard/links",
  },
  {
    id: 2,
    appName: "Bintage",
    plan: "Premium Plan",
    lastUpdated: "3 days ago",
    link: "/dashboard/links",
  },
  {
    id: 3,
    appName: "Shortly",
    plan: "Free Plan",
    lastUpdated: "5 hours ago",
    link: "/dashboard/links",
  },
  {
    id: 4,
    appName: "AnalyticsPro",
    plan: "Enterprise Plan",
    lastUpdated: "2 weeks ago",
    link: "/dashboard/links",
  },
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function simulate() {
      setIsLoading(true);
      await delay(3000);
      setIsLoading(false);
    }

    simulate();
  }, []);
  return (
    <div className="flex flex-col h-max w-[60%] mx-auto my-4 bg-[]">
      <h1 className="text-xl my-2 flex gap-2 items-center">
        Hello👋,{" "}
        <span>
          {isLoading ? <Skeleton className="w-24 h-6" /> : <span>Kelly!</span>}
        </span>
      </h1>
      <div className="flex gap-2 items-center">
        <Info size={16} />
        <p className="text-zinc-700 text-sm">Overview of your applications.</p>
      </div>
      <Separator className="my-4" />
      {/* applications */}
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1>Applications</h1>
          <CreateApplication />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {apps.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </div>
  );
}
