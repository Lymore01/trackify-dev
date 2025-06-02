import { getCurrentUser } from "@/auth/core/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { apiResponse } from "@/lib/utils";
import { createApp, fetchApplications } from "@/services/appServices";
import { createAppSchema } from "@/validations/appValidations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const headers = req.headers;

    const { data: app, success } = createAppSchema.safeParse(body);

    if (!success) {
      return apiResponse(
        { success: false, message: "Invalid request body" },
        400
      );
    }

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
      return apiResponse(
        {
          success: false,
          message: "User not found",
        },
        401
      );
    }

    await createApp(app.appName, user.id);

    return apiResponse({ success: true, message: "Application created" }, 201);
  } catch (error) {
    console.error("POST /api/app error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function GET(req: Request) {
  try {
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
      return apiResponse({ error: "User not found" }, 401);
    }

    // todo: pass user.id instead
    const applications = await fetchApplications(user.id);

    return apiResponse(applications, 200);
  } catch (error) {
    console.error("GET /api/app error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}
