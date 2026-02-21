import { FormType } from "@/components/forms/change-password";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "./use-auth";

export function useUpdatePass(token?: string, email?: string) {
  const { user } = useAuth();

  const { mutateAsync: updatePassword, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      const defaultBody = {
        email: email ? email : user.email,
        newPassword: data.newPass,
        currentPassword: data.currentPass,
      };
      const response = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token ? { token, ...defaultBody } : defaultBody),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error?.message || "Something went wrong");
      }

      return result.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Password changed successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updatePassword, isPending };
}
