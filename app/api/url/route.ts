import { getCurrentUser } from "@/auth/core/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { apiResponse, generateShortId } from "@/lib/utils";
import { createUrl, fetchUrl } from "@/services/urlServices";
import { urlSchema } from "@/validations/urlValidations";
import { UnauthorizedError, ValidationError, AppError } from "@/lib/exceptions";
import { sendEvents } from "@/auth/webhooks/webhook";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data: urlData, success } = urlSchema.safeParse(body);

    if (!success) {
      throw new ValidationError("Invalid request body");
    }

    const headers = req.headers;

    // SDK use: check for API key
    let user = null;
    const apiKey = headers.get("x-api-key");
    if (apiKey) {
      user = await prisma.user.findUnique({
        where: { apiKey },
      });
    } else {
      // Dashboard use: get current user
      user = await getCurrentUser({
        withFullUser: false,
        redirectIfNotFound: false,
      });
    }

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const exisitingShortenedUrl = await fetchUrl({
      appId: urlData.appId,
      originalUrl: urlData.originalUrl,
    });

    if (exisitingShortenedUrl) {
      throw new AppError("URL already shortened", 400, "URL_ALREADY_EXISTS");
    }

    const shortId = generateShortId();

    const url = await createUrl(
      urlData.originalUrl,
      user.id,
      urlData.appId,
      shortId,
      urlData.description,
    );

    if (!url) {
      throw new AppError("Failed to create URL", 500);
    }

    prisma.app
      .findUnique({
        where: { id: urlData.appId },
        select: { endpoint: true },
      })
      .then((appInfo) => {
        if (appInfo?.endpoint) {
          sendEvents({
            appId: urlData.appId,
            evt: "link_created",
            data: url as any,
            endpoints: appInfo.endpoint,
          });
        }
      })
      .catch((err) =>
        console.error("[Webhook] link_created dispatch failed:", err),
      );

    return apiResponse({ message: "URL created successfully", url }, 201);
  } catch (error) {
    console.error("POST /api/url error:", error);
    return apiResponse(error);
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const appId = searchParams.get("appId") ?? undefined;
    const shortId = searchParams.get("shortId") ?? undefined;
    const headers = req.headers;

    // SDK use: check for API key
    let user = null;
    const apiKey = headers.get("x-api-key");
    if (apiKey) {
      user = await prisma.user.findUnique({
        where: { apiKey },
      });
    } else {
      // Dashboard use: get current user
      user = await getCurrentUser({
        withFullUser: false,
        redirectIfNotFound: false,
      });
    }

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const urls = await fetchUrl({
      userId: user.id,
      appId: appId,
      shortId: shortId ?? undefined,
    });

    return apiResponse(urls, 200);
  } catch (error) {
    console.error("GET /api/url error:", error);
    return apiResponse(error);
  }
}
