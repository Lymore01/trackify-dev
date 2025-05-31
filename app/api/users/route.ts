import { getCurrentUser } from "@/auth/core/getCurrentUser";
import axiosInstance from "@/lib/axios";
import { prisma } from "@/lib/prisma";
import { apiResponse } from "@/lib/utils";
import { fetchUserById } from "@/services/userServices";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const headers = request.headers;
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

    const userData = await fetchUserById(user.id, {
      name: true,
      email: true,
      password: true,
    });

    return apiResponse(
      {
        message: "User fetched successfully",
        data: userData,
      },
      200
    );
  } catch (error) {
    console.error("POST /api/users error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}
