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
import { Loader } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { generateHMAC } from "@/lib/utils";

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
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event: "user.created",
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      ...values,
      ...JSON.parse(payload),
    };
    console.log(data)
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "https://df7b-41-89-16-2.ngrok-free.app/webhook/docx", //! fix: replace it with dynamic url
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "x-webhook-signature": generateHMAC(secret, JSON.stringify(data)),
            "x-api-key": "3b0b1b07-aba4-4188-9173-22a887660ac6", //! fix: remove this
          },
        }
      );
      console.log(response.data)
      setLoading(false);
      toast.success("Test Sent Successfully!");
    } catch (error) {
      setLoading(false);
      toast.error("Test Example Failed!");
    }
  };

  return (
    <div className="rounded-lg border">
      <div className="bg-slate-200 p-2 rounded-tr-lg rounded-tl-lg text-sm text-gray-600">
        <h1>Testing</h1>
      </div>
      <Separator />
      <div className="p-4 text-sm space-y-4">
        <p className="text-gray-600">
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
                        <SelectValue placeholder={USER_EVENTS[0]} />
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

                        <SelectGroup>
                          <SelectLabel>Users</SelectLabel>
                          {USER_EVENTS.map((userEvt, idx) => (
                            <SelectItem value={userEvt} key={`user-${idx}`}>
                              {userEvt}
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
          <CodeDisplay codeString={payload as string} />
        </div>
        <div className="mt-4">
          <Button
            className="cursor-pointer"
            type="submit"
            form="test-endpoint-form"
          >
            {loading ? (
              <Loader className="animate-spin" size={16} />
            ) : (
              <span>Send Example</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
