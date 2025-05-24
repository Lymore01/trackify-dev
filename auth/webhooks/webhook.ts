import { generateHMAC } from "@/lib/utils";
import { LinkJSON, WebhookEvent } from "@/types/types";
import { Endpoint } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function retryFetch(
  url: string | URL | Request,
  options: RequestInit,
  retries = 3,
  delay = 1000
): Promise<Response> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return res;
  } catch (err) {
    if (retries === 0) throw err;
    await new Promise((res) => setTimeout(res, delay));
    return retryFetch(url, options, retries - 1, delay * 2);
  }
}

async function logWebhookRequest({
  appId,
  endpointId,
  statusCode,
  response,
  payload,
  eventType,
  durationMs,
}: {
  appId: string;
  endpointId: string;
  statusCode: number;
  response: any;
  payload: any;
  eventType: string;
  durationMs: number;
}) {
  try {
    await fetch(`${baseUrl}/api/webhook-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        appId,
        endpointId,
        statusCode,
        response,
        payload,
        eventType,
        durationMs,
      }),
    });
  } catch (err) {
    console.error("[Webhook Logger] Failed to log webhook request", err);
  }
}

export async function sendEvents(options: {
  appId: string;
  evt: "link_clicked" | "link_created" | "link_deleted" | "link_updated";
  data: LinkJSON;
  endpoints: Endpoint[];
}) {
  const relevantEndpoints = options.endpoints.filter((endpoint) =>
    endpoint.subscribedEvents.includes(options.evt)
  );

  if (relevantEndpoints.length === 0) {
    console.warn(`[Webhook] No endpoints subscribed to event: ${options.evt}`);
    return;
  }

  const payload: WebhookEvent = {
    type: options.evt,
    data: options.data,
  };

  await Promise.allSettled(
    relevantEndpoints.map(async (endpoint) => {
      const signature = generateHMAC(
        endpoint.signingSecret,
        JSON.stringify(payload)
      );
      const start = Date.now();
      try {
        const response = await retryFetch(endpoint.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "trackify-webhook-signature": signature,
          },
          body: JSON.stringify(payload),
        });

        const durationMs = Date.now() - start;
        const responseText = await response.text();

        if (!response.ok) {
          console.error(
            `[Webhook] ${endpoint.url} responded with ${response.status}`
          );
        } else {
          console.info(`[Webhook] Success: ${endpoint.url}`);
        }

        await logWebhookRequest({
          appId: endpoint.appId,
          endpointId: endpoint.id,
          statusCode: response.status,
          response: responseText,
          payload: payload.data,
          eventType: payload.type,
          durationMs,
        });
      } catch (err: any) {
        console.error(`[Webhook] Failed to notify ${endpoint.url}`, err);
        const durationMs = Date.now() - start;

        await logWebhookRequest({
          appId: endpoint.appId,
          endpointId: endpoint.id,
          statusCode: 500,
          response: err.message,
          payload: payload.data,
          eventType: payload.type,
          durationMs,
        });
      }
    })
  );
}
