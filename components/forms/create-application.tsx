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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  applicationName: z
    .string()
    .min(2, "Application name should be atleast 2 characters long")
    .nonempty("Application name is required"),
});

type ApplicationType = z.infer<typeof formSchema>;

export default function CreateApplication() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationName: "",
    },
  });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: ApplicationType) => {
      const response = await fetch("/api/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appName: formData.applicationName,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error?.message || "Failed to create application",
        );
      }

      return result.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Application created successfully");
      setIsDialogOpen(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  const onSubmit = async (values: ApplicationType) => {
    mutate(values);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-lg px-5 h-11 transition-all duration-300 active:scale-95 group">
            <Plus className="size-4 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-normal tracking-tight">
              Create Application
            </span>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] w-[80vw] md:w-[60vw] lg:w-[50vw] overflow-auto">
          <DialogHeader>
            <DialogTitle className="font-medium">
              Create Application
            </DialogTitle>
            <DialogDescription>
              Here, you'll organize and manage all your links seamlessly
            </DialogDescription>
          </DialogHeader>
          <Separator />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              id="create-app-form"
            >
              <FormField
                control={form.control}
                name="applicationName"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative flex gap-1">
                      <FormLabel>Application Name</FormLabel>
                      <div className="h-full text-red-400 font-bold">*</div>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="e.g. lymore"
                        autoComplete="off"
                        {...field}
                      />
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
              form="create-app-form"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex gap-2 items-center">
                  <Loader className="animate-spin" size={16} />
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
