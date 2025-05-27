"use client";

import ApiTable from "@/components/tables/api-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen, Copy, Info, Loader, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Api() {
  const queryClient = useQueryClient();
  const [updateLoading, setUpdateLoading] = useState(false);
  const {
    data: apiData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["api-key"],
    queryFn: async () => {
      const res = await fetch("/api/api_keys", {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch API key");
      }
      return res.json();
    },
  });

  useEffect(() => {
    console.log(apiData);
  }, [apiData]);

  const handleApiKeyGen = async () => {
    setUpdateLoading(true);
    const res = await fetch("/api/api_keys?new=true", {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      setUpdateLoading(false);
      toast.error("Failed to generate new API key");
      return;
    }
    const data = await res.json();
    if (data.success) {
      setUpdateLoading(false);
      toast.success("New API key generated successfully");
      queryClient.invalidateQueries({
        queryKey: ["api-key"],
      });
    } else {
      setUpdateLoading(false);
      toast.error("Failed to generate new API key");
    }
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-red-500">Error fetching API key</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-max w-[100%] lg:w-[60%] mx-auto my-4 p-2 lg:p-0">
      <div className="flex flex-col">
        <h1 className="text-xl my-2">Api Keys</h1>
        <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-700 ml-2 lg:ml-0">
          <ShieldCheck size={18} className="text-blue-600 mt-1 dark:text-blue-400" />
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Your{" "}
            <span className="font-medium text-blue-700">API credentials</span>{" "}
            for interacting with Trackify’s services. Keep them{" "}
            <span className="font-medium text-blue-700">
              secure and private
            </span>{" "}
            to prevent unauthorized access.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <ApiTable apiKey={apiData?.data} isLoading={isLoading} />
      <div className="mt-4 space-y-4">
        <div className="rounded-lg border">
          <div className="bg-slate-200 dark:bg-accent dark:text-accent-foreground p-2 rounded-tr-lg rounded-tl-lg text-sm text-gray-600">
            <h1>Publishable Key</h1>
          </div>
          <Separator />
          <div className="p-4">
            <div className="text-sm space-y-4">
              <p className="text-gray-600 dark:text-foreground">
                Your publishable secret key ensures secure integration with
                Trackify's SDK; keep it safe and avoid client-side exposure.
              </p>
            </div>
            <div className="flex gap-4 items-center w-full mt-4">
              {isLoading ? (
                <Skeleton className="h-8 w-48 rounded-lg" />
              ) : (
                <p className="max-w-[70%] truncate text-gray-600 text-sm border p-2">
                  {apiData?.data}
                </p>
              )}

              <Button
                variant={"outline"}
                className="cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(apiData?.data || "");
                  toast.success("API key copied to clipboard");
                }}
              >
                <Copy size={16} />
              </Button>
            </div>
            <div className="w-full flex items-center justify-end mt-4">
              <Button className="cursor-pointer" onClick={handleApiKeyGen}>
                {updateLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader className="animate-spin" size={16} /> Generating
                  </div>
                ) : (
                  <span>Generate new key</span>
                )}{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* signing secret */}
      <div className="mt-4 space-y-4">
        <div className="rounded-lg border">
          <div className="bg-slate-200 p-2 rounded-tr-lg rounded-tl-lg text-sm text-gray-600 dark:bg-accent dark:text-accent-foreground">
            <h1>Signing Secret</h1>
          </div>
          <Separator />
          <div className="p-4">
            <div className="text-sm space-y-4">
              <p className="text-gray-600 dark:text-foreground">
                Your signing secret is used to verify the integrity of incoming
                webhook requests. Ensure it is kept confidential and only used
                on your server-side.
              </p>
            </div>
            <div className="flex gap-4 items-center w-full mt-4">
              <div className="flex items-center gap-3 p-4 w-full rounded-lg border bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300">
                <Info className="" size={18} />
                <p className="text-sm leading-relaxed">
                  Each app has its own unique signing secret. Use it to verify
                  the integrity of incoming webhook requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
