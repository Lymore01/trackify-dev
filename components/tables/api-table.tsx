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

export default function ApiTable() {
  return (
    <Table className="mt-6 rounded-lg border shadow-md overflow-x-auto">
      <TableCaption>A list of your API and secret key.</TableCaption>
      <TableHeader className="rounded-tr-lg rounded-tl-lg p-4 w-full">
        <TableRow className="bg-gray-100 text-gray-600 text-sm uppercase relative">
          <TableHead>
            <p className="lowercase">.env</p>
          </TableHead>
          <td>
            <div
              className="absolute top-3 right-4 flex text-xs gap-2 cursor-pointer font-normal group"
              data-slot="table-row"
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
            <p className="inline-flex ">
              TRACKIFY_PUBLISHABLE_KEY:{" "}
              <span className="ml-4 text-sm text-gray-600">
                pk_test_ZGlzdGluY3QteWV0aSandItsFakeBro{" "}
              </span>
            </p>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-gray-50 cursor-pointer">
          <TableCell className="flex items-center gap-2 my-2">
            <p className="inline-flex ">
              TRACKIFY_WEBHOOK_SIGNING_SECRET:{" "}
              <span className="ml-4 blur hover:blur-none transition text-sm text-gray-600">
                whsec_8{" "}
              </span>
            </p>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
