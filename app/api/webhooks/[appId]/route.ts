import { apiResponse } from "@/lib/utils";
import {
  deleteWebhook,
  getWebhookPerAppId,
  updateWebhook,
} from "@/services/webhookServices";
import { NextRequest } from "next/server";
import { ValidationError, AppError } from "@/lib/exceptions";
import { z } from "zod";

type Filter = {
  id?: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ appId: string }> },
) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const endpoint = searchParams.get("endpoint");
    const { appId } = await params;

    let filters: Filter = {};

    if (endpoint) {
      filters["id"] = endpoint;
    }

    const webhooks = await getWebhookPerAppId({
      appId,
      filters,
    });

    if (!webhooks) {
      throw new AppError("Failed to fetch endpoints", 400);
    }

    return apiResponse(webhooks, 200);
  } catch (error) {
    console.error("GET /api/webhooks/[appId] error:", error);
    return apiResponse(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ appId: string }> },
) {
  try {
    const { appId } = await params;
    const searchParams = new URL(req.url).searchParams;
    const endpoint = searchParams.get("endpoint");

    if (!appId || !endpoint) {
      throw new ValidationError("Invalid ID or endpoint");
    }

    const body = await req.json();

    const partialSchema = z.object({
      url: z.string().optional(),
      description: z.string().optional(),
      events: z.array(z.string()).optional(),
      app: z.string().optional(),
    });

    const { success, data: updateData } = partialSchema.safeParse(body);

    if (!success) {
      throw new ValidationError("Invalid request body");
    }

    await updateWebhook(appId, endpoint, updateData);

    return apiResponse({ message: "Webhook Updated Successfully" }, 200);
  } catch (error) {
    console.error("PUT /api/webhooks/[appId] error:", error);
    return apiResponse(error);
  }
}

// delete endpoint
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ appId: string }> },
) {
  try {
    const { appId } = await params;
    const searchParams = new URL(req.url).searchParams;
    const endpoint = searchParams.get("endpoint");

    if (!appId || !endpoint) {
      throw new ValidationError("Invalid ID or endpoint");
    }

    await deleteWebhook({
      appId,
      endpointId: endpoint,
    });

    return apiResponse({ message: "Webhook deleted successfully" }, 200);
  } catch (error) {
    console.error("DELETE /api/webhooks/[appId] error:", error);
    return apiResponse(error);
  }
}
