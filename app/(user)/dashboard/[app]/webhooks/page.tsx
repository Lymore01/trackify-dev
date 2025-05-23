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
import { useQuery } from "@tanstack/react-query";

export default function Webhooks() {
  const searchParams = useSearchParams();
  const endpoint = searchParams.get("endpoint");
  const appId = searchParams.get("appId");
  const { app } = useParams();

  const { data: webhook } = useQuery({
    queryKey: ["webhook", appId, endpoint],
    queryFn: async () => {
      const res = await fetch(`/api/webhooks/${appId}?endpoint=${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch webhooks");
      }
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="flex flex-col h-max w-[100%] lg:w-[60%] mx-auto my-4 p-2 lg:p-0 ">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/dashboard/${app}/webhooks?appId=${appId}`}>
              {app}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>webhooks</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-xl my-2">Webhooks</h1>
      <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
        <BookOpen size={18} className="text-blue-600 mt-1 hidden lg:block" />
        <p className="text-sm text-zinc-700">
          Learn how to use{" "}
          <span className="font-medium text-blue-700">Webhooks</span> with
          Trackify by reading our
          <a
            href="/docs/webhooks"
            className="text-blue-600 font-medium ml-1 hover:underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            documentation.
          </a>
        </p>
      </div>
      <Separator className="my-4" />
      {/* table */}
      <div className="mt-4">
        {endpoint ? (
          <Endpoint endpoint={webhook} />
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
