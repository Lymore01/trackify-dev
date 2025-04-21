import ApiTable from "@/components/tables/api-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Copy } from "lucide-react";

export default function Api() {
  return (
    <div className="flex flex-col h-max w-[60%] mx-auto my-4">
      <h1 className="text-xl my-2">Api Keys</h1>
      <Separator className="my-4" />
      <ApiTable />
      <div className="mt-4 space-y-4">
        <div className="rounded-lg border">
          <div className="bg-slate-200 p-2 rounded-tr-lg rounded-tl-lg text-sm text-gray-600">
            <h1>Publishable Key</h1>
          </div>
          <Separator />
          <div className="p-4">
            <div className="text-sm space-y-4">
              <p className="text-gray-600">
                Your publishable secret key ensures secure integration with
                Trackify's services; keep it safe and avoid client-side
                exposure.
              </p>
            </div>
            <div className="flex gap-4 items-center w-full mt-4">
              <p className="max-w-[70%] truncate text-gray-600 text-sm border p-2">
                pk_test_ZGlzdGluY3QteWV0aS0andItsfakebro
              </p>
              <Button variant={"outline"} className="cursor-pointer">
                <Copy size={16} />
              </Button>
            </div>
            <div className="w-full flex items-center justify-end">
              <Button className="cursor-pointer">Generate new key</Button>
            </div>
          </div>
        </div>
      </div>
      {/* signing secret */}
      <div className="mt-4 space-y-4">
        <div className="rounded-lg border">
          <div className="bg-slate-200 p-2 rounded-tr-lg rounded-tl-lg text-sm text-gray-600">
            <h1>Signing Secret</h1>
          </div>
          <Separator />
          <div className="p-4">
            <div className="text-sm space-y-4">
              <p className="text-gray-600">
                Your signing secret is used to verify the integrity of incoming
                webhook requests. Ensure it is kept confidential and only used
                on your server-side.
              </p>
            </div>
            <div className="flex gap-4 items-center w-full mt-4">
              <p className="ml-4 blur hover:blur-none transition border p-2 text-sm text-gray-600">
                whsec_8{" "}
              </p>
              <Button variant={"outline"} className="cursor-pointer">
                <Copy size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
