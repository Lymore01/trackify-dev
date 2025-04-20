"use client";

import Endpoint from "@/components/endpoint";
import AddEndpoint from "@/components/forms/add-endpoint";
import EndpointsTable from "@/components/tables/endpoints-table";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Webhooks() {
  const searchParams = useSearchParams();
  const endpoint = searchParams.get("endpoint");
  const { app } = useParams();
  return (
    <div className="flex flex-col h-max w-[60%] mx-auto my-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/dashboard/links?app=${app}`}>
              {app}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>webhooks</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-xl my-4">Webhooks</h1>
      <div className="flex items-center">
        <BookOpen size={16} />
        <p className="text-sm text-zinc-700 ml-2">
          Learn how to use Webhooks with trackify by reading our webhook
          documentation.
        </p>
        <span className="text-sm hover:underline text-blue-600 ml-2 cursor-pointer">
          View Docs
        </span>
      </div>
      <Separator className="my-4" />
      {/* table */}
      <div className="mt-4">
        {endpoint ? (
          <Endpoint endpoint={endpoint} />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h1>Endpoints</h1>
              <AddEndpoint />
            </div>
            <EndpointsTable />
          </>
        )}
      </div>
    </div>
  );
}
