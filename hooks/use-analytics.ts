import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export function useAnalytics(linkId: string) {
  
  const {
    data: analyticsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["link-analytics", linkId],
    queryFn: async () => {
      const response = await fetch(`/api/track?id=${linkId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
      }
      return await response.json();
    },
  });
  return { analyticsData, isLoading, isError };
}
