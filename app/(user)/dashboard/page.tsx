"use client";

import ApplicationCard from "@/components/cards/applications-card";
import CreateApplication from "@/components/forms/create-application";
import ApplicationCardSkelton from "@/components/skeletons/application-card-skelton";
import Tag from "@/components/tag";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { delay } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Info, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export type AppType = {
  id: string;
  name: string;
  plan: string;
  updatedAt: Date;
};

export default function Dashboard() {
  const {
    data: apps,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const response = await fetch(`/api/application`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });

  if (isError) return <div>Error fetching applications</div>;
  return (
    <div className="flex flex-col h-max w-[60%] mx-auto my-4 bg-[]">
      <h1 className="text-xl my-2 flex gap-2 items-center">
        Hello👋,{" "}
        <span>
          {isLoading ? (
            <Skeleton className="w-24 h-6" />
          ) : (
            <span>{apps[0]?.user?.name}</span>
          )}
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
          {isLoading ? (
            Array.from({
              length: 4,
            }).map((_, idx) => <ApplicationCardSkelton key={idx} />)
          ) : apps && Array.isArray(apps) && apps.length > 0 ? (
            apps.map((app: AppType) => (
              <ApplicationCard key={app.id} app={app} />
            ))
          ) : (
            <div className="text-gray-500 text-sm">
              Apps not found! Create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
