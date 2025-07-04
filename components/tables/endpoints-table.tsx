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
import { useQuery } from "@tanstack/react-query";
import { WebhookIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Tag from "../tag";

export type WebhookType = {
  id: string;
  url: string;
  events: string[];
};

export default function EndpointsTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appId = searchParams.get("appId");
  const { app } = useParams();
  const addQueryParameters = (id: string) => {
    router.push(`/dashboard/${app}/webhooks?appId=${appId}&endpoint=${id}`);
  };
  const { data: webhooks } = useQuery({
    queryKey: ["webhooks", appId],
    queryFn: async () => {
      const res = await fetch(`/api/webhooks/${appId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch webhooks");
      }
      const data = await res.json();
      return data;
    },
  });
  return (
    <Table className="mt-6 rounded-lg border shadow-md overflow-x-auto bg-blue-50 dark:bg-background">
      <TableCaption>A list of your webhooks endpoints.</TableCaption>
      <TableHeader className="rounded-tr-lg rounded-tl-lg p-4 dark:bg-accent">
        <TableRow className="bg-gray-100 text-gray-600 text-sm uppercase dark:bg-accent">
          <TableHead>URL</TableHead>
          <TableHead>Error Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {webhooks?.webhooks.length > 0 ? (
          webhooks?.webhooks.map((webhook: WebhookType) => (
            <TableRow
              key={webhook.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => addQueryParameters(webhook.id)}
            >
              <TableCell className="flex items-center gap-2 my-2">
                <WebhookIcon size={16} />
                <p className="truncate max-w-md">{webhook.url}</p>
              </TableCell>
              <TableCell>
               <Tag>
                0.00%
               </Tag>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2} className="text-center">
              <p className=" text-gray-500 my-4 mx-4">
                No webhooks found. Please add a webhook to get started.
              </p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
