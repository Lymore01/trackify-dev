"use client";

import ApplicationCard from "@/components/cards/applications-card";
import SearchModal from "@/components/modals/search";
import ApplicationCardSkelton from "@/components/skeletons/application-card-skelton";
import { Separator } from "@/components/ui/separator";
import { useApplications } from "@/hooks/use-applications";
import { AppType } from "@/types/types";
import { Info, Search } from "lucide-react";
import { useState } from "react";

export default function Webhook() {
  const { apps, isError, isLoading } = useApplications();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex flex-col h-max w-[100%] lg:w-[60%] mx-auto my-4">
      <h1 className="text-xl my-2 flex gap-2 items-center ml-2 lg:ml-0">
        Webhooks
      </h1>
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-50 border border-blue-200 ml-2 lg:ml-0">
        <Info size={16} className="text-blue-600" />
        <p className="text-sm text-zinc-700">
          <span className="font-medium text-blue-700">Select an App</span> to
          continue.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="mt-4 space-y-4 p-2 lg:p-0">
        <div className="flex items-center justify-between">
          <h1>Applications</h1>
          <Search
            size={16}
            className="cursor-pointer"
            onClick={() => {
              setSearchOpen(true);
            }}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {isLoading ? (
            [...Array(3)].map((_, idx) => <ApplicationCardSkelton key={idx} />)
          ) : apps?.length > 0 ? (
            apps.map((app: AppType) => (
              <ApplicationCard
                key={app.id}
                app={app}
                href={`/dashboard/${app.name}/webhooks?appId=${app.id}`}
              />
            ))
          ) : (
            <div className="text-gray-500 text-sm flex items-center">
              Apps not found! <span className="underline">Create one.</span>
            </div>
          )}
        </div>
      </div>
      {searchOpen && (
        <SearchModal
          type="webhook"
          open={searchOpen}
          openChange={setSearchOpen}
          applications={apps}
        />
      )}
    </div>
  );
}
