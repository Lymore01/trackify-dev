import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

type useUrlOptions = {
  appId?: string;
  shortId?: string;
};

export function useUrl(params: useUrlOptions) {
  const query = new URLSearchParams(params as any).toString();

  const {
    data: links,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["links", query],
    queryFn: async () => {
      const response = await fetch(`/api/url?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch links");
      }

      return await response.json();
    },
  });

  return { links, isLoading, isError };
}
