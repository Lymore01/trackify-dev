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
import { WebhookIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function EndpointsTable() {
  const router = useRouter();
  const {app} = useParams()
  const addQueryParameters = (id: string) => {
    router.push(`/dashboard/${app}/webhooks?endpoint=${id}`);
  };
  return (
    <Table className="mt-6 rounded-lg border shadow-md overflow-x-auto">
      <TableCaption>A list of your webhooks endpoints.</TableCaption>
      <TableHeader className="rounded-tr-lg rounded-tl-lg p-4">
        <TableRow className="bg-gray-100 text-gray-600 text-sm uppercase ">
          <TableHead>URL</TableHead>
          <TableHead>Error Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          className="hover:bg-gray-50 cursor-pointer"
          onClick={() => addQueryParameters("jdwkls")}
        >
          <TableCell className="flex items-center gap-2 my-2">
            <WebhookIcon size={16} />
            <p className="truncate max-w-md">
              https://df7b-41-89-16-2.ngrok-free.app/webhook/docx
            </p>
          </TableCell>
          <TableCell>
            <div className="bg-green-100 max-w-[60px] text-green-800 rounded-full px-3 py-1 text-xs font-medium mx-4 my-2">
              0.00%
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
