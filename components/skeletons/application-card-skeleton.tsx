import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export default function ApplicationCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card overflow-hidden shadow-sm">
      <div className="bg-slate-200 dark:bg-accent p-2 flex justify-between items-center opacity-70">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded h-4 w-4 bg-muted/80" />
          <Skeleton className="w-24 h-4 bg-muted/80" />
        </div>
        <Skeleton className="w-16 h-5 rounded-full bg-muted/80" />
      </div>

      <Separator />

      <div className="flex items-center justify-between p-4">
        <div className="space-y-1">
          <Skeleton className="w-28 h-3" />
          <Skeleton className="w-20 h-3 opacity-60" />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="w-10 h-3" />
          <Skeleton className="size-4 rounded-md" />
        </div>
      </div>
    </div>
  );
}
