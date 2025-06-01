import { AnimatePresence, motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { Loader, XIcon } from "lucide-react";
import { Button } from "../ui/button";

const formSchema = z.object({
  appName: z
    .string()
    .min(2, "Application name should be at least 2 characters long")
    .nonempty("Application name is required"),
});

export default function EditAppDialog({
  currentAppName,
  onCancel,
}: {
  currentAppName: string;
  onCancel: () => void;
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
      toast.success(data.message);
      form.reset({ appName: data.name });
      onCancel();
      router.replace(`/dashboard/links?app=${appId}&name=${data.name}`);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateAppName(values);
  };
  return (
    <AnimatePresence>
      {/* overlay */}
      <motion.div
        key="edit-app-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid place-content-center w-full h-screen fixed top-0 left-0 bg-black/50 z-50"
        onClick={onCancel}
        aria-modal="true"
        data-testid="edit-app-modal-overlay"
      >
        <motion.div
          initial={{ y: 0, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* header */}
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h1 className="text-lg leading-none font-semibold">Edit App</h1>
            <p className="text-muted-foreground text-sm">Update your app's name.</p>
          </div>
          <Separator />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              id="edit-app-name-form"
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
          {/* footer */}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              className="text-gray-800 dark:text-foreground border-gray-200 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-accent dark:hover:text-accent-foreground cursor-pointer"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className="flex items-center gap-2 cursor-pointer"
              type="submit"
              form="edit-app-name-form"
            >
              {isPending ? (
                <div className="flex items-center">
                  <Loader className="animate-spin mr-2" size={16} />
                  Submitting...
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
          <div
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer"
            onClick={onCancel}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
