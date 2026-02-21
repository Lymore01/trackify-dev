import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

export default function EndpointsSkeleton() {
  return (
    <TableRow className="border-b border-border/50">
      <TableCell className="py-4 px-4">
        <div className="flex items-center gap-3">
          <Skeleton className="size-4 shrink-0 rounded" />
          <Skeleton className="w-[300px] max-w-full h-4" />
        </div>
      </TableCell>
      <TableCell className="py-4 px-4 pr-8 text-right">
        <Skeleton className="size-8 rounded-full ml-auto" />
      </TableCell>
    </TableRow>
  );
}
