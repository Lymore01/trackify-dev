"use client";

import { BarChart3, RefreshCcw } from "lucide-react";
import AnalyticsTable from "./tables/analytics-table";
import { Button } from "./ui/button";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";

export default function LinkAnalytics() {
  const queryClient = useQueryClient();
  const isFetchingAnalytics = useIsFetching({ queryKey: ["link-analytics"] });

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg flex items-center gap-2">Analytics</h2>
        <Button
          variant={"outline"}
          size="sm"
          className="cursor-pointer"
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: ["link-analytics"],
            });
          }}
          disabled={!!isFetchingAnalytics}
        >
          <RefreshCcw
            size={14}
            className={isFetchingAnalytics ? "animate-spin" : ""}
          />
        </Button>
      </div>
      <AnalyticsTable />
    </div>
  );
}
