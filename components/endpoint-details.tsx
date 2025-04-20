import { Info } from "lucide-react";

import { Separator } from "./ui/separator";
import Tag from "./tag";
import AddMoreEvents from "./forms/add-events";
import { useRef } from "react";

export default function EndpointDetails() {
  const secretRef = useRef<HTMLParagraphElement | null>(null);
  return (
    <div className="mt-2 ml-4 space-y-4">
      <div className="space-y-4 text-sm">
        <h1 className="text-zinc-700 ">Creation Date</h1>
        <p>March 7, 2025 at 11:03 PM</p>
      </div>
      <Separator />
      <div className="space-y-4 text-sm">
        <h1 className="text-zinc-700 ">Last Updated</h1>
        <p>March 18, 2025 at 3:48 AM</p>
      </div>
      <Separator />
      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-zinc-700 ">Subscribed Events</h1>
          <AddMoreEvents />
        </div>
        <ul className="space-y-2">
          <li>Link.created</li>
          <li>Link.clicked</li>
        </ul>
      </div>
      <Separator />
      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-zinc-700 ">Signing Secret</h1>
          <Tag variant={"info"}>
            <Info size={12} /> Hover
          </Tag>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-md pointer-events-none"></div>
          <p className="relative text-black blur-sm hover:blur-none transition" ref={secretRef}>
            whsec_8
          </p>
        </div>
      </div>
    </div>
  );
}
