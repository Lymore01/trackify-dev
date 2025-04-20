"use client";

import Endpoint from "@/components/endpoint";
import AddEndpoint from "@/components/forms/add-endpoint";
import EndpointsTable from "@/components/tables/endpoints-table";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Webhooks() {
  const searchParams = useSearchParams();
  const endpoint = searchParams.get("endpoint");
  return (
    <div className="flex flex-col h-max w-[60%] mx-auto my-8">
      <h1 className="text-xl my-4">Webhooks</h1>
      <div className="flex items-center">
        <BookOpen size={16} />
        <p className="text-sm text-zinc-700 ml-2">
          Learn how to use Webhooks with trackify by reading our webhook
          documentation.
        </p>
        <span className="text-sm hover:underline text-blue-600 ml-2 cursor-pointer">View Docs</span>
      </div>
      <Separator className="my-4" />
      {/* table */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h1>Endpoints</h1>
          <AddEndpoint />
        </div>
        {endpoint ? <Endpoint endpoint={endpoint} /> : <EndpointsTable />}
      </div>
    </div>
  );
}
