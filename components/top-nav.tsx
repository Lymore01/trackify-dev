"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowRight, ChevronsUpDown, Info, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useApplications } from "@/hooks/use-applications";
import { AppType } from "@/types/types";

export default function TopNav() {
  const { apps, isError, isLoading } = useApplications();
  const searchParams = useSearchParams();
  const appName = searchParams.get("name");

  return (
    <div className="flex gap-2 items-center text-sm pb-3 mt-4">
      <Link href={"/dashboard"}>Apps</Link>
      <span>/</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Button
              variant={"outline"}
              className="cursor-pointer items-center flex"
            >
              {appName}{" "}
              <span>
                <ChevronsUpDown size={16} />
              </span>
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>Apps</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader size={16} className="animate-spin" />
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center py-4">
              <p className="text-sm text-red-600">
                <Info size={16} />
                <span>Error loading applications</span>
              </p>
            </div>
          ) : apps?.length > 0 ? (
            apps.map((app: Pick<AppType, "id" | "name">) => (
              <AppOption key={app.id} appName={app.name} appId={app.id} />
            ))
          ) : (
            <div className="flex items-center justify-center py-4">
              <span>No apps found</span>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const AppOption = ({ appName, appId }: { appName: string; appId: string }) => {
  const router = useRouter();
  return (
    <DropdownMenuItem
      className="flex w-full items-center justify-between cursor-pointer group"
      onClick={() => {
        router.push(`/dashboard/links?app=${appId}&name=${appName}`);
      }}
    >
      {appName}{" "}
      <div>
        <ArrowRight
          size={16}
          className="hidden group-hover:block transition ease-in ml-4"
        />
      </div>
    </DropdownMenuItem>
  );
};
