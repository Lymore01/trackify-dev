import { useQuery } from "@tanstack/react-query";

export function useApplications() {
  const {
    data: apps, // Renamed data to apps for clarity
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const response = await fetch(`/api/application`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error?.message || "Failed to fetch applications",
        );
      }

      return result.data;
    },
  });

  return { apps, isLoading, isError, refetch, isFetching };
}
