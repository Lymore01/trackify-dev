"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RefObject, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import useUpdateWebhook from "@/hooks/use-update-webhook";
import { Loader } from "lucide-react";

export const webhookFormSchema = z.object({
  url: z.string().url().nonempty("URL is required"),
});

export default function EditWebhook({
  current,
}: {
  current: RefObject<HTMLHeadingElement | null>;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
   const queryClient = useQueryClient();
  const endpoint = searchParams.get("endpoint");
  const form = useForm<z.infer<typeof webhookFormSchema>>({
    resolver: zodResolver(webhookFormSchema),
    defaultValues: {
      url: current?.current?.textContent || "",
    },
  });

  const { updateWebhook, isPending } = useUpdateWebhook(
    endpoint as string,
  );

  const onSubmit = async (values: z.infer<typeof webhookFormSchema>) => {
    await updateWebhook(values);
    setIsDialogOpen(false);
    form.reset();
    queryClient.invalidateQueries({
      queryKey: ["webhooks"],
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="cursor-pointer">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Webhook Endpoint</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <Separator />
        {/* content */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="edit-webhook-form">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={current?.current?.textContent || ""}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex gap-2 items-center">
                    Webhook events will be routed to this endpoint.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
         <DialogFooter className="flex justify-between w-full lg:items-center">
          <Button
            variant={"outline"}
            className="cursor-pointer"
            onClick={() => {
              setIsDialogOpen(false);
              form.reset();
            }}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            type="submit"
            form="edit-webhook-form"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader className="animate-spin" size={16} />
                <span>Submitting...</span>
              </div>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
