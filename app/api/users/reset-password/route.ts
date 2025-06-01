// reset password

import {
  comparePassword,
  generateSalt,
  hashPassword,
} from "@/auth/core/password-hash";
import { apiResponse } from "@/lib/utils";
import { deleteResetToken, resetToken } from "@/services/resetTokenService";
import { fetchUser, updateUserPassword } from "@/services/userServices";
import { resetPassSchema } from "@/validations/authValidations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data: resetData, success } = resetPassSchema.safeParse(body);

    console.log("data: ", resetData);

    if (!success || !resetData.email || !resetData.newPassword) {
      return apiResponse(
        { success: false, message: "Invalid payload format" },
        400
      );
    }

    if (resetData.token) {
      // Case 1: Forgot password flow
      const isTokenValid = await resetToken({
        email: resetData.email,
        token: resetData.token,
      });

      if (!isTokenValid) {
        return apiResponse(
          { success: false, message: "Invalid or expired token." },
          400
        );
      }
    } else if (resetData.currentPassword) {
      // Case 2: Logged-in user changing password (authenticated)
      const user = await fetchUser(resetData.email);

      if (!user) {
        return apiResponse({ success: false, message: "User not found" }, 404);
      }

      const isValidPassword = await comparePassword({
        password: resetData.currentPassword,
        hashedPassword: user.password,
        salt: user.salt,
      });

      if (!isValidPassword) {
        return apiResponse(
          { success: false, message: "Invalid current password" },
          401
        );
      }
    } else {
      // If neither token nor current password is provided
      return apiResponse(
        { success: false, message: "Token or current password required." },
        400
      );
    }

    // hash the password
    const salt = generateSalt();
    const hashedPassword = (await hashPassword(
      resetData.newPassword,
      salt
    )) as string;

    await updateUserPassword({
      email: resetData.email,
      password: hashedPassword,
      salt,
    });

    // delete token
    if (resetData.token) {
      await deleteResetToken(resetData.token);
    }

    return apiResponse(
      {
        success: true,
        message: "Password changed successfully",
      },
      200
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return apiResponse(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      500
    );
  }
}
