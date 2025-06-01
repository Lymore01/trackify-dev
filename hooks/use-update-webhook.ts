// hooks/useUpdateWebhook.ts
import { webhookFormSchema } from "@/components/forms/edit-webhook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

type WebhookPayload = {
  url?: string;
  description?: string;
  events?: string[];
};

const useUpdateWebhook = (endpoint: string) => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const appId = searchParams.get("appId");
  const { mutateAsync: updateWebhook, isPending } = useMutation({
    mutationFn: async (payload: WebhookPayload) => {
      const res = await fetch(`/api/webhooks/${appId}?endpoint=${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Failed to update webhook");
      }
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["webhook"],
        });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateWebhook, isPending };
};

export default useUpdateWebhook;
