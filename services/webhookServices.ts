import { prisma } from "@/lib/prisma";
import { webhookSchema } from "@/validations/webhooksValidation";
import { EventsToSubscribe } from "@prisma/client";
import { z } from "zod";

export async function getWebhookPerAppId({
  appId,
  filters,
}: {
  appId: string;
  filters: any;
}) {
  return prisma.endpoint.findMany({
    where: {
      appId,
      ...filters,
    },
  });
}

export async function updateWebhook(
  id: string,
  endpoint: string,
  data: Partial<z.infer<typeof webhookSchema>>
) {
  const payload: any = {};

  if (data.events)
    payload.subscribedEvents = data.events as EventsToSubscribe[];
  if (data.description) payload.description = data.description;
  if (data.url) payload.url = data.url;

  return prisma.endpoint.update({
    where: {
      id: endpoint,
      appId: id,
    },
    data: payload,
  });
}

export async function deleteWebhook({
  appId,
  endpointId,
}: {
  appId: string;
  endpointId: string;
}) {
  return prisma.endpoint.deleteMany({
    where: {
      appId,
      id: endpointId,
    },
  });
}
