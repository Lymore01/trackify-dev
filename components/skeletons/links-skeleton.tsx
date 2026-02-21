import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

export default function LinksSkeleton() {
  return (
    <TableRow className="border-b border-border/40">
      <TableCell className="py-4 px-4 w-full">
        <div className="flex items-center gap-3">
          <Skeleton className="w-full h-4 bg-muted/60" />
        </div>
      </TableCell>
      <TableCell className="py-4 px-4 pr-12 text-right">
        <Skeleton className="w-10 h-5 rounded-full bg-muted/60 ml-auto" />
      </TableCell>
    </TableRow>
  );
}
