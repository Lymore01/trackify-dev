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
import ViewLinkAnalyticsDetails from "../forms/view-link-analytics";

export default function AnalyticsTable() {
  return (
    <>
      <Table className="mt-6 rounded-lg border shadow-md overflow-x-auto bg-blue-50">
        <TableCaption>A list of your links analytics.</TableCaption>
        <TableHeader className="rounded-tr-lg rounded-tl-lg p-4">
          <TableRow className="bg-gray-100 text-gray-600 text-sm uppercase ">
            <TableHead>Date</TableHead>
            {/* <TableHead>No. of clicks</TableHead> */}
            <TableHead>IP</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Device</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ViewLinkAnalyticsDetails />
        </TableBody>
      </Table>
    </>
  );
}
