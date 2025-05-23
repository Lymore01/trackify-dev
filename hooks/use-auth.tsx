"use client";

import { useQuery } from "@tanstack/react-query";

interface User {
  name: string;
  email: string;
  password: string;
  plan: "Free Plan";
}

export function useAuth(): User {
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  return { ...userData?.data, plan: "Free Plan" };
}
