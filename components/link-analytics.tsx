"use client";

import { RefreshCcw } from "lucide-react";
import AnalyticsTable from "./tables/analytics-table";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";

export default function LinkAnalytics() {
  const queryClient = useQueryClient();
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <h1>Analytics</h1>
        <Button
          variant={"outline"}
          className="cursor-pointer"
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: ["link-analytics"],
            });
          }}
        >
          <RefreshCcw size={16} />
        </Button>
      </div>
      <AnalyticsTable />
    </div>
  );
}
