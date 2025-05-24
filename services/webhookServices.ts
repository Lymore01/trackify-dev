import { prisma } from "@/lib/prisma";
import {
  webhookRequestSchema,
  webhookSchema,
} from "@/validations/webhooksValidation";
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

export async function createWebhookRequest(
  parsedData: z.infer<typeof webhookRequestSchema>
) {
  return await prisma.webhookRequest.create({
    data: {
      ...parsedData,
      payload: parsedData.payload || {},
      durationMs: parsedData.durationMs || 0,
    },
  });
}

export async function fetchWebhookSummary(endpointId: string) {
  return await prisma.webhookRequest.findMany({
    where: {
      endpointId,
    },
  });
}
