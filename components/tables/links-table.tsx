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
import { useRouter, useSearchParams } from "next/navigation";
import LinksSkeleton from "../skeletons/links-skeleton";
import { LinkType } from "@/types/types";
import { useUrl } from "@/hooks/use-url";
import { useAnalytics } from "@/hooks/use-analytics";

export default function LinksTable() {
  const searchParams = useSearchParams();
  const app = searchParams.get("app");
  const { isError, isLoading, links } = useUrl({
    appId: app ?? undefined,
  });
  const router = useRouter();
  const appName = searchParams.get("name");

  const addQueryParameters = (id: string) => {
    router.push(`/dashboard/links?app=${app}&name=${appName}&link=${id}`);
  };

  if (isError) {
    return <div>Error fetching links</div>;
  }

  return (
    <Table className="mt-6 rounded-lg border shadow-md overflow-x-auto bg-blue-50 dark:bg-background">
      <TableCaption>A list of your shortened links.</TableCaption>
      <TableHeader className="rounded-tr-lg rounded-tl-lg p-4 dark:bg-accent ">
        <TableRow className="bg-gray-100 text-gray-600 text-sm uppercase dark:bg-accent">
          <TableHead>URL</TableHead>
          <TableHead>Total Clicks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {isLoading ? (
          [...Array(3)].map((_, idx) => <LinksSkeleton key={idx} />)
        ) : links.data?.length > 0 ? (
          links.data.map(
            (
              link: Pick<LinkType, "id" | "original" | "shortId" | "clicks">
            ) => (
              <TableRow
                key={link.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => addQueryParameters(link.shortId)}
              >
                <TableCell className="flex items-center gap-2 my-2">
                  <p className="truncate max-w-md">{link.original}</p>
                </TableCell>
                <TableCell>{link.clicks.length ?? 0}</TableCell>
              </TableRow>
            )
          )
        ) : (
          <TableRow>
            <TableCell colSpan={2} className="text-center">
              <div className="text-gray-500 text-sm p-4">
                No links found for this app. add one
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
