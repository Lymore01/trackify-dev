"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const formschema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formschema>) => {
      const response = await fetch(`/api/users/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to send email");
      }
      return await response.json();
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send email");
    },
  });

  const onSubmit = async (values: z.infer<typeof formschema>) => {
    await mutateAsync(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This email address should be valid.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer">
          {isPending ? (
            <div className="flex gap-2 items-center">
              <Loader className="animate-spin" size={16} /> Submitting...
            </div>
          ) : (
            <span>Submit</span>
          )}
        </Button>
        <div className="w-full items-center justify-center flex">
          <p className="font-medium text-zinc-700 dark:text-muted-foreground text-sm">
            Didn't receive email?{" "}
            {isPending ? (
              <span className="ml-2 text-blue-600">Resending...</span>
            ) : (
              <a
                className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer"
                onClick={() => onSubmit(form.getValues())}
              >
                Re-send
              </a>
            )}
          </p>
        </div>
      </form>
    </Form>
  );
}
