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

const formSchema = z.object({
  url: z.string().url().nonempty("URL is required"),
});

export default function EditWebhook({
  current,
}: {
  current: RefObject<HTMLHeadingElement | null>;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: current?.current?.textContent || "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
        <DialogFooter className="flex justify-between items-center">
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
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
