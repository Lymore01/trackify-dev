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
import { sendEvents } from "@/auth/webhooks/webhook";

const formSchema = z.object({
  event: z.string().min(1, "Event type is required") as z.ZodType<EventType>,
});

export default function TestEndpoint({
  endpoint,
  secret,
}: {
  endpoint: string;
  secret: string;
}) {
  const [payload, setPayload] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event: "link_clicked" as EventType, 
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
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "trackify-webhook-signature": generateHMAC(
              secret,
              JSON.stringify(data)
            ),
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        console.log(data);
        return responseData;
      } catch (error) {
        console.error("Error sending webhook request:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success("Test Passed Successfully!");
      console.log("Webhook Test Success:", data);
      // Log the webhook request
    },
    onError: (error) => {
      toast.error("Test Example Failed!");
      console.log("Webhook Test Error:", error);
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
                          <SelectLabel>Links</SelectLabel>
                          {LINK_EVENTS.map((linkEvt, idx) => (
                            <SelectItem value={linkEvt} key={`link-${idx}`}>
                              {linkEvt}
                            </SelectItem>
                          ))}
                        </SelectGroup>

                        {/* <SelectGroup>
                          <SelectLabel>Users</SelectLabel>
                          {USER_EVENTS.map((userEvt, idx) => (
                            <SelectItem value={userEvt} key={`user-${idx}`}>
                              {userEvt}
                            </SelectItem>
                          ))}
                        </SelectGroup> */}
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
          <CodeDisplay codeString={payload as string} />
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
            <Copy
              className="cursor-pointer"
              size={16}
              onClick={() => {
                navigator.clipboard.writeText(
                  generateCurlCommand(endpoint, payload)
                );
                toast.success("cURL command copied to clipboard");
              }}
            />
          </div>
          <CodeDisplay codeString={generateCurlCommand(endpoint, payload)} />
        </div>
      </div>
      <div className="px-4 py-2">
        {/* tests */}
        {webhookData?.summary && (
          <Table className="mt-6 rounded-lg border shadow-md overflow-x-auto">
            <TableCaption>Test results</TableCaption>
            <TableHeader className="rounded-tr-lg rounded-tl-lg p-4">
              <TableRow className="bg-gray-100 text-gray-600 text-sm uppercase ">
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
        )}
      </div>
    </div>
  );
}
