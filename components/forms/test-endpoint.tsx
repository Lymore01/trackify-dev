import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { eventPayloadMap, LINK_EVENTS, USER_EVENTS } from "@/lib/constants";
import { Button } from "../ui/button";
import CodeDisplay from "../code-display";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { EventType } from "@/types/types";
import { Copy, Loader } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { generateCurlCommand, generateHMAC } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Tag from "../tag";

const formSchema = z.object({
  event: z.string().min(1, "Event type is required") as z.ZodType<EventType>,
});

export default function TestEndpoint({
  endpoint,
  secret,
  subscribedEvents = [],
}: {
  endpoint: string;
  secret: string;
  subscribedEvents?: string[];
}) {
  const eventOptions =
    subscribedEvents.length > 0 ? subscribedEvents : LINK_EVENTS;
  const [payload, setPayload] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event: (eventOptions[0] ?? "link_clicked") as EventType,
    },
  });

  const event = form.watch("event");

  useEffect(() => {
    if (event && eventPayloadMap[event]) {
      setPayload(eventPayloadMap[event]);
    } else {
      setPayload("");
    }
  }, [event]);

  const {
    mutateAsync,
    isPending,
    data: webhookData,
  } = useMutation({
    mutationFn: async (data: any) => {
      const signature = generateHMAC(secret, JSON.stringify(data));

      // Proxy through our API route to avoid CORS — browser can't POST directly to external URLs
      const response = await fetch("/api/test-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpointUrl: endpoint,
          payload: data,
          signature,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to reach endpoint");
      }

      return result;
    },
    onSuccess: () => {
      toast.success("Test sent successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Test failed");
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dt = JSON.parse(payload);
    await mutateAsync(dt.data);
  };

  return (
    <div className="rounded-lg border">
      <div className="bg-slate-200 dark:bg-accent dark:text-accent-foreground p-2 rounded-tr-lg rounded-tl-lg text-sm text-gray-600">
        <h1>Testing</h1>
      </div>
      <Separator />
      <div className="p-4 text-sm space-y-4">
        <p className="text-gray-600 dark:text-foreground">
          Use this tool to validate your webhook endpoints and ensure they're
          ready to receive real-time event notifications. Enter your details
          below to simulate events and analyze responses.
        </p>
        {/* event type - selection */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="test-endpoint-form">
            <FormField
              control={form.control}
              name="event"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Send Event</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={LINK_EVENTS[0]} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Subscribed Events</SelectLabel>
                          {eventOptions.map((evt, idx) => (
                            <SelectItem value={evt} key={`evt-${idx}`}>
                              {evt}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        {/* payload */}
        <div>
          <label htmlFor="payload">Payload</label>
          <CodeDisplay language="json" codeString={payload as string} />
        </div>
        <div className="mt-4">
          <Button
            className="cursor-pointer dark:bg-accent dark:text-accent-foreground"
            type="submit"
            form="test-endpoint-form"
          >
            {isPending ? (
              <div className="flex gap-2 items-center">
                <Loader className="animate-spin" size={16} />
                <span>Sending...</span>
              </div>
            ) : (
              <span>Send Example</span>
            )}
          </Button>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <p>Or, Use cURL command</p>
          </div>
          <CodeDisplay
            language="bash"
            codeString={generateCurlCommand(endpoint, payload)}
          />
        </div>
      </div>
      <div className="px-4 py-2">
        {webhookData?.summary && (
          <>
            <p className="text-sm font-medium tracking-wide">Test Results</p>
            <Table className="mt-6 rounded-lg border shadow-md overflow-x-auto bg-blue-50 dark:bg-background">
              <TableHeader className="rounded-tr-lg rounded-tl-lg p-4 dark:bg-accent">
                <TableRow className="bg-muted/50 text-muted-foreground text-sm uppercase dark:bg-accent">
                  <TableHead>Request</TableHead>
                  <TableHead>Status Code</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-gray-50 cursor-pointer">
                  <TableCell className="flex items-center gap-2 my-2">
                    <p className="truncate max-w-md">
                      {webhookData?.summary.method}{" "}
                      {webhookData?.summary.pathName}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Tag
                      variant={
                        webhookData?.summary.statusCode === 200
                          ? "default"
                          : "error"
                      }
                    >
                      {webhookData?.summary.statusCode}
                    </Tag>
                  </TableCell>
                  <TableCell>
                    <p>{webhookData?.summary.time}</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Response body */}
            <div className="mt-4 space-y-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Response Body
              </p>
              <CodeDisplay
                language={
                  typeof webhookData?.response === "string" ? "text" : "json"
                }
                codeString={
                  webhookData?.response == null
                    ? "// No response body"
                    : typeof webhookData.response === "string"
                      ? webhookData.response
                      : JSON.stringify(webhookData.response, null, 2)
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
