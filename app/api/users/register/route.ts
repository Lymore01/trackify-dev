import { generateSalt, hashPassword } from "@/auth/core/password-hash";
import { createSession } from "@/auth/core/session";
import { cookies } from "next/headers";
import { registerSchema } from "@/validations/authValidations";
import { apiResponse } from "@/lib/utils";
import { createUser, fetchUser } from "@/services/userServices";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data: userData, success } = registerSchema.safeParse(body);

    if (!success) {
      return apiResponse(
        { success: false, message: "Invalid request body" },
        400
      );
    }

    const existingUser = await fetchUser(userData.email);

    if (existingUser) {
      return apiResponse(
        {
          success: false,
          message: "User already Exists!",
        },
        400
      );
    }

    const salt = generateSalt();
    const hashedPassword = (await hashPassword(
      userData.password,
      salt
    )) as string;

    const user = await createUser({
      ...userData,
      password: hashedPassword,
      salt: salt,
    });

    if (!user) {
      return apiResponse(
        {
          success: false,
          message: "Failed to create user!",
        },
        400
      );
    }

    await createSession(user, await cookies());

    return apiResponse(
      {
        success: true,
        message: "User Registered Successfully. Redirecting....",
        redirectUrl: "/dashboard",
      },
      201
    );
  } catch (error) {
    console.error("POST /api/register error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}
