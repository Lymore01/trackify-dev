"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useDeleteUser() {
  const router = useRouter();

  const { mutateAsync: deleteUserAccount, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/users", {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error?.message || "Failed to delete account");
      }

      return result.data;
    },
    onSuccess: () => {
      toast.success("Account deleted successfully");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete account");
    },
  });

  return { deleteUserAccount, isPending };
}
