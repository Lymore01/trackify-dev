"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import RequestEndpointSummary from "../request-endpoint-summary";
import Tag from "../tag";
import { Separator } from "../ui/separator";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { webhookRequestSchema } from "@/validations/webhooksValidation";
import { z } from "zod";
import { useState } from "react";

const EVENT_COLOURS: Record<string, string> = {
  link_clicked:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  link_created:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  link_updated:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  link_deleted: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

function getEventColour(eventType: string) {
  return EVENT_COLOURS[eventType] ?? "bg-muted text-muted-foreground";
}

function getDurationColour(ms: number) {
  if (ms > 1000) return "text-red-500 font-semibold";
  if (ms > 500) return "text-yellow-500 font-medium";
  return "text-muted-foreground";
}

function getResponsePreview(response: any): string {
  if (response == null) return "—";
  const raw =
    typeof response === "string" ? response : JSON.stringify(response);
  return raw.length > 45 ? raw.slice(0, 45) + "…" : raw;
}

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function ViewRequestDetails({
  data: requestData,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) {
  const searchParams = useSearchParams();
  const endpoint = searchParams.get("endpoint");

  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<z.infer<
    typeof webhookRequestSchema
  > | null>(null);

  const handleRowClick = (data: z.infer<typeof webhookRequestSchema>) => {
    setSelectedRequest(data);
    setOpen(true);
  };

  return (
    <>
      {Array.isArray(requestData) && requestData.length > 0 ? (
        requestData.map(
          (
            data: z.infer<typeof webhookRequestSchema> & {
              createdAt: string;
              response?: any;
            },
            idx: number,
          ) => (
            <TableRow
              key={idx}
              className="bg-blue-50 text-gray-600 text-sm dark:text-foreground dark:bg-background cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => handleRowClick(data)}
            >
              {/* Event badge */}
              <TableCell className="py-3">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getEventColour(
                    data.eventType,
                  )}`}
                >
                  {data.eventType}
                </span>
              </TableCell>

              {/* Status tag */}
              <TableCell>
                <Tag
                  variant={
                    data.statusCode >= 200 && data.statusCode < 300
                      ? "default"
                      : "error"
                  }
                >
                  {data.statusCode}
                  {data.statusCode >= 200 && data.statusCode < 300
                    ? " OK"
                    : " Fail"}
                </Tag>
              </TableCell>

              {/* Duration with colour */}
              <TableCell>
                <span className={getDurationColour(data.durationMs ?? 0)}>
                  {data.durationMs ?? 0}ms
                </span>
              </TableCell>

              {/* Response preview */}
              <TableCell className="font-mono text-xs text-muted-foreground max-w-[200px] truncate">
                {getResponsePreview(data.response)}
              </TableCell>

              {/* Relative timestamp */}
              <TableCell>
                <span title={new Date(data.createdAt).toLocaleString()}>
                  {timeAgo(data.createdAt)}
                </span>
              </TableCell>
            </TableRow>
          ),
        )
      ) : (
        <TableRow>
          <TableCell colSpan={5} className="text-center p-4">
            <div className="text-gray-500 text-sm p-2">
              No webhook requests yet. Events fired to this endpoint will appear
              here.
            </div>
          </TableCell>
        </TableRow>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Webhook Request Details</DialogTitle>
            <DialogDescription>
              Webhook request summary details
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="p-2 mt-6 max-w-full max-h-[70vh] overflow-auto">
            <RequestEndpointSummary request={selectedRequest} />
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
