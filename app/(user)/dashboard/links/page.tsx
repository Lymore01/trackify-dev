"use client";

import AddLink from "@/components/forms/add-link";
import EditApp from "@/components/forms/edit-app";
import Links from "@/components/links";
import LinksTable from "@/components/tables/links-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { EllipsisVertical, Info, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function Link() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const link = searchParams.get("link");
  const appId = searchParams.get("app");
  const appName = searchParams.get("name");
  const isPending = false; // Replace with actual pending state

  const { mutateAsync: deleteApp, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/application/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete app");
      }
    },
  });

  const handleAppDelete = async () => {
    try {
      await deleteApp(appId!);
      toast.success("App deleted successfully");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to delete app. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col h-max w-[100%] lg:w-[60%] mx-auto my-4 p-2 lg:p-0">
      <div className="flex items-center justify-between">
        <h1 className="text-xl my-2">{appName ?? ""}</h1>
        <div className="flex gap-2 items-center">
          <Button
            variant={"link"}
            className="cursor-pointer"
            onClick={() => {
              router.push(`/dashboard/${appName}/webhooks?appId=${appId}`);
            }}
          >
            Webhooks
          </Button>
          <div className="flex justify-end items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisVertical className="cursor-pointer" size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <EditApp />
                <DropdownMenuItem
                  className="text-red-600 hover:text-red-600"
                  onClick={handleAppDelete}
                >
                  {isDeleting ? (
                    <div className="flex items-center">
                      <Loader className="animate-spin mr-2" size={16} />
                      Deleting...
                    </div>
                  ) : (
                    "Delete App"
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Info size={16} />
        <p className="text-zinc-700 text-sm">
          Overview of {appName} shortened links
        </p>
      </div>
      <Separator className="my-4" />

      {link ? (
        <Links />
      ) : (
        <>
          <div className="mt-4 flex justify-between items-center">
            <h1>Links</h1>
            <AddLink />
          </div>
          <LinksTable />
        </>
      )}
    </div>
  );
}
