"use client";

import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  plan: "Free Plan";
}

export function useAuth() {
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error?.message || "Failed to fetch user");
      }

      return result.data;
    },
    refetchOnWindowFocus: false,
  });

  const user = { ...userData, plan: "Free Plan" } as User;
  return { user, isLoading };
}
