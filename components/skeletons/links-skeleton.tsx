import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

export default function LinksSkeleton() {
  return (
    <TableRow className="hover:bg-gray-50 cursor-pointer">
      <TableCell className="flex items-center gap-2 my-2">
        <Skeleton className="w-[200px] max-w-md h-[30px] rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[100px] h-[30px] rounded-md" />
      </TableCell>
    </TableRow>
  );
}
