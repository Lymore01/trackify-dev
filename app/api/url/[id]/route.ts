import { apiResponse } from "@/lib/utils";
import { deleteUrl, updateUrl } from "@/services/urlServices";
import { urlSchema } from "@/validations/urlValidations";
import { NextRequest } from "next/server";
import { sendEvents } from "@/auth/webhooks/webhook";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return apiResponse({ error: "Invalid ID" }, 400);
    }

    const linkData = await prisma.urlShort
      .findUnique({
        where: { id },
        select: {
          shortId: true,
          appId: true,
          App: { select: { endpoint: true } },
        },
      })
      .catch(() => null);

    await deleteUrl(id);

    if (linkData?.shortId) {
      sendEvents({
        appId: linkData.appId ?? "",
        evt: "link_deleted",
        data: { shortId: linkData.shortId } as any,
        endpoints: linkData.App?.endpoint ?? [],
      }).catch((err) =>
        console.error("[Webhook] link_deleted dispatch failed:", err),
      );
    }

    return apiResponse({ success: true, message: "URL deleted" }, 200);
  } catch (error) {
    console.error("DELETE /api/{id}/url error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return apiResponse({ error: "Invalid ID" }, 400);
    }

    const body = await req.json();

    const { success, data: updateData } = urlSchema.partial().safeParse(body);

    if (!success) {
      return apiResponse({ error: "Invalid request body" }, 400);
    }

    const updated = await updateUrl(id, updateData);

    if (updated?.shortId) {
      prisma.urlShort
        .findUnique({
          where: { id },
          select: {
            appId: true,
            App: { select: { endpoint: true } },
          },
        })
        .then((appData) => {
          if (!appData) return;
          sendEvents({
            appId: appData.appId ?? "",
            evt: "link_updated",
            data: { shortId: updated.shortId, ...updateData } as any,
            endpoints: appData.App?.endpoint ?? [],
          });
        })
        .catch((err) =>
          console.error("[Webhook] link_updated dispatch failed:", err),
        );
    }

    return apiResponse({ success: true, message: "URL updated" }, 200);
  } catch (error) {
    console.error("PUT /api/{id}/url error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}
