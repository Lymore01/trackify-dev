"use client";

import AddLink from "@/components/forms/add-link";
import EditAppDialog from "@/components/modals/edit-app";
import Links from "@/components/links";
import ConfirmDeletion from "@/components/modals/confirm-deletion";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Info, Loader, RefreshCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Link() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const link = searchParams.get("link");
  const appId = searchParams.get("app");
  const appName = searchParams.get("name");
  const queryClient = useQueryClient();

  const [confirmDeletionOpen, setConfirmDeletionOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setIsDialogOpen(true);
                  }}
                >
                  Edit App
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 hover:text-red-600"
                  onClick={() => {
                    setConfirmDeletionOpen(true);
                  }}
                >
                  Delete App
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 ml-2 lg:ml-0">
        <Info size={16} className="text-blue-600 dark:text-blue-400" />
        <p className="text-sm text-zinc-700 dark:text-zinc-300 gap-2 flex">
          <span className="text-blue-700 dark:text-blue-300 font-medium">
            Overview:
          </span>
          Shortened links for <span className="font-medium">{appName}</span>
        </p>
      </div>

      <Separator className="my-4" />

      {link ? (
        <Links />
      ) : (
        <>
          <div className="mt-4 flex justify-between items-center">
            <h1>Links</h1>
            <div className="flex gap-2 items-center">
              <Button
                variant={"outline"}
                className="cursor-pointer"
                onClick={() => {
                  queryClient.invalidateQueries({
                    queryKey: ["links"],
                  });
                }}
              >
                <RefreshCcw size={16} />
              </Button>
              <AddLink />
            </div>
          </div>
          <LinksTable />
        </>
      )}
      {confirmDeletionOpen && (
        <ConfirmDeletion
          onCancel={() => setConfirmDeletionOpen(false)}
          onDelete={handleAppDelete}
          isPending={isDeleting}
        />
      )}

      {isDialogOpen && (
        <EditAppDialog
          onCancel={() => {
            setIsDialogOpen(false);
          }}
          currentAppName={appName ?? ""}
        />
      )}
    </div>
  );
}
