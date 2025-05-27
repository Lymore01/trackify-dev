import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import LinksSkeleton from "../skeletons/links-skeleton";
import { useAnalytics } from "@/hooks/use-analytics";
import { Table } from "lucide-react";

export default function ViewLinkAnalyticsDetails() {
  const searchParmas = useSearchParams();
  const linkId = searchParmas.get("link");
  const { analyticsData, isError, isLoading } = useAnalytics(linkId ?? "");

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-red-500">Failed to fetch analytics data</p>
      </div>
    );
  }
  const data = analyticsData?.clicks[0]?.clicks;

  return (
    <>
      {isLoading ? (
        [...Array(4)].map((_, idx) => <LinksSkeleton key={idx} />)
      ) : data?.length > 0 ? (
        data.map((dataItem: any) => {
          return (
            <TableRow
              key={dataItem.id}
              className="hover:bg-gray-50 dark:bg-background cursor-pointer"
            >
              <TableCell>
                <p>{new Date(dataItem.createdAt).toLocaleString()}</p>
              </TableCell>
              <TableCell>{dataItem.ip}</TableCell>
              <TableCell>
                <p>{dataItem.country}</p>
              </TableCell>
              <TableCell>
                <p>{dataItem.region ?? "Unknown"}</p>
              </TableCell>
              <TableCell>
                <p>{dataItem.userAgent}</p>
              </TableCell>
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={5} className="text-center">
            <div className="text-gray-500 text-sm p-4">
              No clicks found for this link yet
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
