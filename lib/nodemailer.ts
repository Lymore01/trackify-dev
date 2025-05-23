import * as nodemailer from "nodemailer";
import { config } from "@/config/config";

type Extra = {
  service?: string;
  html?: string;
};

type EmailProps = nodemailer.SendMailOptions & Extra;

interface EmailResponse {
  success: boolean;
  message: string;
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
  service = "gmail",
}: EmailProps): Promise<EmailResponse> {
  const sender = process.env.EMAIL_SENDER;
  const password = config.GOOGLE_APP_ID;

  if (!sender || !password) {
    return {
      success: false,
      message: "Email sender credentials are missing.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service,
      auth: {
        user: sender,
        pass: password,
      },
    });

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Trackify" <${sender}>`,
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Email sent successfully!",
    };
  } catch (error: any) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      message: error?.message || "Email failed to send",
    };
  }
}