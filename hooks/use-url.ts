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
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["links", query],
    queryFn: async () => {
      const response = await fetch(`/api/url?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error?.message || "Failed to fetch links");
      }

      return result.data;
    },
  });

  return { links, isLoading, isError, refetch, isFetching };
}
