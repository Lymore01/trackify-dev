import { getCurrentUser } from "@/auth/core/getCurrentUser";
import { apiResponse, generateAPIKey } from "@/lib/utils";
import { fetchUserById, updateApiKey } from "@/services/userServices";
import { NextRequest } from "next/server";
import { UnauthorizedError, ValidationError, AppError } from "@/lib/exceptions";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: false,
    });

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const userData = await fetchUserById(user.id, {
      apiKey: true,
    });

    if (!userData) {
      throw new UnauthorizedError("User not found");
    }

    return apiResponse(userData.apiKey, 200);
  } catch (error) {
    console.error("GET /api/api_keys error:", error);
    return apiResponse(error);
  }
}

// new api key
export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const newKeyRequested = searchParams.get("new") === "true";

    const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: false,
    });

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    if (!newKeyRequested) {
      throw new ValidationError(
        "Invalid request: 'new=true' query parameter is required",
      );
    }

    const apiKey = await generateAPIKey();

    await updateApiKey({
      userId: user.id,
      apiKey: apiKey,
    });

    return apiResponse(
      { message: "API Key updated successfully", apiKey },
      200,
    );
  } catch (error) {
    console.error("PUT /api/api_keys error:", error);
    return apiResponse(error);
  }
}
