import { useQuery } from "@tanstack/react-query";

export function useApplications() {
  const {
    data: apps,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const response = await fetch(`/api/application`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });

  return { apps, isLoading, isError };
}
