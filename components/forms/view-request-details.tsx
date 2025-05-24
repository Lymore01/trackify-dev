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
import { mockRequest } from "@/lib/constants";
import Tag from "../tag";
import { Separator } from "../ui/separator";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { webhookRequestSchema } from "@/validations/webhooksValidation";
import { z } from "zod";
import { useState } from "react";

export default function ViewRequestDetails() {
  const searchParams = useSearchParams();
  const endpoint = searchParams.get("endpoint");

  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<z.infer<
    typeof webhookRequestSchema
  > | null>(null);

  const { data: requestData, isPending } = useQuery({
    queryKey: ["request-summary", endpoint],
    queryFn: async () => {
      const res = await fetch(`/api/webhook-requests?endpoint=${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch webhook summary");
      }
      return res.json();
    },
  });

  const handleRowClick = (data: z.infer<typeof webhookRequestSchema>) => {
    setSelectedRequest(data);
    setOpen(true);
  };

  return (
    <>
      {Array.isArray(requestData?.data) && requestData.data.length > 0 ? (
        requestData.data.map(
          (data: z.infer<typeof webhookRequestSchema> & {createdAt: string}, idx: number) => (
            <TableRow
              key={idx}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => handleRowClick(data)}
            >
              <TableCell className="flex items-center gap-2 my-2">
                <p className="truncate max-w-md">{data.eventType}</p>
              </TableCell>
              <TableCell>
                <Tag variant={data.statusCode === 200 ? "default" : "error"}>
                  {data.statusCode}
                  {data.statusCode === 200 ? " OK" : " Fail"}
                </Tag>
              </TableCell>
              <TableCell>
                <p>{data.durationMs}ms</p>
              </TableCell>
              <TableCell>
                <p>{new Date(data.createdAt).toLocaleString()}</p>
              </TableCell>
            </TableRow>
          )
        )
      ) : (
        <div className="text-gray-500 text-sm p-2">
          Request summary not found!
        </div>
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
            <RequestEndpointSummary request={selectedRequest || mockRequest} />
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
