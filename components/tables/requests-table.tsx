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
import { useRouter } from "next/navigation";
import ViewRequestDetails from "../forms/view-request-details";

export default function RequestsTable() {
  const router = useRouter();
  return (
    <>
      <Table className="mt-6 rounded-lg border shadow-md overflow-x-auto bg-blue-50">
        <TableCaption>A list of your webhooks requests.</TableCaption>
        <TableHeader className="rounded-tr-lg rounded-tl-lg p-4">
          <TableRow className="bg-gray-100 text-gray-600 text-sm uppercase ">
            <TableHead>Event</TableHead>
            <TableHead>Status Code</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ViewRequestDetails />
        </TableBody>
      </Table>
    </>
  );
}
