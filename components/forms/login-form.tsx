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
import { Eye, EyeClosed, EyeClosedIcon, Loader } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const formschema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" }),
  rememberMe: z.boolean().optional(),
});

type FormType = z.infer<typeof formschema>;

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(formschema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push(data.redirectUrl);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = async (values: FormType) => {
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
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Checkbox
                        id="terms1"
                        className="border border-blue-600"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <div className="leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-700"
                        >
                          Remember me for{" "}
                          <span className="text-blue-600 font-semibold">
                            30 days
                          </span>
                        </label>
                      </div>
                    </div>
                    <Link
                      href={"/forgot-password"}
                      className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="submit" className="w-full shrink-0">
          {isPending ? (
            <Loader size={16} className="animate-spin" />
          ) : (
            <span>Login</span>
          )}
        </Button>
        <div className="w-full items-center justify-center flex">
          <p className="font-medium text-zinc-700 text-sm">
            Don't have an account?{" "}
            <Link
              href={"/signup"}
              className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
