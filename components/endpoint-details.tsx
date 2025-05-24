import { Eye, EyeOff, Info } from "lucide-react";

import { Separator } from "./ui/separator";
import Tag from "./tag";
import AddMoreEvents from "./forms/add-events";
import { useRef, useState } from "react";

export default function EndpointDetails({
  createdAt,
  updatedAt,
  subscribedEvents,
  signingSecret,
}: {
  createdAt: string;
  updatedAt: string;
  subscribedEvents: string[];
  signingSecret: string;
}) {
  const secretRef = useRef<HTMLParagraphElement | null>(null);
  return (
    <div className="mt-2 ml-4 space-y-4">
      <div className="space-y-4 text-sm">
        <h1 className="text-zinc-700 ">Creation Date</h1>
        <p>{new Date(createdAt).toUTCString()}</p>
      </div>
      <Separator />
      <div className="space-y-4 text-sm">
        <h1 className="text-zinc-700 ">Last Updated</h1>
        <p>{new Date(updatedAt).toUTCString()}</p>
      </div>
      <Separator />
      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-zinc-700 ">Subscribed Events</h1>
          <AddMoreEvents />
        </div>
        <ul className="space-y-2">
          {subscribedEvents?.length > 0 ? (
            subscribedEvents.map((event) => (
              <li key={event} className="flex items-center gap-2">
                {event}
              </li>
            ))
          ) : (
            <li className="text-sm text-zinc-500">No events subscribed</li>
          )}
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
        <SecretDisplay signingSecret={signingSecret} />
      </div>
    </div>
  );
}
function SecretDisplay({ signingSecret }: { signingSecret: string }) {
  const [showSecret, setShowSecret] = useState(false);
  const secretRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="relative">
      {!showSecret && (
        <div className="absolute inset-0 bg-white/30 blur-sm pointer-events-none transition-all duration-300 rounded" />
      )}

      <div className="flex items-center">
        <p
          ref={secretRef}
          className={`relative text-black transition-all max-w-full overflow-x-auto whitespace-nowrap ${
            showSecret ? "blur-none" : "blur-xs"
          }`}
        >
          {signingSecret}
        </p>
        <div
          className="ml-2 flex items-start cursor-pointer h-full mt-[-16]"
          onClick={() => setShowSecret(!showSecret)}
        >
          {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
        </div>
      </div>
    </div>
  );
}
