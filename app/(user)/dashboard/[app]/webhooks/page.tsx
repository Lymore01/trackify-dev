"use client";

import Endpoint from "@/components/endpoint";
import AddEndpoint from "@/components/forms/add-endpoint";
import EndpointsTable from "@/components/tables/endpoints-table";
import { Separator } from "@/components/ui/separator";
import { BookOpen, RefreshCcw } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useIsFetching, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function Webhooks() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const endpoint = searchParams.get("endpoint");
  const appId = searchParams.get("appId");
  const { app } = useParams();
  const queryClient = useQueryClient();
  const isFetchingWebhooks = useIsFetching({ queryKey: ["webhooks"] });

  const { data: webhook, isLoading } = useQuery({
    queryKey: ["webhook", appId, endpoint],
    enabled: !!endpoint && !!appId,
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
      const result = await res.json();
      if (!result.success || !result.data) {
        throw new Error(result.error?.message || "Failed to fetch endpoint");
      }
      return {
        message: "success",
        webhooks: result.data,
      };
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
      <div className="flex items-center justify-between">
        <h1 className="text-xl my-2">Webhooks</h1>
        <Button
          variant={"link"}
          className="cursor-pointer underline"
          onClick={() => {
            router.push(`/dashboard/links?app=${appId}&name=${app}`);
          }}
        >
          Links
        </Button>
      </div>
      <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 ml-2 lg:ml-0">
        <BookOpen
          size={18}
          className="text-blue-600 dark:text-blue-400 mt-1 hidden lg:block"
        />
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Learn how to use{" "}
          <span className="font-medium text-blue-700">Webhooks</span> with
          Trackify by reading our{" "}
          <a
            href="/docs/getting-started/webhooks"
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
          <Endpoint endpoint={webhook} isLoading={isLoading} />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">Endpoints</h1>
              <div className="flex gap-2 items-center">
                <Button
                  variant={"outline"}
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => {
                    queryClient.invalidateQueries({
                      queryKey: ["webhooks"],
                    });
                  }}
                  disabled={!!isFetchingWebhooks}
                >
                  <RefreshCcw
                    size={14}
                    className={isFetchingWebhooks ? "animate-spin" : ""}
                  />
                </Button>
                <AddEndpoint />
              </div>
            </div>
            <EndpointsTable />
          </>
        )}
      </div>
    </div>
  );
}
