import axiosInstance from "@/lib/axios";
import { NextResponse } from "next/server";

// register
export async function POST(request: Request) {
  try {
    const body: Pick<User, "name" | "email" | "password"> =
      await request.json();
    const { email, password } = body;

    const missingFields: string[] = [];
    // if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    // validations
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "All fields are required",
          details: {
            missingFields,
          },
        },
        {
          status: 400,
        }
      );
    }

    // send the payload to the api endpoint
    const response = await axiosInstance.post("/auth/register", body);

    if (response.data.success === false) {
      return NextResponse.json(
        {
          error: "Registration attempt failed!",
          details: response.data.error,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        user: response.data
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error registering user", (error as Error).message);
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
