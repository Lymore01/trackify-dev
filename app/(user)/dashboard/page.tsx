"use client";

import ApplicationCard from "@/components/cards/applications-card";
import CreateApplication from "@/components/forms/create-application";
import SearchModal from "@/components/modals/search";
import ApplicationCardSkelton from "@/components/skeletons/application-card-skelton";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useApplications } from "@/hooks/use-applications";
import { useAuth } from "@/hooks/use-auth";
import { AppType } from "@/types/types";
import { Info, Search } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { apps, isError, isLoading } = useApplications();
  const [searchOpen, setSearchOpen] = useState(false);
  const user = useAuth();

  if (isError) return <div>Error fetching applications</div>;
  return (
    <div className="flex flex-col h-max w-[100%] lg:w-[60%] mx-auto my-4">
      <h1 className="text-xl my-2 flex gap-2 items-center ml-2 lg:ml-0">
        Hello👋,{" "}
        <span>
          {isLoading ? (
            <Skeleton className="w-24 h-6" />
          ) : (
            <span>{user.name}</span>
          )}
        </span>
      </h1>

      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 ml-2 lg:ml-0">
        <Info size={16} className="text-blue-600 dark:text-blue-400" />
        <p className="text-sm text-zinc-700 dark:text-zinc-300 gap-2 flex">
          <span className="text-blue-700 dark:text-blue-300 font-medium">
            Overview:
          </span>
          Your current apps at a glance.
        </p>
      </div>
      <Separator className="my-4" />
      {/* applications */}
      <div className="mt-4 space-y-4 p-2 lg:p-0">
        <div className="flex items-center justify-between">
          <h1>Applications</h1>
          <div className="flex items-center gap-4">
            <Search
              size={16}
              className="cursor-pointer"
              onClick={() => {
                setSearchOpen(true);
              }}
            />
            <CreateApplication />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {isLoading ? (
            [...Array(3)].map((_, idx) => <ApplicationCardSkelton key={idx} />)
          ) : apps?.length > 0 ? (
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
      {searchOpen && (
        <SearchModal
          open={searchOpen}
          openChange={setSearchOpen}
          applications={apps}
        />
      )}
    </div>
  );
}
