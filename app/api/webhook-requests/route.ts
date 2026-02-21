import { apiResponse } from "@/lib/utils";
import {
  createWebhookRequest,
  deleteWebhookRequests,
  fetchWebhookSummary,
} from "@/services/webhookServices";
import { webhookRequestSchema } from "@/validations/webhooksValidation";
import { ValidationError, AppError } from "@/lib/exceptions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data: parsedData, success } = webhookRequestSchema.safeParse(body);

    if (!success) {
      throw new ValidationError("Invalid request body");
    }

    await createWebhookRequest(parsedData);

    return apiResponse(
      { message: "Webhook request created successfully" },
      201,
    );
  } catch (error) {
    console.error("POST /api/webhook-requests error:", error);
    return apiResponse(error);
  }
}

export async function GET(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const endpointId = searchParams.get("endpoint");

    if (!endpointId) {
      throw new ValidationError("Endpoint id is required");
    }

    const data = await fetchWebhookSummary(endpointId);

    return apiResponse(data, 200);
  } catch (error) {
    console.error("GET /api/webhook-requests error:", error);
    return apiResponse(error);
  }
}

export async function DELETE(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const endpointId = searchParams.get("endpoint");

    if (!endpointId) {
      throw new ValidationError("Endpoint id is required");
    }

    await deleteWebhookRequests(endpointId);

    return apiResponse({ message: "Webhook logs cleared successfully" }, 200);
  } catch (error) {
    console.error("DELETE /api/webhook-requests error:", error);
    return apiResponse(error);
  }
}
