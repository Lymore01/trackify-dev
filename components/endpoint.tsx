import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EllipsisVertical, Loader } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "./ui/separator";
import EndpointDetails from "./endpoint-details";
import EditWebhook from "./forms/edit-webhook";
import { useRef } from "react";
import EditWebhookDescription from "./forms/edit-webhook-description";
import Tag from "./tag";
import TestEndpoint from "./forms/test-endpoint";
import RequestSummary from "./request-summary";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Endpoint({
  endpoint,
}: {
  endpoint: {
    message: string;
    webhooks: {
      id: string;
      url: string;
      description: string;
      subscribedEvents: string[];
      createdAt: string;
      updatedAt: string;
      signingSecret: string;
    }[];
  };
}) {
  const endpointRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLHeadingElement>(null);
  const { app } = useParams();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const appId = searchParams.get("appId");
  const endpointId = searchParams.get("endpoint");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `/api/webhooks/${appId}?endpoint=${endpointId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete endpoint");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete endpoint");
    },
  });

  const handleDeleteEndpoint = async () => {
    await mutateAsync();
    router.push(`/dashboard/${app}/webhooks?app=${appId}`);
    router.refresh();
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/dashboard/${app}/webhooks`}>
                  Endpoints
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{endpoint?.webhooks[0]?.id}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Tag variant={"default"}>Active</Tag>
        </div>
        <div className="flex justify-end items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="cursor-pointer" size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Disable Endpoint</DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 hover:text-red-600"
                onClick={handleDeleteEndpoint}
              >
                {isPending ? (
                  <div className="flex items-center">
                    <Loader className="animate-spin mr-2" size={16} />
                    Deleting...
                  </div>
                ) : (
                  "Delete Endpoint"
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h1 ref={endpointRef}>{endpoint?.webhooks[0].url}</h1>
            <EditWebhook current={endpointRef} />
          </div>
          {/* overview */}
          <div className="rounded-lg border">
            <div className="bg-slate-200 p-2 rounded-tr-lg rounded-tl-lg text-sm text-gray-600">
              <h1>Overview</h1>
            </div>
            <Separator />
            <div className="p-4 text-sm space-y-4">
              <div className="flex justify-between items-center">
                <h1>Description</h1>
                <EditWebhookDescription current={descriptionRef} />
              </div>
              <div className="p-2 border text-gray-600" ref={descriptionRef}>
                {endpoint?.webhooks[0].description || "No description"}
              </div>
            </div>
          </div>
          {/* testing */}
        <TestEndpoint
            endpoint={endpoint?.webhooks[0].url || ""}
            secret="whsec_8"
          />
        </div>
        <EndpointDetails
          createdAt={endpoint?.webhooks[0].createdAt}
          updatedAt={endpoint?.webhooks[0].updatedAt}
          subscribedEvents={endpoint?.webhooks[0].subscribedEvents}
          signingSecret={endpoint?.webhooks[0].signingSecret}
        />
      </div>
      <RequestSummary />
    </div>
  );
}
