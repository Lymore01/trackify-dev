"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ViewRequestDetails from "../forms/view-request-details";
import { Button } from "../ui/button";
import { RefreshCcw, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import ConfirmDeletion from "../modals/confirm-deletion";

export default function RequestsTable() {
  const searchParams = useSearchParams();
  const endpointId = searchParams.get("endpoint");
  const queryClient = useQueryClient();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const {
    data: requestData,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["request-summary", endpointId],
    queryFn: async () => {
      if (!endpointId) return [];
      const res = await fetch(`/api/webhook-requests?endpoint=${endpointId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(
          result.error?.message || "Failed to fetch webhook summary",
        );
      }

      return result.data;
    },
    enabled: !!endpointId,
  });

  const { mutate: clearHistory, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/webhook-requests?endpoint=${endpointId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error?.message || "Failed to clear logs");
      return data;
    },
    onSuccess: () => {
      toast.success("Requests history cleared");
      setConfirmOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["request-summary", endpointId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-lg">Activity Logs</h2>
        <div className="flex items-center gap-2">
          {endpointId && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isLoading || isFetching}
                className="cursor-pointer"
              >
                <RefreshCcw
                  size={14}
                  className={`${isFetching ? "animate-spin" : ""}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                disabled={isPending}
                onClick={() => setConfirmOpen(true)}
              >
                <Trash2 size={16} />
                Clear History
              </Button>
            </>
          )}
        </div>
      </div>

      <Table className="mt-4 rounded-lg border shadow-md overflow-x-auto bg-blue-50 dark:bg-background">
        <TableCaption>A list of your webhook requests.</TableCaption>
        <TableHeader className="rounded-tr-lg rounded-tl-lg p-4 dark:bg-accent">
          <TableRow className="bg-muted/50 text-muted-foreground text-sm uppercase dark:bg-accent">
            <TableHead>Event</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Response Preview</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ViewRequestDetails data={requestData} isLoading={isLoading} />
        </TableBody>
      </Table>

      {confirmOpen && (
        <ConfirmDeletion
          onCancel={() => setConfirmOpen(false)}
          onDelete={clearHistory}
          isPending={isPending}
        />
      )}
    </>
  );
}
