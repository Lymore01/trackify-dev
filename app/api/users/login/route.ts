import { comparePassword, hashPassword } from "@/auth/core/password-hash";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { createSession } from "@/auth/core/session";
import { cookies } from "next/headers";

// login
export async function POST(request: Request) {
  try {
    const body: { email: string; password: string } = await request.json();
    const data = body;

    //  check user
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email or Password",
        },
        {
          status: 400,
        }
      );
    }

    const isCorrectPassword = await comparePassword({
      password: data.password,
      hashedPassword: user.password,
      salt: user.salt,
    });

    if (!isCorrectPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email or Password",
        },
        {
          status: 400,
        }
      );
    }

    await createSession(
      {
        id: user.id,
        email: user.email,
      },
      await cookies()
    );

    return NextResponse.json(
      {
        success: true,
        message: "User Logged in Successfull, Redirecting....",
        redirectUrl: "/dashboard",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error logging in user", (error as Error).message);
    return NextResponse.json(
      {
        error: "Internal Server Error!",
      },
      {
        status: 500,
      }
    );
  }
}
