"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { Eye, EyeClosed, EyeClosedIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const formschema = z.object({
  name: z
    .string()
    .min(6, { message: "User name should be at least 6 characters long" })
    .max(15, { message: "User name should be less than 15 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" }),
});

export default function RegistrationForm() {
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formschema>) => {
    console.log(values);
    toast.success("User Registered in Successfully");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  autoComplete="off"
                  className="capitalize"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            const [isPasswordVisible, setPasswordVisible] = useState(false);

            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="off"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!isPasswordVisible)}
                      className="absolute right-2 top-2 text-gray-500"
                    >
                      {isPasswordVisible ? (
                        <EyeClosed size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormDescription>
                  Password should be atleast 8 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="w-full">
          Register
        </Button>
        <div className="w-full items-center justify-center flex">
          <p className="font-medium text-zinc-700 text-sm">
            Have an account?{" "}
            <Link
              href={"/login"}
              className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer"
            >
              login
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
