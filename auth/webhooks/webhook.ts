import { generateHMAC } from "@/lib/utils";
import { LinkJSON, WebhookEvent } from "@/types/types";
import { Endpoint } from "@prisma/client";

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

  const results = await Promise.allSettled(
    relevantEndpoints.map((endpoint) => {
      const signature = generateHMAC(
        endpoint.signingSecret,
        JSON.stringify(payload)
      );
      return retryFetch(endpoint.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "trackify-webhook-signature": signature,
        },
        body: JSON.stringify(payload),
      });
    })
  );

  results.forEach((result, index) => {
    const endpoint = relevantEndpoints[index];
    if (result.status === "rejected") {
      console.error(
        `[Webhook] Failed to notify ${endpoint.url}`,
        result.reason
      );
      // update the request summary table
    } else if (!result.value.ok) {
      console.error(
        `[Webhook] ${endpoint.url} responded with status ${result.value.status}`
      );
      // update the request summary table
    } else {
      console.info(`[Webhook] Successfully sent event to ${endpoint.url}`);
      // update the request summary table
    }
  });
}
