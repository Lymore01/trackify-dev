// POST /api/users/forgot-password

import { sendEmail } from "@/lib/nodemailer";
import { apiResponse } from "@/lib/utils";
import { storeEmailToken } from "@/services/resetTokenService";
import { fetchUser } from "@/services/userServices";
import { forgotPassSchema } from "@/validations/authValidations";
import crypto from "crypto";
import { addMinutes } from "date-fns";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data: emailData, success } = forgotPassSchema.safeParse(body);

    if (!success) {
      return apiResponse(
        { success: false, message: "Invalid email format" },
        400
      );
    }

    const user = await fetchUser(emailData.email);
    if (!user) {
      return apiResponse(
        { success: false, message: "No account found with that email" },
        404
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = addMinutes(new Date(), 30);

    const resetLink = `https://trackify-dev-69k7.vercel.app/reset-password?token=${resetToken}&email=${emailData.email}`;

    const emailHtml = `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; padding: 30px;">
        <table style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
          <tr>
            <td style="text-align: center;">
              <img src="https://yourdomain.com/logo.svg" alt="Trackify Logo" style="height: 50px; margin-bottom: 20px;" />
            </td>
          </tr>
          <tr>
            <td>
              <h2 style="color: #333333;">Reset Your Password</h2>
              <p style="color: #555555;">Hi ${user.name || "there"},</p>
              <p style="color: #555555;">
                We received a request to reset your password. Click the button below to reset it. This link will expire in 30 minutes.
              </p>
              <p style="text-align: center; margin: 20px 0;">
                <a href="${resetLink}" style="background-color: #007BFF; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Reset Password
                </a>
              </p>
              <p style="color: #999999; font-size: 14px;">
                Or paste this link in your browser: <br />
                <a href="${resetLink}" style="color: #007BFF;">${resetLink}</a>
              </p>
              <p style="color: #999999; font-size: 14px;">
                If you did not request this, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="text-align: center; color: #aaaaaa; font-size: 12px; padding-top: 30px;">
              © ${new Date().getFullYear()} Trackify. All rights reserved.
            </td>
          </tr>
        </table>
      </div>
    `;

    const response = await sendEmail({
      to: emailData.email,
      subject: "Trackify - Reset Your Password",
      text: `Reset your password using this link: ${resetLink}`,
      html: emailHtml,
    });

  
    await storeEmailToken({
      email: emailData.email,
      token: resetToken,
      expiresAt,
    });

    return apiResponse(
      {
        success: response.success,
        message: "Password reset email sent successfully",
      },
      200
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return apiResponse(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      500
    );
  }
}
