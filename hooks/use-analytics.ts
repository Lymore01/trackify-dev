import { useQuery } from "@tanstack/react-query";

export function useAnalytics(linkId: string) {
  const {
    data: analyticsData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["link-analytics", linkId],
    queryFn: async () => {
      const response = await fetch(`/api/stats?id=${linkId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error?.message || "Failed to fetch analytics data",
        );
      }

      return result.data;
    },
  });
  return { analyticsData, isLoading, isError, refetch, isFetching };
}
