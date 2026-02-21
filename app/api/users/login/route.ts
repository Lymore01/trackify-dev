import { comparePassword } from "@/auth/core/password-hash";
import { createSession } from "@/auth/core/session";
import { cookies } from "next/headers";
import { loginSchema } from "@/validations/authValidations";
import { apiResponse } from "@/lib/utils";
import { fetchUser } from "@/services/userServices";
import { UnauthorizedError, ValidationError } from "@/lib/exceptions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data: userData, success } = loginSchema.safeParse(body);

    if (!success) {
      throw new ValidationError("Invalid request body");
    }

    const user = await fetchUser(userData.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isCorrectPassword = await comparePassword({
      password: userData.password,
      hashedPassword: user.password,
      salt: user.salt,
    });

    if (!isCorrectPassword) {
      throw new UnauthorizedError("Invalid email or password");
    }

    await createSession(
      {
        id: user.id,
        email: user.email,
      },
      await cookies(),
    );

    return apiResponse(
      {
        message: "User logged in successfully",
        redirectUrl: "/dashboard",
      },
      200,
    );
  } catch (error) {
    console.error("POST /api/users/login error:", error);
    return apiResponse(error);
  }
}
