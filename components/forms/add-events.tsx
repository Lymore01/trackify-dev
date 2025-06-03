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
import useUpdateWebhook from "@/hooks/use-update-webhook";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  app: z.string(),
  url: z.string(),
  description: z.string(),
  events: z.array(z.string()),
});

export default function AddMoreEvents() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const endpoint = searchParams.get('endpoint');
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      app: "",
      url: "",
      description: "",
      events: [],
    },
  });

  const { updateWebhook, isPending } = useUpdateWebhook(endpoint || '');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    await updateWebhook(values);
    setIsDialogOpen(false);
    form.reset();
    queryClient.invalidateQueries({
      queryKey: ["webhooks"],
    });
  };
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="text-blue-600 cursor-pointer">
            <Plus />
            Add
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] w-[80vw] md:w-[60vw] lg:w-[50vw] overflow-auto">
          <DialogHeader>
            <DialogTitle className="font-medium">
              Subscribe To More Events
            </DialogTitle>
            <DialogDescription>Please select an event</DialogDescription>
          </DialogHeader>
          <Separator />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              id="add-event-form"
            >
              <FormField
                control={form.control}
                name="events"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex space-x-2 py-2 flex-col gap-2">
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
              form="add-event-form"
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
    </div>
  );
}
