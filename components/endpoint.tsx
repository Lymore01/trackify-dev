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
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { LINK_EVENTS, USER_EVENTS } from "@/lib/constants";
import EndpointDetails from "./endpoint-details";
import CodeDisplay from "./code-display";
import EditWebhook from "./forms/edit-webhook";
import { useRef } from "react";
import EditWebhookDescription from "./forms/edit-webhook-description";
import Tag from "./tag";
import TestEndpoint from "./forms/test-endpoint";
import RequestSummary from "./request-summary";
import { useParams } from "next/navigation";

export default function Endpoint({ endpoint }: { endpoint: string }) {
  const endpointRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLHeadingElement>(null);
  const { app } = useParams();
  return (
    <div className="mt-6 flex flex-col">
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
                <BreadcrumbLink>{endpoint}</BreadcrumbLink>
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
              <DropdownMenuItem className="text-red-600 hover:text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h1 ref={endpointRef}>
              https://df7b-41-89-16-2.ngrok-free.app/webhook/docx
            </h1>
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
                Order Updates Webhook
              </div>
            </div>
          </div>
          {/* testing */}
          <TestEndpoint
            endpoint={endpointRef?.current?.textContent || ""}
            secret="whsec_8"
          />
        </div>
        <EndpointDetails />
      </div>
      <RequestSummary />
    </div>
  );
}
