"use client";

import { Loader, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import EventSelection from "../events-selection";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useParams, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const formSchema = z.object({
  url: z.string().url().nonempty("URL is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  events: z.array(z.string()),
  app: z.string(),
});

export default function AddEndpoint() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const appId = searchParams.get("appId");
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      description: "",
      events: [],
      app: appId as string,
    },
  });
  const { mutateAsync: addEndpoint, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await fetch("/api/webhooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Endpoint created successfully!");
        setIsDialogOpen(false);
        form.reset();
        queryClient.invalidateQueries({
          queryKey: ["webhooks", appId],
        });
      } else {
        toast.error(data.message || "Failed to create endpoint");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while creating the endpoint");
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form values:", values);
    await addEndpoint(values);
  };
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <Plus />
            Add Endpoint
          </Button>
        </DialogTrigger>
        <Separator />

        <DialogContent className="max-h-[90vh] w-[80vw] md:w-[60vw] lg:w-[50vw] overflow-auto">
          <DialogHeader>
            <DialogTitle className="font-medium">Add Enpoint</DialogTitle>
            <DialogDescription>Please add a valid endpoint</DialogDescription>
          </DialogHeader>
          <Separator />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              id="add-endpoint-form"
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endpoint URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. https://www.example.com/webhook"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="flex gap-2 items-center">
                      Configure an endpoint or test with{" "}
                      <span className="hover:underline text-blue-600">
                        tracky
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="An option description on what the endpoint is used for."
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* events */}
              <FormField
                control={form.control}
                name="events"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscribe to events</FormLabel>
                    <FormControl>
                      <div className="flex space-x-2 py-2 flex-col gap-2">
                        {/* search */}
                        {/* <Input placeholder="Search for events..." /> */}
                        <EventSelection field={field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Separator />
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
              form="add-endpoint-form"
            >
              {isPending ? (
                <div className="flex gap-2 items-center">
                  <Loader className="animate-spin" size-16 />
                  <span>Creating...</span>
                </div>
              ) : (
                <span>Create</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
