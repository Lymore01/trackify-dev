"use client";

import { Eye, EyeOff, Info, Loader, X } from "lucide-react";
import { Separator } from "./ui/separator";
import Tag from "./tag";
import AddMoreEvents from "./forms/add-events";
import { useRef, useState } from "react";
import useUpdateWebhook from "@/hooks/use-update-webhook";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
  return (
    <div className="mt-2 ml-4 space-y-4">
      <div className="space-y-4 text-sm">
        <h1 className="text-zinc-700 dark:text-foreground">Creation Date</h1>
        <p className="text-muted-foreground">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
      <Separator />
      <div className="space-y-4 text-sm">
        <h1 className="text-zinc-700 dark:text-foreground">Last Updated</h1>
        <p className="text-muted-foreground">
          {new Date(updatedAt).toLocaleString()}
        </p>
      </div>
      <Separator />
      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-zinc-700 dark:text-foreground">
            Subscribed Events
          </h1>
          <AddMoreEvents currentEvents={subscribedEvents} />
        </div>
        <EventsList subscribedEvents={subscribedEvents} />
      </div>
      <Separator />
      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-zinc-700 dark:text-foreground">Signing Secret</h1>
          {/* <Tag variant={"info"}>
            <Info size={12} /> Hover
          </Tag> */}
        </div>
        <SecretDisplay signingSecret={signingSecret} />
      </div>
    </div>
  );
}

function EventsList({ subscribedEvents }: { subscribedEvents: string[] }) {
  const searchParams = useSearchParams();
  const endpointId = searchParams.get("endpoint") ?? "";
  const { updateWebhook, isPending } = useUpdateWebhook(endpointId);
  const queryClient = useQueryClient();
  const [removingEvent, setRemovingEvent] = useState<string | null>(null);

  const handleRemove = async (eventToRemove: string) => {
    const updated = subscribedEvents.filter((e) => e !== eventToRemove);
    setRemovingEvent(eventToRemove);
    try {
      await updateWebhook({ events: updated });
      queryClient.invalidateQueries({ queryKey: ["webhook"] });
      toast.success(`Removed "${eventToRemove}"`);
    } catch {
      toast.error("Failed to remove event");
    } finally {
      setRemovingEvent(null);
    }
  };

  return (
    <ul className="space-y-2">
      {subscribedEvents?.length > 0 ? (
        subscribedEvents.map((event) => (
          <li
            key={event}
            className="flex items-center justify-between gap-2 text-muted-foreground group"
          >
            <span className="text-sm">{event}</span>
            <button
              onClick={() => handleRemove(event)}
              disabled={isPending}
              title={`Remove ${event}`}
              className="text-muted-foreground rounded-full hover:text-red-600 transition-colors disabled:cursor-not-allowed"
            >
              {removingEvent === event ? (
                <Loader size={13} className="animate-spin" />
              ) : (
                <X size={13} />
              )}
            </button>
          </li>
        ))
      ) : (
        <li className="text-sm text-zinc-500 dark:text-muted-foreground">
          No events subscribed
        </li>
      )}
    </ul>
  );
}

function SecretDisplay({ signingSecret }: { signingSecret: string }) {
  const [showSecret, setShowSecret] = useState(false);
  const secretRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="relative">
      {!showSecret && (
        <div className="absolute inset-0 bg-white/30 dark:bg-zinc-800/50 blur-sm pointer-events-none transition-all duration-300 rounded" />
      )}
      <div className="flex items-center justify-center">
        <p
          ref={secretRef}
          className={`relative text-zinc-800 dark:text-zinc-200 transition-all max-w-full overflow-x-auto whitespace-nowrap ${
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
