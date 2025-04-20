"use client";

import AddLink from "@/components/forms/add-link";
import Links from "@/components/links";
import LinksTable from "@/components/tables/links-table";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Link() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const link = searchParams.get("link");
  const app = searchParams.get("app");
  return (
    <div className="flex flex-col h-max w-[60%] mx-auto my-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl my-4">{app}</h1>
        <Button
          variant={"link"}
          className="cursor-pointer"
          onClick={() => {
            router.push(`/dashboard/${app}/webhooks`);
          }}
        >
          Webhooks
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Info size={16} />
        <p className="text-zinc-700 text-sm">
          Overview of {app} shortened links and analytics.
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
