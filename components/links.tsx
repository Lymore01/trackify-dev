import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Copy, EllipsisVertical, Loader } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "./ui/separator";

import EditWebhook from "./forms/edit-webhook";
import { startTransition, useRef, useState } from "react";
import EditWebhookDescription from "./forms/edit-webhook-description";
import Tag from "./tag";
import { useRouter, useSearchParams } from "next/navigation";
import LinkDetails from "./link-details";
import EditLinkDescription from "./forms/edit-link-description";
import EditLinkURL from "./forms/edit-original-url";
import LinkAnalytics from "./link-analytics";
import { useUrl } from "@/hooks/use-url";
import { LinkType } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Links() {
  const searchParams = useSearchParams();
  const link = searchParams.get("link");
  const appId = searchParams.get("app");
  const name = searchParams.get("name");
  const { isError, isLoading, links } = useUrl({
    appId: appId ?? undefined,
    shortId: link ?? undefined,
  });
  const linkRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLHeadingElement>(null);
  const originalLinkRef = useRef<HTMLHeadingElement>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const hostName = window.location.origin;
  const data: LinkType = links?.data[0];

  const { mutateAsync: deleteUrl, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/url/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete link");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Link deleted successfully");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred while deleting the link");
      }
    },
  });

  const handleUrlDelete = async () => {
    try {
      setOpen(false);

      router.push(`/dashboard/links?app=${appId}&name=${name}`);
      router.refresh();

      await deleteUrl();
      toast.success("Link deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  if (isError) {
    return <div>Error fetching links</div>;
  }

  if (!data) {
    return (
      <div className="flex items-center w-full text-gray-500 text-sm">
        No link found
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/dashboard/links?app=${appId}&name=${name}`}
                >
                  Links
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{link}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Tag variant={"default"}>Active</Tag>
        </div>
        <div className="flex justify-end items-center">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger>
              <EllipsisVertical className="cursor-pointer" size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Disable link</DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 hover:text-red-600"
                onClick={handleUrlDelete}
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex gap-2 items-center">
                    <Loader className="animate-spin" size={16} />
                    <span>deleting...</span>
                  </div>
                ) : (
                  <span>Delete</span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h1 ref={linkRef}>
              {hostName}/u/{data.shortId}
            </h1>
            <div>
              <Copy size={16} className="cursor-pointer" />
            </div>
          </div>
          {/* overview */}
          <div className="rounded-lg border">
            <div className="bg-slate-200 p-2 rounded-tr-lg rounded-tl-lg text-sm text-gray-600">
              <h1>Overview</h1>
            </div>
            <Separator />
            <div className="p-4 text-sm space-y-4">
              <div className="flex justify-between items-center">
                <h1>Original URL</h1>
                <EditLinkURL current={originalLinkRef} linkID={data.id} />
              </div>
              <div className="p-2 border text-gray-600" ref={originalLinkRef}>
                {data.original}
              </div>
            </div>
            <div className="p-4 text-sm space-y-4">
              <div className="flex justify-between items-center">
                <h1>Description</h1>
                <EditLinkDescription
                  current={descriptionRef}
                  linkID={data.id}
                />
              </div>
              <div className="p-2 border text-gray-600" ref={descriptionRef}>
                {data.description}
              </div>
            </div>
          </div>
        </div>
        <LinkDetails
          createdAt={data.createdAt}
          updatedAt={data.updatedAt}
          trackingId={data.shortId}
        />
      </div>
      {/* anlaytics */}
      <LinkAnalytics />
    </div>
  );
}
