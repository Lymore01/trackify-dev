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
import { RefreshCcw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAnalytics } from "@/hooks/use-analytics";
import { Button } from "../ui/button";

export default function AnalyticsTable() {
  const searchParmas = useSearchParams();
  const linkId = searchParmas.get("link");
  const { analyticsData, isError, isLoading, refetch, isFetching } =
    useAnalytics(linkId ?? "");

  return (
    <Table className="mt-6 rounded-lg border shadow-md overflow-x-auto bg-blue-50 dark:bg-background">
      {/* <TableCaption>A list of your links analytics.</TableCaption> */}
      <TableHeader className="rounded-tr-lg rounded-tl-lg p-4 dark:bg-accent">
        <TableRow className="bg-muted/50 text-muted-foreground text-sm uppercase dark:bg-accent">
          <TableHead>Date</TableHead>
          <TableHead>IP</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Region</TableHead>
          <TableHead>Device</TableHead>
          <TableHead>UTM Source</TableHead>
          <TableHead>UTM Medium</TableHead>
          <TableHead>UTM Campaign</TableHead>
          <TableHead>Referrer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <ViewLinkAnalyticsDetails
          data={analyticsData?.[0]?.clicks}
          isLoading={isLoading}
          isError={isError}
        />
      </TableBody>
    </Table>
  );
}
