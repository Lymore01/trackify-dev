
import { apiResponse } from "@/lib/utils";
import {
  deleteWebhook,
  getWebhookPerAppId,
  updateWebhook,
} from "@/services/webhookServices";
import { webhookSchema } from "@/validations/webhooksValidation";
import { NextRequest } from "next/server";

// get webhooks for a specific app

type Filter = {
  id?: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ appId: string }> }
) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const endpoint = searchParams.get("endpoint");
    const {appId} = await params;

    let filters: Filter = {};

    if (endpoint) {
      filters["id"] = endpoint;
    } else {
      filters = {};
    }

    const webhooks = await getWebhookPerAppId({
      appId,
      filters,
    });

    if (!webhooks) {
      return apiResponse(
        {
          success: false,
          message: "Failed to fetch endpoints",
        },
        400
      );
    }

    return apiResponse(
      {
        success: true,
        message: "Endpoints fetched successfully",
        webhooks,
      },
      200
    );
  } catch (error) {
    console.error("GET /api/webhooks/{appId} error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ appId: string }> }
) {
  try {
    const {appId} = await params;
    const searchParams = new URL(req.url).searchParams;
    const endpoint = searchParams.get("endpoint");

    if (!appId || !endpoint) {
      return apiResponse({ error: "Invalid ID or endpoint" }, 400);
    }

    const body = await req.json();

    const { success, data: updateData } = webhookSchema
      .partial()
      .safeParse(body);

    if (!success) {
      return apiResponse({ error: "Invalid request body" }, 400);
    }

    await updateWebhook(appId, endpoint, updateData);

    return apiResponse(
      { success: true, message: "Webhook Updated Successfully" },
      200
    );
  } catch (error) {
    console.error("PUT /api/webhooks/{appId} error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}

// delete endpoint
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ appId: string }> }
) {
  try {
    const {appId} = await params;
    const searchParams = new URL(req.url).searchParams;
    const endpoint = searchParams.get("endpoint");

    if (!appId || !endpoint) {
      return apiResponse({ error: "Invalid ID or endpoint" }, 400);
    }

    await deleteWebhook({
      appId,
      endpointId: endpoint,
    });

    return apiResponse(
      { success: true, message: "Webhook deleted successfully" },
      200
    );
  } catch (error) {
    console.error("DELETE /api/webhooks/{appId} error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}