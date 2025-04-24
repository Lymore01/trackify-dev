import axiosInstance from "@/lib/axios";
import userSchema from "@/schemas/userSchema";
import { NextResponse } from "next/server";
import z from "zod";
import { prisma } from "@/lib/prisma";
import { generateSalt, hashPassword } from "@/auth/core/password-hash";
import { createSession } from "@/auth/core/session";
import { cookies } from "next/headers";

// register
export async function POST(request: Request) {
  try {
    const body: z.infer<typeof userSchema> = await request.json();
    const { email, password, name } = body;

    //  check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already Exists!",
        },
        {
          status: 400,
        }
      );
    }

    const salt = generateSalt();
    const hashedPassword = (await hashPassword(password, salt)) as string;

    // add to the database
    const user = await prisma.user.create({
      data: {
        name: name ,
        email,
        password: hashedPassword,
        salt: salt,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create user!",
        },
        {
          status: 400,
        }
      );
    }

    // create session - set data into redis, cookie
    await createSession(user, await cookies());

    return NextResponse.json(
      {
        success: true,
        message: "User Registered Successfully. Redirecting....",
        redirectUrl: "/dashboard",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error registering in user", (error as Error).message);
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
