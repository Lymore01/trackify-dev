import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export default function ApplicationCardSkelton() {
  return (
    <div className="rounded-lg border">
      <div className="bg-slate-200 p-2 rounded-tr-lg rounded-tl-lg text-sm text-gray-600 flex justify-between items-center">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-20 h-6" />
      </div>

      <Separator />

      <div className="flex items-center justify-between p-4">
        <div className="text-gray-600 text-xs">
          Updated {""}
          <div className="font-semibold">
            <Skeleton className="w-24 h-4" />
          </div>{" "}
        </div>

        <div className="flex gap-1 group items-center text-xs text-zinc-700 cursor-pointer">
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-4 h-4 rounded-full" />
        </div>
      </div>
    </div>
  );
}
