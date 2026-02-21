import { getCurrentUser } from "@/auth/core/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { apiResponse } from "@/lib/utils";
import { createApp, fetchApplications } from "@/services/appServices";
import { createAppSchema } from "@/validations/appValidations";
import { UnauthorizedError, ValidationError } from "@/lib/exceptions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const headers = req.headers;

    const { data: app, success } = createAppSchema.safeParse(body);

    if (!success) {
      throw new ValidationError("Invalid request body");
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
      throw new UnauthorizedError("User not found");
    }

    await createApp(app.appName, user.id);

    return apiResponse({ message: "Application created successfully" }, 201);
  } catch (error) {
    console.error("POST /api/application error:", error);
    return apiResponse(error);
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
      throw new UnauthorizedError("User not found");
    }

    const applications = await fetchApplications(user.id);

    return apiResponse(applications, 200);
  } catch (error) {
    console.error("GET /api/application error:", error);
    return apiResponse(error);
  }
}
