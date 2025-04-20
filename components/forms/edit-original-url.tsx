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

export default function EditLinkURL({
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
          <DialogTitle>Edit Original Link URL</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <Separator />
        {/* content */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="edit-link-url-form">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original URL</FormLabel>
                  <FormControl>
                    <Input
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
            form="edit-link-url-form"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
