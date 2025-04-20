import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { EllipsisVertical } from "lucide-react";
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
import { useRef } from "react";
import EditWebhookDescription from "./forms/edit-webhook-description";
import Tag from "./tag";
import { useSearchParams } from "next/navigation";
import LinkDetails from "./link-details";
import EditLinkDescription from "./forms/edit-link-description";
import EditLinkURL from "./forms/edit-original-url";
import LinkAnalytics from "./link-analytics";

export default function Links() {
  const linkRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLHeadingElement>(null);
  const originalLinkRef = useRef<HTMLHeadingElement>(null)
  const searchParams = useSearchParams();
  const link = searchParams.get("link");
  return (
    <div className="mt-6 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/links">Links</BreadcrumbLink>
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="cursor-pointer" size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Disable link</DropdownMenuItem>
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
            <h1 ref={linkRef}>https://trackify/shortid/cmdkss</h1>
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
                <EditLinkURL current={originalLinkRef} />
              </div>
              <div className="p-2 border text-gray-600" ref={originalLinkRef}>
                https://www.example.com
              </div>
            </div>
            <div className="p-4 text-sm space-y-4">
              <div className="flex justify-between items-center">
                <h1>Description</h1>
                <EditLinkDescription current={descriptionRef} />
              </div>
              <div className="p-2 border text-gray-600" ref={descriptionRef}>
                Shortened example.com
              </div>
            </div>
          </div>
        </div>
        <LinkDetails />
      </div>
      {/* anlaytics */}
      <LinkAnalytics />
    </div>
  );
}
