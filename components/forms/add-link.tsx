"use client";

import { Plus } from "lucide-react";
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

const formSchema = z.object({
  originalUrl: z.string().url().nonempty("Original URL is required"),
  description: z.string().min(5, "Description must be at least 5 characters").optional(),
});

export default function AddLink() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: "",
      description: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("URL added Successfully!");
  };
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <Plus />
            Add URL
          </Button>
        </DialogTrigger>
        <Separator />

        <DialogContent className="max-h-[90vh] w-[80vw] md:w-[60vw] lg:w-[50vw] overflow-auto">
          <DialogHeader>
            <DialogTitle className="font-medium">Add URL</DialogTitle>
            <DialogDescription>
              Please add a valid URL to be shortend
            </DialogDescription>
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
                name="originalUrl"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative flex gap-1"> 
                    <FormLabel>Original URL</FormLabel>
                    <div className="h-full text-red-400 font-bold">
                      *
                    </div>  
                    </div>
                    <FormControl>
                      <Input
                        placeholder="e.g. https://www.example.com"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>

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
                    <FormDescription>
                      A brief description to simplify tracking and management of
                      your shortened links.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Separator />
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
              form="add-endpoint-form"
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
