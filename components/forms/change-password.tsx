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
import { useState } from "react";
import { Eye, EyeClosed, Loader } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUpdatePass } from "@/hooks/use-update-pass";

const formschema = z
  .object({
    currentPass: z
      .string()
      .min(8, { message: "Password should be at least 8 characters long" }).optional(),
    newPass: z
      .string()
      .min(8, { message: "Password should be at least 8 characters long" }),
    confirmPass: z
      .string()
      .min(8, { message: "Password should be at least 8 characters long" }),
  })
  .refine((data) => data.newPass === data.confirmPass, {
    message: "Passwords do not match",
    path: ["confirmPass"],
  });

export type FormType = z.infer<typeof formschema>;

export default function ChangePassForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const { updatePassword, isPending } = useUpdatePass(
    token ?? undefined,
    email ?? undefined
  );
  const form = useForm<FormType>({
    resolver: zodResolver(formschema),
    defaultValues: {
      newPass: "",
      confirmPass: "",
    },
  });

  const onSubmit = async (values: FormType) => {
    await updatePassword(values);
    if (!token || !email) {
      return;
    }
    router.push("/login");
  };

  const PasswordField = ({
    name,
    label,
    placeholder,
  }: {
    name: keyof FormType;
    label: string;
    placeholder: string;
  }) => {
    const [isVisible, setVisible] = useState(false);
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={isVisible ? "text" : "password"}
                  placeholder={placeholder}
                  className="text-sm lg:text-md"
                  {...field}
                />
                <button
                  type="button"
                  onClick={() => setVisible(!isVisible)}
                  className="absolute right-2 top-2 text-gray-500"
                >
                  {isVisible ? <EyeClosed size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {!token && !email && (
          <PasswordField
            name="currentPass"
            label="Current Password"
            placeholder="Enter your current password"
          />
        )}
        <PasswordField
          name="newPass"
          label="New Password"
          placeholder="Enter a new password"
        />
        <PasswordField
          name="confirmPass"
          label="Confirm New Password"
          placeholder="Re-enter new password"
        />

        <Button type="submit" className="w-full cursor-pointer">
          {isPending ? (
            <Loader size={16} className="animate-spin" />
          ) : (
            <span>Change Password</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
