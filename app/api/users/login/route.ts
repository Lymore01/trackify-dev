import axiosInstance from "@/lib/axios";
import { NextResponse } from "next/server";

// register
export async function POST(request: Request) {
  try {
    const body: Pick<User, "email" | "password"> = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required!" },
        { status: 400 }
      );
    }

    const response = await axiosInstance.post("/auth/login", body);

    if (response.data.success === false) {
      return NextResponse.json(
        {
          error: "Login attempt failed!",
          details: response.data.error,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        user: response.data,
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
