import { apiResponse } from "@/lib/utils";
import {
  createWebhookRequest,
  fetchWebhookSummary,
} from "@/services/webhookServices";
import { webhookRequestSchema } from "@/validations/webhooksValidation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data: parsedData, success } = webhookRequestSchema.safeParse(body);

    if (!success) {
      return apiResponse(
        { success: false, message: "Invalid request body" },
        400
      );
    }

    await createWebhookRequest(parsedData);

    return apiResponse(
      {
        success: true,
        message: "Webhook request created",
      },
      201
    );
  } catch (error) {
    console.error("POST /api/webhook-request error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function GET(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const endpointId = searchParams.get("endpoint");

    if (!endpointId) {
      return apiResponse(
        { success: false, message: "Endpoint id required" },
        400
      );
    }

    const data = await fetchWebhookSummary(endpointId);

    return apiResponse(
      {
        success: true,
        message: "Webhook request summary fetched",
        data,
      },
      200
    );
    
  } catch (error) {
    console.error(
      "GET /api/webhook-request?endpoint=${endpointId} error:",
      error
    );
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}
