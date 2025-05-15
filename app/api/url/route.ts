import { getCurrentUser } from "@/auth/core/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { apiResponse, generateShortId } from "@/lib/utils";
import { createUrl, fetchUrl } from "@/services/urlServices";
import { urlSchema } from "@/validations/urlValidations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data: urlData, success } = urlSchema.safeParse(body);

    if (!success) {
      return apiResponse(
        { success: false, message: "Invalid request body" },
        400
      );
    }

    const headers = req.headers;

    // get users using api key - for sdk use
    const user = await prisma.user.findUnique({
      where: {
        apiKey: headers.get("x-api-key") ?? "",
      },
    });

    // const user = await getCurrentUser({
    //   withFullUser: false,
    //   redirectIfNotFound: false,
    // });

    if (!user) {
      return apiResponse(
        {
          success: false,
          message: "User not found",
        },
        401
      );
    }

    const exisitingShortenedUrl = await fetchUrl({
      appId: urlData.appId,
      originalUrl: urlData.originalUrl,
    });

    if (exisitingShortenedUrl) {
      return apiResponse(
        { success: false, message: "URL already shortened" },
        400
      );
    }

    const shortId = generateShortId();

    const url = await createUrl(
      urlData.originalUrl,
      user.id,
      urlData.appId,
      shortId,
      urlData.description
    );

    if (!url) {
      return apiResponse(
        { success: false, message: "Failed to create URL" },
        500
      );
    }

    return apiResponse(
      { success: true, message: "URL created successfully" },
      201
    );
  } catch (error) {
    console.error("POST /api/url error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const appId = searchParams.get("appId") ?? undefined;
    const shortId = searchParams.get("shortId") ?? undefined;
    const headers = req.headers;

    // get users using api key - for sdk use
    const user = await prisma.user.findUnique({
      where: {
        apiKey: headers.get("x-api-key") ?? "",
      },
    });

    // Todo: uncomment this (for dashboard login) - testing purposes
    /* const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: false,
    });
*/

    if (!user) {
      return apiResponse(
        {
          success: false,
          message: "User not found",
        },
        401
      );
    }

    // todo: user.id
    const urls = await fetchUrl({
      userId: user.id,
      appId: appId,
      shortId: shortId ?? undefined,
    });

    console.log("Headers: ", typeof headers);
    return apiResponse(
      {
        success: true,
        message:
          urls.length > 0 ? "URLs fetched successfully" : "No URLs found",
        data: urls,
      },
      200
    );
  } catch (error) {
    console.error("GET /api/url error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}
