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

  const onSubmit = (values: z.infer<typeof formschema>) => {
    console.log(values);
    toast.success("Email has been sent");
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
        <Button type="submit" className="w-full">
          Submit
        </Button>
        <div className="w-full items-center justify-center flex">
          <p className="font-medium text-zinc-700 text-sm">
            Didn't recieve email?{" "}
            <a className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer">
              Re-send
            </a>
          </p>
        </div>
      </form>
    </Form>
  );
}
