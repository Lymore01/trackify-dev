import { generateSalt, hashPassword } from "@/auth/core/password-hash";
import { createSession } from "@/auth/core/session";
import { cookies } from "next/headers";
import { registerSchema } from "@/validations/authValidations";
import { apiResponse, generateAPIKey } from "@/lib/utils";
import { createUser, fetchUser } from "@/services/userServices";
import { ValidationError, AppError } from "@/lib/exceptions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data: userData, success } = registerSchema.safeParse(body);

    if (!success) {
      throw new ValidationError("Invalid request body");
    }

    const existingUser = await fetchUser(userData.email);

    if (existingUser) {
      throw new AppError("User already exists", 400, "USER_ALREADY_EXISTS");
    }

    const salt = generateSalt();
    const hashedPassword = (await hashPassword(
      userData.password,
      salt,
    )) as string;

    const api_key = await generateAPIKey();

    const user = await createUser({
      ...userData,
      password: hashedPassword,
      salt: salt,
      apiKey: api_key,
    });

    if (!user) {
      throw new AppError("Failed to create user", 400);
    }

    await createSession(user, await cookies());

    return apiResponse(
      {
        message: "User registered successfully",
        redirectUrl: "/dashboard",
      },
      201,
    );
  } catch (error) {
    console.error("POST /api/users/register error:", error);
    return apiResponse(error);
  }
}
