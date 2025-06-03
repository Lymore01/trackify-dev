import { getCurrentUser } from "@/auth/core/getCurrentUser";
import { apiResponse, generateAPIKey } from "@/lib/utils";
import { fetchUserById, updateApiKey } from "@/services/userServices";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: false,
    })

    if (!user) {
      return apiResponse({ error: "User not found" }, 401);
    }

    const userData = await fetchUserById(user.id, {
      apiKey: true,
    })

    if (!userData) {
      return apiResponse({ error: "User not found" }, 401);
    }

    return apiResponse(
      {
        success: true,
        message: "API Key fetched",
        data: userData.apiKey,
      },
      200
    );

  } catch (error) {
    console.error("GET /api/api_keys error:", error);
    return apiResponse(
      {
        success: false,
        message: "Internal Server Error!",
      },
      500
    );
  }
}

// new api key
export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const newKey = searchParams.get("new") || "false";

    const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: false,
    });

    if (!user) {
      return apiResponse({ error: "User not found" }, 401);
    }

    if (newKey === "true") {
      const newKey = await generateAPIKey();
      // add the key to the db
      await updateApiKey({
        userId: user.id,
        apiKey: newKey,
      });

      return apiResponse(
        {
          success: true,
          message: "API Key updated",
          data: newKey,
        },
        200
      );
    } else {
      return apiResponse(
        {
          success: false,
          message: "Invalid request",
        },
        400
      );
    }
  } catch (error) {
    console.error("PUT /api/api_keys?new=true error:", error);
    return apiResponse(
      {
        success: false,
        message: "Internal Server Error!",
      },
      500
    );
  }
}
