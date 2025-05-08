import { getCurrentUser } from "@/auth/core/getCurrentUser";
import axiosInstance from "@/lib/axios";
import { apiResponse } from "@/lib/utils";
import { fetchUserById } from "@/services/userServices";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: false,
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 401,
        }
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
