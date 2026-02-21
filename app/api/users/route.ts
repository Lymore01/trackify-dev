import { getCurrentUser } from "@/auth/core/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { apiResponse } from "@/lib/utils";
import { fetchUserById } from "@/services/userServices";
import { UnauthorizedError } from "@/lib/exceptions";

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
      throw new UnauthorizedError("User not found");
    }

    const userData = await fetchUserById(user.id, {
      id: true,
      name: true,
      email: true,
      password: true,
    });

    return apiResponse(userData, 200);
  } catch (error) {
    console.error("GET /api/users error:", error);
    return apiResponse(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: false,
    });

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const { name, email } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
    });

    return apiResponse(updatedUser, 200);
  } catch (error) {
    console.error("PATCH /api/users error:", error);
    return apiResponse(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: false,
    });

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    await prisma.user.delete({
      where: { id: user.id },
    });

    return apiResponse({ message: "Account deleted" }, 200);
  } catch (error) {
    console.error("DELETE /api/users error:", error);
    return apiResponse(error);
  }
}
