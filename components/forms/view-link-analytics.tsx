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
import { ExternalLink } from "lucide-react";

const FALLBACK = (
  <span className="text-muted-foreground/40 select-none">—</span>
);

function truncate(str: string | null | undefined, n: number) {
  if (!str) return null;
  return str.length > n ? str.slice(0, n) + "…" : str;
}

export default function ViewLinkAnalyticsDetails({
  data,
  isLoading,
  isError,
}: {
  data: any;
  isLoading: boolean;
  isError: boolean;
}) {
  if (isError) {
    return (
      <TableRow>
        <TableCell colSpan={9} className="text-center p-4">
          <p className="text-red-500 text-sm">Failed to fetch analytics data</p>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {isLoading ? (
        [...Array(4)].map((_, idx) => <LinksSkeleton key={idx} />)
      ) : data?.length > 0 ? (
        data.map((dataItem: any) => {
          return (
            <TableRow
              key={dataItem.id}
              className="hover:bg-muted/30 dark:bg-background cursor-pointer transition-colors"
            >
              <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(dataItem.createdAt).toLocaleString()}
              </TableCell>
              <TableCell className="text-xs font-mono">
                {dataItem.ip ?? FALLBACK}
              </TableCell>
              <TableCell>{dataItem.country ?? FALLBACK}</TableCell>
              <TableCell>{dataItem.region ?? FALLBACK}</TableCell>
              <TableCell
                className="max-w-[160px] truncate text-xs"
                title={dataItem.userAgent ?? ""}
              >
                {truncate(dataItem.userAgent, 30) ?? FALLBACK}
              </TableCell>
              <TableCell>
                {dataItem.utmSource ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {dataItem.utmSource}
                  </span>
                ) : (
                  FALLBACK
                )}
              </TableCell>
              <TableCell>
                {dataItem.utmMedium ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    {dataItem.utmMedium}
                  </span>
                ) : (
                  FALLBACK
                )}
              </TableCell>
              <TableCell>
                {dataItem.utmCampaign ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    {dataItem.utmCampaign}
                  </span>
                ) : (
                  FALLBACK
                )}
              </TableCell>
              <TableCell className="max-w-[160px]">
                {dataItem.referrer && dataItem.referrer !== "direct" ? (
                  <a
                    href={
                      dataItem.referrer.startsWith("http")
                        ? dataItem.referrer
                        : `https://${dataItem.referrer}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-primary hover:underline truncate"
                    title={dataItem.referrer}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {truncate(dataItem.referrer, 25)}
                    <ExternalLink size={10} className="shrink-0" />
                  </a>
                ) : dataItem.referrer === "direct" ? (
                  <span className="text-xs text-muted-foreground italic">
                    direct
                  </span>
                ) : (
                  FALLBACK
                )}
              </TableCell>
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={9} className="text-center">
            <div className="text-muted-foreground text-sm p-4">
              No clicks found for this link yet
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
