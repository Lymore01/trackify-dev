"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const formSchema = z.object({
  appName: z
    .string()
    .min(2, "Application name should be at least 2 characters long")
    .nonempty("Application name is required"),
});
export default function EditAppDialogTrigger({
  currentAppName,
}: {
  currentAppName: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenuItem
        className="cursor-pointer"
        onSelect={(e) => {
          e.preventDefault();
          setIsDialogOpen(true);
        }}
      >
        Edit App
      </DropdownMenuItem>

      {isDialogOpen && (
        <EditAppDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          currentAppName={currentAppName}
        />
      )}
    </>
  );
}

function EditAppDialog({
  isOpen,
  setIsOpen,
  currentAppName,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  currentAppName: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appName: currentAppName,
    },
  });

  const searchParams = useSearchParams();
  const appId = searchParams.get("app");
  const router = useRouter();

  const { mutateAsync: updateAppName, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await fetch(`/api/application/${appId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update app name");
      return await response.json();
    },
    onSuccess: (data) => {
      toast.success("App name updated");
      router.push(`/dashboard/links?app=${appId}&name=${data.name}`);
      setIsOpen(false);
      form.reset();
      router.refresh();
    },
    onError: (err: any) => toast.error(err.message),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateAppName(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit App Name</DialogTitle>
          <DialogDescription>Update your app's name.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            id="edit-app-name-forms"
          >
            <FormField
              control={form.control}
              name="appName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter new app name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="edit-app-name-forms">
            {isPending ? (
              <Loader size={16} className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
