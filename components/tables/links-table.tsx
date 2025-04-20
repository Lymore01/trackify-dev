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
import { useRouter, useSearchParams } from "next/navigation";

export default function LinksTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const app = searchParams.get("app");

  const addQueryParameters = (id: string) => {
    router.push(`/dashboard/links?app=${app}&link=${id}`);
  };
  return (
    <Table className="mt-6 rounded-lg border shadow-md overflow-x-auto">
      <TableCaption>A list of your shortened links.</TableCaption>
      <TableHeader className="rounded-tr-lg rounded-tl-lg p-4">
        <TableRow className="bg-gray-100 text-gray-600 text-sm uppercase ">
          <TableHead>URL</TableHead>
          <TableHead>Total Clicks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          className="hover:bg-gray-50 cursor-pointer"
          onClick={() => addQueryParameters("cmdkss")}
        >
          <TableCell className="flex items-center gap-2 my-2">
            <p className="truncate max-w-md">
              https://www.trackify.com/shortid/cmdkss
            </p>
          </TableCell>
          <TableCell>23</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
