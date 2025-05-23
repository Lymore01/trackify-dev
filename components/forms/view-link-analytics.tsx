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
    <Dialog>
      <DialogTrigger asChild>
        <>
          {isLoading ? (
            [...Array(4)].map((_, idx) => <LinksSkeleton key={idx} />)
          ) : data?.length > 0 ? (
            data.map((dataItem: any) => {
              return (
                <TableRow
                  key={dataItem.id}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <TableCell>
                    <p>{new Date(dataItem.createdAt).toUTCString()}</p>
                  </TableCell>
                  {/* <TableCell className="flex items-center gap-2 my-2">
                      <p className="truncate max-w-md">{data.length}</p>
                    </TableCell> */}
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
            <div className="text-gray-500 text-sm p-4">
              No clicks found for this link yet
            </div>
          )}
        </>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>https://trackify/shortid/cmdkss</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="p-2 max-w-full max-h-[70vh] overflow-auto">graph</div>
        <DialogFooter>
          <Button>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
