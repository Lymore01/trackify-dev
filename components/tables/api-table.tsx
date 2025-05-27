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
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

export default function ApiTable({
  apiKey,
  isLoading,
}: {
  apiKey: string;
  isLoading: boolean;
}) {
  return (
    <Table className="mt-6 rounded-lg border shadow-md overflow-x-auto max-w-full dark:bg-background">
      <TableCaption>A list of your API and secret key.</TableCaption>
      <TableHeader className="rounded-tr-lg rounded-tl-lg p-4 w-full dark:bg-accent">
        <TableRow className="bg-gray-100 text-gray-600 text-sm uppercase relative dark:bg-accent dark:text-accent-foreground">
          <TableHead>
            <p className="lowercase">.env</p>
          </TableHead>
          <td>
            <div
              className="absolute top-3 right-4 flex text-xs gap-2 cursor-pointer font-normal group"
              data-slot="table-row"
              onClick={() => {
                navigator.clipboard.writeText(
                  `TRACKIFY_PUBLISHABLE_KEY=${apiKey}\nTRACKIFY_WEBHOOK_SIGNING_SECRET=your-app-secret-key`
                );
                toast.success("Copied to clipboard");
              }}
            >
              <Copy size={16} />
              <span className="group-hover:transition-colors group-hover:font-bold">
                Copy
              </span>
            </div>
          </td>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="hover:bg-gray-50 cursor-pointer">
          <TableCell className="flex items-center gap-2 my-2">
            <div className="inline-flex items-center">
              TRACKIFY_PUBLISHABLE_KEY:{" "}
              {isLoading ? (
                <Skeleton className="h-8 w-48 rounded-lg ml-2" />
              ) : (
                <span className="ml-4 text-sm text-gray-600 dark:text-muted-foreground">{apiKey}</span>
              )}
            </div>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-gray-50 cursor-pointer">
          <TableCell className="flex items-center gap-2 my-2">
            <p className="inline-flex ">
              TRACKIFY_WEBHOOK_SIGNING_SECRET:{" "}
              <span className="ml-4  transition text-sm text-gray-600 dark:text-muted-foreground">
                your-app-secret-key{" "}
              </span>
            </p>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
