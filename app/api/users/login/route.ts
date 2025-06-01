import { comparePassword } from "@/auth/core/password-hash";
import { createSession } from "@/auth/core/session";
import { cookies } from "next/headers";
import { loginSchema } from "@/validations/authValidations";
import { apiResponse } from "@/lib/utils";
import { fetchUser } from "@/services/userServices";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data: userData, success } = loginSchema.safeParse(body);

    if (!success) {
      return apiResponse(
        { success: false, message: "Invalid request body" },
        400
      );
    }

    const user = await fetchUser(userData.email);

    if (!user) {
      return apiResponse(
        {
          success: false,
          message: "Invalid Email or Password",
        },
        400
      );
    }

    const isCorrectPassword = await comparePassword({
      password: userData.password,
      hashedPassword: user.password,
      salt: user.salt,
    });

    if (!isCorrectPassword) {
      return apiResponse(
        {
          success: false,
          message: "Invalid Email or Password",
        },
        400
      );
    }

    await createSession(
      {
        id: user.id,
        email: user.email,
      },
      await cookies()
    );

    return apiResponse(
      {
        success: true,
        message: "User Logged in Successfull, Redirecting....",
        redirectUrl: "/dashboard",
      },
      201
    );
  } catch (error) {
    console.error("POST /api/login error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}
