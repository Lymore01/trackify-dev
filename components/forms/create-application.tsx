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
  applicationName: z.string().min(5, "Application name should be atleast 5 characters long").nonempty("Application name is required"),
});

export default function CreateApplication() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationName: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Application Created Successfully!");
  };
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <Plus />
            Create Application
          </Button>
        </DialogTrigger>
        <Separator />

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
              form="create-app-form"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
