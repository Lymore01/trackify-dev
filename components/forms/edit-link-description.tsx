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
import { Textarea } from "../ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const formSchema = z.object({
  description: z.string(),
});

export default function EditLinkDescription({
  current,
  linkID,
}: {
  current: RefObject<HTMLHeadingElement | null>;
  linkID: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: current?.current?.textContent || "",
    },
  });
  const queryClient = useQueryClient();

  const { mutateAsync: updateLinkDescription, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await fetch(`/api/url/${linkID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update original link");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links"],
      });
      toast.success("Link description updated successfully!");
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update link description");
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateLinkDescription(values);
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
          <DialogTitle>Edit Link Description</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <Separator />
        {/* content */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="edit-link-desc-form">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={current?.current?.textContent || ""}
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
            form="edit-link-desc-form"
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
